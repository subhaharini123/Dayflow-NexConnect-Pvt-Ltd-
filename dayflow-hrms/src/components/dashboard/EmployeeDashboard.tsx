import React from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { AttendanceControl } from '../attendance/AttendanceControl';
import { StatusIndicator } from '../common/StatusIndicator';
import {
  User,
  CalendarCheck,
  CalendarDays,
  DollarSign,
  ArrowRight,
  Clock,
  Briefcase,
  Building,
  CheckCircle2,
} from 'lucide-react';

interface EmployeeDashboardProps {
  onNavigate: (view: string, employeeId?: string) => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onNavigate }) => {
  const { user, employees, attendance, leaveRequests } = useHRMS();

  // Current employee record
  const currentEmp = employees.find(
    (e) =>
      e.employeeId.toLowerCase() === (user?.employeeId || '').toLowerCase() ||
      e.id === user?.id ||
      e.email.toLowerCase() === (user?.email || '').toLowerCase()
  ) || employees[1]; // fallback to Priya Sharma

  // Recent attendance for this employee
  const myRecentAttendance = attendance
    .filter((a) => a.employeeId.toLowerCase() === currentEmp.employeeId.toLowerCase())
    .slice(0, 4);

  // Recent leaves for this employee
  const myRecentLeaves = leaveRequests
    .filter((l) => l.employeeId.toLowerCase() === currentEmp.employeeId.toLowerCase())
    .slice(0, 3);

  // Leave balances
  const approvedPaidLeaves = leaveRequests
    .filter(
      (l) =>
        l.employeeId.toLowerCase() === currentEmp.employeeId.toLowerCase() &&
        l.status === 'Approved' &&
        l.leaveType === 'Paid'
    )
    .reduce((sum, l) => sum + l.durationDays, 0);

  const remainingPaid = Math.max(0, 18 - approvedPaidLeaves);

  return (
    <div id="employee-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={
              currentEmp.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentEmp.name)}`
            }
            alt={currentEmp.name}
            className="w-14 h-14 rounded-full object-cover border border-slate-300 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Welcome back, {currentEmp.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
              <span>{currentEmp.position}</span>
              <span>&bull;</span>
              <span>{currentEmp.department}</span>
              <span>&bull;</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-slate-700">
                {currentEmp.employeeId}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Profile Link */}
        <button
          id="dashboard-view-profile-btn"
          onClick={() => onNavigate('profile', currentEmp.id)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <User className="w-3.5 h-3.5" />
          <span>My Profile</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Left (Attendance + Quick Access) / Right (Leave Summary + Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Attendance Box */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Today's Attendance</span>
              </h2>
              <button
                onClick={() => onNavigate('attendance')}
                className="text-xs font-medium text-indigo-700 hover:underline flex items-center gap-1"
              >
                <span>Full Attendance Log</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <AttendanceControl variant="compact" employeeId={currentEmp.id} />
          </div>

          {/* Quick Access Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('profile', currentEmp.id)}
              className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs p-4 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2 rounded-md bg-slate-100 text-slate-700 w-fit mb-2">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">My Profile & Skills</h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  View bio, emergency info, certifications, and skills.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700 mt-3 inline-flex items-center gap-1">
                Open Profile &rarr;
              </span>
            </div>

            <div
              onClick={() => onNavigate('time-off')}
              className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs p-4 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2 rounded-md bg-slate-100 text-slate-700 w-fit mb-2">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Time Off & Leaves</h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Apply for paid, sick, or unpaid leave and track status.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700 mt-3 inline-flex items-center gap-1">
                Apply Leave &rarr;
              </span>
            </div>

            <div
              onClick={() => {
                onNavigate('profile', currentEmp.id);
              }}
              className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs p-4 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2 rounded-md bg-slate-100 text-slate-700 w-fit mb-2">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Salary Breakdown</h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Monthly wage, allowances, PF, and statutory deductions.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700 mt-3 inline-flex items-center gap-1">
                View Salary &rarr;
              </span>
            </div>
          </div>

          {/* Recent Attendance Records */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Recent Attendance History</span>
              <span className="text-[10px] text-slate-600 font-normal">Past 5 workdays</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {myRecentAttendance.map((rec) => (
                <div key={rec.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <StatusIndicator status={rec.status} />
                    <span className="font-medium text-slate-800">{rec.date}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] flex items-center gap-3">
                    <span>
                      In: <span className="font-mono text-slate-800">{rec.checkInTime || '--'}</span>
                    </span>
                    <span>
                      Out: <span className="font-mono text-slate-800">{rec.checkOutTime || '--'}</span>
                    </span>
                    <span className="font-medium text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                      {rec.workingHours || '--'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leave Summary & Recent Activity */}
        <div className="space-y-6">
          {/* Leave Balance Box */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Leave Allowance
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800 block">Annual Paid Leave</span>
                  <span className="text-[11px] text-slate-500">18 total allocated</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">{remainingPaid}</span>
                  <span className="text-slate-500 text-[11px]"> days left</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800 block">Sick / Medical</span>
                  <span className="text-[11px] text-slate-500">10 total allocated</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">10</span>
                  <span className="text-slate-500 text-[11px]"> days left</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('time-off')}
              className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors text-center"
            >
              Request Time Off
            </button>
          </div>

          {/* Recent Leave Requests */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              My Recent Leave Requests
            </h3>

            <div className="space-y-2.5 text-xs">
              {myRecentLeaves.length > 0 ? (
                myRecentLeaves.map((lr) => (
                  <div key={lr.id} className="p-2.5 rounded border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">{lr.leaveType} Leave</span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          lr.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : lr.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {lr.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {lr.fromDate} to {lr.toDate} ({lr.durationDays} days)
                    </p>
                    {lr.adminComment && (
                      <p className="text-[10px] text-slate-600 mt-1 italic">
                        Note: {lr.adminComment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-600 italic">No recent leave requests.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
