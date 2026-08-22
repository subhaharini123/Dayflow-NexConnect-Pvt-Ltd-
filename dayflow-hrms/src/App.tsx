import React, { useState, useEffect } from 'react';
import { HRMSProvider, useHRMS } from './context/HRMSContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginPage } from './components/auth/LoginPage';
import { EmployeesView } from './components/employees/EmployeesView';
import { ProfileView } from './components/profile/ProfileView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { TimeOffView } from './components/timeoff/TimeOffView';
import { EmployeeDashboard } from './components/dashboard/EmployeeDashboard';

type AppView = 'login' | 'dashboard' | 'employees' | 'profile' | 'attendance' | 'time-off';

const MainApp: React.FC = () => {
  const { user } = useHRMS();

  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (!user) return 'login';
    return user.role === 'ADMIN' ? 'employees' : 'dashboard';
  });

  // Target employee ID when viewing a specific employee's profile
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined);

  // Sync view when user authentication changes
  useEffect(() => {
    if (!user) {
      setCurrentView('login');
    } else {
      if (currentView === 'login') {
        setCurrentView(user.role === 'ADMIN' ? 'employees' : 'dashboard');
      }
    }
  }, [user]);

  // Protected navigation handler
  const handleNavigate = (view: string, employeeId?: string) => {
    if (!user) {
      setCurrentView('login');
      return;
    }

    if (employeeId) {
      setSelectedEmployeeId(employeeId);
    } else if (view === 'profile') {
      setSelectedEmployeeId(undefined);
    }

    setCurrentView(view as AppView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEmployee = (empId: string) => {
    setSelectedEmployeeId(empId);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Login when unauthenticated
  if (!user) {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => setCurrentView(user?.role === 'ADMIN' ? 'employees' : 'dashboard')}
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <div id="nexconnect-app-root" className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Main Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'dashboard' && (
          <EmployeeDashboard onNavigate={handleNavigate} />
        )}

        {currentView === 'employees' && (
          <EmployeesView onSelectEmployee={handleSelectEmployee} />
        )}

        {currentView === 'profile' && (
          <ProfileView
            employeeId={selectedEmployeeId}
            onBack={() => handleNavigate(user.role === 'ADMIN' ? 'employees' : 'dashboard')}
          />
        )}

        {currentView === 'attendance' && <AttendanceView />}

        {currentView === 'time-off' && <TimeOffView />}
      </main>

      {/* Understated Human-Designed Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">NexConnect HRMS</span>
            <span>&bull;</span>
            <span>NexConnect Pvt Ltd</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Internal Enterprise Edition &bull; Production Workspace
          </div>
        </div>
      </footer>

      {/* Global Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <HRMSProvider>
      <MainApp />
    </HRMSProvider>
  );
}
