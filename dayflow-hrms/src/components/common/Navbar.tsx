import React, { useState, useRef, useEffect } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { AttendanceControl } from '../attendance/AttendanceControl';
import {
  Users,
  CalendarCheck,
  CalendarDays,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Shield,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, employeeId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, logout, employees } = useHRMS();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // Find user employee details for avatar & name
  const currentEmployee = employees.find(
    (e) =>
      e.employeeId.toLowerCase() === user.employeeId.toLowerCase() ||
      e.id === user.id ||
      e.email.toLowerCase() === user.email.toLowerCase()
  );

  const displayName = currentEmployee?.name || user.name;
  const displayAvatar =
    currentEmployee?.avatar ||
    user.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`;

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleOpenMyProfile = () => {
    setDropdownOpen(false);
    if (currentEmployee) {
      onNavigate('profile', currentEmployee.id);
    } else {
      onNavigate('profile');
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    onNavigate('login');
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Main Navigation */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Logo */}
            <button
              id="brand-logo"
              onClick={() => handleNavClick(user.role === 'ADMIN' ? 'employees' : 'dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <img
                src="/logo_nexconnect.jpeg"
                alt="NexConnect Logo"
                className="w-8 h-8 rounded-md object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors font-brand">
                  NexConnect
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-600 tracking-wider mt-0.5">
                  Dayflow Portal
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
              {user.role === 'EMPLOYEE' && (
                <button
                  id="nav-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'dashboard'
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                  <span>Dashboard</span>
                </button>
              )}

              <button
                id="nav-employees"
                onClick={() => handleNavClick('employees')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'employees' || (currentView === 'profile' && user.role === 'ADMIN')
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4 text-slate-500" />
                <span>Employees</span>
              </button>

              <button
                id="nav-attendance"
                onClick={() => handleNavClick('attendance')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'attendance'
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-slate-500" />
                <span>Attendance</span>
              </button>

              <button
                id="nav-time-off"
                onClick={() => handleNavClick('time-off')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'time-off'
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CalendarDays className="w-4 h-4 text-slate-500" />
                <span>Time Off</span>
              </button>
            </nav>
          </div>

          {/* Right Section: Attendance Quick Widget + Profile Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Header compact attendance bar */}
            <div className="hidden lg:block">
              <AttendanceControl variant="header" employeeId={currentEmployee?.id} />
            </div>

            {/* Profile Avatar with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="user-avatar-btn"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    {user.role === 'ADMIN' ? (
                      <span className="inline-flex items-center gap-0.5 text-indigo-700 font-medium">
                        <Shield className="w-2.5 h-2.5" /> HR Admin
                      </span>
                    ) : (
                      'Employee'
                    )}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-150 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Avatar Dropdown Menu - EXACTLY My Profile and Log Out per Screenshot 1 */}
              {dropdownOpen && (
                <div
                  id="avatar-dropdown-menu"
                  className="absolute right-0 mt-1.5 w-48 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-100"
                >
                  <div className="px-3 py-2 border-b border-slate-100 sm:hidden">
                    <p className="text-xs font-semibold text-slate-800">{displayName}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>

                  <button
                    id="dropdown-my-profile"
                    onClick={handleOpenMyProfile}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-left transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Profile</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    id="dropdown-logout"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex md:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-slate-200 bg-slate-50 px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 border-b border-slate-200 mb-2">
            <AttendanceControl variant="compact" employeeId={currentEmployee?.id} />
          </div>

          {user.role === 'EMPLOYEE' && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-left ${
                currentView === 'dashboard' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Dashboard</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('employees')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-left ${
              currentView === 'employees' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-700'
            }`}
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Employees</span>
          </button>

          <button
            onClick={() => handleNavClick('attendance')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-left ${
              currentView === 'attendance' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-700'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-slate-500" />
            <span>Attendance</span>
          </button>

          <button
            onClick={() => handleNavClick('time-off')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-left ${
              currentView === 'time-off' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-700'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-slate-500" />
            <span>Time Off</span>
          </button>
        </div>
      )}
    </header>
  );
};
