import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onBack: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onBack }) => {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'medical': return 'bg-rose-500';
      case 'education': return 'bg-indigo-500';
      case 'play': return 'bg-emerald-500';
      case 'milestone': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">日程表</h1>
        </div>
        <button className="p-2 rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-200">
          <Plus size={20} />
        </button>
      </header>

      {/* Calendar Grid */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-800">2026年3月</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-slate-50 text-slate-400"><ChevronLeft size={20} /></button>
            <button className="p-2 rounded-xl bg-slate-50 text-slate-400"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map(day => (
            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for padding */}
          <div className="h-10"></div>
          <div className="h-10"></div>
          <div className="h-10"></div>
          <div className="h-10"></div>
          
          {dates.map(date => (
            <div 
              key={date} 
              className={`h-10 flex flex-col items-center justify-center rounded-xl text-sm font-bold relative ${date === 5 ? 'bg-rose-500 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {date}
              {date === 12 || date === 20 ? (
                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-indigo-500"></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-2">即将到来</h3>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <div className={`w-3 h-12 rounded-full ${getEventTypeColor(event.type)}`}></div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{event.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CalendarIcon size={12} />
                    {event.date}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    10:00 AM
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
