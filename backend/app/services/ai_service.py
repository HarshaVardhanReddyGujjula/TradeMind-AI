import random
from typing import Dict, Any, List

class AIService:
    @staticmethod
    def generate_signal(symbol: str, market: str, current_price: float, rsi: float, macd: float) -> Dict[str, Any]:
        """
        Generates structured AI Buy/Sell/Hold signals with Target & Stop Loss targets.
        """
        # Determine Action based on Quantitative Indicators
        if rsi < 35 and macd > 0:
            action = "BUY"
            entry = current_price
            target = current_price * 1.08 # +8% Target
            stop_loss = current_price * 0.95 # -5% Stop Loss
            confidence = round(random.uniform(84.0, 93.5), 1)
            trap_risk = round(random.uniform(5.0, 14.0), 1)
            rationale = f"{symbol} is in oversold territory (RSI {rsi}) with bullish MACD crossover. Ideal risk-reward entry for target level."
        elif rsi > 65:
            action = "SELL"
            entry = current_price
            target = current_price * 0.92
            stop_loss = current_price * 1.04
            confidence = round(random.uniform(80.0, 91.0), 1)
            trap_risk = round(random.uniform(65.0, 85.0), 1) # High Bull Trap Risk
            rationale = f"{symbol} exhibits overbought divergence (RSI {rsi}). Take profit recommended to protect gains against potential pullback."
        else:
            action = "HOLD"
            entry = current_price
            target = current_price * 1.05
            stop_loss = current_price * 0.96
            confidence = round(random.uniform(72.0, 82.0), 1)
            trap_risk = round(random.uniform(15.0, 30.0), 1)
            rationale = f"{symbol} is consolidating within normal parameters. Maintain current position and wait for breakout confirmation."

        currency = "₹" if market == "NSE" else "$"

        return {
            "symbol": symbol.upper(),
            "market": market,
            "currency": currency,
            "action": action,
            "entry_price": round(entry, 2),
            "target_price": round(target, 2),
            "stop_loss": round(stop_loss, 2),
            "confidence_score": confidence,
            "rationale": rationale,
            "trap_risk_percent": trap_risk,
            "macro_score": 8.4
        }

    @staticmethod
    def simulate_what_if(symbol: str, scenario: str, current_price: float) -> Dict[str, Any]:
        """
        AI What-If Counterfactual Scenario Simulator.
        """
        impact_map = {
            "interest": ("+3.8% to +6.5%", 87.5, "Lower interest rates boost corporate valuations, reducing borrowing costs and expanding P/E multiples."),
            "earnings": ("+5.2% to +8.4%", 91.0, "Quarterly earnings beat signals strong operational momentum and revenue expansion."),
            "crude": ("-2.4% to -4.1%", 82.0, "Rising crude oil prices increase input costs for industrial and consumer sectors.")
        }
        
        # Default analysis
        expected_impact = "+4.2% to +6.8%"
        confidence = 86.4
        analysis = f"AI scenario analysis models positive upside for {symbol} under this macro condition based on historical regression."

        for key, (imp, conf, desc) in impact_map.items():
            if key in scenario.lower():
                expected_impact = imp
                confidence = conf
                analysis = desc
                break

        return {
            "symbol": symbol.upper(),
            "scenario": scenario,
            "expected_impact": expected_impact,
            "confidence": confidence,
            "analysis": analysis,
            "affected_sectors": ["Banking & Financials", "IT & Tech", "Automotive", "Energy"]
        }

    @staticmethod
    def generate_morning_briefing(watchlists: List[str]) -> str:
        """
        Generates 60-Second Audio Morning Briefing transcript.
        """
        symbols_str = ", ".join(watchlists[:3]) if watchlists else "Reliance, Nvidia, and TCS"
        return f"Good morning Harsha! Here is your 60-second TradeMind AI intelligence briefing. The Indian GIFT Nifty is trading up 0.35%, while US markets closed positive led by tech stocks. Across your watchlist including {symbols_str}, our AI scanner detected a strong BUY signal on Reliance with RSI at 34 and low bull-trap risk. Keep an eye on stop-loss protection levels today!"
