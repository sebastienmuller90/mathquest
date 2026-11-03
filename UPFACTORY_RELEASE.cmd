@echo off
setlocal
if /I not "%~1"=="android" (
  echo Usage: UPFACTORY_RELEASE.cmd android [publish]
  exit /b 2
)
set "BUNDLE_GEMFILE=%CD%\Gemfile.upfactory"
set "CONFIRM="
if /I "%~2"=="publish" set "CONFIRM=--confirm-publish"
upfactory release --app . --platform android %CONFIRM%
exit /b %ERRORLEVEL%
