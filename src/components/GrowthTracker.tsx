import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, Plus, Ruler, Weight } from 'lucide-react';
import { GrowthRecord } from '../types';

interface GrowthTrackerProps {
  records: GrowthRecord[];
  onBack: () => void;
}

export const GrowthTracker: React.FC<GrowthTrackerProps> = ({ records, onBack }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center gap-4 py-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">成长记录</h1>
      </header>

      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Weight size={18} />
              </div>
              <h3 className="font-bold text-slate-800">体重 (kg)</h3>
            </div>
            <span className="text-sm font-medium text-slate-400">最近 6 个月</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedRecords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short' })}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Ruler size={18} />
              </div>
              <h3 className="font-bold text-slate-800">身高 (cm)</h3>
            </div>
            <span className="text-sm font-medium text-slate-400">最近 6 个月</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedRecords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short' })}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="height" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-slate-800">历史记录</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-indigo-600">
            <Plus size={16} />
            添加记录
          </button>
        </div>
        
        <div className="space-y-3">
          {sortedRecords.reverse().map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">{new Date(record.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-xs text-slate-400">在家测量</p>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">体重</p>
                  <p className="font-bold text-slate-800">{record.weight}kg</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">身高</p>
                  <p className="font-bold text-slate-800">{record.height}cm</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
