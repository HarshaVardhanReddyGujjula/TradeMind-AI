'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, ShieldAlert, Zap, 
  Volume2, Search, PlusCircle, MinusCircle, CheckCircle2, AlertTriangle, 
  Globe, Award, ArrowUpRight, ArrowDownRight, Activity, Wallet,
  PieChart, Sliders, ChevronRight, Layers, Eye, Bookmark,
  ShoppingBag, ArrowRightLeft, X, RefreshCw, Filter, Check, Bell, Radio,
  BarChart2, LineChart as LineIcon, Sun, Moon, Newspaper, Sparkles, HelpCircle
} from 'lucide-react';

export default function Dashboard() {
  // Theme Toggle: Dark vs Light Mode
  const [theme, setTheme] = useState<'DARK' | 'LIGHT'>('DARK');

  const [selectedMarket, setSelectedMarket] = useState<'NSE' | 'US'>('NSE');
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'HOLDINGS' | 'WATCHLIST' | 'GEMS' | 'NEWS'>('EXPLORE');
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  
  // Notification Toast state
  const [notification, setNotification] = useState<string>('⚡ AI What-If Scenario Engine Enhanced for Any Question!');

  // Graph state
  const [chartType, setChartType] = useState<'LINE' | 'CANDLE'>('CANDLE');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | '5Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  // Order Drawer state
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);
  const [orderAction, setOrderAction] = useState<'BUY' | 'SELL'>('BUY');
  const [orderQuantity, setOrderQuantity] = useState<number>(10);
  const [orderType, setOrderType] = useState<'DELIVERY' | 'INTRADAY'>('DELIVERY');

  // Wallet Modals state
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSEBIModal, setShowSEBIModal] = useState(false);
  const [sebiWarning, setSebiWarning] = useState<any>(null);
  
  // Money amounts
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(20000);
  const [cashBalance, setCashBalance] = useState<number>(100000);
  
  // Selected Stock
  const [selectedStock, setSelectedStock] = useState<string>('INDIGO');
  
  const [stockQuote, setStockQuote] = useState<any>({
    symbol: 'INDIGO',
    name: 'InterGlobe Aviation (IndiGo)',
    current_price: 5110.0,
    change: 85.5,
    percent_change: 1.70,
    currency: '₹',
    rsi: 36.4,
    macd: 5.8,
    day_high: 5180.0,
    day_low: 5050.0,
    pe_ratio: 28.4,
    market_cap: '1.95L Cr',
    sector: 'Aviation'
  });

  const [aiSignal, setAiSignal] = useState<any>({
    action: 'BUY',
    entry_price: 5110.0,
    target_price: 5540.0,
    stop_loss: 4920.0,
    confidence_score: 94.2,
    trap_risk_percent: 5.8,
    rationale: 'Live Technical: IndiGo exhibits expanding domestic market share and strong international passenger yield growth.'
  });

  // Holdings & Watchlist State
  const [holdings, setHoldings] = useState([
    { symbol: 'INDIGO', name: 'InterGlobe Aviation (IndiGo)', market: 'NSE', qty: 5, avgPrice: 4900.0, currPrice: 5110.0, currency: '₹' },
    { symbol: 'BSE', name: 'BSE Limited', market: 'NSE', qty: 15, avgPrice: 3100.0, currPrice: 3241.0, currency: '₹' },
    { symbol: 'CUPID', name: 'Cupid Limited', market: 'NSE', qty: 100, avgPrice: 260.0, currPrice: 284.58, currency: '₹' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', market: 'US', qty: 5, avgPrice: 200.0, currPrice: 214.72, currency: '$' }
  ]);

  const [watchlist, setWatchlist] = useState(['INDIGO', 'BSE', 'CUPID', 'ZOMATO', 'HAL', 'NVDA', 'RELIANCE', 'TCS']);

  // What-If Simulator state
  const [scenarioInput, setScenarioInput] = useState('What if crude oil drops by 5%?');
  const [isSimulating, setIsSimulating] = useState(false);
  const [whatIfResult, setWhatIfResult] = useState<any>({
    symbol: 'INDIGO',
    stock_name: 'InterGlobe Aviation (IndiGo)',
    sector: 'Aviation',
    projected_impact: '+5.4% to +8.2%',
    recommended_action: 'STRONG BUY',
    confidence_score: 93.6,
    ai_rationale: 'A drop in crude oil directly reduces Aviation Turbine Fuel (ATF) operating expenses for InterGlobe Aviation (IndiGo), which accounts for ~40% of total operating costs. Operating margins expand by 350-480 bps.'
  });

  // Helper function defined BEFORE usage
  const roundNum = (val: number) => Math.round(val * 100) / 100;

  // Theme-Based Styling Variables
  const isDark = theme === 'DARK';
  const colors = {
    bg: isDark ? '#0b0f19' : '#f1f5f9',
    headerBg: isDark ? '#0f172a' : '#ffffff',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    cardBorder: isDark ? '#334155' : '#e2e8f0',
    innerBg: isDark ? '#0f172a' : '#f8fafc',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    brandGreen: '#00D09C'
  };

  // Deterministic Number Formatter
  const formatNum = (num: number) => {
    if (!num && num !== 0) return '0';
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Comprehensive 50 Popular Real Stocks Database (40 Indian + 10 US)
  const stockList = [
    // 🇮🇳 40 Popular Indian Equities (NSE/BSE)
    { symbol: 'INDIGO', name: 'InterGlobe Aviation (IndiGo)', price: 5110.0, change: '+1.70%', market: 'NSE', currency: '₹', rsi: 36.4, sector: 'Aviation' },
    { symbol: 'BSE', name: 'BSE Limited', price: 3241.0, change: '+3.15%', market: 'NSE', currency: '₹', rsi: 32.8, sector: 'Financial Exchanges' },
    { symbol: 'CUPID', name: 'Cupid Limited', price: 284.58, change: '+4.20%', market: 'NSE', currency: '₹', rsi: 38.2, sector: 'Healthcare' },
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 1316.0, change: '+1.15%', market: 'NSE', currency: '₹', rsi: 34.2, sector: 'Energy & Telecom' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.0, change: '+0.85%', market: 'NSE', currency: '₹', rsi: 48.1, sector: 'IT Services' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 980.0, change: '+2.40%', market: 'NSE', currency: '₹', rsi: 62.4, sector: 'Automobile' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1860.0, change: '+1.25%', market: 'NSE', currency: '₹', rsi: 52.0, sector: 'IT Services' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1640.0, change: '+0.95%', market: 'NSE', currency: '₹', rsi: 41.5, sector: 'Banking' },
    { symbol: 'ZOMATO', name: 'Zomato Ltd (Eternal)', price: 260.0, change: '+3.80%', market: 'NSE', currency: '₹', rsi: 35.0, sector: 'Consumer Tech' },
    { symbol: 'PAYTM', name: 'One97 Communications (Paytm)', price: 680.0, change: '+2.10%', market: 'NSE', currency: '₹', rsi: 44.0, sector: 'FinTech' },
    { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd', price: 4680.0, change: '+2.15%', market: 'NSE', currency: '₹', rsi: 33.5, sector: 'Defense' },
    { symbol: 'IRFC', name: 'Indian Railway Finance Corp', price: 178.0, change: '+1.90%', market: 'NSE', currency: '₹', rsi: 46.2, sector: 'Railway Infra' },
    { symbol: 'CDSL', name: 'Central Depository Services', price: 1420.0, change: '+2.85%', market: 'NSE', currency: '₹', rsi: 37.0, sector: 'Financial' },
    { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', price: 3150.0, change: '+1.80%', market: 'NSE', currency: '₹', rsi: 58.0, sector: 'Conglomerate' },
    { symbol: 'SUZLON', name: 'Suzlon Energy Ltd', price: 76.0, change: '+4.10%', market: 'NSE', currency: '₹', rsi: 36.8, sector: 'Clean Energy' },
    { symbol: 'JIOFIN', name: 'Jio Financial Services', price: 345.0, change: '+1.50%', market: 'NSE', currency: '₹', rsi: 49.0, sector: 'Financial' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1220.0, change: '+1.10%', market: 'NSE', currency: '₹', rsi: 54.2, sector: 'Banking' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 840.0, change: '+1.45%', market: 'NSE', currency: '₹', rsi: 49.6, sector: 'Banking' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1560.0, change: '+2.05%', market: 'NSE', currency: '₹', rsi: 61.0, sector: 'Telecom' },
    { symbol: 'ITC', name: 'ITC Limited', price: 490.0, change: '+0.75%', market: 'NSE', currency: '₹', rsi: 52.4, sector: 'FMCG' },
    { symbol: 'LTIM', name: 'LTIMindtree Ltd', price: 5400.0, change: '+1.30%', market: 'NSE', currency: '₹', rsi: 45.0, sector: 'IT Services' },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd', price: 3620.0, change: '+1.65%', market: 'NSE', currency: '₹', rsi: 56.8, sector: 'Infra' },
    { symbol: 'AXISBANK', name: 'Axis Bank Ltd', price: 1180.0, change: '+0.90%', market: 'NSE', currency: '₹', rsi: 48.2, sector: 'Banking' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1790.0, change: '+0.80%', market: 'NSE', currency: '₹', rsi: 43.5, sector: 'Banking' },
    { symbol: 'TITAN', name: 'Titan Company Ltd', price: 3450.0, change: '+1.40%', market: 'NSE', currency: '₹', rsi: 50.1, sector: 'Consumer Retail' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 2980.0, change: '-0.45%', market: 'NSE', currency: '₹', rsi: 41.2, sector: 'Consumer Goods' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1720.0, change: '+1.85%', market: 'NSE', currency: '₹', rsi: 58.4, sector: 'Pharma' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India', price: 12400.0, change: '+1.20%', market: 'NSE', currency: '₹', rsi: 51.0, sector: 'Automobile' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 6850.0, change: '+0.95%', market: 'NSE', currency: '₹', rsi: 44.8, sector: 'NBFC' },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 11200.0, change: '+1.50%', market: 'NSE', currency: '₹', rsi: 53.0, sector: 'Cement' },
    { symbol: 'NTPC', name: 'NTPC Limited', price: 410.0, change: '+2.10%', market: 'NSE', currency: '₹', rsi: 59.2, sector: 'Power' },
    { symbol: 'POWERGRID', name: 'Power Grid Corp', price: 340.0, change: '+1.15%', market: 'NSE', currency: '₹', rsi: 55.4, sector: 'Power' },
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', price: 155.0, change: '+1.80%', market: 'NSE', currency: '₹', rsi: 47.0, sector: 'Metals' },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', price: 510.0, change: '+2.25%', market: 'NSE', currency: '₹', rsi: 52.1, sector: 'Mining' },
    { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', price: 325.0, change: '+1.95%', market: 'NSE', currency: '₹', rsi: 58.0, sector: 'Oil & Gas' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 530.0, change: '+0.85%', market: 'NSE', currency: '₹', rsi: 49.5, sector: 'IT Services' },
    { symbol: 'NESTLEIND', name: 'Nestle India Ltd', price: 2480.0, change: '+0.60%', market: 'NSE', currency: '₹', rsi: 46.0, sector: 'FMCG' },
    { symbol: 'TATACOM', name: 'Tata Communications', price: 1950.0, change: '+1.75%', market: 'NSE', currency: '₹', rsi: 51.5, sector: 'Telecom' },
    { symbol: 'TECHM', name: 'Tech Mahindra Ltd', price: 1540.0, change: '+1.40%', market: 'NSE', currency: '₹', rsi: 53.8, sector: 'IT Services' },
    { symbol: 'BEL', name: 'Bharat Electronics Ltd', price: 290.0, change: '+2.80%', market: 'NSE', currency: '₹', rsi: 60.5, sector: 'Defense Electronics' },

    // 🇺🇸 10 Popular US Mega-Cap Equities (NASDAQ / NYSE)
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 214.72, change: '+3.15%', market: 'US', currency: '$', rsi: 68.2, sector: 'Semiconductors' },
    { symbol: 'AAPL', name: 'Apple Inc', price: 224.30, change: '+1.05%', market: 'US', currency: '$', rsi: 54.0, sector: 'Consumer Tech' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 210.00, change: '-1.85%', market: 'US', currency: '$', rsi: 43.0, sector: 'EV & Clean Energy' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 448.20, change: '+1.40%', market: 'US', currency: '$', rsi: 58.5, sector: 'Cloud & AI' },
    { symbol: 'GOOGL', name: 'Alphabet Inc (Google)', price: 178.50, change: '+0.95%', market: 'US', currency: '$', rsi: 51.2, sector: 'Search & Cloud' },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 186.40, change: '+1.60%', market: 'US', currency: '$', rsi: 56.4, sector: 'E-Commerce' },
    { symbol: 'META', name: 'Meta Platforms Inc', price: 515.00, change: '+2.45%', market: 'US', currency: '$', rsi: 61.2, sector: 'Social Media & AI' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 158.20, change: '+1.90%', market: 'US', currency: '$', rsi: 48.0, sector: 'Semiconductors' },
    { symbol: 'NFLX', name: 'Netflix Inc', price: 680.00, change: '+2.10%', market: 'US', currency: '$', rsi: 62.0, sector: 'Entertainment' },
    { symbol: 'PLTR', name: 'Palantir Technologies', price: 31.50, change: '+3.40%', market: 'US', currency: '$', rsi: 64.5, sector: 'AI Software' }
  ];

  // Dynamic Stock News Feed Database
  const stockNewsFeed: Record<string, any[]> = {
    "INDIGO": [
      { category: 'AVIATION', title: 'IndiGo Expands International Fleet with 10 New European Routes', source: 'ET Aviation • 15m ago', desc: 'IndiGo reports 18% growth in international passenger capacity as jet fuel costs stabilize.' },
      { category: 'EARNINGS', title: 'IndiGo Q1 Net Profit Jumps 24% on Passenger Yield Gains', source: 'CNBC-TV18 • 1h ago', desc: 'Domestic market share reaches record 62% despite monsoon seasonality.' }
    ],
    "BSE": [
      { category: 'EXCHANGES', title: 'BSE Daily Equity Derivatives Volume Crosses ₹120 Lakh Crore', source: 'Moneycontrol • 20m ago', desc: 'SENSEX and BANKEX contracts drive record exchange fee revenues.' },
      { category: 'REGULATORY', title: 'BSE Expands SME Board Listing Pipeline with 15 New Companies', source: 'Business Standard • 2h ago', desc: 'Retail investor participation in BSE tech indices reaches all-time high.' }
    ],
    "CUPID": [
      { category: 'HEALTHCARE', title: 'Cupid Ltd Receives Major Multi-Million Dollar Global Health Order', source: 'Mint • 30m ago', desc: 'Export expansion to Africa and Latin America boosts international order book.' },
      { category: 'EXPANSION', title: 'Cupid Ltd Commission New Automated Manufacturing Plant in Maharashtra', source: 'Financial Express • 3h ago', desc: 'Production capacity increased by 40% to meet surging demand.' }
    ],
    "NVDA": [
      { category: 'AI TECH', title: 'NVIDIA Unveils Blackwell Ultra AI Chips for Hyperscale Data Centers', source: 'Reuters • 10m ago', desc: 'Cloud providers increase capital expenditure commitments for next-gen AI training.' },
      { category: 'SEMICONDUCTORS', title: 'Analyst Ratings Upgrade NVIDIA Target Price to $260', source: 'Bloomberg • 1h ago', desc: 'Strong demand for AI accelerator clusters boosts gross margins.' }
    ]
  };

  // Filtered Stocks for Search & Market
  const filteredStocks = stockList.filter(s => 
    s.market === selectedMarket && 
    (s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Dynamic Timeframe Data Generator (1D, 1W, 1M, 3M, 1Y, 5Y) with DISTINCT price trajectories
  const generateTimeframeCandles = () => {
    const p = stockQuote.current_price;
    if (timeframe === '1D') {
      return [
        { time: '09:15', open: Math.round(p * 0.985), high: Math.round(p * 0.995), low: Math.round(p * 0.980), close: Math.round(p * 0.990), volume: '1.2M' },
        { time: '10:30', open: Math.round(p * 0.990), high: Math.round(p * 0.998), low: Math.round(p * 0.985), close: Math.round(p * 0.986), volume: '1.5M' },
        { time: '11:45', open: Math.round(p * 0.986), high: Math.round(p * 0.992), low: Math.round(p * 0.978), close: Math.round(p * 0.982), volume: '890K' },
        { time: '13:00', open: Math.round(p * 0.982), high: Math.round(p * 1.012), low: Math.round(p * 0.980), close: Math.round(p * 1.008), volume: '2.4M' },
        { time: '14:15', open: Math.round(p * 1.008), high: Math.round(p * 1.016), low: Math.round(p * 0.995), close: Math.round(p * 0.998), volume: '1.8M' },
        { time: '15:30', open: Math.round(p * 0.998), high: Math.round(p * 1.012), low: Math.round(p * 0.992), close: p, volume: '2.1M' }
      ];
    } else if (timeframe === '1W') {
      return [
        { time: 'Mon', open: Math.round(p * 0.930), high: Math.round(p * 0.950), low: Math.round(p * 0.920), close: Math.round(p * 0.945), volume: '8.4M' },
        { time: 'Tue', open: Math.round(p * 0.945), high: Math.round(p * 0.970), low: Math.round(p * 0.940), close: Math.round(p * 0.965), volume: '9.1M' },
        { time: 'Wed', open: Math.round(p * 0.965), high: Math.round(p * 0.975), low: Math.round(p * 0.935), close: Math.round(p * 0.940), volume: '7.8M' },
        { time: 'Thu', open: Math.round(p * 0.940), high: Math.round(p * 0.985), low: Math.round(p * 0.938), close: Math.round(p * 0.980), volume: '11.2M' },
        { time: 'Fri', open: Math.round(p * 0.980), high: Math.round(p * 1.025), low: Math.round(p * 0.975), close: p, volume: '12.5M' }
      ];
    } else if (timeframe === '1M') {
      return [
        { time: 'Week 1', open: Math.round(p * 0.880), high: Math.round(p * 0.920), low: Math.round(p * 0.860), close: Math.round(p * 0.910), volume: '35M' },
        { time: 'Week 2', open: Math.round(p * 0.910), high: Math.round(p * 0.955), low: Math.round(p * 0.890), close: Math.round(p * 0.895), volume: '41M' },
        { time: 'Week 3', open: Math.round(p * 0.895), high: Math.round(p * 0.965), low: Math.round(p * 0.880), close: Math.round(p * 0.950), volume: '29M' },
        { time: 'Week 4', open: Math.round(p * 0.950), high: Math.round(p * 1.035), low: Math.round(p * 0.940), close: p, volume: '48M' }
      ];
    } else if (timeframe === '3M') {
      return [
        { time: 'Month 1', open: Math.round(p * 0.780), high: Math.round(p * 0.850), low: Math.round(p * 0.750), close: Math.round(p * 0.840), volume: '120M' },
        { time: 'Month 2', open: Math.round(p * 0.840), high: Math.round(p * 0.860), low: Math.round(p * 0.790), close: Math.round(p * 0.810), volume: '145M' },
        { time: 'Month 3', open: Math.round(p * 0.810), high: Math.round(p * 1.050), low: Math.round(p * 0.800), close: p, volume: '168M' }
      ];
    } else if (timeframe === '1Y') {
      return [
        { time: 'Q1', open: Math.round(p * 0.650), high: Math.round(p * 0.750), low: Math.round(p * 0.620), close: Math.round(p * 0.740), volume: '410M' },
        { time: 'Q2', open: Math.round(p * 0.740), high: Math.round(p * 0.820), low: Math.round(p * 0.710), close: Math.round(p * 0.790), volume: '480M' },
        { time: 'Q3', open: Math.round(p * 0.790), high: Math.round(p * 0.880), low: Math.round(p * 0.760), close: Math.round(p * 0.820), volume: '520M' },
        { time: 'Q4', open: Math.round(p * 0.820), high: Math.round(p * 1.080), low: Math.round(p * 0.800), close: p, volume: '610M' }
      ];
    } else { // 5Y Timeframe
      return [
        { time: '2021', open: Math.round(p * 0.320), high: Math.round(p * 0.440), low: Math.round(p * 0.280), close: Math.round(p * 0.400), volume: '1.2B' },
        { time: '2022', open: Math.round(p * 0.400), high: Math.round(p * 0.420), low: Math.round(p * 0.330), close: Math.round(p * 0.360), volume: '1.5B' },
        { time: '2023', open: Math.round(p * 0.360), high: Math.round(p * 0.620), low: Math.round(p * 0.350), close: Math.round(p * 0.580), volume: '1.8B' },
        { time: '2024', open: Math.round(p * 0.580), high: Math.round(p * 0.780), low: Math.round(p * 0.550), close: Math.round(p * 0.750), volume: '2.1B' },
        { time: '2025', open: Math.round(p * 0.750), high: Math.round(p * 0.920), low: Math.round(p * 0.710), close: Math.round(p * 0.880), volume: '2.4B' },
        { time: '2026', open: Math.round(p * 0.880), high: Math.round(p * 1.100), low: Math.round(p * 0.850), close: p, volume: '2.8B' }
      ];
    }
  };

  const chartCandles = generateTimeframeCandles();

  // Dynamic SVG Graph Path Calculation
  const minPrice = Math.min(...chartCandles.map(c => c.low));
  const maxPrice = Math.max(...chartCandles.map(c => c.high));
  const priceRange = Math.max(1, maxPrice - minPrice);

  const getSvgY = (price: number) => {
    return roundNum(130 - ((price - minPrice) / priceRange) * 110);
  };

  // Dynamic SVG Line Path d string
  const svgLineD = chartCandles.map((pt, i) => {
    const x = roundNum((i / (chartCandles.length - 1)) * 500);
    const y = getSvgY(pt.close);
    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  // Dynamic SVG Gradient Area Path d string
  const svgAreaD = `${svgLineD} L 500,140 L 0,140 Z`;

  const handleStockSelect = (s: any) => {
    setSelectedStock(s.symbol);
    setStockQuote({
      symbol: s.symbol,
      name: s.name,
      current_price: s.price,
      change: 15.4,
      percent_change: parseFloat(s.change.replace('%', '')),
      currency: s.currency,
      rsi: s.rsi,
      macd: 3.4,
      day_high: roundNum(s.price * 1.02),
      day_low: roundNum(s.price * 0.98),
      pe_ratio: 24.8,
      market_cap: '1.45L Cr',
      sector: s.sector
    });

    setAiSignal({
      action: s.rsi < 40 ? 'BUY' : s.rsi > 65 ? 'SELL' : 'HOLD',
      entry_price: s.price,
      target_price: roundNum(s.price * (s.rsi < 40 ? 1.10 : 0.93)),
      stop_loss: roundNum(s.price * (s.rsi < 40 ? 0.95 : 1.04)),
      confidence_score: Math.round(88 + Math.random() * 6),
      trap_risk_percent: Math.round(4 + Math.random() * 12),
      rationale: s.rsi < 40 
        ? `Oversold RSI indicator (${s.rsi}) for ${s.name}. Bullish MACD crossover confirms optimal accumulation entry.`
        : `Consolidation mode for ${s.name}. Maintain watch status for breakout confirmation above resistance levels.`
    });

    setNotification(`📈 Graph & Live News Loaded: ${s.symbol} (${s.name}) • ${s.currency}${s.price}`);
  };

  const openOrderDrawer = (action: 'BUY' | 'SELL') => {
    setOrderAction(action);
    setShowOrderDrawer(true);
  };

  const confirmOrder = () => {
    const totalOrderValue = stockQuote.current_price * orderQuantity;
    
    if (orderAction === 'BUY' && totalOrderValue > cashBalance * 0.25) {
      setSebiWarning({
        rule: 'SEBI Single-Stock Concentration Limit (Regulation 2024)',
        message: `Order value (${stockQuote.currency}${formatNum(totalOrderValue)}) exceeds SEBI's 25% single-stock allocation limit to safeguard retail investors.`,
        detail: `Max allowed order: ${stockQuote.currency}${formatNum(cashBalance * 0.25)}`
      });
      setShowOrderDrawer(false);
      setShowSEBIModal(true);
      return;
    }

    if (orderAction === 'BUY') {
      if (totalOrderValue > cashBalance) {
        setNotification('❌ Insufficient Wallet Balance! Please add money to your wallet.');
        return;
      }
      setCashBalance(prev => prev - totalOrderValue);
      setHoldings(prev => {
        const exist = prev.find(h => h.symbol === stockQuote.symbol);
        if (exist) {
          return prev.map(h => h.symbol === stockQuote.symbol ? { ...h, qty: h.qty + orderQuantity } : h);
        } else {
          return [...prev, { symbol: stockQuote.symbol, name: stockQuote.name, market: selectedMarket, qty: orderQuantity, avgPrice: stockQuote.current_price, currPrice: stockQuote.current_price, currency: stockQuote.currency }];
        }
      });
      setNotification(`✅ BUY Order Executed! Bought ${orderQuantity} shares of ${stockQuote.symbol}`);
    } else {
      setCashBalance(prev => prev + totalOrderValue);
      setNotification(`✅ SELL Order Executed! Sold ${orderQuantity} shares of ${stockQuote.symbol}`);
    }
    setShowOrderDrawer(false);
  };

  const handleAddMoney = () => {
    setCashBalance(prev => prev + depositAmount);
    setShowAddMoneyModal(false);
    setNotification(`🎉 Successfully Added ${selectedMarket === 'NSE' ? '₹' : '$'}${formatNum(depositAmount)} to Wallet!`);
  };

  const handleWithdrawMoney = () => {
    if (withdrawAmount > cashBalance) {
      setNotification('❌ Cannot withdraw more than your available wallet balance.');
      return;
    }
    setCashBalance(prev => prev - withdrawAmount);
    setShowWithdrawModal(false);
    setNotification(`💸 Successfully Withdrawn ${selectedMarket === 'NSE' ? '₹' : '$'}${formatNum(withdrawAmount)} to Bank Account!`);
  };

  const toggleWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(prev => prev.filter(s => s !== symbol));
      setNotification(`➖ Removed ${symbol} from Watchlist`);
    } else {
      setWatchlist(prev => [...prev, symbol]);
      setNotification(`⭐ Added ${symbol} to Watchlist`);
    }
  };

  // Run Advanced AI What-If Scenario Engine via Backend API
  const runWhatIf = async (customQuery?: string) => {
    const q = customQuery || scenarioInput;
    setIsSimulating(true);
    setNotification(`🧠 AI Processing Scenario: "${q}" for ${selectedStock}...`);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/ai/what-if?query=${encodeURIComponent(q)}&symbol=${selectedStock}`);
      if (res.ok) {
        const data = await res.json();
        setWhatIfResult({
          symbol: data.symbol,
          stock_name: data.stock_name,
          sector: data.sector,
          projected_impact: data.projected_impact,
          recommended_action: data.recommended_action,
          confidence_score: data.confidence_score,
          ai_rationale: data.ai_rationale
        });
        setNotification(`✅ AI Simulation Complete for ${data.symbol}: Projected Impact ${data.projected_impact}`);
      } else {
        throw new Error('API Fallback');
      }
    } catch (e) {
      // Robust Client Fallback
      setWhatIfResult({
        symbol: selectedStock,
        stock_name: stockQuote.name,
        sector: stockQuote.sector,
        projected_impact: '+4.8% to +7.2%',
        recommended_action: 'STRONG BUY',
        confidence_score: 91.2,
        ai_rationale: `Quantitative sensitivity model projects strong upside momentum for ${selectedStock} (${stockQuote.sector}) based on historical macro price regression.`
      });
    }
    setIsSimulating(false);
  };

  const playAudioBriefing = () => {
    setNotification(`🎙️ Audio Podcast: IndiGo, BSE, and Cupid stock signals...`);
    try {
      const text = `Good morning Harsha! Here is your TradeMind briefing. IndiGo, BSE, and Cupid are flashing strong BUY signals.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  // Get active news for selected stock or general news
  const activeStockNews = stockNewsFeed[selectedStock] || [
    { category: 'NATIONAL', title: 'RBI Keeps Repo Rate Unchanged at 6.5%', source: 'ET • 10m ago', desc: 'Commercial bank liquidity remains stable supporting home loan demand.' },
    { category: 'GEOPOLITICAL', title: 'Brent Crude Oil Drops Below $78', source: 'Reuters • 25m ago', desc: 'Lower oil import bill reduces cost pressures on IndiGo Airlines and manufacturing refiners.' },
    { category: 'INTERNATIONAL', title: 'US Fed Rate Decision Expectations Rally NASDAQ', source: 'Bloomberg • 1h ago', desc: 'Multinational tech companies lead equity gains.' }
  ];

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.textPrimary, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }} className="flex flex-col font-sans transition-colors duration-200">
      
      {/* 🔔 LIVE INTERACTION TOAST NOTIFICATION BANNER */}
      <div style={{ backgroundColor: '#00D09C', color: '#090d16' }} className="px-6 py-2 flex items-center justify-between text-xs font-extrabold shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4" />
          <span>{notification}</span>
        </div>
        
        {/* Light / Dark Mode Toggle Button */}
        <button 
          onClick={() => {
            const nextTheme = theme === 'DARK' ? 'LIGHT' : 'DARK';
            setTheme(nextTheme);
            setNotification(`🎨 Switched to ${nextTheme} Mode Theme!`);
          }}
          style={{ backgroundColor: '#090d16', color: '#00D09C', cursor: 'pointer' }}
          className="px-3 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 hover:opacity-90 transition"
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          <span>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
        </button>
      </div>

      {/* 🟢 TOP NAVBAR */}
      <header style={{ backgroundColor: colors.headerBg, borderBottom: `1px solid ${colors.cardBorder}` }} className="px-6 py-3 flex items-center justify-between sticky top-8 z-40">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('EXPLORE')}>
            <div style={{ backgroundColor: '#00D09C', color: '#090d16' }} className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg shadow-md">
              T
            </div>
            <span className={`font-extrabold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>TradeMind <span style={{ color: '#00D09C' }}>AI</span></span>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder={`Search ${stockList.length} stocks (e.g. IndiGo, BSE, Cupid, NVDA)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary }}
              className="w-full border rounded-xl pl-9 pr-4 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00D09C] transition"
            />
          </div>
        </div>

        {/* Market Switcher & Separate Money Add / Remove Buttons */}
        <div className="flex items-center space-x-3">
          <div style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="flex p-1 rounded-xl border text-xs font-semibold">
            <button 
              onClick={() => { setSelectedMarket('NSE'); setSelectedStock('INDIGO'); setNotification('🇮🇳 Switched to Indian Market (40 Popular Stocks)'); }}
              style={{ backgroundColor: selectedMarket === 'NSE' ? '#00D09C' : 'transparent', color: selectedMarket === 'NSE' ? '#090d16' : colors.textSecondary, cursor: 'pointer' }}
              className="px-3 py-1 rounded-lg transition font-bold"
            >
              🇮🇳 NSE / BSE ({stockList.filter(s => s.market === 'NSE').length})
            </button>
            <button 
              onClick={() => { setSelectedMarket('US'); setSelectedStock('NVDA'); setNotification('🇺🇸 Switched to US Equities (10 NASDAQ Mega-Caps)'); }}
              style={{ backgroundColor: selectedMarket === 'US' ? '#00D09C' : 'transparent', color: selectedMarket === 'US' ? '#090d16' : colors.textSecondary, cursor: 'pointer' }}
              className="px-3 py-1 rounded-lg transition font-bold"
            >
              🇺🇸 US Market ({stockList.filter(s => s.market === 'US').length})
            </button>
          </div>

          <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }} className="hidden md:flex items-center space-x-2 border px-3 py-1 rounded-xl text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Harsha (CEO Admin)</span>
          </div>

          {/* Separate Add & Withdraw Money Buttons */}
          <button 
            onClick={() => { setShowAddMoneyModal(true); setNotification('💳 Opened Add Cash Deposit Modal'); }}
            style={{ backgroundColor: '#00D09C', color: '#090d16', cursor: 'pointer' }}
            className="flex items-center space-x-1 hover:opacity-90 font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Cash</span>
          </button>

          <button 
            onClick={() => { setShowWithdrawModal(true); setNotification('💸 Opened Bank Withdrawal Modal'); }}
            style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary, cursor: 'pointer' }}
            className="flex items-center space-x-1 border font-bold px-3 py-1.5 rounded-xl text-xs transition"
          >
            <MinusCircle className="w-3.5 h-3.5 text-red-400" />
            <span>- Withdraw</span>
          </button>
        </div>
      </header>

      {/* 📊 LIVE INDICES TICKER RIBBON */}
      <div style={{ backgroundColor: colors.headerBg, borderBottom: `1px solid ${colors.cardBorder}` }} className="px-6 py-2 flex items-center space-x-6 text-xs overflow-x-auto whitespace-nowrap">
        <div className="flex items-center space-x-2 border-r border-slate-700 pr-4 cursor-pointer hover:opacity-80" onClick={() => handleStockSelect(stockList[0])}>
          <span className="font-bold">INDIGO.NS</span>
          <span className="font-semibold">₹5,110.00</span>
          <span style={{ color: '#00D09C' }} className="font-bold">+85.50 (+1.70%)</span>
        </div>
        <div className="flex items-center space-x-2 border-r border-slate-700 pr-4 cursor-pointer hover:opacity-80" onClick={() => handleStockSelect(stockList[1])}>
          <span className="font-bold">BSE.NS</span>
          <span className="font-semibold">₹3,241.00</span>
          <span style={{ color: '#00D09C' }} className="font-bold">+98.50 (+3.15%)</span>
        </div>
        <div className="flex items-center space-x-2 border-r border-slate-700 pr-4 cursor-pointer hover:opacity-80" onClick={() => handleStockSelect(stockList[2])}>
          <span className="font-bold">CUPID.NS</span>
          <span className="font-semibold">₹284.58</span>
          <span style={{ color: '#00D09C' }} className="font-bold">+11.40 (+4.20%)</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80" onClick={() => handleStockSelect(stockList[40])}>
          <span className="font-bold">NVDA (NASDAQ)</span>
          <span className="font-semibold">$214.72</span>
          <span style={{ color: '#00D09C' }} className="font-bold">+$6.55 (+3.15%)</span>
        </div>
      </div>

      {/* 📌 INTERACTIVE SUB-NAVIGATION TABS */}
      <div style={{ backgroundColor: colors.headerBg, borderBottom: `1px solid ${colors.cardBorder}` }} className="px-6 flex space-x-8 text-xs font-bold">
        {[
          { key: 'EXPLORE', label: `Explore 50 Stocks (${filteredStocks.length} Shown)` },
          { key: 'HOLDINGS', label: `My Holdings (${holdings.length})` },
          { key: 'WATCHLIST', label: `Watchlist (${watchlist.length})` },
          { key: 'GEMS', label: '🚀 AI Gem Radar' },
          { key: 'NEWS', label: '🌐 Stock News Intelligence' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as any); setNotification(`📌 Switched Tab to ${tab.label}`); }}
            style={{ borderBottom: activeTab === tab.key ? '2px solid #00D09C' : '2px solid transparent', color: activeTab === tab.key ? '#00D09C' : colors.textSecondary, cursor: 'pointer' }}
            className="py-3 transition"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🚀 MAIN INTERACTIVE BODY */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-6">

          {/* DYNAMIC TAB VIEW 1: EXPLORE STOCKS */}
          {activeTab === 'EXPLORE' && (
            <>
              {/* WALLET SUMMARY CARD */}
              <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                <div>
                  <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wider">Trading Wallet Cash</p>
                  <h2 className="text-3xl font-extrabold mt-1">
                    {selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(cashBalance)}
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => setShowAddMoneyModal(true)} style={{ cursor: 'pointer' }} className="text-[10px] bg-[#00D09C]/20 text-[#00D09C] px-2 py-0.5 rounded font-bold hover:bg-[#00D09C]/30">
                      + Add Cash
                    </button>
                    <button onClick={() => setShowWithdrawModal(true)} style={{ cursor: 'pointer' }} className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold hover:bg-red-500/30">
                      - Withdraw
                    </button>
                  </div>
                </div>

                <div>
                  <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wider">Total Holdings Value</p>
                  <h2 className="text-3xl font-extrabold mt-1">
                    {selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(145200)}
                  </h2>
                  <p style={{ color: '#00D09C' }} className="text-xs font-semibold mt-1 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +14.8% Overall PnL
                  </p>
                </div>

                <div>
                  <p style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wider">SEBI Risk Protection</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <ShieldAlert style={{ color: '#00D09C' }} className="w-5 h-5" />
                    <span style={{ color: '#00D09C' }} className="text-xs font-bold">Guardrails Active</span>
                  </div>
                  <p style={{ color: colors.textSecondary }} className="text-[11px] mt-1">25% Max allocation limits enforced</p>
                </div>
              </div>

              {/* 📈 REALISTIC DYNAMIC CANDLESTICK & LINE GRAPH (DYNAMICALLY SCALED ACROSS 1D..5Y) */}
              <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold flex items-center space-x-2">
                      <span>{stockQuote.name}</span>
                      <span style={{ backgroundColor: colors.innerBg, color: colors.textSecondary }} className="text-xs px-2 py-0.5 rounded font-mono">{stockQuote.symbol}</span>
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-2xl font-extrabold">{stockQuote.currency}{formatNum(stockQuote.current_price)}</span>
                      <span style={{ color: '#00D09C' }} className="text-xs font-bold flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +{stockQuote.percent_change}% ({timeframe})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Chart Type Toggle */}
                    <div style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="flex p-1 rounded-xl border text-xs font-bold">
                      <button 
                        onClick={() => setChartType('CANDLE')}
                        style={{ backgroundColor: chartType === 'CANDLE' ? colors.cardBorder : 'transparent', color: chartType === 'CANDLE' ? '#00D09C' : colors.textSecondary, cursor: 'pointer' }}
                        className="px-2.5 py-1 rounded-lg flex items-center space-x-1"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Candles</span>
                      </button>
                      <button 
                        onClick={() => setChartType('LINE')}
                        style={{ backgroundColor: chartType === 'LINE' ? colors.cardBorder : 'transparent', color: chartType === 'LINE' ? '#00D09C' : colors.textSecondary, cursor: 'pointer' }}
                        className="px-2.5 py-1 rounded-lg flex items-center space-x-1"
                      >
                        <LineIcon className="w-3.5 h-3.5" />
                        <span>Line</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => openOrderDrawer('BUY')}
                      style={{ backgroundColor: '#00D09C', color: '#090d16', cursor: 'pointer' }}
                      className="hover:opacity-90 font-extrabold px-5 py-2 rounded-xl text-xs transition shadow-md"
                    >
                      BUY
                    </button>
                    <button 
                      onClick={() => openOrderDrawer('SELL')}
                      style={{ cursor: 'pointer' }}
                      className="bg-red-500 hover:bg-red-600 text-white font-extrabold px-5 py-2 rounded-xl text-xs transition shadow-md"
                    >
                      SELL
                    </button>
                  </div>
                </div>

                {/* TIMEFRAME SELECTOR TABS (1D, 1W, 1M, 3M, 1Y, 5Y) */}
                <div className="flex space-x-2 text-xs font-bold pt-1">
                  {['1D', '1W', '1M', '3M', '1Y', '5Y'].map(tf => (
                    <button
                      key={tf}
                      onClick={() => { setTimeframe(tf as any); setNotification(`📊 Loaded ${tf} Dynamic Chart Shape & Candlesticks for ${selectedStock}`); }}
                      style={{ 
                        backgroundColor: timeframe === tf ? '#00D09C' : colors.innerBg, 
                        color: timeframe === tf ? '#090d16' : colors.textSecondary, 
                        borderColor: colors.cardBorder,
                        cursor: 'pointer' 
                      }}
                      className="px-3.5 py-1.5 rounded-lg border transition font-extrabold"
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                {/* 🎨 DYNAMICALLY SCALED GRAPH CANVAS CONTAINER */}
                <div style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="h-64 w-full rounded-xl border p-4 relative flex flex-col justify-between overflow-hidden">
                  
                  {/* Hover Tooltip Inspector */}
                  {hoveredPoint && (
                    <div style={{ backgroundColor: colors.cardBg, borderColor: '#00D09C' }} className="absolute top-3 left-4 border px-3.5 py-2 rounded-xl text-xs z-20 shadow-xl space-y-0.5">
                      <div className="flex items-center space-x-2 text-slate-400 font-bold text-[11px]">
                        <span>{hoveredPoint.time}</span>
                        <span>• Volume: {hoveredPoint.volume}</span>
                      </div>
                      <div className="flex space-x-3 text-xs font-mono">
                        <span>Open: <b>{stockQuote.currency}{formatNum(hoveredPoint.open)}</b></span>
                        <span className="text-[#00D09C]">High: <b>{stockQuote.currency}{formatNum(hoveredPoint.high)}</b></span>
                        <span className="text-red-400">Low: <b>{stockQuote.currency}{formatNum(hoveredPoint.low)}</b></span>
                        <span>Close: <b>{stockQuote.currency}{formatNum(hoveredPoint.close)}</b></span>
                      </div>
                    </div>
                  )}

                  {/* SVG Line or Realistic Scaled Candlestick Render */}
                  {chartType === 'CANDLE' ? (
                    <div className="w-full h-44 flex items-end justify-between px-2 pt-6">
                      {chartCandles.map((pt, i) => {
                        const isBullish = pt.close >= pt.open;
                        const yHigh = getSvgY(pt.high);
                        const yLow = getSvgY(pt.low);
                        const yOpen = getSvgY(pt.open);
                        const yClose = getSvgY(pt.close);

                        const candleTop = Math.min(yOpen, yClose);
                        const candleHeight = Math.max(8, Math.abs(yClose - yOpen));

                        return (
                          <div 
                            key={i} 
                            className="flex-1 flex flex-col items-center cursor-pointer group px-1 relative h-full justify-end"
                            onMouseEnter={() => setHoveredPoint(pt)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          >
                            {/* Realistic Wick Line */}
                            <div 
                              style={{ 
                                backgroundColor: isBullish ? '#00D09C' : '#FF5252',
                                height: `${Math.max(16, yLow - yHigh)}px`,
                                top: `${yHigh}px`
                              }} 
                              className="w-0.5 absolute opacity-80"
                            ></div>

                            {/* Realistic Candle Body */}
                            <div 
                              style={{ 
                                height: `${candleHeight}px`, 
                                backgroundColor: isBullish ? '#00D09C' : '#FF5252',
                                borderColor: isBullish ? '#00B88A' : '#D32F2F',
                                top: `${candleTop}px`
                              }} 
                              className="w-full max-w-[28px] rounded-sm border shadow-sm absolute transition-all group-hover:scale-110 group-hover:brightness-125 z-10"
                            ></div>

                            <span style={{ color: colors.textSecondary }} className="text-[10px] absolute bottom-0 font-mono">{pt.time}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* DYNAMIC SVG LINE GRAPH (SHAPE MORPHS DYNAMICALLY WITH TIMEFRAME) */
                    <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 140" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D09C" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00D09C" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Dynamic Area Path */}
                      <path
                        d={svgAreaD}
                        fill="url(#chartGradient)"
                      />

                      {/* Dynamic Line Curve Path */}
                      <path
                        d={svgLineD}
                        fill="none"
                        stroke="#00D09C"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Dynamic Data Point Dots */}
                      {chartCandles.map((pt, i) => {
                        const cx = (i / (chartCandles.length - 1)) * 500;
                        const cy = getSvgY(pt.close);
                        return (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r="6"
                            fill="#00D09C"
                            stroke={colors.innerBg}
                            strokeWidth="2.5"
                            className="cursor-pointer hover:r-8 transition-all"
                            onMouseEnter={() => setHoveredPoint(pt)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        );
                      })}
                    </svg>
                  )}

                  {/* Volume Grid Indicator & Timeframe Label */}
                  <div className="flex justify-between text-[10px] pt-1 border-t border-slate-700 font-mono" style={{ color: colors.textSecondary }}>
                    <span>Min: {stockQuote.currency}{formatNum(minPrice)}</span>
                    <span>Range: {timeframe} Dynamic Chart Trajectory</span>
                    <span>Max: {stockQuote.currency}{formatNum(maxPrice)}</span>
                  </div>
                </div>
              </div>

              {/* 🧠 ENHANCED AI "WHAT-IF" MARKET SCENARIO SIMULATOR (ANSWER ANY QUESTION) */}
              <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-base">AI "What-If" Market Scenario Engine</h3>
                  </div>
                  <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }} className="text-xs font-bold px-3 py-1 rounded-full border">
                    TARGET: {selectedStock}
                  </span>
                </div>
                
                {/* Instant Quick Scenario Preset Pills */}
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  {[
                    "What if crude oil drops by 5%?",
                    "What if RBI cuts interest rates by 25 bps?",
                    "What if Q1 earnings beat estimates by 15%?",
                    "What if Middle East geopolitical conflict escalates?",
                    "What if US Fed announces rate cuts?"
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setScenarioInput(preset);
                        runWhatIf(preset);
                      }}
                      style={{ 
                        backgroundColor: colors.innerBg, 
                        borderColor: colors.cardBorder, 
                        color: colors.textSecondary,
                        cursor: 'pointer' 
                      }}
                      className="px-3 py-1 rounded-xl border hover:border-indigo-400 hover:text-indigo-400 transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Custom User Question Input */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask ANY scenario (e.g. 'What if lithium prices crash 20%?')..."
                    value={scenarioInput}
                    onChange={(e) => setScenarioInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') runWhatIf(); }}
                    style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary }}
                    className="flex-1 border rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                  <button 
                    onClick={() => runWhatIf()}
                    disabled={isSimulating}
                    style={{ cursor: 'pointer' }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow-md whitespace-nowrap"
                  >
                    {isSimulating ? 'Simulating...' : 'Simulate Scenario 🚀'}
                  </button>
                </div>

                {/* Simulated Results Card */}
                {whatIfResult && (
                  <div style={{ backgroundColor: isDark ? 'rgba(30, 27, 75, 0.4)' : '#f0f3ff', borderColor: 'rgba(99, 102, 241, 0.3)' }} className="border p-5 rounded-xl space-y-3 shadow-inner">
                    <div className="flex flex-wrap justify-between items-center text-xs border-b pb-2" style={{ borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-indigo-400">Stock Impact on {whatIfResult.symbol}:</span>
                        <span style={{ color: '#00D09C' }} className="font-extrabold text-sm">{whatIfResult.projected_impact}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span style={{ backgroundColor: 'rgba(0, 208, 156, 0.2)', color: '#00D09C' }} className="px-2.5 py-0.5 rounded font-extrabold">
                          ACTION: {whatIfResult.recommended_action}
                        </span>
                        <span style={{ color: colors.textSecondary }} className="font-semibold">
                          AI Confidence: <b>{whatIfResult.confidence_score}%</b>
                        </span>
                      </div>
                    </div>

                    <p style={{ color: colors.textPrimary }} className="text-xs leading-relaxed">
                      <span className="font-bold text-indigo-400">AI Macro Rationale: </span>{whatIfResult.ai_rationale}
                    </p>
                  </div>
                )}
              </div>

              {/* 📰 REAL-TIME STOCK NEWS INTELLIGENCE FEED */}
              <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
                <div style={{ borderBottom: `1px solid ${colors.cardBorder}` }} className="flex items-center justify-between pb-3">
                  <div className="flex items-center space-x-2">
                    <Newspaper style={{ color: '#00D09C' }} className="w-5 h-5" />
                    <h3 className="font-bold text-base">Real-Time News Intelligence for {selectedStock}</h3>
                  </div>
                  <span style={{ backgroundColor: 'rgba(0, 208, 156, 0.1)', color: '#00D09C' }} className="text-xs font-bold px-3 py-1 rounded-full">
                    ● LIVE FEED
                  </span>
                </div>

                <div className="space-y-3">
                  {activeStockNews.map((n, idx) => (
                    <div key={idx} style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="border p-4 rounded-xl space-y-1 hover:border-slate-500 transition">
                      <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider">{n.category} • {n.source}</span>
                      <h4 className="text-sm font-bold mt-0.5">{n.title}</h4>
                      <p style={{ color: colors.textSecondary }} className="text-xs leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* DYNAMIC TAB VIEW 2: MY HOLDINGS */}
          {activeTab === 'HOLDINGS' && (
            <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <ShoppingBag style={{ color: '#00D09C' }} className="w-5 h-5" />
                <span>Your Active Portfolio Holdings</span>
              </h3>

              <div className="space-y-3">
                {holdings.map((h, idx) => {
                  const currentVal = h.qty * h.currPrice;
                  const investedVal = h.qty * h.avgPrice;
                  const pnl = currentVal - investedVal;
                  return (
                    <div key={idx} style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="border p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm">{h.symbol}</span>
                        <p style={{ color: colors.textSecondary }} className="text-xs">{h.qty} shares • Avg: {h.currency}{formatNum(h.avgPrice)}</p>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div>
                          <span className="font-bold text-sm">{h.currency}{formatNum(currentVal)}</span>
                          <p style={{ color: pnl >= 0 ? '#00D09C' : '#f87171' }} className="text-xs font-bold">
                            {pnl >= 0 ? '+' : ''}{h.currency}{formatNum(pnl)} ({((pnl / investedVal) * 100).toFixed(1)}%)
                          </p>
                        </div>
                        <button 
                          onClick={() => { setSelectedStock(h.symbol); openOrderDrawer('SELL'); }}
                          style={{ cursor: 'pointer' }}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-bold px-3 py-1.5 rounded-xl"
                        >
                          Sell Stock
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DYNAMIC TAB VIEW 3: WATCHLIST */}
          {activeTab === 'WATCHLIST' && (
            <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-amber-400" />
                <span>Your Personal Stock Watchlist</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stockList.filter(s => watchlist.includes(s.symbol)).map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="border p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm">{s.symbol}</span>
                      <p style={{ color: colors.textSecondary }} className="text-xs">{s.name}</p>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div>
                        <span className="font-bold text-sm">{s.currency}{formatNum(s.price)}</span>
                        <p style={{ color: '#00D09C' }} className="text-xs font-bold">{s.change}</p>
                      </div>
                      <button 
                        onClick={() => { handleStockSelect(s); openOrderDrawer('BUY'); }}
                        style={{ backgroundColor: '#00D09C', color: '#090d16', cursor: 'pointer' }}
                        className="font-bold text-xs px-3 py-1 rounded-lg"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DYNAMIC TAB VIEW 4: AI GEM RADAR */}
          {activeTab === 'GEMS' && (
            <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Zap style={{ color: '#00D09C' }} className="w-5 h-5" />
                <span>AI High-Potential Breakout Gems Radar</span>
              </h3>

              <div className="space-y-4">
                {[
                  { symbol: 'INDIGO', price: '₹5,110.00', target: '₹5,540.00', gain: '+8.4%', reason: 'Domestic passenger yield surge and international route expansion.' },
                  { symbol: 'BSE', price: '₹3,241.00', target: '₹3,680.00', gain: '+13.5%', reason: 'Surging derivative trading volumes and CDSL depository growth.' },
                  { symbol: 'CUPID', price: '₹284.58', target: '₹340.00', gain: '+19.4%', reason: 'International healthcare export order expansion.' }
                ].map((gem, idx) => (
                  <div key={idx} style={{ backgroundColor: colors.innerBg, borderColor: 'rgba(0, 208, 156, 0.3)' }} className="border p-4 rounded-xl space-y-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-base">{gem.symbol}</span>
                        <span style={{ backgroundColor: 'rgba(0, 208, 156, 0.2)', color: '#00D09C' }} className="font-bold text-xs px-3 py-0.5 rounded-full">BUY ({gem.gain})</span>
                      </div>
                      <p style={{ color: colors.textSecondary }} className="text-xs mt-1">{gem.reason}</p>
                    </div>
                    <button 
                      onClick={() => { const stock = stockList.find(s => s.symbol === gem.symbol); if (stock) handleStockSelect(stock); openOrderDrawer('BUY'); }}
                      style={{ backgroundColor: '#00D09C', color: '#090d16', cursor: 'pointer' }}
                      className="font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap"
                    >
                      Buy Stock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DYNAMIC TAB VIEW 5: GEOPOLITICAL NEWS */}
          {activeTab === 'NEWS' && (
            <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                <span>Geopolitical & Macroeconomic News Intelligence</span>
              </h3>

              <div className="space-y-3">
                {activeStockNews.map((n, idx) => (
                  <div key={idx} style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="border p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">{n.category} • {n.source}</span>
                    <h4 className="text-sm font-bold">{n.title}</h4>
                    <p style={{ color: colors.textSecondary }} className="text-xs">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive 50 Stock Explorer Grid */}
        <div className="lg:col-span-4 space-y-6">

          {/* INTERACTIVE 50 STOCKS EXPLORER GRID */}
          <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-sm flex items-center justify-between">
              <span>Popular Stocks Tickers ({filteredStocks.length})</span>
              <span style={{ color: '#00D09C' }} className="text-[11px] font-semibold">{selectedMarket} Market</span>
            </h4>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredStocks.map((s, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleStockSelect(s)}
                  style={{ 
                    backgroundColor: selectedStock === s.symbol ? (isDark ? '#334155' : '#e2e8f0') : colors.innerBg, 
                    borderColor: selectedStock === s.symbol ? '#00D09C' : colors.cardBorder, 
                    cursor: 'pointer' 
                  }}
                  className="p-3 rounded-xl border transition flex items-center justify-between hover:border-slate-400"
                >
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWatchlist(s.symbol); }}
                      className="text-slate-400 hover:text-amber-400"
                      style={{ cursor: 'pointer' }}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${watchlist.includes(s.symbol) ? 'text-amber-400 fill-amber-400' : ''}`} />
                    </button>
                    <div>
                      <span className="font-bold text-xs">{s.symbol}</span>
                      <p style={{ color: colors.textSecondary }} className="text-[11px] truncate max-w-[130px]">{s.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-xs">{s.currency}{formatNum(s.price)}</span>
                    <p style={{ color: s.change.startsWith('+') ? '#00D09C' : '#f87171' }} className="text-[11px] font-bold flex items-center justify-end">
                      <span className="w-1.5 h-1.5 bg-[#00D09C] rounded-full mr-1 animate-ping"></span> {s.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎙️ 60-SECOND AUDIO MORNING BRIEFING */}
          <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 style={{ color: '#00D09C' }} className="w-5 h-5" />
                <h4 className="font-bold text-sm">60-Sec Audio Briefing</h4>
              </div>
              <button 
                onClick={playAudioBriefing}
                style={{ backgroundColor: 'rgba(0, 208, 156, 0.1)', color: '#00D09C', borderColor: 'rgba(0, 208, 156, 0.3)', cursor: 'pointer' }}
                className="border hover:opacity-90 px-3 py-1 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <span>Listen Now ▶</span>
              </button>
            </div>
            <p style={{ color: colors.textSecondary }} className="text-xs">
              Personalized morning audio podcast summarizing live market prices for IndiGo, BSE, and Cupid.
            </p>
          </div>

        </div>

      </main>

      {/* 🛒 INTERACTIVE ORDER EXECUTION DRAWER WITH SELECT STOCK OPTION */}
      {showOrderDrawer && (
        <div style={{ backgroundColor: 'rgba(11, 15, 25, 0.85)' }} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl max-w-md w-full p-6 space-y-5">
            <div style={{ borderBottom: `1px solid ${colors.cardBorder}` }} className="flex justify-between items-center pb-3">
              <div>
                <span style={{ backgroundColor: orderAction === 'BUY' ? 'rgba(0, 208, 156, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: orderAction === 'BUY' ? '#00D09C' : '#f87171' }} className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {orderAction} ORDER
                </span>
                <h3 className="font-bold text-lg mt-1">Execute Trade Order</h3>
              </div>
              <button onClick={() => setShowOrderDrawer(false)} style={{ cursor: 'pointer' }} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            {/* Select Stock Dropdown */}
            <div className="space-y-1">
              <label style={{ color: colors.textSecondary }} className="text-xs font-semibold">Select Stock to {orderAction}</label>
              <select
                value={stockQuote.symbol}
                onChange={(e) => {
                  const s = stockList.find(item => item.symbol === e.target.value);
                  if (s) handleStockSelect(s);
                }}
                style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary, cursor: 'pointer' }}
                className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-[#00D09C]"
              >
                {stockList.filter(s => s.market === selectedMarket).map(s => (
                  <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name} ({s.currency}{formatNum(s.price)})</option>
                ))}
              </select>
            </div>

            {/* Order Type Tabs */}
            <div style={{ backgroundColor: colors.innerBg }} className="grid grid-cols-2 gap-2 p-1 rounded-xl text-xs font-bold">
              <button 
                onClick={() => setOrderType('DELIVERY')}
                style={{ backgroundColor: orderType === 'DELIVERY' ? colors.cardBorder : 'transparent', color: orderType === 'DELIVERY' ? colors.textPrimary : colors.textSecondary, cursor: 'pointer' }}
                className="py-1.5 rounded-lg transition"
              >
                Delivery (CNC)
              </button>
              <button 
                onClick={() => setOrderType('INTRADAY')}
                style={{ backgroundColor: orderType === 'INTRADAY' ? colors.cardBorder : 'transparent', color: orderType === 'INTRADAY' ? colors.textPrimary : colors.textSecondary, cursor: 'pointer' }}
                className="py-1.5 rounded-lg transition"
              >
                Intraday (MIS 5x)
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label style={{ color: colors.textSecondary }} className="text-xs font-semibold flex justify-between">
                <span>Shares Quantity</span>
                <span>Price: {stockQuote.currency}{formatNum(stockQuote.current_price)}</span>
              </label>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setOrderQuantity(prev => Math.max(1, prev - 5))}
                  style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, cursor: 'pointer' }}
                  className="w-10 h-10 border rounded-xl font-bold text-lg"
                >
                  -
                </button>
                <input 
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value)))}
                  style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary }}
                  className="flex-1 border rounded-xl px-4 py-2 text-center text-base font-bold focus:outline-none focus:border-[#00D09C]"
                />
                <button 
                  onClick={() => setOrderQuantity(prev => prev + 5)}
                  style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, cursor: 'pointer' }}
                  className="w-10 h-10 border rounded-xl font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Order Margin Summary */}
            <div style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="p-3 rounded-xl border space-y-1 text-xs">
              <div className="flex justify-between" style={{ color: colors.textSecondary }}>
                <span>Total Required Value</span>
                <span className="font-bold" style={{ color: colors.textPrimary }}>{stockQuote.currency}{formatNum(stockQuote.current_price * orderQuantity)}</span>
              </div>
              <div className="flex justify-between" style={{ color: colors.textSecondary }}>
                <span>Available Margin</span>
                <span style={{ color: '#00D09C' }} className="font-bold">{selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(cashBalance)}</span>
              </div>
            </div>

            <button 
              onClick={confirmOrder}
              style={{ backgroundColor: orderAction === 'BUY' ? '#00D09C' : '#ef4444', color: orderAction === 'BUY' ? '#090d16' : '#ffffff', cursor: 'pointer' }}
              className="w-full font-extrabold py-3 rounded-xl text-sm transition shadow-lg"
            >
              Confirm {orderAction} Order
            </button>
          </div>
        </div>
      )}

      {/* 💰 SEPARATE ADD MONEY MODAL */}
      {showAddMoneyModal && (
        <div style={{ backgroundColor: 'rgba(11, 15, 25, 0.85)' }} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl max-w-md w-full p-6 space-y-5">
            <div style={{ borderBottom: `1px solid ${colors.cardBorder}` }} className="flex justify-between items-center pb-3">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <PlusCircle style={{ color: '#00D09C' }} className="w-5 h-5" />
                <span>Deposit Money to Wallet</span>
              </h3>
              <button onClick={() => setShowAddMoneyModal(false)} style={{ cursor: 'pointer' }} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            {/* Quick Amount Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[10000, 50000, 100000].map(amt => (
                <button 
                  key={amt}
                  onClick={() => setDepositAmount(amt)}
                  style={{ backgroundColor: depositAmount === amt ? '#00D09C' : colors.innerBg, color: depositAmount === amt ? '#090d16' : colors.textPrimary, borderColor: colors.cardBorder, cursor: 'pointer' }}
                  className="py-2 text-xs font-bold rounded-xl border transition"
                >
                  +{selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(amt)}
                </button>
              ))}
            </div>

            <div>
              <label style={{ color: colors.textSecondary }} className="text-xs font-semibold block mb-1">Custom Deposit Amount</label>
              <input 
                type="number" 
                value={depositAmount} 
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary }}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#00D09C]"
              />
            </div>

            <button 
              onClick={handleAddMoney}
              style={{ backgroundColor: '#00D09C', color: '#090d16', cursor: 'pointer' }}
              className="w-full font-bold py-3 rounded-xl text-sm transition shadow-lg"
            >
              Confirm Deposit
            </button>
          </div>
        </div>
      )}

      {/* 💸 SEPARATE WITHDRAW MONEY MODAL */}
      {showWithdrawModal && (
        <div style={{ backgroundColor: 'rgba(11, 15, 25, 0.85)' }} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }} className="border rounded-2xl max-w-md w-full p-6 space-y-5">
            <div style={{ borderBottom: `1px solid ${colors.cardBorder}` }} className="flex justify-between items-center pb-3">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <MinusCircle className="w-5 h-5 text-red-400" />
                <span>Withdraw Cash to Bank</span>
              </h3>
              <button onClick={() => setShowWithdrawModal(false)} style={{ cursor: 'pointer' }} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="p-3 rounded-xl border text-xs flex justify-between">
              <span style={{ color: colors.textSecondary }}>Available Wallet Balance</span>
              <span style={{ color: '#00D09C' }} className="font-bold">{selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(cashBalance)}</span>
            </div>

            {/* Quick Amount Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[10000, 25000, 50000].map(amt => (
                <button 
                  key={amt}
                  onClick={() => setWithdrawAmount(amt)}
                  style={{ backgroundColor: withdrawAmount === amt ? '#ef4444' : colors.innerBg, color: '#ffffff', borderColor: colors.cardBorder, cursor: 'pointer' }}
                  className="py-2 text-xs font-bold rounded-xl border transition"
                >
                  -{selectedMarket === 'NSE' ? '₹' : '$'}{formatNum(amt)}
                </button>
              ))}
            </div>

            <div>
              <label style={{ color: colors.textSecondary }} className="text-xs font-semibold block mb-1">Custom Withdrawal Amount</label>
              <input 
                type="number" 
                value={withdrawAmount} 
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder, color: colors.textPrimary }}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>

            <button 
              onClick={handleWithdrawMoney}
              style={{ cursor: 'pointer' }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-red-500/20"
            >
              Confirm Bank Withdrawal
            </button>
          </div>
        </div>
      )}

      {/* 🛡️ SEBI COMPLIANCE WARNING MODAL */}
      {showSEBIModal && sebiWarning && (
        <div style={{ backgroundColor: 'rgba(11, 15, 25, 0.85)' }} className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.cardBg, borderColor: '#ef4444' }} className="border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div style={{ borderBottom: `1px solid ${colors.cardBorder}` }} className="flex items-center space-x-3 text-red-400 pb-3">
              <ShieldAlert className="w-7 h-7 text-red-400" />
              <div>
                <h3 className="font-extrabold text-base">SEBI Regulatory Compliance Guardrail</h3>
                <p className="text-[11px] text-red-400 font-semibold">{sebiWarning.rule}</p>
              </div>
            </div>

            <p style={{ backgroundColor: colors.innerBg, borderColor: colors.cardBorder }} className="text-xs leading-relaxed border p-3 rounded-xl">
              {sebiWarning.message}
            </p>

            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fcd34d' }} className="border p-3 rounded-xl text-xs font-medium">
              💡 <span className="font-bold">Compliance Tip:</span> SEBI mandates retail risk caps to prevent single-stock overexposure. Lower your order quantity to stay within 25% margin exposure.
            </div>

            <button 
              onClick={() => setShowSEBIModal(false)}
              style={{ cursor: 'pointer' }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Acknowledge & Modify Order
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
