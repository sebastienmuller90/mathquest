/* Client CDP minimal pour la WebView Android d'un AVD (outil local de recette et de captures).
   adb forward tcp:PORT localabstract:webview_devtools_remote_<pid> puis connect(PORT). Aucun envoi hors de la machine. */
export async function connect(port = 9333) {
  const list = await (await fetch(`http://127.0.0.1:${port}/json`, { signal: AbortSignal.timeout(5000) })).json();
  const target = list.find(t => t.type === 'page' && /localhost/.test(t.url)) || list.find(t => t.type === 'page');
  if (!target) throw new Error('aucune page WebView : ' + JSON.stringify(list));
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; setTimeout(() => rej(new Error('délai websocket')), 5000); });
  let id = 0;
  const pending = new Map();
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expr, timeoutMs = 60000) => {
    const r = await Promise.race([
      send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('délai evaluate')), timeoutMs)),
    ]);
    if (r.exceptionDetails) throw new Error('JS: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r.result.value;
  };
  return { send, evaluate, close: () => ws.close() };
}
