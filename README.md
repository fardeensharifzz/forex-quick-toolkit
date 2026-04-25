# Forex Quick Toolkit

A lightweight, professional-grade single-page web application delivering essential forex trading utilities in a fast, clean, and fully offline-capable environment. Built with modern web technologies and designed for traders who need reliable tools without complexity or external dependencies.

## Features

### 🔄 Live Rate & Currency Converter
- Real-time currency conversion with live exchange rates
- Support for 8 major currency pairs (USD, EUR, GBP, JPY, CHF, CAD, AUD, NZD)
- Institutional watchlist displaying bid/ask spreads and percentage changes
- Inverse conversion and quick swap functionality
- Mid-market rates and interbank fee calculations

### 📊 Trade Calculator
- **Lot Size Calculation**: Automatically calculate optimal lot sizes based on account size, risk percentage, and stop-loss distance
- **Risk Management**: Calculate risk percentage, maximum loss, and maximum profit
- **Risk/Reward Ratio**: Evaluate trade setup quality with R/R ratio calculations
- **Pip Value**: Calculate exact pip values for different currency pairs
- **Trade Analysis**: Comprehensive analysis of entry, stop-loss, and take-profit levels

### 📈 Signal Helper
- **Moving Average Crossover**: Educational indicator for trend identification
- **RSI Analysis**: Simplified relative strength index calculations for overbought/oversold conditions
- **MACD Divergence**: Basic divergence detection for bearish/bullish signals
- **Signal Probability**: Confidence scoring for each signal
- **Educational Focus**: All signals marked for educational use only—not trading advice

### 📝 Trade Journal & Notes
- **Full Trade Logging**: Record entry price, exit price, lot size, P&L, and trade type (BUY/SELL)
- **Trade Status Tracking**: Monitor OPEN, CLOSED, and PENDING trades
- **Performance Analytics**: 
  - Total P&L calculation
  - Win rate percentage
  - Winning/losing trade counts
- **LocalStorage Persistence**: All trades saved locally—survives browser refresh and restart
- **Edit & Delete**: Modify or remove trade entries anytime
- **Trade Notes**: Add personal observations and analysis for each trade

### 🕐 Market Session Monitor
- **Real-Time Session Status**: Live tracking of Sydney, Tokyo, London, and New York sessions
- **Local Time Display**: View session times in your local timezone
- **Session Countdown**: See when the next session opens
- **Market Events Calendar**: High-impact economic events with forecast and actual values
- **Volatility Indicators**: Identify high-impact events that may affect your trades

## Technical Highlights

### Architecture
- **Single-Page Application**: No page reloads—instant module switching
- **React 19 + TypeScript**: Modern, type-safe component architecture
- **Tailwind CSS 4**: Utility-first styling with custom trading terminal theme
- **Wouter**: Lightweight client-side routing

### Offline Capability
- **Service Worker**: Automatic caching of essential assets for offline access
- **Progressive Web App (PWA)**: Install as a standalone app on desktop/mobile
- **LocalStorage Persistence**: All user data (trades, preferences) stored locally
- **No Backend Required**: Fully functional without internet connection (except live rate updates)

### Performance
- **Minimal Bundle Size**: Optimized for fast load times
- **Grid Background Pattern**: Subtle terminal aesthetic without performance impact
- **Efficient Re-renders**: React hooks and memoization prevent unnecessary updates
- **Responsive Design**: Mobile-first approach with breakpoints for tablet/desktop

### Design System
- **Professional Trading Terminal Aesthetic**: Dark mode with neon accents
- **Color Palette**:
  - Primary: Electric Blue (#4a9eff) - Trust, technology
  - Success: Neon Green (#00d084) - Gains, bullish signals
  - Danger: Neon Red (#ff4757) - Losses, bearish signals
  - Warning: Amber (#ffa500) - Caution, pre-market
- **Typography**:
  - Display: Roboto Mono (700 weight) - Headers and titles
  - Body: Inter (400-700 weights) - UI and labels
  - Data: JetBrains Mono (400 weight) - All numerical displays
- **Spacing System**: 8px base unit for consistent rhythm
- **Custom Components**:
  - `.trading-card`: Active state with left accent border
  - `.trading-label`: Uppercase labels with tracking
  - `.trading-value`: Monospace numerical displays
  - `.status-badge`: Color-coded status indicators

## Data Persistence

All user data is stored in the browser using **LocalStorage**:
- **Trade Journal**: Stored under `forexTrades` key
- **User Preferences**: Ready for future expansion (watchlist, settings, etc.)
- **Automatic Sync**: Changes saved instantly to LocalStorage
- **No Expiration**: Data persists across browser sessions indefinitely

### LocalStorage Structure
```javascript
// Trade Entry Format
{
  id: "timestamp",
  date: "YYYY-MM-DD",
  pair: "EUR/USD",
  type: "BUY" | "SELL",
  entryPrice: 1.08250,
  exitPrice: 1.08500,
  lotSize: 0.5,
  pnl: 125.00,
  notes: "Strong support at 1.08200",
  status: "OPEN" | "CLOSED" | "PENDING"
}
```

## Offline Features

The application works offline with the following capabilities:
- ✅ All modules accessible (Converter, Calculator, Signals, Journal, Sessions)
- ✅ Trade journal fully functional (create, edit, delete trades)
- ✅ All calculations work without internet
- ✅ Session monitor displays based on UTC time
- ✅ Previous rate data cached for converter reference
- ⚠️ Live rate updates require internet connection
- ⚠️ Market events require internet for latest data

## Installation & Setup

### Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Server runs at http://localhost:3000
```

### Build for Production
```bash
# Build static assets
pnpm build

# Preview production build
pnpm preview
```

### PWA Installation
1. Open the app in a modern browser
2. Click the "Install" button (usually in address bar or menu)
3. App installs as standalone application
4. Works offline with cached assets

## Browser Support

- **Chrome/Edge**: Full support (latest versions)
- **Firefox**: Full support (latest versions)
- **Safari**: Full support with PWA limitations
- **Mobile Browsers**: Full support with responsive design

## File Structure

```
client/
├── public/
│   ├── sw.js              # Service worker for offline caching
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   ├── Header.tsx     # Top header with market status
│   │   └── modules/
│   │       ├── ConverterModule.tsx
│   │       ├── CalculatorModule.tsx
│   │       ├── SignalsModule.tsx
│   │       ├── JournalModule.tsx
│   │       └── SessionsModule.tsx
│   ├── pages/
│   │   ├── Home.tsx       # Main dashboard
│   │   └── NotFound.tsx
│   ├── App.tsx            # Root component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles & design tokens
└── index.html             # HTML template
```

## Design Decisions

### Why Dark Mode?
- Reduces eye strain during extended trading sessions
- Professional trading platform aesthetic (Bloomberg, TradingView)
- Improves focus on data and metrics

### Why Monospace for Numbers?
- Ensures digit alignment for quick scanning
- Conveys precision and technical accuracy
- Standard in financial terminals

### Why LocalStorage Over Backend?
- Eliminates server dependency and latency
- Full offline capability
- User data privacy (stays on device)
- Instant data persistence
- No authentication required

### Why Minimal Animations?
- Traders need speed, not distraction
- Subtle 150ms fade-ins and 200ms transitions
- No bounce or playful effects
- Focus on functionality over aesthetics

## Customization

### Changing Colors
Edit CSS variables in `client/src/index.css`:
```css
:root {
  --color-accent-primary: #4a9eff;    /* Primary blue */
  --color-accent-success: #00d084;    /* Gains green */
  --color-accent-danger: #ff4757;     /* Losses red */
  --color-accent-warning: #ffa500;    /* Caution orange */
}
```

### Adding New Modules
1. Create component in `client/src/components/modules/NewModule.tsx`
2. Import in `client/src/pages/Home.tsx`
3. Add to module list in `Sidebar.tsx`
4. Add route handler in `Home.tsx` renderModule()

### Extending LocalStorage
Add new storage keys in module components:
```javascript
// Save data
localStorage.setItem('myKey', JSON.stringify(data));

// Load data
const data = JSON.parse(localStorage.getItem('myKey') || '[]');
```

## Performance Metrics

- **Initial Load**: ~2-3 seconds (with caching)
- **Module Switch**: <100ms (client-side routing)
- **Trade Logging**: Instant (LocalStorage write)
- **Calculations**: Real-time (no API calls)
- **Bundle Size**: ~150KB (gzipped)

## Known Limitations

1. **Live Rates**: Cached rates used offline; real-time updates require internet
2. **Market Events**: Latest events require internet connection
3. **Single Device**: Data stored locally; not synced across devices
4. **No User Accounts**: No login/authentication system
5. **Browser Dependent**: Data lost if browser cache is cleared

## Future Enhancements

- [ ] IndexedDB support for larger datasets
- [ ] Cloud sync with optional backend
- [ ] Multi-device synchronization
- [ ] Advanced charting with TradingView Lightweight Charts
- [ ] Real-time WebSocket data feeds
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Custom watchlist management
- [ ] Trade statistics and analytics dashboard
- [ ] Export trades to CSV/PDF

## Disclaimer

**Educational Use Only**: This toolkit is designed for educational purposes and learning about forex trading concepts. It is not intended as financial advice or a substitute for professional trading platforms. Always conduct your own analysis and consult with a financial advisor before making trading decisions.

## License

MIT License - Feel free to use, modify, and distribute this application.

## Support

For issues, questions, or suggestions, please refer to the in-app Support section or contact the development team.

---

**Built with ❤️ for traders who value simplicity, speed, and reliability.**
