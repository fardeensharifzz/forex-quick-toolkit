import { TrendingUp, Calculator, Radio, BookOpen, Clock, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: any) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const modules = [
    { id: 'converter', label: 'Converter', icon: TrendingUp },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'sessions', label: 'Sessions', icon: Clock },
  ];

  return (
    <aside className="w-60 bg-card border-r border-border flex flex-col overflow-hidden">
      {/* Logo / Branding */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-accent-primary tracking-tight">
          FX TOOLKIT
        </h1>
        <p className="text-xs text-text-secondary mt-1 uppercase tracking-widest">
          Institutional Terminal
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full px-6 py-3 flex items-center gap-3 text-left transition-all duration-150 border-l-3 ${
                isActive
                  ? 'border-l-accent-primary bg-opacity-50 text-accent-primary'
                  : 'border-l-transparent text-text-secondary hover:text-text-primary hover:bg-opacity-30'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{module.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-border p-4 space-y-2">
        <button className="w-full px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors rounded hover:bg-opacity-50">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors rounded hover:bg-opacity-50">
          <HelpCircle className="w-4 h-4" />
          <span>Support</span>
        </button>
      </div>

      {/* User Profile Placeholder */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-xs font-bold text-background">
            JM
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">J. MORGAN</p>
            <p className="text-xs text-text-secondary">PRO ACCOUNT</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
