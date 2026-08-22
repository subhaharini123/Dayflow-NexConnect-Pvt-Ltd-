import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Plane,
  AlertTriangle,
  UserCheck,
  Edit3,
  Download,
  LogIn,
  LogOut,
  Sparkles,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { AttendanceRecord, AttendanceStatus, Department, Employee } from '../types';
import {
  formatFullDate,
  formatHoursDuration,
  formatShortDate,
  getStatusStyle,
  parseDateKey,
} from '../utils/dateUtils';
import { AdminOverrideModal } from './AdminOverrideModal';

export const DailyView: React.FC = () => {
  const {
    employees,
    records,
    selectedDate,
    setSelectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    currentEmployee,
    checkIn,
    checkOut,
    dailyStats,
    markAllAbsentUnchecked,
    settings,
  } = useAttendance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Override Modal State
  const [overrideModalState, setOverrideModalState] = useState<{
    isOpen: boolean;
    employeeId?: string;
    date?: string;
  }>({
    isOpen: false,
  });

  const dateObj = parseDateKey(selectedDate);
  const formattedFullDate = formatFullDate(dateObj);

  // Departments list for filter
  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ['ALL', ...Array.from(set)];
  }, [employees]);

  // Filtered Employee List & Attendance Data for selected date
  const filteredData = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch =
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;

        return matchesSearch && matchesDept;
      })
      .map((emp) => {
        const record = records.find((r) => r.employeeId === emp.id && r.date === selectedDate);
        return {
          employee: emp,
          record,
        };
      })
      .filter(({ record }) => {
        if (statusFilter === 'ALL') return true;
        if (statusFilter === 'LATE') return record?.isLate;
        if (statusFilter === 'UNRECORDED') return !record;
        return record?.status === statusFilter;
      });
  }, [employees, records, selectedDate, searchQuery, selectedDept, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      'Employee Code',
      'Name',
      'Email',
      'Department',
      'Date',
      'Status',
      'Check In',
      'Check Out',
      'Total Hours',
      'Is Late',
      'Notes',
    ];

    const rows = filteredData.map(({ employee, record }) => [
      employee.employeeCode,
      `"${employee.name}"`,
      employee.email,
      `"${employee.department}"`,
      selectedDate,
      record?.status || 'Absent/Unrecorded',
      record?.checkInTime || '',
      record?.checkOutTime || '',
      record?.totalHours || 0,
      record?.isLate ? 'YES' : 'NO',
      `"${record?.notes || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="daily-view-container" className="space-y-6">
      {/* Date Navigation & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Date Navigator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="prev-day-btn"
              onClick={goToPreviousDay}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="today-day-btn"
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              id="next-day-btn"
              onClick={goToNextDay}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Date Picker Input */}
          <div className="relative flex items-center">
            <CalendarIcon className="w-4 h-4 text-emerald-600 absolute left-3 pointer-events-none" />
            <input
              id="daily-date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
            />
          </div>

          <span className="hidden md:inline text-xs font-medium text-slate-500">
            {formattedFullDate}
          </span>
        </div>

        {/* Quick Batch Actions & Export */}
        <div className="flex items-center gap-2">
          {currentEmployee.role === 'admin' && (
            <>
              <button
                id="btn-quick-override"
                onClick={() => setOverrideModalState({ isOpen: true, date: selectedDate })}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>HR Override</span>
              </button>

              <button
                id="btn-mark-absent-all"
                onClick={() => markAllAbsentUnchecked(selectedDate)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                title="Mark all employees without punch as Absent"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Mark Unpunched Absent</span>
              </button>
            </>
          )}

          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Download CSV for this day"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards for Selected Day */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Present Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {dailyStats.presentCount}
            </div>
            <div className="text-xs font-medium text-emerald-700">Present</div>
          </div>
        </div>

        {/* Late Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {dailyStats.lateCount}
            </div>
            <div className="text-xs font-medium text-amber-700">
              Late (&gt;{settings.lateThreshold})
            </div>
          </div>
        </div>

        {/* Half-Day Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {dailyStats.halfDayCount}
            </div>
            <div className="text-xs font-medium text-amber-700">Half-Day</div>
          </div>
        </div>

        {/* Leave Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {dailyStats.leaveCount}
            </div>
            <div className="text-xs font-medium text-sky-700">On Leave</div>
          </div>
        </div>

        {/* Absent Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {dailyStats.absentCount}
            </div>
            <div className="text-xs font-medium text-rose-700">Absent</div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-3.5 rounded-2xl shadow-xs flex items-center gap-3">
          <div>
            <div className="text-xl font-bold text-emerald-400 font-mono">
              {dailyStats.attendanceRate}%
            </div>
            <div className="text-xs font-medium text-slate-300">Turnout Rate</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-1 items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search employee name, department, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Department Filter */}
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

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'Present', label: 'Present' },
            { id: 'LATE', label: 'Late' },
            { id: 'Half-day', label: 'Half-day' },
            { id: 'Leave', label: 'Leave' },
            { id: 'Absent', label: 'Absent' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table id="daily-attendance-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4">Check-in Time</th>
                <th className="py-3.5 px-4">Check-out Time</th>
                <th className="py-3.5 px-4">Total Hours</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No matching employee records found.</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting the search query or department filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map(({ employee, record }) => {
                  const isUserActive = employee.id === currentEmployee.id;
                  const isCheckedIn = record?.checkInTime && !record?.checkOutTime;
                  const status = record?.status || 'Absent';
                  const style = getStatusStyle(status);

                  return (
                    <tr
                      key={employee.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isUserActive ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      {/* Employee Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-900">
                                {employee.name}
                              </span>
                              {isUserActive && (
                                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {employee.employeeCode} • {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department Column */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                          {employee.department}
                        </span>
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {status}
                          </span>
                          {record?.isManualOverride && (
                            <span className="text-[10px] text-slate-400 italic">
                              Override
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Check-In Column */}
                      <td className="py-3.5 px-4">
                        {record?.checkInTime ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium text-slate-800">
                              {record.checkInTime}
                            </span>
                            {record.isLate && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                LATE
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">--:--</span>
                        )}
                      </td>

                      {/* Check-Out Column */}
                      <td className="py-3.5 px-4">
                        {record?.checkOutTime ? (
                          <span className="font-mono font-medium text-slate-800">
                            {record.checkOutTime}
                          </span>
                        ) : isCheckedIn ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium animate-pulse">
                            <Clock className="w-3 h-3" /> In Progress
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">--:--</span>
                        )}
                      </td>

                      {/* Total Hours Column */}
                      <td className="py-3.5 px-4">
                        {record?.totalHours ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono font-semibold text-slate-800">
                                {record.totalHours} hrs
                              </span>
                              <span className="text-[11px] text-slate-400">
                                ({formatHoursDuration(record.totalHours)})
                              </span>
                            </div>
                            {/* Visual Progress relative to 8h standard */}
                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  record.totalHours >= 8
                                    ? 'bg-emerald-500'
                                    : record.totalHours >= 4
                                    ? 'bg-amber-400'
                                    : 'bg-rose-400'
                                }`}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (record.totalHours / settings.standardHoursPerDay) * 100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">0.0h</span>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* If active employee and viewing themselves */}
                          {isUserActive && (
                            <>
                              {!record?.checkInTime && (
                                <button
                                  onClick={() => checkIn(employee.id)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                                >
                                  Check In
                                </button>
                              )}
                              {isCheckedIn && (
                                <button
                                  onClick={() => checkOut(employee.id)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer"
                                >
                                  Check Out
                                </button>
                              )}
                            </>
                          )}

                          {/* HR / Admin Override action button */}
                          {currentEmployee.role === 'admin' && (
                            <button
                              id={`override-btn-${employee.id}`}
                              onClick={() =>
                                setOverrideModalState({
                                  isOpen: true,
                                  employeeId: employee.id,
                                  date: selectedDate,
                                })
                              }
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="HR Override attendance"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Override Modal */}
      <AdminOverrideModal
        isOpen={overrideModalState.isOpen}
        onClose={() => setOverrideModalState({ isOpen: false })}
        initialEmployeeId={overrideModalState.employeeId}
        initialDate={overrideModalState.date || selectedDate}
      />
    </div>
  );
};
