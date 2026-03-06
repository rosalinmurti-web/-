import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  EyeOff, 
  Settings,
  ChevronRight,
  Fingerprint
} from 'lucide-react';

interface ChildLockProps {
  onBack: () => void;
}

export const ChildLock: React.FC<ChildLockProps> = ({ onBack }) => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center gap-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">儿童锁</h1>
      </header>

      {/* Status Card */}
      <div className={`p-8 rounded-[2.5rem] text-center space-y-6 transition-colors duration-500 ${isLocked ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-800 shadow-sm'}`}>
        <motion.div 
          animate={{ scale: isLocked ? 1.1 : 1 }}
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-colors duration-500 ${isLocked ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-400'}`}
        >
          {isLocked ? <Lock size={40} /> : <Unlock size={40} />}
        </motion.div>

        <div>
          <h2 className="text-2xl font-black">{isLocked ? '限制已生效' : '限制已禁用'}</h2>
          <p className={`text-sm mt-2 ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
            {isLocked 
              ? '您的孩子只能访问已批准的应用和内容。' 
              : '目前可以访问所有系统功能和应用。'}
          </p>
        </div>

        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`w-full py-5 rounded-3xl font-bold text-lg shadow-lg transition-all active:scale-95 ${isLocked ? 'bg-white text-slate-900 shadow-white/10' : 'bg-slate-900 text-white shadow-slate-200'}`}
        >
          {isLocked ? '解锁设备' : '立即锁定设备'}
        </button>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-2">安全设置</h2>
        
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">应用限制</p>
                <p className="text-xs text-slate-400">已屏蔽 12 个应用</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>

          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                <EyeOff size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">内容过滤</p>
                <p className="text-xs text-slate-400">严格模式已开启</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>

          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Fingerprint size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">家长 PIN 码</p>
                <p className="text-xs text-slate-400">更改设置时需要</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>

          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                <Settings size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">高级设置</p>
                <p className="text-xs text-slate-400">系统级控制</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
