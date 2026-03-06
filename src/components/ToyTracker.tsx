import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, Plus, Clock, Battery, Wifi, ChevronRight } from 'lucide-react';
import { ToyUsage } from '../types';

interface ToyTrackerProps {
  toys: ToyUsage[];
  onBack: () => void;
}

export const ToyTracker: React.FC<ToyTrackerProps> = ({ toys, onBack }) => {
  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">玩具追踪</h1>
        </div>
        <button className="p-2 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-200">
          <Plus size={20} />
        </button>
      </header>

      {/* Active Toy Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold">智能机器人</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs flex items-center gap-1 text-indigo-100">
                <Battery size={12} className="text-emerald-400" />
                85%
              </span>
              <span className="text-xs flex items-center gap-1 text-indigo-100">
                <Wifi size={12} className="text-emerald-400" />
                已连接
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-100">今日使用</p>
            <p className="text-2xl font-black mt-1">45 分钟</p>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
            停止
          </button>
        </div>
      </div>

      {/* Toy List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-2">我的玩具库</h3>
        <div className="space-y-3">
          {toys.map(toy => (
            <div key={toy.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{toy.toyName}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    最后使用: {toy.lastUsed}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-indigo-600">{toy.minutes}m</p>
                <ChevronRight size={18} className="text-slate-200 inline-block ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
