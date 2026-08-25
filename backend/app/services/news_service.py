from typing import List, Dict, Any
import datetime

class NewsService:
    @staticmethod
    def get_market_news() -> List[Dict[str, Any]]:
        return [
            {
                "id": 1,
                "category": "NATIONAL",
                "headline": "RBI Keeps Repo Rate Unchanged at 6.5%; Projects 7.2% GDP Growth",
                "source": "Economic Times",
                "timestamp": "10 mins ago",
                "sentiment": "BULLISH",
                "impact_score": 8.5,
                "summary": "Reserve Bank of India maintains steady policy rate stance supporting commercial bank liquidity and housing credit demand."
            },
            {
                "id": 2,
                "category": "GEOPOLITICAL",
                "headline": "Global Energy Markets Stabilization Effort Eases Brent Crude Prices Below $78",
                "source": "Reuters",
                "timestamp": "25 mins ago",
                "sentiment": "BULLISH",
                "impact_score": 7.8,
                "summary": "Lower crude oil import costs benefit Indian refiners and manufacturing industries, reducing inflation expectations."
            },
            {
                "id": 3,
                "category": "INTERNATIONAL",
                "headline": "US Fed Rate Decision Anticipation Triggers Tech Sector Rally on NASDAQ",
                "source": "Bloomberg",
                "timestamp": "1 hour ago",
                "sentiment": "BULLISH",
                "impact_score": 9.1,
                "summary": "Surging demand for AI hardware and cloud computing boosts sentiment across multinational technology equities."
            },
            {
                "id": 4,
                "category": "NATIONAL",
                "headline": "Indian IT Services Exports Record 12% YoY Surge Driven by Cloud AI Migration",
                "source": "Mint",
                "timestamp": "2 hours ago",
                "sentiment": "BULLISH",
                "impact_score": 8.2,
                "summary": "Major IT firms report expanding order books for enterprise generative AI and cloud infrastructure transformations."
            }
        ]
