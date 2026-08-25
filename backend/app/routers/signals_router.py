from fastapi import APIRouter, Query
from app.services.stock_service import StockService
from app.services.ai_service import AIService

router = APIRouter(prefix="/signals", tags=["AI Buy/Sell Signal Radar"])

@router.get("/analyze")
def analyze_stock(symbol: str = Query("RELIANCE"), market: str = Query("NSE")):
    quote = StockService.get_stock_quote(symbol, market)
    signal = AIService.generate_signal(symbol, market, quote["current_price"], quote["rsi"], quote["macd"])
    return {
        "stock": quote,
        "signal": signal
    }

@router.get("/gems")
def get_high_potential_gems():
    """
    AI High-Potential Breakout Gems Radar (Top 3 daily stocks)
    """
    return [
        {
            "symbol": "TATAMOTORS",
            "market": "NSE",
            "currency": "₹",
            "current_price": 980.0,
            "signal": "BUY",
            "entry_target": 980.0,
            "take_profit": 1080.0,
            "stop_loss": 940.0,
            "confidence": 91.2,
            "reason": "Breakout above 50-day EMA with strong EV delivery quarterly growth."
        },
        {
            "symbol": "NVDA",
            "market": "US",
            "currency": "$",
            "current_price": 128.50,
            "signal": "BUY",
            "entry_target": 128.50,
            "take_profit": 145.00,
            "stop_loss": 121.00,
            "confidence": 93.8,
            "reason": "AI Data Center chip demand surge and institutional accumulation."
        },
        {
            "symbol": "INFY",
            "market": "NSE",
            "currency": "₹",
            "current_price": 1860.0,
            "signal": "BUY",
            "entry_target": 1860.0,
            "take_profit": 2040.0,
            "stop_loss": 1780.0,
            "confidence": 88.5,
            "reason": "Large deal wins in European cloud transformation projects."
        }
    ]
