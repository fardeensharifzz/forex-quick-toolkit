import { Bell, Globe } from 'lucide-react';

interface HeaderProps {
  marketStatus: string;
  currentTime: Date;
}

export default function Header({ marketStatus, currentTime }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  const statusColor = marketStatus === 'OPEN' 
    ? 'text-accent-success' 
    : 'text-accent-danger';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 md:px-8">
      {/* Left: Market Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Market Terminal
          </h2>
          <div className={`w-2 h-2 rounded-full ${statusColor === 'text-accent-success' ? 'bg-accent-success' : 'bg-accent-danger'} animate-pulse`}></div>
          <span className={`text-xs font-bold uppercase tracking-wider ${statusColor}`}>
            Live Market: {marketStatus}
          </span>
        </div>
      </div>

      {/* Center: Time and Date */}
      <div className="text-center">
        <div className="font-mono text-lg font-semibold text-text-primary">
          {formatTime(currentTime)} UTC
        </div>
        <div className="text-xs text-text-secondary">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Right: Quick Stats and Actions */}
      <div className="flex items-center gap-4">
        {/* Quick Stats Placeholder */}
        <div className="hidden md:flex items-center gap-3 text-right">
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Balance</div>
            <div className="font-mono text-sm font-semibold text-text-primary">
              $14,288.54
            </div>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Index</div>
            <div className="font-mono text-sm font-semibold text-accent-success">
              104.12 (+0.2%)
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <button className="p-2 hover:bg-opacity-50 rounded transition-colors text-text-secondary hover:text-accent-primary">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-opacity-50 rounded transition-colors text-text-secondary hover:text-accent-primary">
          <Globe className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
