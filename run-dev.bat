@echo off
echo ===================================================
echo 🚀 Installing Dependencies & Launching TradeMind AI...
echo ===================================================

echo [1/2] Checking Python Packages (FastAPI, Uvicorn, yfinance)...
cd /d D:\trademind-ai\backend
python -m pip install -r requirements.txt

echo.
echo [2/2] Launching Backend & Frontend Servers...
start "🐍 TradeMind Backend (FastAPI)" cmd /k "cd /d D:\trademind-ai\backend && python -m uvicorn app.main:app --reload --port 8000"
start "⚡ TradeMind Frontend (Next.js)" cmd /k "cd /d D:\trademind-ai\frontend && npm install && npm run dev"

echo.
echo ✅ Backend launching at: http://localhost:8000
echo ✅ Frontend launching at: http://localhost:3000
echo.
