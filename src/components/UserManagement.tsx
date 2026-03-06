import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, UserPlus, Shield, Trash2, ChevronRight, User } from 'lucide-react';
import { User as UserType } from '../types';

interface UserManagementProps {
  users: UserType[];
  onBack: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, onBack }) => {
  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">成员管理</h1>
        </div>
        <button className="p-2 rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-200">
          <UserPlus size={20} />
        </button>
      </header>

      {/* Admin Card */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center">
          <User size={32} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">张先生</h2>
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full uppercase">管理员</span>
          </div>
          <p className="text-sm text-slate-400">主账号 • zhang@example.com</p>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-2">家庭成员</h3>
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{user.name}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Shield size={12} />
                    {user.role === 'parent' ? '家长' : '监护人'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <ChevronRight size={18} className="text-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions Info */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
        <h4 className="font-bold text-slate-800 mb-2 text-sm">关于权限</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          管理员可以添加或删除成员，并管理所有孩子的成长记录和设备限制。监护人仅具有查看权限。
        </p>
      </div>
    </div>
  );
};
