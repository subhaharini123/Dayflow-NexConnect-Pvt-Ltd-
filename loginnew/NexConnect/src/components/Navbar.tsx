import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  Clock,
  Settings,
  Users,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Building2,
  LogOut,
  UserPlus,
  KeyRound,
} from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { useAuth } from '../context/AuthContext';
import { OnboardEmployeeModal } from './auth/OnboardEmployeeModal';

export const Navbar: React.FC = () => {
  const {
    employees,
    currentEmployee,
    setCurrentEmployeeId,
    activeTab,
    setActiveTab,
    resetToDemoData,
    settings,
  } = useAttendance();

  const { currentUser, signOut, activeCompany, switchUserQuickly, users } = useAuth();

  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isAdmin = currentUser?.role === 'admin' || currentEmployee.role === 'admin';

  return (
    <header
      id="main-navbar"
      className="bg-slate-950 text-white border-b border-white/10 sticky top-0 z-40 shadow-md backdrop-blur-md bg-slate-950/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-md shadow-purple-600/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-sans">
                  Dayflow
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wider">
                  HRMS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Every workday, perfectly aligned. • {activeCompany.name} ({activeCompany.code})
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10">
            <button
              id="nav-tab-daily"
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'daily'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Daily View</span>
            </button>

            <button
              id="nav-tab-weekly"
              onClick={() => setActiveTab('weekly')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Weekly Matrix</span>
            </button>

            <button
              id="nav-tab-settings"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Policy &amp; Settings</span>
            </button>
          </nav>

          {/* Right Side Actions: Onboard Employee (if Admin) + Clock + User Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* HR / Admin "Onboard Employee" Button */}
            {isAdmin && (
              <button
                id="add-employee-btn"
                type="button"
                onClick={() => setShowOnboardModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                <span>+ Add Employee (Auto-ID)</span>
              </button>
            )}

            {/* Live Clock */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>{currentTimeStr || '09:00:00 AM'}</span>
            </div>

            {/* Active User / Profile Menu */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-left cursor-pointer"
              >
                <img
                  src={
                    currentUser?.avatar ||
                    currentEmployee.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={currentUser?.name || currentEmployee.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/40"
                />
                <div className="hidden sm:block text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white leading-tight">
                      {currentUser?.name || currentEmployee.name}
                    </span>
                    {isAdmin ? (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Admin
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Emp
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-purple-400/90 leading-none">
                    {currentUser?.loginId || currentEmployee.employeeCode}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-2 text-slate-200 divide-y divide-slate-800">
                    {/* User Info Header */}
                    <div className="p-3 bg-slate-950/70 rounded-xl mb-1">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            currentUser?.avatar ||
                            currentEmployee.avatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {currentUser?.name || currentEmployee.name}
                          </p>
                          <p className="text-[11px] font-mono text-purple-400">
                            ID: {currentUser?.loginId || currentEmployee.employeeCode}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {currentUser?.email || currentEmployee.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Switch Profiles */}
                    <div className="py-2">
                      <p className="px-2 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Switch Active Account (Demo)
                      </p>
                      <div className="max-h-52 overflow-y-auto space-y-1">
                        {users.map((usr) => (
                          <button
                            key={usr.id}
                            onClick={() => {
                              switchUserQuickly(usr.id);
                              setCurrentEmployeeId(usr.id);
                              setShowUserDropdown(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                              usr.id === (currentUser?.id || currentEmployee.id)
                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <img
                              src={
                                usr.avatar ||
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                              }
                              alt={usr.name}
                              className="w-6 h-6 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-white truncate">
                                  {usr.name}
                                </span>
                                <span className="text-[9px] font-mono text-purple-400">
                                  {usr.loginId}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 truncate">
                                {usr.jobTitle} • {usr.role.toUpperCase()}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin Onboard Employee trigger in dropdown */}
                    {isAdmin && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowOnboardModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-950/40 rounded-lg transition-colors cursor-pointer"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                          <span>Onboard New Employee (Auto-ID)</span>
                        </button>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 px-1 space-y-1">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          setShowResetConfirm(true);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Demo Data</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors font-semibold cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        <span>Sign Out of Dayflow</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Tab Nav */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'daily' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'weekly' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'settings' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowOnboardModal(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-purple-500/20 text-purple-300"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ User</span>
            </button>
          )}
        </div>
      </div>

      {/* Onboard Employee Modal */}
      <OnboardEmployeeModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-slate-100 shadow-2xl">
            <h3 className="text-base font-semibold text-white">Reset Attendance Demo Data?</h3>
            <p className="text-sm text-slate-300 mt-2">
              This will restore all default check-in/out records, late flags, and attendance data.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
