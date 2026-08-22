import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Trash2,
} from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { AttendanceStatus, Employee } from '../types';
import {
  calculateHoursWorked,
  formatFullDate,
  parseDateKey,
  timeStringToMinutes,
} from '../utils/dateUtils';

interface AdminOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmployeeId?: string;
  initialDate?: string;
}

export const AdminOverrideModal: React.FC<AdminOverrideModalProps> = ({
  isOpen,
  onClose,
  initialEmployeeId,
  initialDate,
}) => {
  const {
    employees,
    selectedDate: globalSelectedDate,
    getRecord,
    adminOverrideRecord,
    deleteRecord,
    currentEmployee,
    settings,
  } = useAttendance();

  const [selectedEmpId, setSelectedEmpId] = useState<string>(
    initialEmployeeId || employees[0]?.id || ''
  );
  const [targetDate, setTargetDate] = useState<string>(
    initialDate || globalSelectedDate
  );

  const [status, setStatus] = useState<AttendanceStatus>('Present');
  const [checkInTime, setCheckInTime] = useState<string>('09:00 AM');
  const [checkOutTime, setCheckOutTime] = useState<string>('05:30 PM');
  const [totalHours, setTotalHours] = useState<number>(8.5);
  const [isLate, setIsLate] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  // Sync state whenever modal opens or employee/date changes
  useEffect(() => {
    if (initialEmployeeId) setSelectedEmpId(initialEmployeeId);
    if (initialDate) setTargetDate(initialDate);
  }, [initialEmployeeId, initialDate, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const existing = getRecord(selectedEmpId, targetDate);
    if (existing) {
      setStatus(existing.status);
      setCheckInTime(existing.checkInTime || '');
      setCheckOutTime(existing.checkOutTime || '');
      setTotalHours(existing.totalHours || 0);
      setIsLate(!!existing.isLate);
      setNotes(existing.notes || '');
    } else {
      // Defaults for blank record
      setStatus('Present');
      setCheckInTime('09:00 AM');
      setCheckOutTime('05:00 PM');
      setTotalHours(8.0);
      setIsLate(false);
      setNotes('');
    }
  }, [selectedEmpId, targetDate, isOpen]);

  // Recalculate hours when checkin/checkout change
  const handleInTimeChange = (val: string) => {
    setCheckInTime(val);
    if (val && checkOutTime) {
      const hrs = calculateHoursWorked(val, checkOutTime);
      setTotalHours(hrs);
    }
  };

  const handleOutTimeChange = (val: string) => {
    setCheckOutTime(val);
    if (checkInTime && val) {
      const hrs = calculateHoursWorked(checkInTime, val);
      setTotalHours(hrs);
    }
  };

  const handleStatusChange = (newStatus: AttendanceStatus) => {
    setStatus(newStatus);
    if (newStatus === 'Absent' || newStatus === 'Leave') {
      setCheckInTime('');
      setCheckOutTime('');
      setTotalHours(0);
      setIsLate(false);
      if (!notes) {
        setNotes(newStatus === 'Leave' ? 'Approved Leave Request' : 'Unannounced Absence');
      }
    } else if (newStatus === 'Half-day') {
      if (!checkInTime) setCheckInTime('09:00 AM');
      setCheckOutTime('01:00 PM');
      setTotalHours(4.0);
    } else if (newStatus === 'Present') {
      if (!checkInTime) setCheckInTime('09:00 AM');
      if (!checkOutTime) setCheckOutTime('05:30 PM');
      setTotalHours(8.5);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminOverrideRecord({
      employeeId: selectedEmpId,
      date: targetDate,
      status,
      checkInTime: checkInTime || null,
      checkOutTime: checkOutTime || null,
      totalHours: Number(totalHours) || 0,
      isLate,
      notes,
    });
    onClose();
  };

  const handleDelete = () => {
    const existing = getRecord(selectedEmpId, targetDate);
    if (existing) {
      deleteRecord(existing.id);
    }
    onClose();
  };

  if (!isOpen) return null;

  const targetEmp = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const existingRecord = getRecord(selectedEmpId, targetDate);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white leading-tight">
                HR / Admin Override
              </h3>
              <p className="text-xs text-slate-400">
                Manually record or adjust attendance status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Employee & Date Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Employee
              </label>
              <select
                value={selectedEmpId}
                onChange={(e) => setSelectedEmpId(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Target Employee Preview Chip */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <img
              src={targetEmp.avatar}
              alt={targetEmp.name}
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div className="text-xs">
              <div className="font-semibold text-slate-800">{targetEmp.name}</div>
              <div className="text-slate-500">
                {targetEmp.jobTitle} • {targetEmp.department}
              </div>
            </div>
          </div>

          {/* Status Selection: 4 Specific Status Badges */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Attendance Status Type (Required)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Present - Green */}
              <button
                type="button"
                onClick={() => handleStatusChange('Present')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  status === 'Present'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500 mb-1.5" />
                <span className="text-xs font-bold">Present</span>
              </button>

              {/* Absent - Red */}
              <button
                type="button"
                onClick={() => handleStatusChange('Absent')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  status === 'Absent'
                    ? 'border-rose-600 bg-rose-50 text-rose-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-rose-500 mb-1.5" />
                <span className="text-xs font-bold">Absent</span>
              </button>

              {/* Half-day - Yellow/Amber */}
              <button
                type="button"
                onClick={() => handleStatusChange('Half-day')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  status === 'Half-day'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-amber-500 mb-1.5" />
                <span className="text-xs font-bold">Half-day</span>
              </button>

              {/* Leave - Blue */}
              <button
                type="button"
                onClick={() => handleStatusChange('Leave')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  status === 'Leave'
                    ? 'border-sky-600 bg-sky-50 text-sky-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-sky-500 mb-1.5" />
                <span className="text-xs font-bold">Leave</span>
              </button>
            </div>
          </div>

          {/* Time & Hours Controls (Shown when Present or Half-day) */}
          {(status === 'Present' || status === 'Half-day') && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={checkInTime}
                    onChange={(e) => handleInTimeChange(e.target.value)}
                    placeholder="e.g. 09:15 AM"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Check-out Time
                  </label>
                  <input
                    type="text"
                    value={checkOutTime}
                    onChange={(e) => handleOutTimeChange(e.target.value)}
                    placeholder="e.g. 05:30 PM"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Total Hours Worked
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={totalHours}
                    onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-semibold text-emerald-700"
                  />
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="override-is-late"
                    checked={isLate}
                    onChange={(e) => setIsLate(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                  />
                  <label
                    htmlFor="override-is-late"
                    className="text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    Flag as Late Arrival
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notes / Reason Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Reason / Admin Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Approved Sick Leave, WFH Approval, Badge error..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            {existingRecord ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Record</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
