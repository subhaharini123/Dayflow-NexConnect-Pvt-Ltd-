import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminSignUpData,
  AuthViewMode,
  Department,
  EmployeeCreationData,
  UserAccount,
} from '../types';
import {
  extractCompanyCode,
  generateLoginId,
  generateSecureTempPassword,
} from '../utils/idGenerator';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  authView: AuthViewMode;
  pendingFirstLoginUser: UserAccount | null;
  activeCompany: {
    name: string;
    code: string;
    logo?: string;
  };
  setAuthView: (view: AuthViewMode) => void;
  signIn: (
    loginIdOrEmail: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string; isFirstLogin?: boolean }>;
  signUpAdmin: (
    data: AdminSignUpData
  ) => Promise<{ success: boolean; user?: UserAccount; error?: string }>;
  createEmployee: (
    data: EmployeeCreationData
  ) => { user: UserAccount; tempPassword: string; loginId: string };
  changePasswordOnFirstLogin: (
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (
    identifier: string
  ) => Promise<{ success: boolean; tempPassword?: string; loginId?: string; error?: string }>;
  signOut: () => void;
  updateCompanyLogo: (logoUrl: string) => void;
  switchUserQuickly: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEYS = {
  CURRENT_USER: 'dayflow_current_user_v2',
  USERS: 'dayflow_users_v2',
  COMPANY: 'dayflow_company_v2',
};

const DEFAULT_COMPANY = {
  name: 'Odoo India',
  code: 'OI',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
};

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-1',
    loginId: 'OISACON20260001',
    name: 'Sarah Connor',
    email: 'sarah.connor@odoo.com',
    phone: '+91 98765 43210',
    password: 'Password@123',
    companyName: 'Odoo India',
    companyCode: 'OI',
    companyLogo: DEFAULT_COMPANY.logo,
    role: 'admin',
    department: 'Human Resources',
    jobTitle: 'HR Director & Admin',
    yearOfJoining: 2026,
    serialNumber: 1,
    isFirstLogin: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10T09:00:00.000Z',
  },
  {
    id: 'usr-2',
    loginId: 'OIJODO20260002',
    name: 'John Doe',
    email: 'john.doe@odoo.com',
    phone: '+91 98111 22334',
    password: 'Temp#987!',
    companyName: 'Odoo India',
    companyCode: 'OI',
    companyLogo: DEFAULT_COMPANY.logo,
    role: 'employee',
    department: 'Engineering',
    jobTitle: 'Frontend Engineer',
    yearOfJoining: 2026,
    serialNumber: 2,
    isFirstLogin: true, // Configured for first-login password change flow
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T10:00:00.000Z',
  },
  {
    id: 'usr-3',
    loginId: 'OIALCH20260003',
    name: 'Alex Chen',
    email: 'alex.chen@odoo.com',
    phone: '+91 98222 33445',
    password: 'Password@123',
    companyName: 'Odoo India',
    companyCode: 'OI',
    companyLogo: DEFAULT_COMPANY.logo,
    role: 'employee',
    department: 'Engineering',
    jobTitle: 'Senior Frontend Engineer',
    yearOfJoining: 2026,
    serialNumber: 3,
    isFirstLogin: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-15T09:30:00.000Z',
  },
  {
    id: 'usr-4',
    loginId: 'OIELRO20260004',
    name: 'Elena Rostova',
    email: 'elena.rostova@odoo.com',
    phone: '+91 98333 44556',
    password: 'Password@123',
    companyName: 'Odoo India',
    companyCode: 'OI',
    companyLogo: DEFAULT_COMPANY.logo,
    role: 'employee',
    department: 'Product & Design',
    jobTitle: 'Lead Product Designer',
    yearOfJoining: 2026,
    serialNumber: 4,
    isFirstLogin: false,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-01T11:00:00.000Z',
  },
  {
    id: 'usr-5',
    loginId: 'OIMAVA20260005',
    name: 'Marcus Vance',
    email: 'marcus.vance@odoo.com',
    phone: '+91 98444 55667',
    password: 'Password@123',
    companyName: 'Odoo India',
    companyCode: 'OI',
    companyLogo: DEFAULT_COMPANY.logo,
    role: 'employee',
    department: 'Engineering',
    jobTitle: 'Backend Tech Lead',
    yearOfJoining: 2026,
    serialNumber: 5,
    isFirstLogin: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-10T09:00:00.000Z',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users', e);
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current user', e);
      }
    }
    // Default to null so user lands on the beautiful Auth page
    return null;
  });

  const [pendingFirstLoginUser, setPendingFirstLoginUser] = useState<UserAccount | null>(null);
  const [authView, setAuthView] = useState<AuthViewMode>('signin');

  const [activeCompany, setActiveCompany] = useState<{
    name: string;
    code: string;
    logo?: string;
  }>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEYS.COMPANY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse company', e);
      }
    }
    return DEFAULT_COMPANY;
  });

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  // Sync current user to storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Sync company info
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEYS.COMPANY, JSON.stringify(activeCompany));
  }, [activeCompany]);

  // SIGN IN Handler
  const signIn = async (
    loginIdOrEmail: string,
    password: string,
    rememberMe = true
  ): Promise<{ success: boolean; error?: string; isFirstLogin?: boolean }> => {
    const query = loginIdOrEmail.trim().toLowerCase();
    
    // Search by Login ID (case insensitive) or Email
    const user = users.find(
      (u) =>
        u.loginId.toLowerCase() === query ||
        u.email.toLowerCase() === query
    );

    if (!user) {
      return {
        success: false,
        error: 'No account found matching this Login ID or Email. Please check your credentials.',
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error: 'Invalid password. Please check your credentials or contact HR.',
      };
    }

    // Check if First Login requires password change
    if (user.isFirstLogin) {
      setPendingFirstLoginUser(user);
      setAuthView('first_login_change_password');
      return {
        success: true,
        isFirstLogin: true,
      };
    }

    setCurrentUser(user);
    if (!rememberMe) {
      // transient session
    }
    return { success: true, isFirstLogin: false };
  };

  // ADMIN SIGN UP Handler (Creates new organization + initial Admin account)
  const signUpAdmin = async (
    data: AdminSignUpData
  ): Promise<{ success: boolean; user?: UserAccount; error?: string }> => {
    // Check if email already registered
    const existing = users.find((u) => u.email.toLowerCase() === data.email.trim().toLowerCase());
    if (existing) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in.',
      };
    }

    const companyCode = extractCompanyCode(data.companyName);
    const currentYear = new Date().getFullYear();
    
    // Count serials for this company in current year
    const companyYearUsers = users.filter(
      (u) => u.companyCode === companyCode && u.yearOfJoining === currentYear
    );
    const serial = companyYearUsers.length + 1;

    const generatedLoginId = generateLoginId(
      data.companyName,
      data.name,
      currentYear,
      serial
    );

    const newAdminUser: UserAccount = {
      id: `usr-${Date.now()}`,
      loginId: generatedLoginId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      companyName: data.companyName.trim(),
      companyCode,
      companyLogo: data.companyLogo || DEFAULT_COMPANY.logo,
      role: 'admin',
      department: 'Human Resources',
      jobTitle: 'Admin & HR Executive',
      yearOfJoining: currentYear,
      serialNumber: serial,
      isFirstLogin: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [newAdminUser, ...prev]);
    setActiveCompany({
      name: data.companyName.trim(),
      code: companyCode,
      logo: data.companyLogo || DEFAULT_COMPANY.logo,
    });
    setCurrentUser(newAdminUser);

    return {
      success: true,
      user: newAdminUser,
    };
  };

  // HR / ADMIN ADDS EMPLOYEE (Auto-generates ID & Temporary Password)
  const createEmployee = (
    data: EmployeeCreationData
  ): { user: UserAccount; tempPassword: string; loginId: string } => {
    const year = data.yearOfJoining || new Date().getFullYear();
    const companyCode = activeCompany.code || 'OI';

    // Calculate serial for the active year and company
    const matchingYearUsers = users.filter(
      (u) => u.companyCode === companyCode && u.yearOfJoining === year
    );
    const serial = matchingYearUsers.length + 1;

    const loginId = generateLoginId(
      activeCompany.name,
      data.name,
      year,
      serial
    );

    const tempPassword = generateSecureTempPassword(9);

    const newEmployee: UserAccount = {
      id: `usr-${Date.now()}`,
      loginId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: tempPassword,
      companyName: activeCompany.name,
      companyCode,
      companyLogo: activeCompany.logo,
      role: 'employee',
      department: data.department,
      jobTitle: data.jobTitle.trim(),
      yearOfJoining: year,
      serialNumber: serial,
      isFirstLogin: true, // forces password change upon first login
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (serial % 50)}?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newEmployee]);

    return {
      user: newEmployee,
      tempPassword,
      loginId,
    };
  };

  // FIRST LOGIN: Change temporary password
  const changePasswordOnFirstLogin = async (
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!pendingFirstLoginUser) {
      return { success: false, error: 'No active session found. Please sign in again.' };
    }

    const updatedUser: UserAccount = {
      ...pendingFirstLoginUser,
      password: newPassword,
      isFirstLogin: false,
    };

    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    setCurrentUser(updatedUser);
    setPendingFirstLoginUser(null);
    setAuthView('signin');

    return { success: true };
  };

  // Forgot password mock
  const requestPasswordReset = async (
    identifier: string
  ): Promise<{ success: boolean; tempPassword?: string; loginId?: string; error?: string }> => {
    const query = identifier.trim().toLowerCase();
    const user = users.find(
      (u) => u.loginId.toLowerCase() === query || u.email.toLowerCase() === query
    );

    if (!user) {
      return {
        success: false,
        error: 'No registered user found with that Login ID or Email.',
      };
    }

    const newTempPassword = generateSecureTempPassword(8);
    const updatedUser: UserAccount = {
      ...user,
      password: newTempPassword,
      isFirstLogin: true,
    };

    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    return {
      success: true,
      tempPassword: newTempPassword,
      loginId: user.loginId,
    };
  };

  const signOut = () => {
    setCurrentUser(null);
    setPendingFirstLoginUser(null);
    setAuthView('signin');
  };

  const updateCompanyLogo = (logoUrl: string) => {
    setActiveCompany((prev) => ({ ...prev, logo: logoUrl }));
    setUsers((prev) =>
      prev.map((u) => ({ ...u, companyLogo: logoUrl }))
    );
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, companyLogo: logoUrl } : null));
    }
  };

  const switchUserQuickly = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        authView,
        pendingFirstLoginUser,
        activeCompany,
        setAuthView,
        signIn,
        signUpAdmin,
        createEmployee,
        changePasswordOnFirstLogin,
        requestPasswordReset,
        signOut,
        updateCompanyLogo,
        switchUserQuickly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
