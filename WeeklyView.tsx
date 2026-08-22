import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plane,
  XCircle,
  AlertTriangle,
  Download,
  Info,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { AttendanceRecord, AttendanceStatus, Employee } from '../types';
import {
  formatDateKey,
  formatFullDate,
  formatShortDate,
  getStatusStyle,
  parseDateKey,
} from '../utils/dateUtils';
import { AdminOverrideModal } from './AdminOverrideModal';

export const WeeklyView: React.FC = () => {
  const {
    employees,
    records,
    currentWeekDays,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    setSelectedDate,
    weeklySummaryList,
    currentEmployee,
  } = useAttendance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  // Override Modal
  const [overrideModal, setOverrideModal] = useState<{
    isOpen: boolean;
    employeeId?: string;
    date?: string;
  }>({
    isOpen: false,
  });

  const weekStart = currentWeekDays[0];
  const weekEnd = currentWeekDays[6];

  const weekRangeLabel = `${weekStart.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} – ${weekEnd.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ['ALL', ...Array.from(set)];
  }, [employees]);

  // Filter weekly employee summaries
  const filteredSummaries = useMemo(() => {
    return weeklySummaryList.filter(({ employee }) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'ALL' || employee.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [weeklySummaryList, searchQuery, selectedDept]);

  // Team summary metrics for this week
  const teamMetrics = useMemo(() => {
    let totalTeamHours = 0;
    let totalPercentage = 0;
    let perfectCount = 0;

    filteredSummaries.forEach((sum) => {
      totalTeamHours += sum.totalWeeklyHours;
      totalPercentage += sum.attendancePercentage;
      if (sum.attendancePercentage >= 100) {
        perfectCount++;
      }
    });

    const avgAttendance =
      filteredSummaries.length > 0
        ? Math.round(totalPercentage / filteredSummaries.length)
        : 0;

    return {
      totalTeamHours: Math.round(totalTeamHours * 10) / 10,
      avgAttendance,
      perfectCount,
      totalCount: filteredSummaries.length,
    };
  }, [filteredSummaries]);

  const handleExportCSV = () => {
    const dayHeaders = currentWeekDays.map((d) => formatShortDate(d));
    const headers = [
      'Employee Code',
      'Name',
      'Department',
      ...dayHeaders,
      'Total Hours',
      'Attendance %',
    ];

    const rows = filteredSummaries.map(({ employee, records: empRecs, totalWeeklyHours, attendancePercentage }) => {
      const dayStatuses = currentWeekDays.map((d) => {
        const dKey = formatDateKey(d);
        const rec = empRecs[dKey];
        if (!rec) return 'Unrecorded';
        return `${rec.status} (${rec.totalHours}h)`;
      });

      return [
        employee.employeeCode,
        `"${employee.name}"`,
        `"${employee.department}"`,
        ...dayStatuses,
        totalWeeklyHours,
        `${attendancePercentage}%`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Weekly_Attendance_Report_${formatDateKey(weekStart)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="weekly-view-container" className="space-y-6">
      {/* Week Navigator & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="prev-week-btn"
              onClick={goToPreviousWeek}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="this-week-btn"
              onClick={goToToday}
              className="px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              This Week
            </button>
            <button
              id="next-week-btn"
              onClick={goToNextWeek}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800 font-mono">
              {weekRangeLabel}
            </span>
          </div>
        </div>

        {/* Export & Legend */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3 text-[11px] font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Half-day
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" /> Leave
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Absent
            </span>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Weekly CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards for the Week */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {teamMetrics.avgAttendance}%
            </div>
            <div className="text-xs font-medium text-slate-500">
              Average Team Attendance Rate
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {teamMetrics.totalTeamHours} hrs
            </div>
            <div className="text-xs font-medium text-slate-500">
              Total Logged Work Hours
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {teamMetrics.perfectCount} / {teamMetrics.totalCount}
            </div>
            <div className="text-xs font-medium text-slate-500">
              100% Attendance Streak
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search employee or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-700 font-medium"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'ALL' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>

        {currentEmployee.role === 'admin' && (
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>Click any day cell to override or log an absence/leave</span>
          </div>
        )}
      </div>

      {/* 7-Day Grid Calendar Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table id="weekly-grid-table" className="w-full text-left border-collapse min-w-[860px]">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sticky left-0 bg-slate-50/95 z-10 w-64 shadow-xs">
                  Employee
                </th>
                {currentWeekDays.map((date, idx) => {
                  const isWeekend = idx >= 5;
                  const dKey = formatDateKey(date);
                  return (
                    <th
                      key={dKey}
                      className={`py-3.5 px-2 text-center w-28 ${
                        isWeekend ? 'bg-slate-100/50 text-slate-400' : ''
                      }`}
                    >
                      <div className="font-semibold text-slate-700">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                      </div>
                    </th>
                  );
                })}
                <th className="py-3.5 px-3 text-center w-24">Weekly Hours</th>
                <th className="py-3.5 px-4 text-center w-36">Attendance %</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSummaries.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No employees matching filter.
                  </td>
                </tr>
              ) : (
                filteredSummaries.map(
                  ({
                    employee,
                    records: empRecs,
                    totalWeeklyHours,
                    attendancePercentage,
                  }) => {
                    const isUserActive = employee.id === currentEmployee.id;

                    return (
                      <tr
                        key={employee.id}
                        className={`hover:bg-slate-50/60 transition-colors ${
                          isUserActive ? 'bg-emerald-50/20' : ''
                        }`}
                      >
                        {/* Employee Column (Sticky Left) */}
                        <td className="py-3 px-4 sticky left-0 bg-white/95 z-10 shadow-xs border-r border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-900 truncate">
                                  {employee.name}
                                </span>
                                {isUserActive && (
                                  <span className="px-1 py-0.2 text-[8px] font-bold bg-emerald-100 text-emerald-800 rounded">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 truncate">
                                {employee.department}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 7 Days Columns */}
                        {currentWeekDays.map((date, idx) => {
                          const isWeekend = idx >= 5;
                          const dKey = formatDateKey(date);
                          const record = empRecs[dKey];

                          if (!record) {
                            if (isWeekend) {
                              return (
                                <td
                                  key={dKey}
                                  className="py-2.5 px-1.5 text-center bg-slate-50/50"
                                >
                                  <span className="text-[10px] text-slate-300 font-mono">
                                    Off
                                  </span>
                                </td>
                              );
                            }

                            // Unrecorded weekday -> Absent by default or clickable
                            return (
                              <td
                                key={dKey}
                                onClick={() => {
                                  if (currentEmployee.role === 'admin') {
                                    setOverrideModal({
                                      isOpen: true,
                                      employeeId: employee.id,
                                      date: dKey,
                                    });
                                  }
                                }}
                                className={`py-2.5 px-1.5 text-center ${
                                  currentEmployee.role === 'admin'
                                    ? 'cursor-pointer hover:bg-slate-100/80'
                                    : ''
                                }`}
                              >
                                <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                                  Absent
                                </span>
                              </td>
                            );
                          }

                          const style = getStatusStyle(record.status);

                          return (
                            <td
                              key={dKey}
                              onClick={() => {
                                if (currentEmployee.role === 'admin') {
                                  setOverrideModal({
                                    isOpen: true,
                                    employeeId: employee.id,
                                    date: dKey,
                                  });
                                }
                              }}
                              className={`py-2.5 px-1.5 text-center transition-all ${
                                currentEmployee.role === 'admin'
                                  ? 'cursor-pointer hover:scale-105'
                                  : ''
                              }`}
                              title={`${employee.name} on ${dKey}: ${record.status} ${
                                record.checkInTime ? `(${record.checkInTime} - ${record.checkOutTime || 'now'})` : ''
                              }`}
                            >
                              <div
                                className={`inline-flex flex-col items-center justify-center p-1.5 rounded-lg border w-full max-w-[90px] mx-auto ${style.cellBg} ${style.border}`}
                              >
                                <span
                                  className={`text-[10px] font-bold tracking-tight ${style.text}`}
                                >
                                  {record.status}
                                </span>

                                {record.totalHours > 0 && (
                                  <span className="text-[9px] font-mono text-slate-600">
                                    {record.totalHours}h
                                  </span>
                                )}

                                {record.isLate && (
                                  <span className="text-[8px] font-bold text-amber-700 uppercase">
                                    Late
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}

                        {/* Total Weekly Hours */}
                        <td className="py-3 px-3 text-center">
                          <span className="font-mono font-bold text-slate-800 text-xs">
                            {totalWeeklyHours}h
                          </span>
                        </td>

                        {/* Attendance % with Progress Pill */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <span
                              className={`font-mono font-bold text-xs ${
                                attendancePercentage >= 90
                                  ? 'text-emerald-700'
                                  : attendancePercentage >= 70
                                  ? 'text-amber-700'
                                  : 'text-rose-700'
                              }`}
                            >
                              {attendancePercentage}%
                            </span>
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  attendancePercentage >= 90
                                    ? 'bg-emerald-500'
                                    : attendancePercentage >= 70
                                    ? 'bg-amber-400'
                                    : 'bg-rose-400'
                                }`}
                                style={{ width: `${attendancePercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Override Modal */}
      <AdminOverrideModal
        isOpen={overrideModal.isOpen}
        onClose={() => setOverrideModal({ isOpen: false })}
        initialEmployeeId={overrideModal.employeeId}
        initialDate={overrideModal.date}
      />
    </div>
  );
};
