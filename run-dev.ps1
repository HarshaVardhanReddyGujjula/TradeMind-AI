Write-Host "===================================================" -ForegroundColor Green
Write-Host "🚀 Launching TradeMind AI Full Stack Servers..." -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit -Command cd D:\trademind-ai\backend; python -m uvicorn app.main:app --reload --port 8000"
Start-Process powershell -ArgumentList "-NoExit -Command cd D:\trademind-ai\frontend; npm run dev"

Write-Host "✅ Backend launching at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "✅ Frontend launching at: http://localhost:3000" -ForegroundColor Cyan
