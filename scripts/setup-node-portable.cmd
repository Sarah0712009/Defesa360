@echo off
setlocal

pushd "%~dp0.." >nul

set "NODE_VERSION=v24.15.0"
set "NODE_DIR=.tools\node-%NODE_VERSION%-win-x64"
set "NODE_ZIP=.tools\node-%NODE_VERSION%-win-x64.zip"
set "NODE_URL=https://nodejs.org/dist/%NODE_VERSION%/node-%NODE_VERSION%-win-x64.zip"

if exist "%NODE_DIR%\node.exe" (
  echo Node portatil ja esta instalado em %NODE_DIR%.
  "%NODE_DIR%\node.exe" -v
  exit /b 0
)

if not exist ".tools" mkdir ".tools"

echo Baixando Node.js portatil %NODE_VERSION%...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%NODE_ZIP%'"
if errorlevel 1 exit /b 1

echo Extraindo Node.js portatil...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '%NODE_ZIP%' -DestinationPath '.tools' -Force"
if errorlevel 1 exit /b 1

del "%NODE_ZIP%" >nul 2>nul

echo Node portatil instalado com sucesso.
"%NODE_DIR%\node.exe" -v
