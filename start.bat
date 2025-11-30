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

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/calculator-hub
        echo NODE_ENV=development
    ) > .env
    echo ✅ .env file created
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing backend dependencies...
    call npm install
    echo.
)

REM Check if frontend/node_modules exists
if not exist frontend\node_modules (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo.
)

echo 🚀 Starting Calculator Hub...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo Press Ctrl+C to stop
echo.

REM Start the application
npm run dev

