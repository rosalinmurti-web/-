import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  TrendingUp, 
  Clock, 
  Lock, 
  Sparkles,
  Users,
  Video
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { GrowthTracker } from './components/GrowthTracker';
import { UsageTracker } from './components/UsageTracker';
import { ChildLock } from './components/ChildLock';
import { Recommendations } from './components/Recommendations';
import { Login } from './components/Login';
import { UserManagement } from './components/UserManagement';
import { CarConnect } from './components/CarConnect';
import { CalendarView } from './components/CalendarView';
import { ToyTracker } from './components/ToyTracker';
import { VideoChat } from './components/VideoChat';
import { ChildProfile, UsageStats, GrowthRecord, User, CarStatus, CalendarEvent, ToyUsage } from './types';

const MOCK_CHILD: ChildProfile = {
  id: '1',
  name: '小乐',
  birthDate: '2024-06-15',
  gender: 'boy',
  bloodType: 'A',
  allergies: ['花生']
};

const MOCK_USAGE: UsageStats = {
  totalMinutes: 42,
  limitMinutes: 60,
  apps: [
    { name: 'Learning', minutes: 25, icon: 'book' },
    { name: 'Video', minutes: 12, icon: 'video' },
    { name: 'Games', minutes: 5, icon: 'game' }
  ]
};

const MOCK_GROWTH: GrowthRecord[] = [
  { id: '1', date: '2024-12-15', height: 68, weight: 7.5 },
  { id: '2', date: '2025-01-15', height: 70, weight: 8.2 },
  { id: '3', date: '2025-02-15', height: 72, weight: 8.8 },
  { id: '4', date: '2025-03-05', height: 73, weight: 9.1 }
];

const MOCK_USERS: User[] = [
  { id: '2', name: '李女士', role: 'guardian' }
];

const MOCK_CAR: CarStatus = {
  connected: true,
  model: 'Tesla Model Y',
  location: '上海市浦东新区',
  temperature: 22,
  childInCar: true
};

const MOCK_CALENDAR: CalendarEvent[] = [
  { id: '1', date: '2026-03-12', title: '疫苗接种', type: 'medical' },
  { id: '2', date: '2026-03-20', title: '早教课程', type: 'education' }
];

const MOCK_TOYS: ToyUsage[] = [
  { id: '1', toyName: '乐高积木', minutes: 120, lastUsed: '昨天', icon: 'puzzle' },
  { id: '2', toyName: '绘本阅读器', minutes: 45, lastUsed: '今天', icon: 'book' }
];

type View = 'login' | 'dashboard' | 'growth' | 'usage' | 'lock' | 'tips' | 'users' | 'car' | 'calendar' | 'toys' | 'video';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    if (!user && currentView !== 'login') {
      setCurrentView('login');
      return <Login onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard 
            child={MOCK_CHILD} 
            usage={MOCK_USAGE} 
            latestGrowth={MOCK_GROWTH[MOCK_GROWTH.length - 1]} 
            onNavigate={(view) => setCurrentView(view as View)}
          />
        );
      case 'growth':
        return <GrowthTracker records={MOCK_GROWTH} onBack={() => setCurrentView('dashboard')} />;
      case 'usage':
        return <UsageTracker usage={MOCK_USAGE} onBack={() => setCurrentView('dashboard')} />;
      case 'lock':
        return <ChildLock onBack={() => setCurrentView('dashboard')} />;
      case 'tips':
        return <Recommendations child={MOCK_CHILD} onBack={() => setCurrentView('dashboard')} />;
      case 'users':
        return <UserManagement users={MOCK_USERS} onBack={() => setCurrentView('dashboard')} />;
      case 'car':
        return <CarConnect status={MOCK_CAR} onBack={() => setCurrentView('dashboard')} />;
      case 'calendar':
        return <CalendarView events={MOCK_CALENDAR} onBack={() => setCurrentView('dashboard')} />;
      case 'toys':
        return <ToyTracker toys={MOCK_TOYS} onBack={() => setCurrentView('dashboard')} />;
      case 'video':
        return <VideoChat onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard child={MOCK_CHILD} usage={MOCK_USAGE} latestGrowth={MOCK_GROWTH[MOCK_GROWTH.length - 1]} onNavigate={(view) => setCurrentView(view as View)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100">
      <div className="max-w-md mx-auto px-6 pt-4 min-h-screen flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        {user && currentView !== 'video' && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 z-50">
            <div className="max-w-md mx-auto flex items-center justify-between">
              <NavButton 
                active={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')} 
                icon={<Home size={22} />} 
                label="首页" 
              />
              <NavButton 
                active={currentView === 'growth'} 
                onClick={() => setCurrentView('growth')} 
                icon={<TrendingUp size={22} />} 
                label="成长" 
              />
              <NavButton 
                active={false} 
                onClick={() => setCurrentView('video')} 
                icon={<Video size={22} />} 
                label="通话" 
              />
              <NavButton 
                active={currentView === 'tips'} 
                onClick={() => setCurrentView('tips')} 
                icon={<Sparkles size={22} />} 
                label="贴士" 
              />
              <NavButton 
                active={currentView === 'users'} 
                onClick={() => setCurrentView('users')} 
                icon={<Users size={22} />} 
                label="成员" 
              />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-rose-500' : 'text-slate-400'}`}
    >
      <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-rose-50' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
