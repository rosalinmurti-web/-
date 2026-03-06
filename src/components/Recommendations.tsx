import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Brain, 
  Activity, 
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import { ChildProfile, Recommendation } from '../types';
import { getPersonalizedRecommendations } from '../services/gemini';

interface RecommendationsProps {
  child: ChildProfile;
  onBack: () => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ child, onBack }) => {
  const [tips, setTips] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTips = async () => {
    setLoading(true);
    const data = await getPersonalizedRecommendations(child);
    setTips(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTips();
  }, [child]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return <Heart size={20} />;
      case 'education': return <Brain size={20} />;
      case 'activity': return <Activity size={20} />;
      case 'milestone': return <Lightbulb size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'health': return '健康';
      case 'education': return '教育';
      case 'activity': return '活动';
      case 'milestone': return '里程碑';
      default: return '建议';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-rose-50 text-rose-500 border-rose-100';
      case 'education': return 'bg-indigo-50 text-indigo-500 border-indigo-100';
      case 'activity': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      case 'milestone': return 'bg-amber-50 text-amber-500 border-amber-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">AI 贴士</h1>
        </div>
        <button 
          onClick={fetchTips}
          disabled={loading}
          className={`p-2 rounded-xl bg-white border border-slate-100 text-slate-400 ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={20} />
        </button>
      </header>

      <div className="bg-gradient-to-br from-rose-500 to-orange-400 p-6 rounded-[2.5rem] text-white shadow-lg shadow-rose-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">为 {child.name} 量身定制</span>
          </div>
          <h2 className="text-xl font-bold mb-2">发育洞察</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            根据 {child.name} 的年龄和成长模式，我们的 AI 精选了这些特定建议，以支持他们的成长旅程。
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-20">
          <Sparkles size={160} />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 animate-pulse space-y-3">
                  <div className="w-24 h-6 bg-slate-100 rounded-full" />
                  <div className="w-full h-4 bg-slate-100 rounded-full" />
                  <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {tips.map((tip, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-3xl border transition-all hover:shadow-md ${getCategoryColor(tip.category)} bg-white`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryColor(tip.category).split(' ')[0]} ${getCategoryColor(tip.category).split(' ')[1]}`}>
                      {getCategoryIcon(tip.category)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">{getCategoryName(tip.category)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{tip.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{tip.content}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
