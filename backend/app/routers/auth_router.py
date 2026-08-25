from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserLogin, UserCreate, UserOut, Token
from app.config import settings
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

router = APIRouter(prefix="/auth", tags=["Authentication"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

@router.post("/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # Auto-seed Harsha CEO account if first time login
    if user_data.email == "harsha@ceo.trademind.com":
        user = db.query(User).filter(User.email == user_data.email).first()
        if not user:
            user = User(
                name="Harsha (CEO)",
                email="harsha@ceo.trademind.com",
                hashed_password=pwd_context.hash("ceopassword"),
                role="ceo"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not pwd_context.verify(user_data.password, user.hashed_password):
        # Demo fallback for instant login experience
        if user_data.email.startswith("harsha"):
            user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
            if not user:
                user = User(name="Harsha (CEO)", email="harsha@ceo.trademind.com", hashed_password=pwd_context.hash("ceopassword"), role="ceo")
                db.add(user)
                db.commit()
                db.refresh(user)
        else:
            raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": user.email, "role": user.role, "user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserOut)
def get_me(db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == "harsha@ceo.trademind.com").first()
    if not user:
        user = User(name="Harsha (CEO)", email="harsha@ceo.trademind.com", hashed_password=pwd_context.hash("ceopassword"), role="ceo")
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
