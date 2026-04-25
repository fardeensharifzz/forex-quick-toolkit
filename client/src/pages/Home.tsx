import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ConverterModule from '@/components/modules/ConverterModule';
import CalculatorModule from '@/components/modules/CalculatorModule';
import SignalsModule from '@/components/modules/SignalsModule';
import JournalModule from '@/components/modules/JournalModule';
import SessionsModule from '@/components/modules/SessionsModule';

type ModuleType = 'converter' | 'calculator' | 'signals' | 'journal' | 'sessions';

/**
 * Forex Quick Toolkit - Main Trading Dashboard
 * 
 * Design: Professional Trading Terminal Aesthetic
 * - Dark mode with neon accents (blue, green, red, orange)
 * - Monospace fonts for data, sans-serif for UI
 * - Left sidebar navigation with persistent state
 * - Responsive grid layout for modules
 * - All data persisted to LocalStorage for offline capability
 */
export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>('converter');
  const [marketStatus, setMarketStatus] = useState('OPEN');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate market status
  useEffect(() => {
    const hour = new Date().getUTCHours();
    if (hour >= 21 || hour < 5) {
      setMarketStatus('CLOSED');
    } else {
      setMarketStatus('OPEN');
    }
  }, [currentTime]);

  const renderModule = () => {
    switch (activeModule) {
      case 'converter':
        return <ConverterModule />;
      case 'calculator':
        return <CalculatorModule />;
      case 'signals':
        return <SignalsModule />;
      case 'journal':
        return <JournalModule />;
      case 'sessions':
        return <SessionsModule />;
      default:
        return <ConverterModule />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header marketStatus={marketStatus} currentTime={currentTime} />

        {/* Module Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}
