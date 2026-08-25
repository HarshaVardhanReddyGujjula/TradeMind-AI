# 🚀 TradeMind AI — Groww-Style AI Super App for Equities

> **Enterprise AI Trading & Investment Super App for Indian (NSE/BSE) & US (NASDAQ/NYSE) Markets**

![TradeMind AI Banner](https://img.shields.io/badge/TradeMind-AI--Engine-00D09C?style=for-the-badge&logo=react)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🌟 Key Features & Capabilities

### 📡 1. Real-Time Stock Price Streaming (`yfinance 1.6.0`)
* **Live Exchange Integration**: Real-time market tick fetching for **50 popular equities** (40 Indian NSE/BSE + 10 US NASDAQ Mega-Caps).
* **Live Price Ticker Ribbon**: Top streaming marquee for `INDIGO` (₹5,110.00), `BSE` (₹3,241.00), `CUPID` (₹284.58), `NVDA` ($214.72), `RELIANCE` (₹1,316.00), etc.
* **On-Demand Exchange Sync**: **`Sync Live Price`** button for instant sub-second quote refresh.

### 📈 2. Interactive SVG Candlestick & Line Chart Engine
* **Multiple Timeframe Trajectories**: Switch between **1D**, **1W**, **1M**, **3M**, **1Y**, and **5Y** timeframes.
* **Dynamic Curve & Candle Scaling**: SVG paths (`svgLineD`, `svgAreaD`) and Japanese Candlestick bodies/wicks recalculate pixel positioning dynamically for each timeframe.
* **Dual View Mode**: Toggle between **Japanese Candlesticks** and **Area Line Graph**.
* **Interactive Hover Inspector**: Real-time tooltip overlay displaying Open, High, Low, Close, and Volume details.

### 🧠 3. AI "What-If" Market Scenario Engine
* **Macroeconomic Simulation Engine**: Dynamic rule-based quantitative model analyzing inflation, interest rates, crude oil shifts, and geopolitical conflicts.
* **One-Click Presets**:
  * 🛢️ *"What if crude oil drops by 5%?"*
  * 🏦 *"What if RBI cuts interest rates by 25 bps?"*
  * 📈 *"What if Q1 earnings beat estimates by 15%?"*
  * ⚔️ *"What if Middle East geopolitical conflict escalates?"*
* **Ask Any Custom Question**: Responds with **Projected Impact** (`+5.4% to +8.2%`), **Recommended Action** (`STRONG BUY`), **AI Confidence Score** (`93.6%`), and macro rationale.

### 🎨 4. Appearance Theme Switcher (Light & Dark Mode)
* **One-Click Toggle**: **`☀️ Light Mode`** / **`🌙 Dark Mode`** theme switcher button.
* **Dynamic Palette Adaptation**: Smooth CSS transitions for backgrounds, cards, borders, text contrast, and chart elements.

### 📰 5. Stock-Specific News Intelligence Feed
* **Live News Feed**: Dynamically maps targeted financial stories when selecting any stock (e.g. Aviation news for IndiGo, exchange volumes for BSE, export orders for Cupid, AI chip demand for NVIDIA).

### 💰 6. Virtual Trading Wallet & Regulatory Compliance Guardrails
* **Separate Wallet Operations**: Dedicated **`+ Add Cash`** (deposit) and **`- Withdraw`** (bank transfer) modals.
* **SEBI Compliance Risk Guardrail**: Enforces SEBI Regulation 2024 single-stock 25% allocation caps to prevent retail overexposure.
* **Order Execution Drawer**: Intraday (MIS 5x) vs Delivery (CNC) modes with integrated stock dropdown selector.

---

## 🏗️ Project Architecture

```
trademind-ai/
├── backend/                  # Python FastAPI Microservice
│   ├── app/
│   │   ├── main.py           # FastAPI application entry point & CORS
│   │   ├── services/
│   │   │   └── stock_service.py # Real-time yfinance quotes & 50 stock DB
│   │   └── routers/
│   │       ├── ai_router.py   # AI What-If Scenario simulation endpoint
│   │       └── stocks_router.py
│   └── requirements.txt      # Python dependencies
│
└── frontend/                 # Next.js 14 App Router Frontend
    ├── src/
    │   └── app/
    │       ├── page.tsx      # Main Dashboard with Graphs, Theme & Wallet
    │       ├── layout.tsx    # Root HTML Layout
    │       └── globals.css   # Tailwind CSS directives
    ├── package.json
    └── tailwind.config.js
```

---

## ⚡ Quick Start Guide (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/HarshaVardhanReddyGujjula/trademind-ai.git
cd trademind-ai
```

### 2. Launch Backend (Python FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000
```
> API Docs will be available at: `http://localhost:8000/docs`

### 3. Launch Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev
```
> Frontend Dashboard will be live at: `http://localhost:3000`

---

## 🌐 Live Demo & Deployment Setup

### Deploying Frontend to Vercel (One-Click)
1. Push this repository to GitHub.
2. Import project to [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Deploy!

### Deploying Backend to Render / Railway
1. Import repository to [Render](https://render.com) or [Railway](https://railway.app).
2. Set **Root Directory** to `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

## 👤 Author & Admin
* **CEO & Lead Developer:** Harsha Vardhan Reddy Gujjula (`harsha@ceo.trademind.com`)
* **GitHub:** [@HarshaVardhanReddyGujjula](https://github.com/HarshaVardhanReddyGujjula)
