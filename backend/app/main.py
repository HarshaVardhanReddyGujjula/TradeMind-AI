from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth_router, stocks_router, wallet_router, portfolio_router, signals_router, ai_router, news_router
from app.config import settings
import asyncio
import json

# Create Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Groww-Style AI Trading Platform API for Indian & US Equities"
)

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router.router, prefix=settings.API_V1_STR)
app.include_router(stocks_router.router, prefix=settings.API_V1_STR)
app.include_router(wallet_router.router, prefix=settings.API_V1_STR)
app.include_router(portfolio_router.router, prefix=settings.API_V1_STR)
app.include_router(signals_router.router, prefix=settings.API_V1_STR)
app.include_router(ai_router.router, prefix=settings.API_V1_STR)
app.include_router(news_router.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "ceo": "Harsha",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

# WebSockets Endpoint for Live Signals & Scanner Alerts
@app.websocket("/ws/signals")
async def websocket_signals(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time background scanner alert broadcast
            alert = {
                "type": "SIGNAL_ALERT",
                "symbol": "RELIANCE",
                "market": "NSE",
                "action": "BUY",
                "price": 2850.0,
                "target": 3100.0,
                "stop_loss": 2720.0,
                "message": "🚨 BUY Signal Alert: Reliance Industries hit oversold RSI zone (34.2). Target: ₹3,100.00!"
            }
            await websocket.send_text(json.dumps(alert))
            await asyncio.sleep(20) # Broadcast every 20s
    except WebSocketDisconnect:
        pass
