@echo off
REM NIKAT Setup Script for Windows
REM This script sets up the NIKAT project for development

echo.
echo 🚀 NIKAT Setup Script
echo ====================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm found: %NPM_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Check Expo CLI
REM where expo >nul 2>nul
REM if %ERRORLEVEL% NEQ 0 (
REM     echo.
REM     echo ⚠️  Expo CLI not found globally. Installing...
REM     call npm install -g expo-cli
REM )

REM Create .env if not exists
if not exist ".env" (
    echo.
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please update .env with your Firebase credentials
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update .env with your Firebase credentials
echo 2. Run 'npm start' to start the development server
echo 3. Scan QR code with Expo Go app on your phone
echo.
pause
