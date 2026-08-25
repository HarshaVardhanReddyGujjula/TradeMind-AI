import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="trader") # 'ceo' or 'trader'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    wallet = relationship("Wallet", back_populates="user", uselist=False)
    holdings = relationship("Holding", back_populates="user")
    watchlists = relationship("Watchlist", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")

class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cash_balance = Column(Float, default=0.0) # Virtual Cash
    total_deposited = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="wallet")

class Holding(Base):
    __tablename__ = "holdings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    symbol = Column(String, index=True) # e.g., RELIANCE.NS or AAPL
    market = Column(String, default="NSE") # NSE or US
    quantity = Column(Float, default=0.0)
    average_buy_price = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="holdings")

class Watchlist(Base):
    __tablename__ = "watchlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    symbol = Column(String, index=True)
    market = Column(String, default="NSE")
    added_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="watchlists")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    symbol = Column(String, index=True)
    market = Column(String, default="NSE")
    type = Column(String) # 'BUY' or 'SELL' or 'DEPOSIT'
    quantity = Column(Float, default=0.0)
    price = Column(Float, default=0.0)
    total_amount = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="transactions")

class Signal(Base):
    __tablename__ = "signals"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    market = Column(String, default="NSE")
    action = Column(String) # 'BUY', 'SELL', 'HOLD'
    entry_price = Column(Float)
    target_price = Column(Float)
    stop_loss = Column(Float)
    confidence_score = Column(Float) # e.g. 88.5%
    rationale = Column(Text)
    trap_risk_percent = Column(Float, default=15.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SEBILog(Base):
    __tablename__ = "sebi_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    symbol = Column(String)
    rule_violated = Column(String) # e.g. 'SEBI Position Limit Exceeded (>25%)'
    message = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
