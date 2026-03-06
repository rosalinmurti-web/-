import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Video, Mic, PhoneOff, Camera, MessageSquare, MoreHorizontal, UserPlus } from 'lucide-react';

interface VideoChatProps {
  onBack: () => void;
}

export const VideoChat: React.FC<VideoChatProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col">
      {/* Remote Video (Full Screen Mock) */}
      <div className="absolute inset-0 bg-slate-800 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/child/800/1200" 
          className="w-full h-full object-cover opacity-80"
          alt="Remote User"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-8">
        <button onClick={onBack} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/10">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-white font-bold text-lg">正在通话: 小乐</h2>
          <p className="text-emerald-400 text-xs font-bold flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            04:25
          </p>
        </div>
        <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/10">
          <UserPlus size={24} />
        </button>
      </header>

      {/* Local Video (PIP) */}
      <div className="absolute right-6 top-32 w-32 h-48 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-20">
        <img 
          src="https://picsum.photos/seed/parent/300/500" 
          className="w-full h-full object-cover"
          alt="Local User"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Controls */}
      <div className="mt-auto relative z-10 px-6 pb-12">
        <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/10 flex items-center justify-between">
          <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Mic size={24} />
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Video size={24} />
          </button>
          <button 
            onClick={onBack}
            className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/40 active:scale-90 transition-all"
          >
            <PhoneOff size={32} />
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <MessageSquare size={24} />
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
