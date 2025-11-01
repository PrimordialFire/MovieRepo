# Quick Start Script for Movie Review Platform
# This script starts both the backend server and frontend client

Write-Host "🎬 Starting Movie Review Platform..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js detected: $(node --version)" -ForegroundColor Green

# Check if dependencies are installed
if (-not (Test-Path "server/node_modules")) {
    Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
    Set-Location server
    npm install
    Set-Location ..
}

if (-not (Test-Path "client/node_modules")) {
    Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
    Set-Location client
    npm install
    Set-Location ..
}

# Check environment files
if (-not (Test-Path "server/.env")) {
    Write-Host "⚠️  Warning: server/.env not found. Using default values." -ForegroundColor Yellow
    Write-Host "   Please create server/.env with your TMDB_API_KEY" -ForegroundColor Yellow
}

if (-not (Test-Path "client/.env")) {
    Write-Host "⚠️  Warning: client/.env not found. Using default values." -ForegroundColor Yellow
    Write-Host "   Please create client/.env with your Firebase config" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend will run on: http://localhost:4000" -ForegroundColor Cyan
Write-Host "Frontend will run on: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Start backend server in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; Write-Host '🔧 Backend Server' -ForegroundColor Green; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 2

# Start frontend client in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; Write-Host '⚛️  Frontend Client' -ForegroundColor Blue; npm run dev"

Write-Host "✓ Servers started in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Wait for both servers to start" -ForegroundColor White
Write-Host "2. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host "3. Register a new account" -ForegroundColor White
Write-Host "4. Search for movies and add reviews!" -ForegroundColor White
Write-Host ""
Write-Host "To stop: Close both PowerShell windows" -ForegroundColor Yellow
