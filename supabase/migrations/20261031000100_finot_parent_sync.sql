-- =====================================================================================================================
-- Finot Académie — suivi parent à distance : schéma, sécurité et RPC (migration 0001)
-- STATUT : CONCEPTION NON DÉPLOYÉE. Aucun projet, aucune URL, aucune clé. Exécutée et testée uniquement en local
-- (PostgreSQL 18 / PGlite, supabase/tests/run.mjs). À relire avant tout provisioning (docs/supabase-security-test-plan.md).
--
-- Principes
--  * Données d'enfant UNIQUEMENT dans le schéma `private`, jamais exposé par la Data API, sans aucun droit pour anon,
--    authenticated ni PUBLIC ; RLS activée ET forcée sans politique (défense en profondeur).
--  * Seule surface publique : 6 fonctions du schéma `api` (noms historiques du client conservés : mq_*), SECURITY DEFINER,
--    search_path vide, objets pleinement qualifiés, aucune SQL dynamique, EXECUTE accordé fonction par fonction à anon.
--  * Secrets « porteurs » générés par l'appareil (enfant 28 car., parent 32 car., alphabet de 55 symboles ≈ 162 / 185 bits) :
--    seul leur SHA-256 avec séparation de domaine est stocké ; jamais renvoyés, jamais journalisés.
--  * Anti-énumération : jeton inconnu, invalide, révoqué ou supprimé → même refus générique (ou null pour la lecture).
--  * Le serveur n'accepte que le snapshot minimal de js/sync-snapshot.js (liste blanche, clés interdites même imbriquées,
--    tailles bornées) : pas de date de naissance, pas de réponse libre, pas de diagnostic, pas de DYS, pas de secret.
--  * Rétention : purge des familles inactives (180 jours par défaut), des actions acquittées (7 jours) et expirées (30 jours).
-- =====================================================================================================================

create schema if not exists private;
create schema if not exists api;

revoke all on schema private from public;
revoke all on schema api from public;
grant usage on schema api to anon;

-- Aucun droit implicite sur les objets futurs.
alter default privileges in schema private revoke all on tables from public;
alter default privileges in schema private revoke all on sequences from public;
alter default privileges in schema private revoke execute on functions from public;
alter default privileges in schema api revoke execute on functions from public;

-- ===== Tables (schéma privé) =====
create table private.families (
  id                 uuid primary key default gen_random_uuid(),
  child_hash         bytea not null unique check (octet_length(child_hash) = 32),
  parent_hash        bytea not null unique check (octet_length(parent_hash) = 32),
  protocol           integer not null default 1,
  created_at         timestamptz not null default now(),
  last_push_at       timestamptz,
  push_window_start  timestamptz not null default now(),
  push_window_count  integer not null default 0
);
create index families_activity_idx on private.families (coalesce(last_push_at, created_at));

create table private.snapshots (
  family_id       uuid primary key references private.families (id) on delete cascade,
  payload         jsonb not null,
  schema_version  integer not null,
  updated_at      timestamptz not null default now()
);

create table private.parent_actions (
  id          uuid primary key default gen_random_uuid(),
  family_id   uuid not null references private.families (id) on delete cascade,
  kind        text not null check (kind in ('accept','refuse','bonus','rewards','rules','interrogation','interrogation_cancel')),
  payload     jsonb not null check (octet_length(payload::text) <= 8192),
  created_at  timestamptz not null default now(),
  acked_at    timestamptz,
  expires_at  timestamptz not null default (now() + interval '30 days')
);
create index parent_actions_pending_idx on private.parent_actions (family_id) where acked_at is null;
create index parent_actions_expiry_idx on private.parent_actions (expires_at);

alter table private.families enable row level security;
alter table private.families force row level security;
alter table private.snapshots enable row level security;
alter table private.snapshots force row level security;
alter table private.parent_actions enable row level security;
alter table private.parent_actions force row level security;
revoke all on all tables in schema private from public, anon, authenticated;

-- ===== Outils internes =====
-- Refus générique : ne distingue jamais inconnu / invalide / révoqué / supprimé / autre famille.
create function private.refuse() returns void
language plpgsql immutable set search_path = '' as $$
begin
  raise exception 'finot: request refused' using errcode = 'P0001';
end $$;

-- Format exact des secrets produits par rndCode() (js/app-state.js).
create function private.token_ok(p_token text, p_len integer) returns boolean
language sql immutable set search_path = '' as $$
  select p_token is not null and length(p_token) = p_len
     and p_token ~ '^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789]+$'
$$;

create function private.token_hash(p_domain text, p_token text) returns bytea
language sql immutable set search_path = '' as $$
  select pg_catalog.sha256(pg_catalog.convert_to('finot:' || p_domain || ':v1:' || p_token, 'UTF8'))
$$;

create function private.family_by_child(p_child text) returns uuid
language sql stable set search_path = '' as $$
  select f.id from private.families f
   where private.token_ok(p_child, 28) and f.child_hash = private.token_hash('child', p_child)
$$;

create function private.family_by_parent(p_parent text) returns uuid
language sql stable set search_path = '' as $$
  select f.id from private.families f
   where private.token_ok(p_parent, 32) and f.parent_hash = private.token_hash('parent', p_parent)
$$;

-- Contrat du snapshot : miroir de MQSyncSnapshot.FIELDS (js/sync-snapshot.js) + lastSeen + syncSchema.
create function private.validate_snapshot(p jsonb) returns void
language plpgsql immutable set search_path = '' as $$
declare
  allowed text[] := array['name','avatar','grade','xp','totalQ','totalOk','time','streak','daily','dailyGoal','chap',
    'lessons','merit','readingMastery','readingProgress','competencies','activityLog','answerLog','studyLog',
    'interrogations','path','pathHist','lastSeen','syncSchema'];
  -- Interdits à toute profondeur : identité civile, secrets, profil sensible, texte libre, voix.
  forbidden text[] := array['birthdate','lastBirthdayYear','gender','pin','rec','sync','dys','diagnostic','learnerProfile',
    'homeworkHelp','homework','mistakes','your','notes','transcript','audio','economy','tts'];
  k text;
begin
  if p is null or jsonb_typeof(p) <> 'object' then perform private.refuse(); end if;
  if octet_length(p::text) > 524288 then perform private.refuse(); end if;
  if (p ->> 'syncSchema') is distinct from '1' then perform private.refuse(); end if;
  for k in select jsonb_object_keys(p) loop
    if not (k = any (allowed)) then perform private.refuse(); end if;
  end loop;
  foreach k in array forbidden loop
    if jsonb_path_exists(p, ('strict $.**."' || k || '"')::jsonpath) then perform private.refuse(); end if;
  end loop;
  if jsonb_typeof(p -> 'name') is distinct from 'string' or length(p ->> 'name') > 40 then perform private.refuse(); end if;
  if p ? 'answerLog' and (jsonb_typeof(p -> 'answerLog') <> 'array' or jsonb_array_length(p -> 'answerLog') > 2500) then
    perform private.refuse();
  end if;
  if p ? 'activityLog' and (jsonb_typeof(p -> 'activityLog') <> 'array' or jsonb_array_length(p -> 'activityLog') > 2500) then
    perform private.refuse();
  end if;
end $$;

-- ===== API publique (appelée avec la clé « publishable », rôle anon) =====

-- Activation du suivi par l'appareil de l'enfant : enregistre seulement les deux empreintes.
create function api.mq_register(p_child text, p_parent text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  if not private.token_ok(p_child, 28) or not private.token_ok(p_parent, 32) then perform private.refuse(); end if;
  begin
    insert into private.families (child_hash, parent_hash)
    values (private.token_hash('child', p_child), private.token_hash('parent', p_parent));
  exception when unique_violation then
    perform private.refuse();
  end;
  return jsonb_build_object('ok', true, 'protocol', 1);
end $$;

-- Envoi du snapshot minimal ; renvoie les actions parent en attente (non acquittées, non expirées).
create function api.mq_push(p_child text, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare fid uuid; win timestamptz; cnt integer;
begin
  fid := private.family_by_child(p_child);
  if fid is null then perform private.refuse(); end if;
  select push_window_start, push_window_count into win, cnt from private.families where id = fid for update;
  if win > now() - interval '1 minute' then
    if cnt >= 30 then perform private.refuse(); end if;
    update private.families set push_window_count = cnt + 1 where id = fid;
  else
    update private.families set push_window_start = now(), push_window_count = 1 where id = fid;
  end if;
  perform private.validate_snapshot(p_data);
  insert into private.snapshots (family_id, payload, schema_version, updated_at)
  values (fid, p_data, 1, now())
  on conflict (family_id) do update set payload = excluded.payload, schema_version = 1, updated_at = now();
  update private.families set last_push_at = now() where id = fid;
  return coalesce((
    select jsonb_agg(jsonb_build_object('id', a.id, 'kind', a.kind, 'payload', a.payload) order by a.created_at)
      from (select * from private.parent_actions
             where family_id = fid and acked_at is null and expires_at > now()
             order by created_at limit 50) a), '[]'::jsonb);
end $$;

-- Acquittement par l'enfant ; n'affecte que les actions de SA famille ; idempotent.
create function api.mq_ack(p_child text, p_ids uuid[]) returns integer
language plpgsql security definer set search_path = '' as $$
declare fid uuid; n integer;
begin
  fid := private.family_by_child(p_child);
  if fid is null or p_ids is null or cardinality(p_ids) > 100 then perform private.refuse(); end if;
  update private.parent_actions set acked_at = now()
   where family_id = fid and id = any (p_ids) and acked_at is null;
  get diagnostics n = row_count;
  return n;
end $$;

-- Lecture par le parent : snapshot minimal + actions en attente. Jeton inconnu / supprimé → null (indiscernables).
create function api.mq_get(p_parent text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare fid uuid;
begin
  fid := private.family_by_parent(p_parent);
  if fid is null then return null; end if;
  return jsonb_build_object(
    'data', (select s.payload from private.snapshots s where s.family_id = fid),
    'updated_at', (select s.updated_at from private.snapshots s where s.family_id = fid),
    'pending', coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'kind', a.kind, 'created_at', a.created_at) order by a.created_at)
                          from private.parent_actions a where a.family_id = fid and a.acked_at is null and a.expires_at > now()), '[]'::jsonb));
end $$;

-- Action du parent (récompense, bonus, règles, interrogation) : type et taille bornés, 50 en attente au plus.
create function api.mq_act(p_parent text, p_kind text, p_payload jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare fid uuid;
begin
  fid := private.family_by_parent(p_parent);
  if fid is null then perform private.refuse(); end if;
  if p_kind is null or not (p_kind = any (array['accept','refuse','bonus','rewards','rules','interrogation','interrogation_cancel']))
     or p_payload is null or jsonb_typeof(p_payload) <> 'object' or octet_length(p_payload::text) > 8192 then
    perform private.refuse();
  end if;
  if (select count(*) from private.parent_actions where family_id = fid and acked_at is null and expires_at > now()) >= 50 then
    perform private.refuse();
  end if;
  insert into private.parent_actions (family_id, kind, payload) values (fid, p_kind, p_payload);
  return jsonb_build_object('ok', true);
end $$;

-- Suppression définitive demandée par le parent (lien parent) : famille, snapshot et actions.
-- Idempotente et sans information : renvoie toujours {ok:true} si la confirmation est correcte.
create function api.mq_delete(p_parent text, p_confirm text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  if p_confirm is distinct from 'SUPPRIMER' then perform private.refuse(); end if;
  delete from private.families where id = private.family_by_parent(p_parent);
  return jsonb_build_object('ok', true);
end $$;

-- Rotation du lien parent (lien partagé par erreur) : l'ancien lien cesse immédiatement de fonctionner.
create function api.mq_rotate_parent(p_parent text, p_new_parent text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare fid uuid;
begin
  fid := private.family_by_parent(p_parent);
  if fid is null or not private.token_ok(p_new_parent, 32) or p_new_parent = p_parent then perform private.refuse(); end if;
  begin
    update private.families set parent_hash = private.token_hash('parent', p_new_parent) where id = fid;
  exception when unique_violation then
    perform private.refuse();
  end;
  return jsonb_build_object('ok', true);
end $$;

-- ===== Rétention (tâche planifiée côté serveur, jamais exposée) =====
create function private.purge_expired(p_inactive interval default interval '180 days') returns jsonb
language plpgsql security definer set search_path = '' as $$
declare f integer; a integer; e integer;
begin
  delete from private.families where coalesce(last_push_at, created_at) < now() - p_inactive;
  get diagnostics f = row_count;
  delete from private.parent_actions where acked_at is not null and acked_at < now() - interval '7 days';
  get diagnostics a = row_count;
  delete from private.parent_actions where expires_at <= now();
  get diagnostics e = row_count;
  return jsonb_build_object('families', f, 'acked_actions', a, 'expired_actions', e);
end $$;
-- Sur Supabase (après revue) : select cron.schedule('finot-purge', '17 3 * * *', $$select private.purge_expired()$$);

-- ===== Droits d'exécution : explicites, fonction par fonction =====
revoke execute on all functions in schema private from public, anon, authenticated;
revoke execute on all functions in schema api from public, anon, authenticated;
grant execute on function api.mq_register(text, text) to anon;
grant execute on function api.mq_push(text, jsonb) to anon;
grant execute on function api.mq_ack(text, uuid[]) to anon;
grant execute on function api.mq_get(text) to anon;
grant execute on function api.mq_act(text, text, jsonb) to anon;
grant execute on function api.mq_delete(text, text) to anon;
grant execute on function api.mq_rotate_parent(text, text) to anon;
