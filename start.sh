#!/bin/bash

# Calculator Hub - Quick Start Script
echo "🧮 Calculator Hub - Starting..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "⚠️  Warning: MongoDB doesn't appear to be running"
    echo "Please start MongoDB or update MONGODB_URI in .env file"
    echo ""
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calculator-hub
NODE_ENV=development
EOF
    echo "✅ .env file created"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo ""
fi

# Check if frontend/node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo ""
fi

echo "🚀 Starting Calculator Hub..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the application
npm run dev

