import React from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { LogIn, LogOut, Clock, CheckCircle2 } from 'lucide-react';

interface AttendanceControlProps {
  employeeId?: string;
  variant?: 'header' | 'compact' | 'card';
}

export const AttendanceControl: React.FC<AttendanceControlProps> = ({
  employeeId,
  variant = 'compact',
}) => {
  const { user, getTodayAttendance, checkIn, checkOut } = useHRMS();

  // If employeeId is passed, use that, else use logged in user's ID
  const targetId = employeeId || user?.employeeId || user?.id || '';
  const attendanceRecord = getTodayAttendance(targetId);

  const isCheckedIn = !!attendanceRecord?.checkInTime;
  const isCheckedOut = !!attendanceRecord?.checkOutTime;

  const handleCheckIn = () => {
    if (targetId) {
      checkIn(targetId);
    }
  };

  const handleCheckOut = () => {
    if (targetId) {
      checkOut(targetId);
    }
  };

  if (variant === 'header') {
    return (
      <div
        id="header-attendance-control"
        className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-md"
      >
        {!isCheckedIn ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-slate-600 font-medium">Not Checked In</span>
            <button
              id="header-checkin-btn"
              onClick={handleCheckIn}
              className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
            >
              <LogIn className="w-3 h-3" />
              <span>Check In &rarr;</span>
            </button>
          </div>
        ) : !isCheckedOut ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-700 font-medium">In: {attendanceRecord.checkInTime}</span>
            <button
              id="header-checkout-btn"
              onClick={handleCheckOut}
              className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Check Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-xs font-medium">Out: {attendanceRecord.checkOutTime}</span>
            <span className="text-slate-400">|</span>
            <span className="text-xs font-medium text-slate-600">{attendanceRecord.workingHours}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      id="compact-attendance-widget"
      className="bg-white border border-slate-200 rounded-lg p-3 sm:p-3.5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wide">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Today's Work Status</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {!isCheckedIn ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Unregistered
            </span>
          ) : !isCheckedOut ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Present
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
              <CheckCircle2 className="w-3 h-3 text-slate-600" />
              Completed
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-slate-600 space-y-1 mb-3">
        {isCheckedIn ? (
          <div className="flex justify-between py-0.5 border-b border-slate-100">
            <span className="text-slate-500">Checked In:</span>
            <span className="font-medium text-slate-800">{attendanceRecord?.checkInTime}</span>
          </div>
        ) : (
          <div className="text-slate-500 italic py-0.5">Please check in to record your workday.</div>
        )}

        {isCheckedOut && (
          <>
            <div className="flex justify-between py-0.5 border-b border-slate-100">
              <span className="text-slate-500">Checked Out:</span>
              <span className="font-medium text-slate-800">{attendanceRecord?.checkOutTime}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">Working Time:</span>
              <span className="font-semibold text-emerald-700">{attendanceRecord?.workingHours}</span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          id="attendance-checkin-btn"
          disabled={isCheckedIn}
          onClick={handleCheckIn}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
            isCheckedIn
              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>{isCheckedIn ? 'Checked In' : 'Check In →'}</span>
        </button>

        <button
          id="attendance-checkout-btn"
          disabled={!isCheckedIn || isCheckedOut}
          onClick={handleCheckOut}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
            !isCheckedIn || isCheckedOut
              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isCheckedOut ? 'Checked Out' : 'Check Out'}</span>
        </button>
      </div>
    </div>
  );
};
