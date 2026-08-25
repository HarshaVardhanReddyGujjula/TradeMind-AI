from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "trader"

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# Wallet & Deposit Schemas
class AddMoneyRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Amount to deposit in virtual wallet")

class WalletOut(BaseModel):
    cash_balance: float
    total_deposited: float
    updated_at: datetime
    class Config:
        from_attributes = True

# Order Execution Schema
class TradeOrderRequest(BaseModel):
    symbol: str
    market: str = "NSE" # 'NSE' or 'US'
    action: str # 'BUY' or 'SELL'
    quantity: float = Field(..., gt=0)

# SEBI Alert Schema
class SEBIWarningResponse(BaseModel):
    violated: bool
    rule_name: Optional[str] = None
    message: Optional[str] = None
    details: Optional[dict] = None

# Stock Data & Chart Schemas
class StockQuote(BaseModel):
    symbol: str
    name: str
    market: str
    currency: str
    current_price: float
    change: float
    percent_change: float
    day_high: float
    day_low: float
    volume: int
    rsi: float
    macd: float
    signal_line: float
    trend_7d: str # 'BULLISH' / 'BEARISH'
    trend_30d: str

class CandlePoint(BaseModel):
    time: str
    open: float
    high: float
    low: float
    close: float
    volume: float

# AI Signal Schema
class AISignalOut(BaseModel):
    symbol: str
    market: str
    action: str # 'BUY', 'SELL', 'HOLD'
    entry_price: float
    target_price: float
    stop_loss: float
    confidence_score: float
    rationale: str
    trap_risk_percent: float
    macro_score: float

class WhatIfRequest(BaseModel):
    symbol: str
    scenario: str # e.g., "What if RBI cuts interest rates by 0.25%?"

class WhatIfResponse(BaseModel):
    symbol: str
    scenario: str
    expected_impact: str # "+3.5% to +5.2%"
    confidence: float
    analysis: str
    affected_sectors: List[str]
