from fastapi import APIRouter
from app.services.news_service import NewsService

router = APIRouter(prefix="/news", tags=["Geopolitical & Market News"])

@router.get("/feed")
def get_news_feed():
    return NewsService.get_market_news()
