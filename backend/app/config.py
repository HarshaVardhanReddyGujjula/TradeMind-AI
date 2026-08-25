import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TradeMind AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Secret Key for JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "trademind-harsha-ceo-super-secret-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./trademind.db")
    
    # OpenAI / AI Key
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "demo_key")
    
    # SEBI Compliance Rules
    SEBI_MAX_POSITION_PERCENT: float = 25.0  # Max 25% of portfolio in single stock
    SEBI_CIRCUIT_LIMIT_PERCENT: float = 20.0 # Circuit limit alert
    
    class Config:
        case_sensitive = True

settings = Settings()
