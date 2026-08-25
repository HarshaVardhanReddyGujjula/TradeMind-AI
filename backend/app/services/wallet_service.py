from sqlalchemy.orm import Session
from app.models import Wallet, Holding, Transaction, SEBILog
from app.services.sebi_service import SEBIService
from app.services.stock_service import StockService
from typing import Dict, Any, List

class WalletService:
    @staticmethod
    def get_or_create_wallet(db: Session, user_id: int) -> Wallet:
        wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
        if not wallet:
            wallet = Wallet(user_id=user_id, cash_balance=100000.0, total_deposited=100000.0)
            db.add(wallet)
            db.commit()
            db.refresh(wallet)
        return wallet

    @staticmethod
    def add_money(db: Session, user_id: int, amount: float) -> Wallet:
        wallet = WalletService.get_or_create_wallet(db, user_id)
        wallet.cash_balance += amount
        wallet.total_deposited += amount
        
        # Log Transaction
        tx = Transaction(
            user_id=user_id,
            symbol="CASH_DEPOSIT",
            market="INR",
            type="DEPOSIT",
            quantity=1,
            price=amount,
            total_amount=amount
        )
        db.add(tx)
        db.commit()
        db.refresh(wallet)
        return wallet

    @staticmethod
    def execute_trade(db: Session, user_id: int, symbol: str, market: str, action: str, quantity: float) -> Dict[str, Any]:
        wallet = WalletService.get_or_create_wallet(db, user_id)
        quote = StockService.get_stock_quote(symbol, market)
        price = quote["current_price"]
        order_value = price * quantity

        # Calculate current portfolio value for SEBI check
        holdings = db.query(Holding).filter(Holding.user_id == user_id).all()
        portfolio_val = sum(h.quantity * StockService.get_stock_quote(h.symbol, h.market)["current_price"] for h in holdings)

        # Evaluate SEBI Compliance Rules
        sebi_result = SEBIService.evaluate_order(symbol, market, action, order_value, portfolio_val, wallet.cash_balance)
        if sebi_result["violated"]:
            # Log SEBI violation
            log = SEBILog(
                user_id=user_id,
                symbol=symbol.upper(),
                rule_violated=sebi_result["rule_name"],
                message=sebi_result["message"]
            )
            db.add(log)
            db.commit()
            return {"success": False, "sebi_warning": sebi_result}

        # Execute Order
        if action.upper() == "BUY":
            wallet.cash_balance -= order_value
            # Update Holding
            holding = db.query(Holding).filter(Holding.user_id == user_id, Holding.symbol == symbol.upper()).first()
            if holding:
                total_qty = holding.quantity + quantity
                total_cost = (holding.quantity * holding.average_buy_price) + order_value
                holding.quantity = total_qty
                holding.average_buy_price = total_cost / total_qty
            else:
                holding = Holding(user_id=user_id, symbol=symbol.upper(), market=market, quantity=quantity, average_buy_price=price)
                db.add(holding)
        elif action.upper() == "SELL":
            holding = db.query(Holding).filter(Holding.user_id == user_id, Holding.symbol == symbol.upper()).first()
            if not holding or holding.quantity < quantity:
                return {"success": False, "error": f"Insufficient holding quantity to sell {symbol}."}
            
            wallet.cash_balance += order_value
            holding.quantity -= quantity
            if holding.quantity <= 0:
                db.delete(holding)

        # Create Transaction record
        tx = Transaction(
            user_id=user_id,
            symbol=symbol.upper(),
            market=market,
            type=action.upper(),
            quantity=quantity,
            price=price,
            total_amount=order_value
        )
        db.add(tx)
        db.commit()

        return {
            "success": True,
            "message": f"Successfully executed {action.upper()} order for {quantity} shares of {symbol.upper()} at {quote['currency']}{price}.",
            "remaining_cash": wallet.cash_balance
        }
