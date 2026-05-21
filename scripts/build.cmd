@echo off
setlocal

pushd "%~dp0.." >nul
call "%~dp0setup-node-portable.cmd"
if errorlevel 1 exit /b 1

set "PATH=%CD%\.tools\node-v24.15.0-win-x64;%PATH%"
npm.cmd run build
