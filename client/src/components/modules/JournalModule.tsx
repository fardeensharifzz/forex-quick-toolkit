import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Edit2 } from 'lucide-react';

interface TradeEntry {
  id: string;
  date: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
  pnl: number;
  notes: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
}

export default function JournalModule() {
  const [trades, setTrades] = useState<TradeEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TradeEntry>>({
    date: new Date().toISOString().split('T')[0],
    pair: 'EUR/USD',
    type: 'BUY',
    entryPrice: 0,
    exitPrice: 0,
    lotSize: 0.1,
    pnl: 0,
    notes: '',
    status: 'OPEN',
  });

  // Load trades from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem('forexTrades');
    if (stored) {
      try {
        setTrades(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load trades:', e);
      }
    }
  }, []);

  // Save trades to LocalStorage
  useEffect(() => {
    localStorage.setItem('forexTrades', JSON.stringify(trades));
  }, [trades]);

  const handleAddTrade = () => {
    if (editingId) {
      setTrades(trades.map(t => t.id === editingId ? { ...t, ...formData } as TradeEntry : t));
      setEditingId(null);
    } else {
      const newTrade: TradeEntry = {
        id: Date.now().toString(),
        date: formData.date || new Date().toISOString().split('T')[0],
        pair: formData.pair || 'EUR/USD',
        type: formData.type || 'BUY',
        entryPrice: formData.entryPrice || 0,
        exitPrice: formData.exitPrice || 0,
        lotSize: formData.lotSize || 0.1,
        pnl: formData.pnl || 0,
        notes: formData.notes || '',
        status: formData.status || 'OPEN',
      };
      setTrades([newTrade, ...trades]);
    }
    setFormData({
      date: new Date().toISOString().split('T')[0],
      pair: 'EUR/USD',
      type: 'BUY',
      entryPrice: 0,
      exitPrice: 0,
      lotSize: 0.1,
      pnl: 0,
      notes: '',
      status: 'OPEN',
    });
    setShowForm(false);
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  const handleEditTrade = (trade: TradeEntry) => {
    setFormData(trade);
    setEditingId(trade.id);
    setShowForm(true);
  };

  const calculatePnL = () => {
    if (formData.entryPrice && formData.exitPrice && formData.lotSize) {
      const pips = (formData.exitPrice - formData.entryPrice) * 10000;
      const pnl = pips * formData.lotSize * 10;
      setFormData({ ...formData, pnl });
    }
  };

  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winningTrades = trades.filter(t => t.pnl > 0).length;
  const losingTrades = trades.filter(t => t.pnl < 0).length;
  const winRate = trades.length > 0 ? ((winningTrades / trades.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="trading-card">
          <div className="trading-label">Total P&L</div>
          <div className={`text-2xl font-bold font-mono mt-2 ${totalPnL >= 0 ? 'text-accent-success' : 'text-accent-danger'}`}>
            ${totalPnL.toFixed(2)}
          </div>
        </div>
        <div className="trading-card">
          <div className="trading-label">Win Rate</div>
          <div className="text-2xl font-bold font-mono mt-2 text-accent-primary">
            {winRate}%
          </div>
        </div>
        <div className="trading-card">
          <div className="trading-label">Winning Trades</div>
          <div className="text-2xl font-bold font-mono mt-2 text-accent-success">
            {winningTrades}
          </div>
        </div>
        <div className="trading-card">
          <div className="trading-label">Losing Trades</div>
          <div className="text-2xl font-bold font-mono mt-2 text-accent-danger">
            {losingTrades}
          </div>
        </div>
      </div>

      {/* Journal Card */}
      <div className="trading-card active">
        <div className="trading-header">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent-primary" />
            <h2 className="text-2xl font-bold text-accent-primary">TRADE JOURNAL</h2>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                pair: 'EUR/USD',
                type: 'BUY',
                entryPrice: 0,
                exitPrice: 0,
                lotSize: 0.1,
                pnl: 0,
                notes: '',
                status: 'OPEN',
              });
            }}
            className="px-4 py-2 bg-accent-primary text-background font-bold rounded hover:opacity-90 transition-opacity flex items-center gap-2 text-sm uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>

        {showForm && (
          <div className="mb-6 p-4 bg-opacity-50 rounded border border-border space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="trading-label">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
              <div>
                <label className="trading-label">Pair</label>
                <input
                  type="text"
                  value={formData.pair}
                  onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
              <div>
                <label className="trading-label">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'BUY' | 'SELL' })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div>
                <label className="trading-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'OPEN' | 'CLOSED' | 'PENDING' })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
              <div>
                <label className="trading-label">Entry Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData({ ...formData, entryPrice: parseFloat(e.target.value) })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
              <div>
                <label className="trading-label">Exit Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={formData.exitPrice}
                  onChange={(e) => setFormData({ ...formData, exitPrice: parseFloat(e.target.value) })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
              <div>
                <label className="trading-label">Lot Size</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.lotSize}
                  onChange={(e) => setFormData({ ...formData, lotSize: parseFloat(e.target.value) })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
              <div>
                <label className="trading-label">P&L ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pnl}
                  onChange={(e) => setFormData({ ...formData, pnl: parseFloat(e.target.value) })}
                  className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                />
              </div>
            </div>
            <div>
              <label className="trading-label">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full mt-1 bg-input border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddTrade}
                className="flex-1 py-2 bg-accent-primary text-background font-bold rounded hover:opacity-90 transition-opacity text-sm uppercase"
              >
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="flex-1 py-2 bg-border text-text-primary font-bold rounded hover:opacity-90 transition-opacity text-sm uppercase"
              >
                Cancel
              </button>
              <button
                onClick={calculatePnL}
                className="flex-1 py-2 bg-accent-warning text-background font-bold rounded hover:opacity-90 transition-opacity text-sm uppercase"
              >
                Calculate P&L
              </button>
            </div>
          </div>
        )}

        {/* Trades List */}
        <div className="space-y-2">
          {trades.length === 0 ? (
            <p className="text-center text-text-secondary py-8">No trades recorded yet. Start by creating a new entry.</p>
          ) : (
            trades.map(trade => (
              <div key={trade.id} className="p-4 bg-opacity-50 rounded border border-border hover:border-accent-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-accent-primary">{trade.pair}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        trade.type === 'BUY' ? 'bg-accent-success bg-opacity-20 text-accent-success' : 'bg-accent-danger bg-opacity-20 text-accent-danger'
                      }`}>
                        {trade.type}
                      </span>
                      <span className="status-badge">{trade.status}</span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {trade.date} • Entry: {trade.entryPrice.toFixed(5)} • Exit: {trade.exitPrice.toFixed(5)} • Lot: {trade.lotSize}
                    </div>
                    {trade.notes && <p className="text-xs text-text-secondary mt-1">{trade.notes}</p>}
                  </div>
                  <div className="text-right mr-4">
                    <div className={`text-lg font-bold font-mono ${trade.pnl >= 0 ? 'text-accent-success' : 'text-accent-danger'}`}>
                      ${trade.pnl.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTrade(trade)}
                      className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTrade(trade.id)}
                      className="p-2 text-text-secondary hover:text-accent-danger transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
