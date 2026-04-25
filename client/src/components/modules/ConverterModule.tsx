import { useState, useEffect } from 'react';
import { ArrowRightLeft, RotateCw } from 'lucide-react';

interface WatchlistItem {
  pair: string;
  bid: number;
  ask: number;
  spread: number;
  change: number;
}

export default function ConverterModule() {
  const [amount, setAmount] = useState('10000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('9184.22');
  const [rate, setRate] = useState(0.91842);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { pair: 'EUR/USD', bid: 1.08245, ask: 1.08247, spread: 0.2, change: 0.12 },
    { pair: 'GBP/USD', bid: 1.26442, ask: 1.26445, spread: 0.3, change: -0.08 },
    { pair: 'USD/JPY', bid: 149.881, ask: 149.883, spread: 0.2, change: 0.44 },
  ]);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD'];

  // Simulate rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRate(prev => prev + (Math.random() - 0.5) * 0.0001);
      const newAmount = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(newAmount);
    }, 3000);
    return () => clearInterval(interval);
  }, [amount, rate]);

  const handleConvert = () => {
    const newAmount = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(newAmount);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setRate(1 / rate);
  };

  return (
    <div className="space-y-6">
      {/* Converter Card */}
      <div className="trading-card active">
        <div className="trading-header">
          <div>
            <h2 className="text-2xl font-bold text-accent-primary">LIVE RATE & CURRENCY CONVERTER</h2>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-semibold text-accent-primary hover:bg-opacity-50 rounded transition-colors">
              INVERSE
            </button>
            <button 
              onClick={() => handleConvert()}
              className="px-3 py-1 text-xs font-semibold text-accent-primary hover:bg-opacity-50 rounded transition-colors flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              REFRESH
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Input Section */}
          <div className="space-y-4">
            <div>
              <label className="trading-label">Amount to Convert</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-input border border-border rounded px-4 py-3 font-mono text-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
                <span className="text-text-secondary text-sm font-semibold">{fromCurrency}</span>
              </div>
            </div>

            <div>
              <label className="trading-label">From</label>
              <div className="mt-2 flex items-center gap-2">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="flex-1 bg-input border border-border rounded px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr} - {curr === 'USD' ? 'US Dollar' : curr === 'EUR' ? 'Euro' : curr}</option>
                  ))}
                </select>
                <button 
                  onClick={handleSwap}
                  className="p-3 bg-input border border-border rounded hover:bg-opacity-50 transition-colors text-accent-primary"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="trading-label">To</label>
              <div className="mt-2 flex items-center gap-2">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="flex-1 bg-input border border-border rounded px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr} - {curr === 'EUR' ? 'Euro' : curr}</option>
                  ))}
                </select>
                <span className="text-text-secondary text-sm font-semibold">{toCurrency}</span>
              </div>
            </div>

            <button 
              onClick={handleConvert}
              className="w-full py-3 bg-accent-primary text-background font-bold rounded hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
            >
              Execute Conversion
            </button>
          </div>

          {/* Right: Conversion Result */}
          <div className="flex flex-col justify-center space-y-4 bg-opacity-50 p-6 rounded border border-border">
            <div>
              <label className="trading-label">Market Conversion Rate</label>
              <div className="mt-3 text-5xl font-bold text-accent-primary font-mono">
                {convertedAmount}
              </div>
              <div className="mt-2 text-text-secondary text-sm">
                {toCurrency}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="trading-label">Mid-Market Rate</span>
                <span className="font-mono text-text-primary">1 USD = {rate.toFixed(5)} {toCurrency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="trading-label">Interbank Fee</span>
                <span className="font-mono text-accent-success">0.00% (Institutional)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="trading-label">Quote Valid For</span>
                <span className="font-mono text-text-secondary">08:22s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Watchlist */}
      <div className="trading-card">
        <div className="trading-header">
          <h3 className="text-lg font-bold text-text-primary">INSTITUTIONAL WATCHLIST</h3>
          <span className="text-xs text-text-secondary">REAL-TIME DATA STREAM</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 trading-label">Pair</th>
                <th className="text-right py-3 px-4 trading-label">Bid</th>
                <th className="text-right py-3 px-4 trading-label">Ask</th>
                <th className="text-right py-3 px-4 trading-label">Spread</th>
                <th className="text-right py-3 px-4 trading-label">Change %</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item.pair} className="border-b border-border hover:bg-opacity-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-accent-primary">{item.pair}</td>
                  <td className="py-3 px-4 text-right font-mono text-text-primary">{item.bid.toFixed(5)}</td>
                  <td className="py-3 px-4 text-right font-mono text-text-primary">{item.ask.toFixed(5)}</td>
                  <td className="py-3 px-4 text-right font-mono text-text-secondary">{item.spread.toFixed(1)}</td>
                  <td className={`py-3 px-4 text-right font-mono font-semibold ${item.change >= 0 ? 'text-accent-success' : 'text-accent-danger'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
