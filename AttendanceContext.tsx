import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AttendanceRecord,
  AttendanceStatus,
  CompanySettings,
  DailySummaryStats,
  Employee,
  WeeklyEmployeeSummary,
} from '../types';
import {
  INITIAL_COMPANY_SETTINGS,
  INITIAL_EMPLOYEES,
  generateInitialRecords,
} from '../data/initialData';
import {
  calculateHoursWorked,
  formatCurrentTime,
  formatDateKey,
  getWeekDates,
  isCheckInLate,
} from '../utils/dateUtils';

interface AttendanceContextType {
  employees: Employee[];
  records: AttendanceRecord[];
  settings: CompanySettings;
  currentEmployee: Employee;
  selectedDate: string; // YYYY-MM-DD
  activeTab: 'daily' | 'weekly' | 'settings';
  
  // Navigation & View Actions
  setSelectedDate: (dateStr: string) => void;
  setActiveTab: (tab: 'daily' | 'weekly' | 'settings') => void;
  setCurrentEmployeeId: (empId: string) => void;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;

  // Punch actions
  checkIn: (employeeId: string, customTime?: string) => { success: boolean; message: string };
  checkOut: (employeeId: string, customTime?: string) => { success: boolean; message: string };
  
  // Admin & Override actions
  adminOverrideRecord: (data: {
    employeeId: string;
    date: string;
    status: AttendanceStatus;
    checkInTime?: string | null;
    checkOutTime?: string | null;
    totalHours?: number;
    isLate?: boolean;
    notes?: string;
  }) => void;
  deleteRecord: (recordId: string) => void;
  markAllAbsentUnchecked: (dateStr: string) => void;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  resetToDemoData: () => void;

  // Queries & Stats
  getRecord: (employeeId: string, dateStr: string) => AttendanceRecord | undefined;
  dailyStats: DailySummaryStats;
  weeklySummaryList: WeeklyEmployeeSummary[];
  currentWeekDays: Date[];
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RECORDS: 'attendflow_records_v1',
  EMPLOYEES: 'attendflow_employees_v1',
  SETTINGS: 'attendflow_settings_v1',
  CURRENT_USER: 'attendflow_current_user_v1',
  SELECTED_DATE: 'attendflow_selected_date_v1',
};

// Anchor date for initial demo: 2026-08-21 (Friday)
const INITIAL_DEMO_DATE = '2026-08-21';

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states with localStorage persistence
  const [employees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved employees', e);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved records', e);
      }
    }
    return generateInitialRecords();
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
    return INITIAL_COMPANY_SETTINGS;
  });

  const [currentEmployeeId, setCurrentEmployeeIdState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved && employees.some((e) => e.id === saved)) {
      return saved;
    }
    return 'emp-1'; // Sarah Connor (HR/Admin) by default for full preview
  });

  const [selectedDate, setSelectedDateState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_DATE);
    return saved || INITIAL_DEMO_DATE;
  });

  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'settings'>('daily');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, currentEmployeeId);
  }, [currentEmployeeId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_DATE, selectedDate);
  }, [selectedDate]);

  const currentEmployee = useMemo(() => {
    return employees.find((e) => e.id === currentEmployeeId) || employees[0];
  }, [employees, currentEmployeeId]);

  const setSelectedDate = (dateStr: string) => {
    setSelectedDateState(dateStr);
  };

  const setCurrentEmployeeId = (empId: string) => {
    if (employees.some((e) => e.id === empId)) {
      setCurrentEmployeeIdState(empId);
    }
  };

  // Date Navigation Helpers
  const goToPreviousDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() - 1);
    setSelectedDate(formatDateKey(date));
  };

  const goToNextDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 1);
    setSelectedDate(formatDateKey(date));
  };

  const goToToday = () => {
    setSelectedDate(INITIAL_DEMO_DATE);
  };

  const goToPreviousWeek = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() - 7);
    setSelectedDate(formatDateKey(date));
  };

  const goToNextWeek = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 7);
    setSelectedDate(formatDateKey(date));
  };

  // Helper to query record for a specific employee and date
  const getRecord = (employeeId: string, dateStr: string): AttendanceRecord | undefined => {
    return records.find((r) => r.employeeId === employeeId && r.date === dateStr);
  };

  // CHECK-IN LOGIC
  const checkIn = (employeeId: string, customTime?: string) => {
    const targetDate = selectedDate;
    const existing = getRecord(employeeId, targetDate);

    // Rule: Once checked in, disable duplicate check-in if active
    if (existing && existing.checkInTime && !existing.checkOutTime) {
      return { success: false, message: 'Already checked in for this date. Please check out first.' };
    }

    const inTime = customTime || formatCurrentTime();
    const isLate = isCheckInLate(inTime, settings.lateThreshold);
    const emp = employees.find((e) => e.id === employeeId);

    if (existing) {
      // Update existing record
      const updated: AttendanceRecord = {
        ...existing,
        status: 'Present',
        checkInTime: inTime,
        checkOutTime: null,
        totalHours: 0,
        isLate,
        updatedAt: new Date().toISOString(),
      };
      setRecords((prev) => prev.map((r) => (r.id === existing.id ? updated : r)));
    } else {
      // Create new attendance record
      const newRec: AttendanceRecord = {
        id: `rec-${targetDate}-${employeeId}`,
        employeeId,
        date: targetDate,
        status: 'Present',
        checkInTime: inTime,
        checkOutTime: null,
        totalHours: 0,
        isLate,
        updatedAt: new Date().toISOString(),
      };
      setRecords((prev) => [...prev, newRec]);
    }

    const lateNotice = isLate ? ' (Late arrival flagged past threshold)' : '';
    return {
      success: true,
      message: `${emp?.name || 'Employee'} checked in at ${inTime}${lateNotice}`,
    };
  };

  // CHECK-OUT LOGIC
  const checkOut = (employeeId: string, customTime?: string) => {
    const targetDate = selectedDate;
    const existing = getRecord(employeeId, targetDate);

    if (!existing || !existing.checkInTime) {
      return { success: false, message: 'Cannot check out without an active check-in record.' };
    }

    if (existing.checkOutTime) {
      return { success: false, message: 'Already checked out for this date.' };
    }

    const outTime = customTime || formatCurrentTime();
    const totalHours = calculateHoursWorked(existing.checkInTime, outTime);

    // Rule: If totalHours < halfDayHoursThreshold (e.g. 4 hours), auto-mark as Half-day
    let finalStatus: AttendanceStatus = 'Present';
    if (totalHours < settings.halfDayHoursThreshold) {
      finalStatus = 'Half-day';
    }

    const updated: AttendanceRecord = {
      ...existing,
      checkOutTime: outTime,
      totalHours,
      status: finalStatus,
      updatedAt: new Date().toISOString(),
    };

    setRecords((prev) => prev.map((r) => (r.id === existing.id ? updated : r)));

    const halfDayNotice =
      finalStatus === 'Half-day'
        ? ` (${totalHours}h worked is under ${settings.halfDayHoursThreshold}h threshold — marked Half-day)`
        : ` (${totalHours} hrs)`;

    return {
      success: true,
      message: `Checked out at ${outTime}${halfDayNotice}`,
    };
  };

  // ADMIN OVERRIDE LOGIC
  const adminOverrideRecord = (data: {
    employeeId: string;
    date: string;
    status: AttendanceStatus;
    checkInTime?: string | null;
    checkOutTime?: string | null;
    totalHours?: number;
    isLate?: boolean;
    notes?: string;
  }) => {
    const existing = getRecord(data.employeeId, data.date);
    
    // Compute total hours if check-in and check-out exist and totalHours not explicitly provided
    let computedHours = data.totalHours;
    if (computedHours === undefined) {
      if (data.checkInTime && data.checkOutTime) {
        computedHours = calculateHoursWorked(data.checkInTime, data.checkOutTime);
      } else {
        computedHours = data.status === 'Present' ? settings.standardHoursPerDay : 0;
      }
    }

    // Auto-calculate isLate if checkInTime given and not explicitly overridden
    let isLate = data.isLate;
    if (isLate === undefined && data.checkInTime) {
      isLate = isCheckInLate(data.checkInTime, settings.lateThreshold);
    } else if (isLate === undefined) {
      isLate = false;
    }

    if (existing) {
      const updated: AttendanceRecord = {
        ...existing,
        status: data.status,
        checkInTime: data.checkInTime !== undefined ? data.checkInTime : existing.checkInTime,
        checkOutTime: data.checkOutTime !== undefined ? data.checkOutTime : existing.checkOutTime,
        totalHours: computedHours,
        isLate: !!isLate,
        notes: data.notes !== undefined ? data.notes : existing.notes,
        isManualOverride: true,
        overriddenBy: `${currentEmployee.name} (${currentEmployee.role === 'admin' ? 'Admin' : 'Staff'})`,
        updatedAt: new Date().toISOString(),
      };
      setRecords((prev) => prev.map((r) => (r.id === existing.id ? updated : r)));
    } else {
      const newRec: AttendanceRecord = {
        id: `rec-${data.date}-${data.employeeId}`,
        employeeId: data.employeeId,
        date: data.date,
        status: data.status,
        checkInTime: data.checkInTime || null,
        checkOutTime: data.checkOutTime || null,
        totalHours: computedHours,
        isLate: !!isLate,
        notes: data.notes || '',
        isManualOverride: true,
        overriddenBy: `${currentEmployee.name} (${currentEmployee.role === 'admin' ? 'Admin' : 'Staff'})`,
        updatedAt: new Date().toISOString(),
      };
      setRecords((prev) => [...prev, newRec]);
    }
  };

  const deleteRecord = (recordId: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
  };

  const markAllAbsentUnchecked = (dateStr: string) => {
    const existingEmpIds = new Set(
      records.filter((r) => r.date === dateStr).map((r) => r.employeeId)
    );

    const newAbsentRecords: AttendanceRecord[] = employees
      .filter((emp) => !existingEmpIds.has(emp.id))
      .map((emp) => ({
        id: `rec-${dateStr}-${emp.id}`,
        employeeId: emp.id,
        date: dateStr,
        status: 'Absent',
        checkInTime: null,
        checkOutTime: null,
        totalHours: 0,
        isLate: false,
        notes: 'Bulk marked absent by HR',
        isManualOverride: true,
        overriddenBy: currentEmployee.name,
      }));

    if (newAbsentRecords.length > 0) {
      setRecords((prev) => [...prev, ...newAbsentRecords]);
    }
  };

  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDemoData = () => {
    setRecords(generateInitialRecords());
    setSettings(INITIAL_COMPANY_SETTINGS);
    setSelectedDate(INITIAL_DEMO_DATE);
    localStorage.removeItem(STORAGE_KEYS.RECORDS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_DATE);
  };

  // COMPUTED STATS for Selected Date
  const dailyStats = useMemo<DailySummaryStats>(() => {
    const dateRecords = records.filter((r) => r.date === selectedDate);
    const recordedMap = new Map<string, AttendanceRecord>(
      dateRecords.map((r) => [r.employeeId, r])
    );

    let presentCount = 0;
    let absentCount = 0;
    let halfDayCount = 0;
    let leaveCount = 0;
    let lateCount = 0;

    employees.forEach((emp) => {
      const rec = recordedMap.get(emp.id);
      if (!rec) {
        // Not recorded yet counts as Absent/Pending
        absentCount++;
      } else {
        if (rec.status === 'Present') presentCount++;
        else if (rec.status === 'Absent') absentCount++;
        else if (rec.status === 'Half-day') halfDayCount++;
        else if (rec.status === 'Leave') leaveCount++;

        if (rec.isLate) lateCount++;
      }
    });

    const total = employees.length;
    // Effective attendance = Present (1) + Half-day (0.5)
    const effectiveAttendance = presentCount + halfDayCount * 0.5;
    const attendanceRate = total > 0 ? Math.round((effectiveAttendance / total) * 100) : 0;

    return {
      totalEmployees: total,
      presentCount,
      absentCount,
      halfDayCount,
      leaveCount,
      lateCount,
      attendanceRate,
    };
  }, [records, employees, selectedDate]);

  // COMPUTED WEEKLY DAYS (Mon - Sun)
  const currentWeekDays = useMemo(() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    return getWeekDates(new Date(y, m - 1, d));
  }, [selectedDate]);

  // COMPUTED WEEKLY SUMMARY per Employee
  const weeklySummaryList = useMemo<WeeklyEmployeeSummary[]>(() => {
    const weekDateKeys = currentWeekDays.map((d) => formatDateKey(d));

    return employees.map((emp) => {
      const empRecordsMap: Record<string, AttendanceRecord | undefined> = {};
      let totalHours = 0;
      let presentDays = 0;
      let halfDays = 0;
      let leaveDays = 0;
      let absentDays = 0;

      weekDateKeys.forEach((dKey) => {
        const rec = records.find((r) => r.employeeId === emp.id && r.date === dKey);
        empRecordsMap[dKey] = rec;

        if (rec) {
          totalHours += rec.totalHours || 0;
          if (rec.status === 'Present') presentDays++;
          else if (rec.status === 'Half-day') halfDays++;
          else if (rec.status === 'Leave') leaveDays++;
          else if (rec.status === 'Absent') absentDays++;
        } else {
          // Check if weekday
          const dayIndex = new Date(dKey).getDay();
          if (dayIndex >= 1 && dayIndex <= 5) {
            absentDays++;
          }
        }
      });

      const standardWorkDays = 5; // Mon-Fri
      // Attendance % = ((Present + Half-day * 0.5 + Leave) / 5) * 100
      const attendedScore = presentDays + halfDays * 0.5 + leaveDays;
      const attendancePercentage = Math.min(100, Math.round((attendedScore / standardWorkDays) * 100));

      return {
        employee: emp,
        records: empRecordsMap,
        totalWeeklyHours: Math.round(totalHours * 100) / 100,
        presentDays,
        halfDays,
        leaveDays,
        absentDays,
        workDaysCount: standardWorkDays,
        attendancePercentage,
      };
    });
  }, [employees, records, currentWeekDays]);

  return (
    <AttendanceContext.Provider
      value={{
        employees,
        records,
        settings,
        currentEmployee,
        selectedDate,
        activeTab,
        setSelectedDate,
        setActiveTab,
        setCurrentEmployeeId,
        goToPreviousDay,
        goToNextDay,
        goToToday,
        goToPreviousWeek,
        goToNextWeek,
        checkIn,
        checkOut,
        adminOverrideRecord,
        deleteRecord,
        markAllAbsentUnchecked,
        updateSettings,
        resetToDemoData,
        getRecord,
        dailyStats,
        weeklySummaryList,
        currentWeekDays,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
