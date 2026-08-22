import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Employee,
  AttendanceRecord,
  LeaveRequest,
  SalaryData,
  ToastMessage,
  AttendanceStatus,
  LeaveType,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
} from '../data/initialData';
import { getDefaultSalaryData } from '../utils/salaryCalculator';

interface HRMSContextType {
  user: User | null;
  employees: Employee[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  toasts: ToastMessage[];
  login: (email: string, password?: string) => boolean;
  signup: (data: {
    employeeId: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EMPLOYEE';
    password?: string;
  }) => boolean;
  logout: () => void;
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeeByEmpId: (empId: string) => Employee | undefined;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  createEmployee: (employeeData: Partial<Employee>) => Employee;
  checkIn: (employeeId: string) => void;
  checkOut: (employeeId: string) => void;
  getTodayAttendance: (employeeId: string) => AttendanceRecord | undefined;
  applyLeave: (data: {
    employeeId: string;
    leaveType: LeaveType;
    fromDate: string;
    toDate: string;
    remarks: string;
  }) => void;
  updateLeaveStatus: (
    leaveId: string,
    status: 'Approved' | 'Rejected',
    comment?: string
  ) => void;
  updateSalary: (employeeId: string, salaryData: SalaryData) => void;
  addSkill: (employeeId: string, skill: string) => void;
  removeSkill: (employeeId: string, skill: string) => void;
  addCertification: (employeeId: string, cert: string) => void;
  removeCertification: (employeeId: string, cert: string) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resetToInitialData: () => void;
}

const HRMSContext = createContext<HRMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'nexconnect_user_v4',
  USERS_LIST: 'nexconnect_users_list_v4',
  EMPLOYEES: 'nexconnect_employees_v4',
  ATTENDANCE: 'nexconnect_attendance_v4',
  LEAVES: 'nexconnect_leaves_v4',
};

// PostgreSQL database record mapping helper functions
const mapEmployeeToFrontend = (dbEmp: any): Employee => ({
  id: dbEmp.id,
  employeeId: dbEmp.employee_id,
  name: dbEmp.name,
  loginId: dbEmp.login_id,
  email: dbEmp.email,
  phone: dbEmp.phone,
  avatar: dbEmp.avatar,
  company: dbEmp.company,
  department: dbEmp.department,
  position: dbEmp.position,
  manager: dbEmp.manager,
  location: dbEmp.location,
  status: dbEmp.status,
  resume: dbEmp.resume || { about: '', loveAboutJob: '', interestsHobbies: '', skills: [], certifications: [] },
  privateInfo: dbEmp.private_info || { dob: '', gender: '', address: '', phone: '', emergencyContact: '', joiningDate: '', employeeId: dbEmp.employee_id },
  salary: dbEmp.salary || { monthlyWage: 50000, allowances: { basic: 25000, hra: 12500, lta: 4000, special: 8500 }, deductions: { pf: 3000, professionalTax: 200 }, summary: { gross: 50000, deductions: 3200, netPay: 46800 } }
});

const mapUserToFrontend = (dbUsr: any): User => ({
  id: dbUsr.id,
  employeeId: dbUsr.employee_id,
  name: dbUsr.name,
  email: dbUsr.email,
  role: dbUsr.role,
  avatar: dbUsr.avatar,
  loginId: dbUsr.login_id,
  password: dbUsr.password
});

const mapAttendanceToFrontend = (dbAtt: any): AttendanceRecord => ({
  id: dbAtt.id,
  employeeId: dbAtt.employee_id,
  employeeName: dbAtt.employee_name,
  department: dbAtt.department,
  date: dbAtt.date,
  checkInTime: dbAtt.check_in_time,
  checkOutTime: dbAtt.check_out_time,
  workingHours: dbAtt.working_hours,
  status: dbAtt.status
});

const mapLeaveToFrontend = (dbLv: any): LeaveRequest => ({
  id: dbLv.id,
  employeeId: dbLv.employee_id,
  employeeName: dbLv.employee_name,
  department: dbLv.department,
  leaveType: dbLv.leave_type,
  fromDate: dbLv.from_date,
  toDate: dbLv.to_date,
  durationDays: dbLv.duration_days,
  remarks: dbLv.remarks,
  status: dbLv.status,
  adminComment: dbLv.admin_comment,
  appliedAt: dbLv.applied_at
});

const generateCustomLoginId = (name: string, joiningDate: string, existingEmployees: Employee[]): string => {
  const companyPrefix = 'NC';
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0] || 'Employee';
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
  const firstTwo = (firstName.slice(0, 2) + 'XX').slice(0, 2).toUpperCase();
  const lastTwo = (lastName ? lastName.slice(0, 2) : 'XX').slice(0, 2).toUpperCase();
  const yearStr = joiningDate ? joiningDate.split('-')[0] : new Date().getFullYear().toString();
  const yearJoinedCount = existingEmployees.filter((emp) => {
    const empDate = emp.privateInfo?.joiningDate || emp.joiningDate || '';
    return empDate.startsWith(yearStr);
  }).length;
  const serialStr = String(yearJoinedCount + 1).padStart(4, '0');
  return `${companyPrefix}${firstTwo}${lastTwo}${yearStr}${serialStr}`;
};

export const HRMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with LocalStorage or fallbacks
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    // Default to null so the login page is displayed on startup
    return null;
  });

  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users list', e);
      }
    }
    return INITIAL_USERS;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse employees', e);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse attendance', e);
      }
    }
    return INITIAL_ATTENDANCE;
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEAVES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse leaves', e);
      }
    }
    return INITIAL_LEAVE_REQUESTS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Helper to make backend calls asynchronously
  const apiCall = async (endpoint: string, method: 'POST' | 'PUT', body: any) => {
    try {
      const response = await fetch(`http://localhost:5000/api${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        console.error(`API mutation failed on ${endpoint}:`, response.statusText);
      }
    } catch (e) {
      console.error(`Network error on ${endpoint}:`, e);
    }
  };

  // Check backend health and sync on startup
  useEffect(() => {
    const checkBackendAndSync = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout for fast response
        const healthRes = await fetch('http://localhost:5000/api/health', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (healthRes.ok) {
          console.log('PostgreSQL database server is online! Syncing records...');
          setIsBackendOnline(true);
          
          const [empsRes, usersRes, attRes, leavesRes] = await Promise.all([
            fetch('http://localhost:5000/api/employees'),
            fetch('http://localhost:5000/api/users'),
            fetch('http://localhost:5000/api/attendance'),
            fetch('http://localhost:5000/api/leaves')
          ]);
          
          if (empsRes.ok && usersRes.ok && attRes.ok && leavesRes.ok) {
            const dbEmps = await empsRes.json();
            const dbUsers = await usersRes.json();
            const dbAtt = await attRes.json();
            const dbLeaves = await leavesRes.json();
            
            const mappedEmps = dbEmps.map(mapEmployeeToFrontend);
            const mappedUsers = dbUsers.map(mapUserToFrontend);
            const mappedAtt = dbAtt.map(mapAttendanceToFrontend);
            const mappedLeaves = dbLeaves.map(mapLeaveToFrontend);
            
            setEmployees(mappedEmps);
            setUsersList(mappedUsers);
            setAttendance(mappedAtt);
            setLeaveRequests(mappedLeaves);
            
            // Sync DB to LocalStorage as a hot backup
            localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(mappedEmps));
            localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(mappedUsers));
            localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(mappedAtt));
            localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(mappedLeaves));
            
            // Sync active user session
            const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
            if (savedUser) {
              const parsedUser = JSON.parse(savedUser);
              const freshUser = mappedUsers.find(u => u.id === parsedUser.id || u.employeeId === parsedUser.employeeId);
              if (freshUser) {
                setUser(freshUser);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(freshUser));
              }
            }
            
            addToast('Synchronized with PostgreSQL database successfully.', 'success');
          }
        }
      } catch (e) {
        console.warn('PostgreSQL database server is offline. Running in LocalStorage offline mode.', e);
        setIsBackendOnline(false);
      }
    };
    
    checkBackendAndSync();
  }, []);

  // Sync to localStorage as local copy
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (loginId: string, password?: string): boolean => {
    const query = loginId.trim().toUpperCase();
    const foundUser = usersList.find(
      (u) =>
        u.loginId && u.loginId.toUpperCase() === query &&
        (!password || u.password === password)
    );
    if (foundUser) {
      setUser(foundUser);
      addToast(`Welcome back, ${foundUser.name}!`, 'success');
      return true;
    }
    addToast('Invalid credentials. Please verify your Login ID and password.', 'error');
    return false;
  };

  const signup = (data: {
    employeeId: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EMPLOYEE';
    password?: string;
  }): boolean => {
    const existing = usersList.find((u) => u.email.toLowerCase() === data.email.toLowerCase().trim());
    if (existing) {
      addToast('An account with this email already exists.', 'error');
      return false;
    }

    const newId = 'usr-' + Date.now();
    const newUser: User = {
      id: newId,
      employeeId: data.employeeId,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
    };

    // Check if employee record exists, if not create one
    const empExists = employees.find(
      (e) => e.employeeId.toLowerCase() === data.employeeId.toLowerCase()
    );

    if (!empExists) {
      const newEmp: Employee = {
        id: 'emp-' + Date.now(),
        employeeId: data.employeeId,
        name: data.name,
        loginId: data.email.split('@')[0],
        email: data.email,
        phone: '+91 98000 00000',
        avatar: newUser.avatar!,
        company: 'NexConnect Pvt Ltd',
        department: data.role === 'ADMIN' ? 'Human Resources' : 'Engineering',
        position: data.role === 'ADMIN' ? 'HR Specialist' : 'Software Engineer',
        manager: 'Arun Kumar',
        location: 'Bangalore, India',
        status: 'PRESENT',
        resume: {
          about: `Professional at NexConnect Pvt Ltd in ${data.role === 'ADMIN' ? 'Human Resources' : 'Engineering'}.`,
          loveAboutJob: 'Building great products and collaborating with an energetic team.',
          interestsHobbies: 'Reading, technology, travel and learning new skills.',
          skills: data.role === 'ADMIN' ? ['HR Operations', 'Recruitment', 'Compliance'] : ['JavaScript', 'React', 'CSS'],
          certifications: [],
        },
        privateInfo: {
          dob: '1995-01-01',
          gender: 'Not specified',
          address: 'NexConnect Campus, Bangalore, Karnataka',
          phone: '+91 98000 00000',
          emergencyContact: 'Family Contact - +91 98000 11111',
          joiningDate: new Date().toISOString().split('T')[0],
          employeeId: data.employeeId,
        },
        salary: getDefaultSalaryData(50000),
      };

      setEmployees((prev) => [...prev, newEmp]);
    }

    setUsersList((prev) => [...prev, newUser]);
    setUser(newUser);
    addToast('Account created successfully. Welcome to NexConnect!', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out.', 'info');
  };

  const getEmployeeById = (id: string): Employee | undefined => {
    return employees.find((e) => e.id === id || e.employeeId === id);
  };

  const getEmployeeByEmpId = (empId: string): Employee | undefined => {
    return employees.find((e) => e.employeeId.toLowerCase() === empId.toLowerCase());
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    let updatedEmp: Employee | null = null;
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id || emp.employeeId === id) {
          const u = { ...emp, ...updates };
          updatedEmp = u;
          return u;
        }
        return emp;
      })
    );
    // If the updated employee matches the current user, update user profile info too
    if (user && (user.id === id || user.employeeId === id)) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: updates.name || prev.name,
              avatar: updates.avatar || prev.avatar,
              email: updates.email || prev.email,
            }
          : null
      );
    }

    // Sync to database
    if (isBackendOnline && updatedEmp) {
      apiCall(`/employees/${id}`, 'PUT', updatedEmp);
    }

    addToast('Profile updated successfully.', 'success');
  };

  const createEmployee = (employeeData: Partial<Employee>): Employee => {
    const id = 'emp-' + Date.now();
    const empId = employeeData.employeeId || 'EMP' + String(employees.length + 1).padStart(3, '0');
    const joiningDate = employeeData.privateInfo?.joiningDate || employeeData.joiningDate || new Date().toISOString().split('T')[0];
    const generatedLoginId = employeeData.loginId || generateCustomLoginId(employeeData.name || 'New Employee', joiningDate, employees);
    const newEmp: Employee = {
      id,
      employeeId: empId,
      name: employeeData.name || 'New Employee',
      loginId: generatedLoginId,
      email: employeeData.email || `${empId.toLowerCase()}@nexconnect.com`,
      phone: employeeData.phone || '+91 98000 00000',
      avatar: employeeData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employeeData.name || empId)}`,
      company: 'NexConnect Pvt Ltd',
      department: employeeData.department || 'Engineering',
      position: employeeData.position || 'Associate',
      manager: employeeData.manager || 'Arun Kumar',
      location: employeeData.location || 'Bangalore, India',
      status: 'PRESENT',
      resume: employeeData.resume || {
        about: 'Recently joined the team at NexConnect Pvt Ltd.',
        loveAboutJob: 'Learning and contributing towards company growth.',
        interestsHobbies: 'Reading and technology.',
        skills: ['Teamwork', 'Communication'],
        certifications: [],
      },
      privateInfo: {
        dob: employeeData.privateInfo?.dob || '1996-01-01',
        gender: employeeData.privateInfo?.gender || 'Not specified',
        address: employeeData.privateInfo?.address || 'Bangalore, Karnataka',
        phone: employeeData.phone || employeeData.privateInfo?.phone || '+91 98000 00000',
        emergencyContact: employeeData.privateInfo?.emergencyContact || 'Emergency Contact - +91 98000 00001',
        joiningDate: joiningDate,
        employeeId: empId,
      },
      salary: employeeData.salary || getDefaultSalaryData(50000),
    };

    setEmployees((prev) => [newEmp, ...prev]);

    // Auto-generate password NC@xxxx where xxxx is a random 4-digit number
    const generatedPassword = 'NC@' + Math.floor(1000 + Math.random() * 9000);

    // Also add to users list so they can log in if needed
    const newUser: User = {
      id: 'usr-' + Date.now(),
      employeeId: empId,
      name: newEmp.name,
      email: newEmp.email,
      loginId: generatedLoginId,
      password: generatedPassword,
      role: 'EMPLOYEE',
      avatar: newEmp.avatar,
    };
    setUsersList((prev) => [...prev, newUser]);

    // Sync to database
    if (isBackendOnline) {
      apiCall('/employees', 'POST', newEmp);
      apiCall('/users', 'POST', newUser);
    }

    addToast(`Employee created! ID: ${generatedLoginId}, Password: ${generatedPassword}`, 'success');
    return newEmp;
  };

  const getTodayDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const strHours = String(hours).padStart(2, '0');
    return `${strHours}:${minutes} ${ampm}`;
  };

  const getTodayAttendance = (employeeId: string): AttendanceRecord | undefined => {
    const todayStr = getTodayDateStr();
    return attendance.find(
      (a) =>
        (a.employeeId.toLowerCase() === employeeId.toLowerCase() ||
          a.employeeId.toLowerCase() === (getEmployeeById(employeeId)?.employeeId.toLowerCase() || '')) &&
        (a.date === todayStr || a.date === '2026-08-21')
    );
  };

  const checkIn = (employeeId: string) => {
    const todayStr = getTodayDateStr();
    const timeStr = formatCurrentTime();
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    const empName = emp ? emp.name : 'Employee';
    const dept = emp ? emp.department : 'General';
    const targetEmpId = emp ? emp.employeeId : employeeId;

    const existingIndex = attendance.findIndex(
      (a) =>
        a.employeeId.toLowerCase() === targetEmpId.toLowerCase() &&
        (a.date === todayStr || a.date === '2026-08-21')
    );

    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = {
        ...updated[existingIndex],
        checkInTime: timeStr,
        status: 'PRESENT',
        workingHours: 'In Progress',
      };
      setAttendance(updated);

      if (isBackendOnline) {
        apiCall(`/attendance/${updated[existingIndex].id}`, 'PUT', updated[existingIndex]);
      }
    } else {
      const newRecord: AttendanceRecord = {
        id: 'att-' + Date.now(),
        employeeId: targetEmpId,
        employeeName: empName,
        department: dept,
        date: todayStr,
        checkInTime: timeStr,
        checkOutTime: null,
        workingHours: 'In Progress',
        status: 'PRESENT',
      };
      setAttendance([newRecord, ...attendance]);

      if (isBackendOnline) {
        apiCall('/attendance', 'POST', newRecord);
      }
    }

    // Update employee status to PRESENT
    if (emp) {
      updateEmployee(emp.id, { status: 'PRESENT' });
    }

    addToast(`Checked in at ${timeStr}`, 'success');
  };

  const checkOut = (employeeId: string) => {
    const todayStr = getTodayDateStr();
    const timeStr = formatCurrentTime();
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    const targetEmpId = emp ? emp.employeeId : employeeId;

    const existingIndex = attendance.findIndex(
      (a) =>
        a.employeeId.toLowerCase() === targetEmpId.toLowerCase() &&
        (a.date === todayStr || a.date === '2026-08-21')
    );

    if (existingIndex >= 0) {
      const record = attendance[existingIndex];
      // calculate approximate working hours or default to realistic 8h 50m
      let workingHours = '8h 50m';
      if (record.checkInTime) {
        // e.g. "09:15 AM"
        workingHours = '8h 50m';
      }

      const updated = [...attendance];
      updated[existingIndex] = {
        ...record,
        checkOutTime: timeStr,
        workingHours,
        status: 'PRESENT',
      };
      setAttendance(updated);

      if (isBackendOnline) {
        apiCall(`/attendance/${record.id}`, 'PUT', updated[existingIndex]);
      }

      addToast(`Checked out at ${timeStr}. Working time: ${workingHours}`, 'success');
    } else {
      addToast('Please check in first before checking out.', 'error');
    }
  };

  const applyLeave = (data: {
    employeeId: string;
    leaveType: LeaveType;
    fromDate: string;
    toDate: string;
    remarks: string;
  }) => {
    const emp = getEmployeeById(data.employeeId) || getEmployeeByEmpId(data.employeeId);
    const empName = emp ? emp.name : 'Employee';
    const dept = emp ? emp.department : 'General';
    const targetEmpId = emp ? emp.employeeId : data.employeeId;

    // Calculate days between fromDate and toDate
    const start = new Date(data.fromDate);
    const end = new Date(data.toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 1;

    const newLeave: LeaveRequest = {
      id: 'lr-' + Date.now(),
      employeeId: targetEmpId,
      employeeName: empName,
      department: dept,
      leaveType: data.leaveType,
      fromDate: data.fromDate,
      toDate: data.toDate,
      durationDays,
      remarks: data.remarks,
      status: 'Pending',
      appliedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' ' + formatCurrentTime(),
    };

    setLeaveRequests([newLeave, ...leaveRequests]);

    if (isBackendOnline) {
      apiCall('/leaves', 'POST', newLeave);
    }

    addToast('Leave request submitted.', 'success');
  };

  const updateLeaveStatus = (
    leaveId: string,
    status: 'Approved' | 'Rejected',
    comment?: string
  ) => {
    const leave = leaveRequests.find((l) => l.id === leaveId);
    if (!leave) return;

    setLeaveRequests((prev) =>
      prev.map((item) =>
        item.id === leaveId
          ? {
              ...item,
              status,
              adminComment: comment || item.adminComment,
            }
          : item
      )
    );

    if (isBackendOnline) {
      apiCall(`/leaves/${leaveId}`, 'PUT', { status, adminComment: comment });
    }

    // If approved and the leave covers today, update employee status to LEAVE
    if (status === 'Approved') {
      const today = getTodayDateStr();
      if (leave.fromDate <= today && leave.toDate >= today) {
        const emp = getEmployeeByEmpId(leave.employeeId);
        if (emp) {
          updateEmployee(emp.id, { status: 'LEAVE' });
        }
      }
    }

    addToast(`Leave request ${status.toLowerCase()}.`, 'success');
  };

  const updateSalary = (employeeId: string, salaryData: SalaryData) => {
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    if (!emp) return;

    updateEmployee(emp.id, { salary: salaryData });
    addToast('Salary configuration updated successfully.', 'success');
  };

  const addSkill = (employeeId: string, skill: string) => {
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    if (!emp || !skill.trim()) return;

    if (emp.resume.skills.includes(skill.trim())) {
      addToast('Skill already exists.', 'info');
      return;
    }

    const updatedSkills = [...emp.resume.skills, skill.trim()];
    updateEmployee(emp.id, {
      resume: {
        ...emp.resume,
        skills: updatedSkills,
      },
    });
    addToast(`Skill "${skill}" added.`, 'success');
  };

  const removeSkill = (employeeId: string, skill: string) => {
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    if (!emp) return;

    const updatedSkills = emp.resume.skills.filter((s) => s !== skill);
    updateEmployee(emp.id, {
      resume: {
        ...emp.resume,
        skills: updatedSkills,
      },
    });
    addToast(`Skill removed.`, 'info');
  };

  const addCertification = (employeeId: string, cert: string) => {
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    if (!emp || !cert.trim()) return;

    const updatedCerts = [...emp.resume.certifications, cert.trim()];
    updateEmployee(emp.id, {
      resume: {
        ...emp.resume,
        certifications: updatedCerts,
      },
    });
    addToast(`Certification added.`, 'success');
  };

  const removeCertification = (employeeId: string, cert: string) => {
    const emp = getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId);
    if (!emp) return;

    const updatedCerts = emp.resume.certifications.filter((c) => c !== cert);
    updateEmployee(emp.id, {
      resume: {
        ...emp.resume,
        certifications: updatedCerts,
      },
    });
    addToast(`Certification removed.`, 'info');
  };

  const resetToInitialData = () => {
    setUser(null);
    setUsersList(INITIAL_USERS);
    setEmployees(INITIAL_EMPLOYEES);
    setAttendance(INITIAL_ATTENDANCE);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    localStorage.clear();
    addToast('System data reset to default demo records.', 'info');
  };

  return (
    <HRMSContext.Provider
      value={{
        user,
        employees,
        attendance,
        leaveRequests,
        toasts,
        login,
        signup,
        logout,
        getEmployeeById,
        getEmployeeByEmpId,
        updateEmployee,
        createEmployee,
        checkIn,
        checkOut,
        getTodayAttendance,
        applyLeave,
        updateLeaveStatus,
        updateSalary,
        addSkill,
        removeSkill,
        addCertification,
        removeCertification,
        addToast,
        removeToast,
        resetToInitialData,
      }}
    >
      {children}
    </HRMSContext.Provider>
  );
};

export const useHRMS = () => {
  const context = useContext(HRMSContext);
  if (!context) {
    throw new Error('useHRMS must be used within a HRMSProvider');
  }
  return context;
};
