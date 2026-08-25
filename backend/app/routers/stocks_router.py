from fastapi import APIRouter, Query
from app.services.stock_service import StockService
from typing import List, Dict, Any

router = APIRouter(prefix="/stocks", tags=["Stocks Market Engine"])

@router.get("/quote")
def get_quote(symbol: str = Query("RELIANCE"), market: str = Query("NSE")):
    return StockService.get_stock_quote(symbol, market)

@router.get("/candles")
def get_candles(symbol: str = Query("RELIANCE"), market: str = Query("NSE"), period: str = Query("1mo")):
    return StockService.get_candles(symbol, market, period)

@router.get("/search")
def search_stocks(query: str = Query("")):
    popular = [
        {"symbol": "RELIANCE", "name": "Reliance Industries Ltd", "market": "NSE", "currency": "₹"},
        {"symbol": "TCS", "name": "Tata Consultancy Services", "market": "NSE", "currency": "₹"},
        {"symbol": "TATAMOTORS", "name": "Tata Motors Ltd", "market": "NSE", "currency": "₹"},
        {"symbol": "INFY", "name": "Infosys Ltd", "market": "NSE", "currency": "₹"},
        {"symbol": "HDFCBANK", "name": "HDFC Bank Ltd", "market": "NSE", "currency": "₹"},
        {"symbol": "NVDA", "name": "NVIDIA Corporation", "market": "US", "currency": "$"},
        {"symbol": "AAPL", "name": "Apple Inc", "market": "US", "currency": "$"},
        {"symbol": "TSLA", "name": "Tesla Inc", "market": "US", "currency": "$"},
        {"symbol": "MSFT", "name": "Microsoft Corporation", "market": "US", "currency": "$"},
        {"symbol": "GOOGL", "name": "Alphabet Inc", "market": "US", "currency": "$"}
    ]
    if not query:
        return popular
    return [s for s in popular if query.lower() in s["symbol"].lower() or query.lower() in s["name"].lower()]
