import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function CalculatorModule() {
  const [accountSize, setAccountSize] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [entryPrice, setEntryPrice] = useState('1.08250');
  const [stopLoss, setStopLoss] = useState('1.08100');
  const [takeProfit, setTakeProfit] = useState('1.08500');
  const [pipValue, setPipValue] = useState('10');
  const [lotSize, setLotSize] = useState('0.50');

  const calculateLotSize = () => {
    const risk = (parseFloat(accountSize) * parseFloat(riskPercent)) / 100;
    const pips = Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss)) * 10000;
    const calculated = risk / (pips * parseFloat(pipValue));
    setLotSize(calculated.toFixed(2));
  };

  const calculateRisk = () => {
    const pips = Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss)) * 10000;
    const loss = pips * parseFloat(pipValue) * parseFloat(lotSize);
    const riskCalc = (loss / parseFloat(accountSize)) * 100;
    setRiskPercent(riskCalc.toFixed(2));
  };

  const calculateProfit = () => {
    const pips = Math.abs(parseFloat(takeProfit) - parseFloat(entryPrice)) * 10000;
    return (pips * parseFloat(pipValue) * parseFloat(lotSize)).toFixed(2);
  };

  const calculateLoss = () => {
    const pips = Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss)) * 10000;
    return (pips * parseFloat(pipValue) * parseFloat(lotSize)).toFixed(2);
  };

  const riskRewardRatio = (
    Math.abs(parseFloat(takeProfit) - parseFloat(entryPrice)) /
    Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss))
  ).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <div className="trading-card active">
        <div className="trading-header">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-accent-primary" />
            <h2 className="text-2xl font-bold text-accent-primary">TRADE CALCULATOR</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="trading-label">Account Size ($)</label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Risk Percentage (%)</label>
              <input
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Entry Price</label>
              <input
                type="number"
                step="0.00001"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Stop Loss Price</label>
              <input
                type="number"
                step="0.00001"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Take Profit Price</label>
              <input
                type="number"
                step="0.00001"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Pip Value ($)</label>
              <input
                type="number"
                value={pipValue}
                onChange={(e) => setPipValue(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div>
              <label className="trading-label">Lot Size</label>
              <input
                type="number"
                step="0.01"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                className="w-full mt-2 bg-input border border-border rounded px-4 py-3 font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={calculateLotSize}
                className="flex-1 py-3 bg-accent-primary text-background font-bold rounded hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
              >
                Calculate Lot Size
              </button>
              <button
                onClick={calculateRisk}
                className="flex-1 py-3 bg-accent-warning text-background font-bold rounded hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
              >
                Calculate Risk
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 bg-opacity-50 p-6 rounded border border-border">
            <div>
              <label className="trading-label">Maximum Loss</label>
              <div className="mt-2 text-3xl font-bold font-mono text-accent-danger">
                -${calculateLoss()}
              </div>
            </div>

            <div>
              <label className="trading-label">Maximum Profit</label>
              <div className="mt-2 text-3xl font-bold font-mono text-accent-success">
                +${calculateProfit()}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between">
                <span className="trading-label">Risk/Reward Ratio</span>
                <span className="font-mono text-lg font-semibold text-text-primary">1:{riskRewardRatio}</span>
              </div>

              <div className="flex justify-between">
                <span className="trading-label">Pips at Risk</span>
                <span className="font-mono text-text-primary">
                  {(Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss)) * 10000).toFixed(1)} pips
                </span>
              </div>

              <div className="flex justify-between">
                <span className="trading-label">Pips to Target</span>
                <span className="font-mono text-text-primary">
                  {(Math.abs(parseFloat(takeProfit) - parseFloat(entryPrice)) * 10000).toFixed(1)} pips
                </span>
              </div>

              <div className="flex justify-between">
                <span className="trading-label">Account Risk %</span>
                <span className={`font-mono font-semibold ${parseFloat(riskPercent) > 5 ? 'text-accent-danger' : 'text-accent-success'}`}>
                  {riskPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
