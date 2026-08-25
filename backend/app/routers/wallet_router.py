from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import AddMoneyRequest, TradeOrderRequest, WalletOut
from app.services.wallet_service import WalletService
from app.models import User, SEBILog

router = APIRouter(prefix="/wallet", tags=["TradeMind Wallet & Paper Trading"])

@router.get("/balance")
def get_balance(db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    wallet = WalletService.get_or_create_wallet(db, user_id)
    return {
        "cash_balance": round(wallet.cash_balance, 2),
        "total_deposited": round(wallet.total_deposited, 2),
        "currency": "₹ / $"
    }

@router.post("/add-money")
def add_money(req: AddMoneyRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    wallet = WalletService.add_money(db, user_id, req.amount)
    return {
        "success": True,
        "message": f"Successfully deposited virtual cash +₹/{req.amount:,.2f} into your TradeMind Wallet!",
        "new_balance": round(wallet.cash_balance, 2)
    }

@router.post("/trade")
def execute_trade(req: TradeOrderRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    user_id = user.id if user else 1
    return WalletService.execute_trade(db, user_id, req.symbol, req.market, req.action, req.quantity)

@router.get("/sebi-logs")
def get_sebi_logs(db: Session = Depends(get_db)):
    logs = db.query(SEBILog).order_by(SEBILog.timestamp.desc()).limit(10).all()
    return logs
