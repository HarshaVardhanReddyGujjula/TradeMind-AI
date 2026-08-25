import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.sebi_service import SEBIService
from app.services.ai_service import AIService
from app.services.stock_service import StockService

def test_sebi_position_limit_violation():
    # Test SEBI 25% single stock position limit guardrail
    result = SEBIService.evaluate_order(
        symbol="RELIANCE",
        market="NSE",
        action="BUY",
        order_value=40000.0, # 40% of 100k
        current_portfolio_value=0.0,
        cash_balance=100000.0
    )
    assert result["violated"] is True
    assert "SEBI Single-Stock Exposure Limit" in result["rule_name"]

def test_sebi_normal_order_pass():
    # Test valid order within 25% allocation
    result = SEBIService.evaluate_order(
        symbol="RELIANCE",
        market="NSE",
        action="BUY",
        order_value=20000.0, # 20% of 100k
        current_portfolio_value=0.0,
        cash_balance=100000.0
    )
    assert result["violated"] is False

def test_ai_signal_generation():
    signal = AIService.generate_signal("RELIANCE", "NSE", 2850.0, 32.0, 4.5)
    assert signal["action"] in ["BUY", "SELL", "HOLD"]
    assert signal["entry_price"] > 0
    assert signal["target_price"] > signal["entry_price"]
    assert signal["stop_loss"] < signal["entry_price"]

def test_stock_quote_fetching():
    quote = StockService.get_stock_quote("RELIANCE", "NSE")
    assert quote["symbol"] == "RELIANCE"
    assert quote["currency"] == "₹"
    assert quote["current_price"] > 0
