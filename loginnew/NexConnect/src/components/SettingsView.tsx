import React, { useState } from 'react';
import {
  Settings,
  Clock,
  Timer,
  Building2,
  ShieldCheck,
  RotateCcw,
  Download,
  Save,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDemoData, records, employees, currentEmployee } =
    useAttendance();

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [lateThreshold, setLateThreshold] = useState(settings.lateThreshold);
  const [halfDayHoursThreshold, setHalfDayHoursThreshold] = useState(
    settings.halfDayHoursThreshold
  );
  const [standardHoursPerDay, setStandardHoursPerDay] = useState(settings.standardHoursPerDay);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyName,
      lateThreshold,
      halfDayHoursThreshold: Number(halfDayHoursThreshold),
      standardHoursPerDay: Number(standardHoursPerDay),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportAll = () => {
    const headers = [
      'Record ID',
      'Employee ID',
      'Employee Name',
      'Department',
      'Date',
      'Status',
      'Check In',
      'Check Out',
      'Total Hours',
      'Is Late',
      'Notes',
      'Overridden By',
    ];

    const rows = records.map((r) => {
      const emp = employees.find((e) => e.id === r.employeeId);
      return [
        r.id,
        r.employeeId,
        `"${emp?.name || 'Unknown'}"`,
        `"${emp?.department || ''}"`,
        r.date,
        r.status,
        r.checkInTime || '',
        r.checkOutTime || '',
        r.totalHours || 0,
        r.isLate ? 'YES' : 'NO',
        `"${r.notes || ''}"`,
        `"${r.overriddenBy || ''}"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Full_Attendance_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="settings-view-container" className="space-y-6 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Attendance Policies & Rules</h2>
            <p className="text-xs text-slate-500">
              Configure late arrival thresholds, shift calculation hours, and automated classification
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Policy Saved Successfully</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Organization / Company Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Late Threshold */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Late Check-In Cutoff Time (24-Hour HH:MM)
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={lateThreshold}
                onChange={(e) => setLateThreshold(e.target.value)}
                placeholder="10:00"
                className="w-full pl-9 pr-3 py-2 text-xs font-mono font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Employees checking in after this time (e.g. 10:00 AM) are flagged as <strong className="text-amber-700">Late</strong> while still marked Present.
            </p>
          </div>

          {/* Half-Day Threshold */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Half-Day Hours Threshold (Decimal Hours)
            </label>
            <div className="relative">
              <Timer className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="number"
                step="0.5"
                min="1"
                max="12"
                value={halfDayHoursThreshold}
                onChange={(e) => setHalfDayHoursThreshold(parseFloat(e.target.value) || 4)}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Shifts with total worked time less than this threshold (e.g. &lt; 4.0 hrs) automatically convert to <strong className="text-amber-700">Half-day</strong> status.
            </p>
          </div>

          {/* Standard Full-Day Hours */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Standard Full Day Shift (Hours)
            </label>
            <input
              type="number"
              step="0.5"
              min="4"
              max="16"
              value={standardHoursPerDay}
              onChange={(e) => setStandardHoursPerDay(parseFloat(e.target.value) || 8)}
              className="w-full px-3 py-2 text-xs font-mono font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Baseline target for 100% daily shift completion (default: 8.0 hrs).
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

      {/* Policy Guide Reference Card */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-sm font-bold tracking-tight">System Specification & Architecture Reference</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. Check-in / Check-out Engine
            </h4>
            <p className="text-slate-400">
              One-click logging of timestamps. Duplicate check-ins are prevented. Total hours = Check-out Time minus Check-in Time.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              2. Automated Thresholds
            </h4>
            <p className="text-slate-400">
              Check-in after {lateThreshold} flags Late badge. Total hours &lt; {halfDayHoursThreshold}h auto-updates status to Half-day upon check-out.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              3. Status Spectrum
            </h4>
            <p className="text-slate-400">
              Four exact statuses: <span className="text-emerald-300 font-semibold">Present (Green)</span>, <span className="text-rose-300 font-semibold">Absent (Red)</span>, <span className="text-amber-300 font-semibold">Half-day (Yellow)</span>, and <span className="text-sky-300 font-semibold">Leave (Blue)</span>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              4. Role-Based Permissions
            </h4>
            <p className="text-slate-400">
              Employees manage their personal punch clock and views. Admin/HR profile has full team oversight and manual override authority.
            </p>
          </div>
        </div>
      </div>

      {/* Data Operations Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Database & Export Controls</h3>
          <p className="text-xs text-slate-500">
            Download company ledger in CSV or reset records to original seed state
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Full Ledger (.CSV)</span>
          </button>

          <button
            type="button"
            onClick={resetToDemoData}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-rose-200"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
