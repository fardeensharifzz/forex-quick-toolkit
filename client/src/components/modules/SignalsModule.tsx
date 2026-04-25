import { useState } from 'react';
import { Radio, TrendingUp } from 'lucide-react';

interface Signal {
  pair: string;
  type: 'BULLISH' | 'BEARISH';
  indicator: string;
  probability: number;
  entry: number;
  stopLoss: number;
  target: number;
}

export default function SignalsModule() {
  const [signals] = useState<Signal[]>([
    {
      pair: 'EUR/USD',
      type: 'BEARISH',
      indicator: 'Moving Average Crossover (50/200)',
      probability: 72,
      entry: 1.08250,
      stopLoss: 1.08380,
      target: 1.07920,
    },
    {
      pair: 'GBP/USD',
      type: 'BULLISH',
      indicator: 'RSI Oversold (< 30)',
      probability: 65,
      entry: 1.26400,
      stopLoss: 1.26200,
      target: 1.26800,
    },
    {
      pair: 'USD/JPY',
      type: 'BEARISH',
      indicator: 'MACD Divergence',
      probability: 58,
      entry: 149.850,
      stopLoss: 150.100,
      target: 149.200,
    },
  ]);

  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(signals[0]);

  return (
    <div className="space-y-6">
      {/* Main Signal Card */}
      <div className="trading-card active">
        <div className="trading-header">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-accent-primary" />
            <h2 className="text-2xl font-bold text-accent-primary">SIGNAL HELPER</h2>
          </div>
          <span className="text-xs text-text-secondary">EDUCATIONAL USE ONLY</span>
        </div>

        {selectedSignal && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Signal Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold font-mono text-accent-primary">
                    {selectedSignal.pair}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {selectedSignal.indicator}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded font-bold uppercase tracking-wider text-sm ${
                  selectedSignal.type === 'BULLISH'
                    ? 'bg-accent-success bg-opacity-20 text-accent-success'
                    : 'bg-accent-danger bg-opacity-20 text-accent-danger'
                }`}>
                  {selectedSignal.type}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="trading-label">Signal Probability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-primary transition-all"
                        style={{ width: `${selectedSignal.probability}%` }}
                      ></div>
                    </div>
                    <span className="font-mono font-semibold text-text-primary">
                      {selectedSignal.probability}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="trading-label">Entry Point</span>
                  <span className="font-mono text-lg font-semibold text-text-primary">
                    {selectedSignal.entry.toFixed(5)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="trading-label">Stop Loss</span>
                  <span className="font-mono text-lg font-semibold text-accent-danger">
                    {selectedSignal.stopLoss.toFixed(5)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="trading-label">Target Price</span>
                  <span className="font-mono text-lg font-semibold text-accent-success">
                    {selectedSignal.target.toFixed(5)}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="trading-label">Risk/Reward</span>
                  <span className="font-mono font-semibold text-text-primary">
                    1:{(Math.abs(selectedSignal.target - selectedSignal.entry) / Math.abs(selectedSignal.entry - selectedSignal.stopLoss)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Indicator Info */}
            <div className="bg-opacity-50 p-4 rounded border border-border">
              <h4 className="trading-label mb-3">Technical Indicators</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-text-secondary mb-1">Moving Average Crossover</p>
                  <p className="text-text-primary">50 MA above 200 MA = Bullish</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-text-secondary mb-1">RSI (Relative Strength Index)</p>
                  <p className="text-text-primary">&lt; 30 = Oversold (Bullish)</p>
                  <p className="text-text-primary">&gt; 70 = Overbought (Bearish)</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-text-secondary mb-1">MACD Divergence</p>
                  <p className="text-text-primary">Price high but MACD low = Bearish</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signals List */}
      <div className="trading-card">
        <div className="trading-header">
          <h3 className="text-lg font-bold text-text-primary">HIGH IMPACT SIGNAL</h3>
        </div>

        <div className="space-y-2">
          {signals.map((signal, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSignal(signal)}
              className={`w-full p-4 rounded border transition-all text-left ${
                selectedSignal === signal
                  ? 'border-accent-primary bg-opacity-50'
                  : 'border-border hover:border-accent-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className={`w-5 h-5 ${
                    signal.type === 'BULLISH' ? 'text-accent-success' : 'text-accent-danger'
                  }`} />
                  <div>
                    <p className="font-mono font-semibold text-text-primary">{signal.pair}</p>
                    <p className="text-xs text-text-secondary">{signal.indicator}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold uppercase tracking-wider text-sm ${
                    signal.type === 'BULLISH' ? 'text-accent-success' : 'text-accent-danger'
                  }`}>
                    {signal.type}
                  </p>
                  <p className="text-xs text-text-secondary">{signal.probability}% Probability</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-accent-warning bg-opacity-10 border border-accent-warning rounded p-4">
        <p className="text-sm text-text-primary">
          <strong>⚠️ Educational Use Only:</strong> These signals are simplified technical indicators for educational purposes. 
          They should not be used as the sole basis for trading decisions. Always conduct your own analysis and consult with a financial advisor.
        </p>
      </div>
    </div>
  );
}
