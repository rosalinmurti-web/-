import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Baby, Mail, Lock, ArrowRight, Github } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-rose-200">
          <Baby size={40} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          {isRegister ? '创建账号' : '欢迎回来'}
        </h1>
        <p className="text-slate-500 mt-2">
          {isRegister ? '开始您的育儿智慧之旅' : '登录以管理您的家庭'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">电子邮箱</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">密码</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
          </div>
        </div>

        {!isRegister && (
          <div className="text-right">
            <button className="text-sm font-bold text-rose-500">忘记密码？</button>
          </div>
        )}

        <button 
          onClick={() => onLogin({ id: '1', name: '张先生', role: 'parent' })}
          className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {isRegister ? '立即注册' : '登录'}
          <ArrowRight size={20} />
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-2 text-slate-400 font-bold">或者</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Github size={20} />
            GitHub
          </button>
        </div>
      </div>

      <p className="text-center mt-8 text-slate-500">
        {isRegister ? '已有账号？' : '还没有账号？'}
        <button 
          onClick={() => setIsRegister(!isRegister)}
          className="font-bold text-rose-500 ml-1"
        >
          {isRegister ? '立即登录' : '免费注册'}
        </button>
      </p>
    </div>
  );
};
