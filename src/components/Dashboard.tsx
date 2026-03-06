import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  Lock, 
  Sparkles, 
  ChevronRight,
  Plus,
  Baby,
  Car,
  Gamepad2,
  Video
} from 'lucide-react';
import { ChildProfile, UsageStats, GrowthRecord } from '../types';

interface DashboardProps {
  child: ChildProfile;
  usage: UsageStats;
  latestGrowth: GrowthRecord | null;
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ child, usage, latestGrowth, onNavigate }) => {
  const usagePercent = Math.min((usage.totalMinutes / usage.limitMinutes) * 100, 100);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-2 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">你好，家长！</h1>
          <p className="text-slate-500 flex items-center gap-1">
            <Baby size={16} className="text-rose-400" />
            {child.name} 的仪表盘
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
          <Baby size={24} />
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('usage')}
          className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-3">
            <Clock size={20} />
          </div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">使用时间</span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800">{usage.totalMinutes}分</span>
            <span className="text-xs text-slate-400">/ {usage.limitMinutes}分</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full" 
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('growth')}
          className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
            <TrendingUp size={20} />
          </div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">成长记录</span>
          <div className="mt-1">
            <span className="text-xl font-bold text-slate-800">{latestGrowth?.weight || '--'} kg</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">最后记录: {latestGrowth ? new Date(latestGrowth.date).toLocaleDateString() : '无'}</p>
        </motion.button>
      </div>

      {/* New Feature Grid */}
      <div className="grid grid-cols-3 gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('car')}
          className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Car size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-600">车载连接</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('calendar')}
          className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-600">日程表</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('toys')}
          className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Gamepad2 size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-600">玩具追踪</span>
        </motion.button>
      </div>

      {/* Video Chat Banner */}
      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('video')}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 p-5 rounded-3xl flex items-center justify-between text-white shadow-lg shadow-emerald-100"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Video size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold">视频通话</h3>
            <p className="text-sm text-white/80">与孩子实时互动</p>
          </div>
        </div>
        <ChevronRight size={20} />
      </motion.button>

      {/* Child Lock Status */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('lock')}
        className="bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Lock size={24} className="text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold">儿童锁</h3>
            <p className="text-sm text-slate-400">已启用 • 访问受限</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-500" />
      </motion.div>

      {/* Recommendations Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-slate-800">每日贴士</h2>
          <button 
            onClick={() => onNavigate('tips')}
            className="text-sm font-medium text-rose-500"
          >
            查看全部
          </button>
        </div>
        
        <div className="bg-rose-50 p-5 rounded-3xl border border-rose-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">AI 建议</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">刺激感官游戏</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              尝试使用丝绸、羊毛和天鹅绒等不同质地的物品，帮助 {child.name} 探索触觉...
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Sparkles size={100} className="text-rose-500" />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg shadow-rose-200 flex items-center justify-center z-20">
        <Plus size={28} />
      </button>
    </div>
  );
};
