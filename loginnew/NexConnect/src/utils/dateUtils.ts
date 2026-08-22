/**
 * Date and Time utilities for the Attendance Tracking System
 */

// Formats a Date object to YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Parses YYYY-MM-DD to a local Date object
export function parseDateKey(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Formats a date for human-readable display e.g. "Friday, August 21, 2026"
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Formats a date for short headers e.g. "Fri, Aug 21"
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Gets the Monday to Sunday dates of the week containing the given date
export function getWeekDates(currentDate: Date): Date[] {
  const date = new Date(currentDate);
  const day = date.getDay(); // 0 is Sunday, 1 is Monday...
  // Calculate distance to previous Monday: if Sunday (0), distance is 6. If Mon (1), distance is 0.
  const distanceToMonday = day === 0 ? 6 : day - 1;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() - distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    week.push(nextDay);
  }
  return week;
}

// Formats hours to standard 12-hour AM/PM string e.g. "09:30 AM"
export function formatCurrentTime(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Converts a time string (e.g. "09:30 AM" or "14:15") to minutes from midnight
export function timeStringToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  
  const cleanStr = timeStr.trim().toUpperCase();
  const is12Hour = cleanStr.includes('AM') || cleanStr.includes('PM');

  if (is12Hour) {
    const isPM = cleanStr.includes('PM');
    const timeParts = cleanStr.replace(/AM|PM/g, '').trim().split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1] || '0', 10);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  } else {
    const [hours, minutes] = cleanStr.split(':').map((v) => parseInt(v, 10) || 0);
    return hours * 60 + minutes;
  }
}

// Converts minutes from midnight to "HH:MM AM/PM"
export function minutesToTimeString(totalMinutes: number): string {
  const normalizedMinutes = Math.max(0, totalMinutes % 1440);
  const hours24 = Math.floor(normalizedMinutes / 60);
  const mins = Math.floor(normalizedMinutes % 60);
  
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  
  return `${String(hours12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
}

// Checks if a check-in time exceeds late threshold (e.g. threshold "10:00" = 10:00 AM)
export function isCheckInLate(checkInTimeStr: string, lateThreshold24h: string = '10:00'): boolean {
  if (!checkInTimeStr) return false;
  const checkInMinutes = timeStringToMinutes(checkInTimeStr);
  const [threshH, threshM] = lateThreshold24h.split(':').map(Number);
  const thresholdMinutes = threshH * 60 + (threshM || 0);
  return checkInMinutes > thresholdMinutes;
}

// Calculates elapsed decimal hours between check-in and check-out
export function calculateHoursWorked(checkInTimeStr: string | null, checkOutTimeStr: string | null): number {
  if (!checkInTimeStr || !checkOutTimeStr) return 0;
  
  const inMins = timeStringToMinutes(checkInTimeStr);
  let outMins = timeStringToMinutes(checkOutTimeStr);

  // If check-out is before check-in, assume next-day rollover
  if (outMins < inMins) {
    outMins += 24 * 60;
  }

  const diffMinutes = outMins - inMins;
  const hours = diffMinutes / 60;
  return Math.round(hours * 100) / 100; // 2 decimal precision
}

// Pretty prints decimal hours as "8h 15m" or "4.5h"
export function formatHoursDuration(decimalHours: number): string {
  if (!decimalHours || decimalHours <= 0) return '0h';
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  if (minutes === 0) return `${hours}h`;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

// Helper to determine status color styling
export function getStatusStyle(status: string) {
  switch (status) {
    case 'Present':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        badge: 'bg-emerald-600 text-white',
        dot: 'bg-emerald-500',
        border: 'border-emerald-500',
        cellBg: 'bg-emerald-50/60 hover:bg-emerald-100/80',
        text: 'text-emerald-700',
      };
    case 'Absent':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        badge: 'bg-rose-600 text-white',
        dot: 'bg-rose-500',
        border: 'border-rose-500',
        cellBg: 'bg-rose-50/60 hover:bg-rose-100/80',
        text: 'text-rose-700',
      };
    case 'Half-day':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        badge: 'bg-amber-500 text-white',
        dot: 'bg-amber-500',
        border: 'border-amber-500',
        cellBg: 'bg-amber-50/60 hover:bg-amber-100/80',
        text: 'text-amber-700',
      };
    case 'Leave':
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        badge: 'bg-sky-600 text-white',
        dot: 'bg-sky-500',
        border: 'border-sky-500',
        cellBg: 'bg-sky-50/60 hover:bg-sky-100/80',
        text: 'text-sky-700',
      };
    default:
      return {
        bg: 'bg-slate-50 text-slate-600 border-slate-200',
        badge: 'bg-slate-500 text-white',
        dot: 'bg-slate-400',
        border: 'border-slate-300',
        cellBg: 'bg-slate-50/40 hover:bg-slate-100/60',
        text: 'text-slate-600',
      };
  }
}
