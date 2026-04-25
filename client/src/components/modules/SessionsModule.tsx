import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Session {
  name: string;
  timezone: string;
  utcOffset: number;
  openTime: string;
  closeTime: string;
  status: 'OPEN' | 'CLOSED' | 'PRE-MARKET';
  color: string;
}

export default function SessionsModule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessions, setSessions] = useState<Session[]>([
    {
      name: 'SYDNEY',
      timezone: 'AEDT',
      utcOffset: 11,
      openTime: '22:00',
      closeTime: '06:30',
      status: 'CLOSED',
      color: 'text-accent-warning',
    },
    {
      name: 'TOKYO',
      timezone: 'JST',
      utcOffset: 9,
      openTime: '08:00',
      closeTime: '16:30',
      status: 'CLOSED',
      color: 'text-accent-danger',
    },
    {
      name: 'LONDON',
      timezone: 'GMT',
      utcOffset: 0,
      openTime: '08:00',
      closeTime: '16:30',
      status: 'OPEN',
      color: 'text-accent-success',
    },
    {
      name: 'NEW YORK',
      timezone: 'EST',
      utcOffset: -5,
      openTime: '13:00',
      closeTime: '21:00',
      status: 'PRE-MARKET',
      color: 'text-accent-primary',
    },
  ]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate session status based on current time
  useEffect(() => {
    const utcHour = currentTime.getUTCHours();
    const utcMinute = currentTime.getUTCMinutes();
    const currentUTCTime = utcHour * 60 + utcMinute;

    const updatedSessions = sessions.map(session => {
      const [openHour, openMin] = session.openTime.split(':').map(Number);
      const [closeHour, closeMin] = session.closeTime.split(':').map(Number);
      
      const openTimeUTC = (openHour - session.utcOffset) * 60 + openMin;
      const closeTimeUTC = (closeHour - session.utcOffset) * 60 + closeMin;

      let status: 'OPEN' | 'CLOSED' | 'PRE-MARKET' = 'CLOSED';
      
      if (closeTimeUTC > openTimeUTC) {
        if (currentUTCTime >= openTimeUTC && currentUTCTime < closeTimeUTC) {
          status = 'OPEN';
        } else if (currentUTCTime >= closeTimeUTC - 60 && currentUTCTime < closeTimeUTC) {
          status = 'PRE-MARKET';
        }
      } else {
        if (currentUTCTime >= openTimeUTC || currentUTCTime < closeTimeUTC) {
          status = 'OPEN';
        }
      }

      return { ...session, status };
    });

    setSessions(updatedSessions);
  }, [currentTime]);

  const formatLocalTime = (session: Session) => {
    const localTime = new Date(currentTime.getTime() + session.utcOffset * 60 * 60 * 1000);
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-accent-success bg-opacity-20 text-accent-success';
      case 'PRE-MARKET':
        return 'bg-accent-primary bg-opacity-20 text-accent-primary';
      case 'CLOSED':
        return 'bg-accent-danger bg-opacity-20 text-accent-danger';
      default:
        return 'bg-accent-warning bg-opacity-20 text-accent-warning';
    }
  };

  const getTimeUntilOpen = (session: Session) => {
    const [openHour, openMin] = session.openTime.split(':').map(Number);
    const openTimeUTC = (openHour - session.utcOffset) * 60 + openMin;
    const utcHour = currentTime.getUTCHours();
    const utcMinute = currentTime.getUTCMinutes();
    const currentUTCTime = utcHour * 60 + utcMinute;

    let minutesUntilOpen = openTimeUTC - currentUTCTime;
    if (minutesUntilOpen < 0) minutesUntilOpen += 24 * 60;

    const hours = Math.floor(minutesUntilOpen / 60);
    const minutes = minutesUntilOpen % 60;

    return `Opens in ${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Session Monitor Card */}
      <div className="trading-card active">
        <div className="trading-header">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-accent-primary" />
            <h2 className="text-2xl font-bold text-accent-primary">SESSION MONITOR</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div key={session.name} className="p-4 rounded border border-border hover:border-accent-primary transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-text-primary">{session.name}</h3>
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider status-badge ${
                  session.status === 'OPEN' ? 'open' : session.status === 'CLOSED' ? 'closed' : 'warning'
                }`}>
                  {session.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="trading-label">Local Time ({session.timezone})</span>
                  <span className="font-mono text-text-primary">{formatLocalTime(session)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="trading-label">Session Hours</span>
                  <span className="font-mono text-text-secondary">{session.openTime} - {session.closeTime}</span>
                </div>

                <div className="flex justify-between">
                  <span className="trading-label">UTC Offset</span>
                  <span className="font-mono text-text-secondary">UTC{session.utcOffset >= 0 ? '+' : ''}{session.utcOffset}</span>
                </div>

                {session.status === 'CLOSED' && (
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="trading-label">Countdown</span>
                    <span className="font-mono text-accent-primary">{getTimeUntilOpen(session)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Events Card */}
      <div className="trading-card">
        <div className="trading-header">
          <h3 className="text-lg font-bold text-text-primary">MARKET EVENTS</h3>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded border-l-4 border-accent-primary bg-opacity-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text-primary text-sm">08:00 UTC - ECB INTEREST RATE DECISION</p>
                <p className="text-xs text-text-secondary mt-1">Forecast: 4.5% | Actual: 4.5%, No major deviation found.</p>
              </div>
              <span className="text-xs font-bold text-accent-primary uppercase tracking-wider">HIGH</span>
            </div>
          </div>

          <div className="p-3 rounded border-l-4 border-accent-danger bg-opacity-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text-primary text-sm">13:30 UTC - CORE RETAIL SALES M/M</p>
                <p className="text-xs text-text-secondary mt-1">High volatility expected for all USD pairs. High volatility expected for all USD pairs.</p>
              </div>
              <span className="text-xs font-bold text-accent-danger uppercase tracking-wider">CRITICAL</span>
            </div>
          </div>

          <div className="p-3 rounded border-l-4 border-accent-warning bg-opacity-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text-primary text-sm">14:00 UTC - FOMC MEETING MINUTES</p>
                <p className="text-xs text-text-secondary mt-1">Medium impact on USD pairs and risk sentiment.</p>
              </div>
              <span className="text-xs font-bold text-accent-warning uppercase tracking-wider">MEDIUM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Hours Info */}
      <div className="bg-accent-primary bg-opacity-10 border border-accent-primary rounded p-4">
        <p className="text-sm text-text-primary">
          <strong>💡 Trading Hours:</strong> The forex market operates 24/5 across four major sessions. 
          Overlaps between sessions (especially London-New York) typically see higher volatility and trading volume.
        </p>
      </div>
    </div>
  );
}
