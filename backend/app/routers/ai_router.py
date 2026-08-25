from fastapi import APIRouter
from app.schemas import WhatIfRequest
from app.services.ai_service import AIService
from app.services.stock_service import StockService

router = APIRouter(prefix="/ai", tags=["AI Copilot & Simulator"])

@router.post("/what-if")
def simulate_scenario_post(req: WhatIfRequest):
    return StockService.simulate_what_if_scenario(req.scenario, req.symbol)

@router.get("/what-if")
def simulate_scenario_get(query: str, symbol: str = "INDIGO"):
    return StockService.simulate_what_if_scenario(query, symbol)

@router.get("/morning-briefing")
def get_morning_briefing():
    watchlists = ["INDIGO", "BSE", "CUPID", "NVDA"]
    transcript = AIService.generate_morning_briefing(watchlists)
    return {
        "title": "TradeMind 60-Second Market Briefing",
        "date": "Today",
        "audio_url": None,
        "transcript": transcript
    }
