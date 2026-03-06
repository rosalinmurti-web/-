import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Smartphone, Gamepad2, Youtube, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { UsageStats } from '../types';

interface UsageTrackerProps {
  usage: UsageStats;
  onBack: () => void;
}

export const UsageTracker: React.FC<UsageTrackerProps> = ({ usage, onBack }) => {
  const usagePercent = Math.min((usage.totalMinutes / usage.limitMinutes) * 100, 100);
  const remaining = Math.max(usage.limitMinutes - usage.totalMinutes, 0);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'games': return <Gamepad2 size={18} />;
      case 'video': return <Youtube size={18} />;
      case 'learning': return <BookOpen size={18} />;
      default: return <Smartphone size={18} />;
    }
  };

  const getColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'games': return 'bg-amber-50 text-amber-500';
      case 'video': return 'bg-rose-50 text-rose-500';
      case 'learning': return 'bg-emerald-50 text-emerald-500';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center gap-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">使用时间</h1>
      </header>

      {/* Main Progress Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center space-y-6">
        <div className="relative w-48 h-48 mx-auto">
          {/* Simple Circular Progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={552.92}
              strokeDashoffset={552.92 * (1 - usagePercent / 100)}
              strokeLinecap="round"
              className="text-indigo-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-800">{usage.totalMinutes}</span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">分钟</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">每日限额</p>
            <p className="text-lg font-bold text-slate-800">{usage.limitMinutes}分</p>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">剩余时间</p>
            <p className="text-lg font-bold text-indigo-600">{remaining}分</p>
          </div>
        </div>

        <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
          调整每日限额
        </button>
      </div>

      {/* App Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-2">应用明细</h2>
        <div className="space-y-3">
          {usage.apps.map((app, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColor(app.name)}`}>
                  {getIcon(app.name)}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{app.name === 'Learning' ? '学习' : app.name === 'Video' ? '视频' : app.name === 'Games' ? '游戏' : app.name}</p>
                  <p className="text-xs text-slate-400">今日活跃</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">{app.minutes}分</p>
                <div className="w-20 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500" 
                    style={{ width: `${(app.minutes / usage.totalMinutes) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
        <AlertCircle className="text-amber-500 shrink-0" size={20} />
        <p className="text-sm text-amber-800 leading-relaxed">
          {remaining < 15 
            ? "屏幕时间限额即将用尽。设备将在 " + remaining + " 分钟后锁定。"
            : "今日使用时间在健康范围内。管理得很好！"}
        </p>
      </div>
    </div>
  );
};
