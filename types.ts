export type AttendanceStatus = 'Present' | 'Absent' | 'Half-day' | 'Leave';

export type Department =
  | 'Engineering'
  | 'Product & Design'
  | 'Human Resources'
  | 'Marketing'
  | 'Sales & Ops'
  | 'Finance';

export type UserRole = 'employee' | 'admin' | 'hr';

export type AuthViewMode = 'signin' | 'signup' | 'forgot' | 'first_login_change_password';

export interface UserAccount {
  id: string;
  loginId: string; // e.g. "OIJODO20220001"
  name: string;
  email: string;
  phone: string;
  password?: string; // stored for demo authentication
  companyName: string;
  companyCode: string;
  companyLogo?: string;
  role: UserRole;
  department: Department;
  jobTitle: string;
  yearOfJoining: number;
  serialNumber: number;
  isFirstLogin: boolean; // Forces password change on first sign in
  avatar?: string;
  createdAt: string;
}

export interface AdminSignUpData {
  companyName: string;
  companyLogo?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface EmployeeCreationData {
  name: string;
  email: string;
  phone: string;
  department: Department;
  jobTitle: string;
  yearOfJoining?: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  loginId?: string;
  department: Department;
  jobTitle: string;
  avatar: string;
  role: UserRole;
  employeeCode: string;
  isFirstLogin?: boolean;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkInTime: string | null; // e.g. "09:15 AM" or "09:15"
  checkOutTime: string | null; // e.g. "05:30 PM"
  totalHours: number; // e.g. 8.25
  isLate: boolean; // Flagged if checkIn is after late threshold
  notes?: string;
  isManualOverride?: boolean;
  overriddenBy?: string;
  updatedAt?: string;
}

export interface CompanySettings {
  lateThreshold: string; // e.g. "10:00" (24h format HH:mm)
  halfDayHoursThreshold: number; // e.g. 4.0
  standardHoursPerDay: number; // e.g. 8.0
  workDays: number[]; // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 0=Sun
  companyName: string;
  companyCode?: string;
  companyLogo?: string;
}

export interface DailySummaryStats {
  totalEmployees: number;
  presentCount: number;
  absentCount: number;
  halfDayCount: number;
  leaveCount: number;
  lateCount: number;
  attendanceRate: number; // Percentage (Present + Half-day) / Total
}

export interface WeeklyEmployeeSummary {
  employee: Employee;
  records: Record<string, AttendanceRecord | undefined>; // dateKey -> record
  totalWeeklyHours: number;
  presentDays: number;
  halfDays: number;
  leaveDays: number;
  absentDays: number;
  workDaysCount: number;
  attendancePercentage: number;
}

