export type UserRole = 'ADMIN' | 'EMPLOYEE';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE';

export type LeaveType = 'Paid' | 'Sick' | 'Unpaid';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loginId?: string;
  password?: string;
}

export interface SalaryComponent {
  id: string;
  name: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number; // e.g. 50 (for 50%) or 25000 (fixed)
  percentageOf?: 'MONTHLY_WAGE' | 'BASIC';
  calculatedAmount: number;
}

export interface PFContribution {
  employeePercentage: number; // e.g. 12%
  employerPercentage: number; // e.g. 12%
  employeeAmount: number;
  employerAmount: number;
}

export interface TaxDeductions {
  professionalTax: number; // e.g. 200
}

export interface SalaryData {
  monthlyWage: number;
  yearlyWage: number;
  workingDaysPerWeek: number;
  breakTimeHours: number;
  components: SalaryComponent[];
  pfContribution: PFContribution;
  taxDeductions: TaxDeductions;
}

export interface ResumeData {
  about: string;
  loveAboutJob: string;
  interestsHobbies: string;
  skills: string[];
  certifications: string[];
}

export interface PrivateInfoData {
  dob: string;
  gender: string;
  address: string;
  phone: string;
  emergencyContact: string;
  joiningDate: string;
  employeeId: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  loginId: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
  department: string;
  position: string;
  manager: string;
  location: string;
  status: AttendanceStatus;
  resume: ResumeData;
  privateInfo: PrivateInfoData;
  salary: SalaryData;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string; // YYYY-MM-DD
  checkInTime: string | null; // e.g. "09:15 AM"
  checkOutTime: string | null; // e.g. "06:05 PM"
  workingHours: string | null; // e.g. "8h 50m"
  status: AttendanceStatus;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  durationDays: number;
  remarks: string;
  status: LeaveStatus;
  adminComment?: string;
  appliedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
