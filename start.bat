@echo off
REM Calculator Hub - Quick Start Script for Windows

echo.
echo 🧮 Calculator Hub - Starting...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo.

REM Check if frontend/node_modules exists
if not exist frontend\node_modules (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo.
)

echo 🚀 Starting Calculator Hub...
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

REM Start the application
cd frontend
call npm start

