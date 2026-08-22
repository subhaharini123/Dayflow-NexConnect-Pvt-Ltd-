import React, { useState, useMemo } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { AttendanceControl } from './AttendanceControl';
import { StatusIndicator } from '../common/StatusIndicator';
import { AttendanceStatus } from '../../types';
import {
  CalendarCheck,
  Calendar,
  Filter,
  Search,
  Clock,
  User,
  Building,
  CheckCircle,
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { user, attendance, employees } = useHRMS();
  const isAdmin = user?.role === 'ADMIN';

  const [dateFilter, setDateFilter] = useState('ALL'); // 'ALL' | 'TODAY' | 'WEEK'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [searchEmployee, setSearchEmployee] = useState('');

  // Find user's employee record
  const currentEmp = employees.find(
    (e) =>
      e.employeeId.toLowerCase() === (user?.employeeId || '').toLowerCase() ||
      e.id === user?.id ||
      e.email.toLowerCase() === (user?.email || '').toLowerCase()
  );

  // Departments list for filter
  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ['ALL', ...Array.from(set)];
  }, [employees]);

  // Filter attendance records
  const filteredAttendance = useMemo(() => {
    return attendance.filter((rec) => {
      // If employee, only show their own records
      if (!isAdmin && currentEmp) {
        if (rec.employeeId.toLowerCase() !== currentEmp.employeeId.toLowerCase()) {
          return false;
        }
      }

      // Department filter
      if (departmentFilter !== 'ALL' && rec.department !== departmentFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && rec.status !== statusFilter) {
        return false;
      }

      // Search filter (Admin searching employee)
      if (searchEmployee.trim()) {
        const query = searchEmployee.toLowerCase().trim();
        const matchesName = rec.employeeName.toLowerCase().includes(query);
        const matchesId = rec.employeeId.toLowerCase().includes(query);
        if (!matchesName && !matchesId) return false;
      }

      // Date filter
      if (dateFilter === 'TODAY') {
        const today = new Date().toISOString().split('T')[0];
        if (rec.date !== today && rec.date !== '2026-08-21') return false;
      }

      return true;
    });
  }, [attendance, isAdmin, currentEmp, departmentFilter, statusFilter, searchEmployee, dateFilter]);

  // Today summary stats
  const stats = useMemo(() => {
    const todayRecords = attendance.filter(
      (a) => a.date === '2026-08-21' || a.date === new Date().toISOString().split('T')[0]
    );
    return {
      present: todayRecords.filter((r) => r.status === 'PRESENT').length,
      absent: todayRecords.filter((r) => r.status === 'ABSENT').length,
      leave: todayRecords.filter((r) => r.status === 'LEAVE').length,
      total: employees.length,
    };
  }, [attendance, employees]);

  return (
    <div id="attendance-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-slate-700" />
            <span>Attendance Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAdmin
              ? 'Real-time company workforce presence tracking and working hours logs'
              : 'Your personal attendance check-in/out records and working history'}
          </p>
        </div>

        {/* Compact Check-In/Out for logged in user */}
        <div className="sm:w-72">
          <AttendanceControl variant="compact" employeeId={currentEmp?.id} />
        </div>
      </div>

      {/* Admin Quick Summary Counters */}
      {isAdmin && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Workforce</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats.total}</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present Today
            </span>
            <div className="text-xl font-bold text-emerald-700 mt-1">{stats.present}</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-blue-600 uppercase">On Leave</span>
            <div className="text-xl font-bold text-blue-700 mt-1">{stats.leave}</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-amber-600 uppercase">Absent</span>
            <div className="text-xl font-bold text-amber-700 mt-1">{stats.absent}</div>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Date view filter */}
          <div className="flex items-center bg-white border border-slate-200 rounded p-0.5">
            <button
              onClick={() => setDateFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                dateFilter === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setDateFilter('TODAY')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                dateFilter === 'TODAY' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Today
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Statuses</option>
            <option value="PRESENT">Present</option>
            <option value="LEAVE">On Leave</option>
            <option value="ABSENT">Absent</option>
            <option value="HALF_DAY">Half Day</option>
          </select>

          {/* Department Filter for Admin */}
          {isAdmin && (
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'ALL' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Search by Employee for Admin */}
        {isAdmin && (
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
            <input
              type="text"
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
              placeholder="Search employee..."
              className="w-full pl-8 pr-3 py-1 bg-white border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        )}
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Date</th>
                {isAdmin && <th className="px-4 py-3">Employee</th>}
                {isAdmin && <th className="px-4 py-3">Department</th>}
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Check-Out</th>
                <th className="px-4 py-3">Working Hours</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {rec.date}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                        <div>{rec.employeeName}</div>
                        <span className="text-[10px] text-slate-600 font-mono">
                          {rec.employeeId}
                        </span>
                      </td>
                    )}
                    {isAdmin && (
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {rec.department}
                      </td>
                    )}
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-mono">
                      {rec.checkInTime || <span className="text-slate-400 font-sans italic">--</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-mono">
                      {rec.checkOutTime || (
                        <span className="text-slate-400 font-sans italic">
                          {rec.checkInTime ? 'Pending' : '--'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-medium">
                      {rec.workingHours || <span className="text-slate-400 font-sans italic">--</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusIndicator status={rec.status} showLabel={true} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isAdmin ? 7 : 5}
                    className="px-4 py-8 text-center text-slate-500 italic"
                  >
                    No attendance records found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
