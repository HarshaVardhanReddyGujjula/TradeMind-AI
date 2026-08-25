import urllib.request
import json

def test_full_platform():
    endpoints = [
        ("Backend Root API", "http://localhost:8000/"),
        ("Stock Quote INDIGO", "http://localhost:8000/api/v1/stocks/quote?symbol=INDIGO&market=NSE"),
        ("Stock Quote BSE", "http://localhost:8000/api/v1/stocks/quote?symbol=BSE&market=NSE"),
        ("Stock Quote CUPID", "http://localhost:8000/api/v1/stocks/quote?symbol=CUPID&market=NSE"),
        ("AI Signal Analysis", "http://localhost:8000/api/v1/signals/analyze?symbol=INDIGO&market=NSE"),
        ("AI Breakout Gems", "http://localhost:8000/api/v1/signals/gems"),
        ("News Intelligence Feed", "http://localhost:8000/api/v1/news/feed"),
        ("Wallet Balance", "http://localhost:8000/api/v1/wallet/balance"),
        ("Portfolio Holdings", "http://localhost:8000/api/v1/portfolio/holdings"),
        ("Frontend UI Dashboard", "http://localhost:3000/")
    ]

    print("===================================================")
    print("TESTING ALL TRADEMIND AI BUTTONS & ENDPOINTS...")
    print("===================================================")

    passed = 0
    for name, url in endpoints:
        try:
            req = urllib.request.urlopen(url, timeout=5)
            code = req.getcode()
            print(f"[OK] {name}: HTTP {code}")
            passed += 1
        except Exception as e:
            print(f"[FAIL] {name}: -> {e}")

    print("===================================================")
    print(f"SUMMARY: {passed}/{len(endpoints)} ENDPOINTS OPERATIONAL!")
    print("===================================================")

if __name__ == "__main__":
    test_full_platform()
