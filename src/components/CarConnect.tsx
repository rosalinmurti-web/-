import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Car, MapPin, Thermometer, ShieldCheck, Power, Navigation } from 'lucide-react';
import { CarStatus } from '../types';

interface CarConnectProps {
  status: CarStatus;
  onBack: () => void;
}

export const CarConnect: React.FC<CarConnectProps> = ({ status, onBack }) => {
  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center gap-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">车载连接</h1>
      </header>

      {/* Car Visual Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black">{status.model}</h2>
              <p className="text-slate-400 flex items-center gap-1 mt-1">
                <ShieldCheck size={16} className="text-emerald-400" />
                系统已连接
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${status.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              <Power size={24} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Thermometer size={16} />
                <span className="text-xs font-bold uppercase">车内温度</span>
              </div>
              <p className="text-xl font-bold">{status.temperature}°C</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <MapPin size={16} />
                <span className="text-xs font-bold uppercase">当前位置</span>
              </div>
              <p className="text-xl font-bold truncate">{status.location}</p>
            </div>
          </div>
        </div>

        {/* Abstract Car Shape */}
        <div className="absolute -right-12 -bottom-12 opacity-10">
          <Car size={240} />
        </div>
      </div>

      {/* Safety Alert */}
      {status.childInCar && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-rose-50 border border-rose-100 p-5 rounded-3xl flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 animate-pulse">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-rose-900">安全提醒</h3>
            <p className="text-sm text-rose-700">检测到孩子正在车内。系统已开启智能温控。</p>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center gap-3 shadow-sm active:scale-95 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Navigation size={24} />
          </div>
          <span className="font-bold text-slate-800">发送目的地</span>
        </button>
        <button className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center gap-3 shadow-sm active:scale-95 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Thermometer size={24} />
          </div>
          <span className="font-bold text-slate-800">预设空调</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 mb-4">连接设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">自动同步行程</span>
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">离车提醒</span>
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
