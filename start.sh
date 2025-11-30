#!/bin/bash
# Calculator Hub - Quick Start Script for Linux/Mac

echo ""
echo "🧮 Calculator Hub - Starting..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found"
node --version
echo ""

# Check if frontend/node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo ""
fi

echo "🚀 Starting Calculator Hub..."
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the application
cd frontend
npm start

