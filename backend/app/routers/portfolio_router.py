from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Holding, Watchlist, Transaction
from app.services.stock_service import StockService

router = APIRouter(prefix="/portfolio", tags=["Portfolio & Watchlist"])

@router.get("/holdings")
def get_holdings(db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    
    holdings = db.query(Holding).filter(Holding.user_id == user_id).all()
    
    # Auto-seed initial sample holdings if empty (Reliance & Nvidia)
    if not holdings:
        h1 = Holding(user_id=user_id, symbol="RELIANCE", market="NSE", quantity=10, average_buy_price=2750.0)
        h2 = Holding(user_id=user_id, symbol="NVDA", market="US", quantity=5, average_buy_price=120.0)
        db.add_all([h1, h2])
        db.commit()
        holdings = [h1, h2]

    results = []
    total_invested = 0.0
    total_current = 0.0

    for h in holdings:
        quote = StockService.get_stock_quote(h.symbol, h.market)
        curr_price = quote["current_price"]
        invested = h.quantity * h.average_buy_price
        current_val = h.quantity * curr_price
        pnl = current_val - invested
        pnl_percent = (pnl / invested) * 100 if invested > 0 else 0.0

        total_invested += invested
        total_current += current_val

        results.append({
            "id": h.id,
            "symbol": h.symbol,
            "market": h.market,
            "currency": quote["currency"],
            "quantity": h.quantity,
            "avg_price": round(h.average_buy_price, 2),
            "current_price": curr_price,
            "invested_value": round(invested, 2),
            "current_value": round(current_val, 2),
            "pnl": round(pnl, 2),
            "pnl_percent": round(pnl_percent, 2),
            "trend_7d": quote["trend_7d"],
            "rsi": quote["rsi"]
        })

    total_pnl = total_current - total_invested
    total_pnl_percent = (total_pnl / total_invested) * 100 if total_invested > 0 else 0.0

    return {
        "holdings": results,
        "summary": {
            "total_invested": round(total_invested, 2),
            "total_current_value": round(total_current, 2),
            "total_pnl": round(total_pnl, 2),
            "total_pnl_percent": round(total_pnl_percent, 2)
        }
    }

@router.get("/watchlist")
def get_watchlist(db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    
    items = db.query(Watchlist).filter(Watchlist.user_id == user_id).all()
    if not items:
        # Seed default watchlist
        defaults = [
            Watchlist(user_id=user_id, symbol="TCS", market="NSE"),
            Watchlist(user_id=user_id, symbol="TATAMOTORS", market="NSE"),
            Watchlist(user_id=user_id, symbol="AAPL", market="US"),
            Watchlist(user_id=user_id, symbol="TSLA", market="US")
        ]
        db.add_all(defaults)
        db.commit()
        items = defaults

    results = []
    for item in items:
        quote = StockService.get_stock_quote(item.symbol, item.market)
        results.append(quote)
    return results

@router.post("/watchlist/add")
def add_to_watchlist(symbol: str = Query(...), market: str = Query("NSE"), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    
    existing = db.query(Watchlist).filter(Watchlist.user_id == user_id, Watchlist.symbol == symbol.upper()).first()
    if not existing:
        item = Watchlist(user_id=user_id, symbol=symbol.upper(), market=market)
        db.add(item)
        db.commit()
    return {"success": True, "message": f"Added {symbol.upper()} to your watchlist."}
