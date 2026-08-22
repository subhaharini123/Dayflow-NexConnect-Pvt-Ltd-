import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  UserPlus,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  KeyRound,
  Copy,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Department, EmployeeCreationData, UserAccount } from '../../types';
import { extractNameCode, generateLoginId } from '../../utils/idGenerator';

interface OnboardEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEPARTMENTS: Department[] = [
  'Engineering',
  'Product & Design',
  'Human Resources',
  'Marketing',
  'Sales & Ops',
  'Finance',
];

export const OnboardEmployeeModal: React.FC<OnboardEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeCompany, users, createEmployee } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<Department>('Engineering');
  const [jobTitle, setJobTitle] = useState('');
  const [yearOfJoining, setYearOfJoining] = useState<number>(new Date().getFullYear());

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [createdResult, setCreatedResult] = useState<{
    user: UserAccount;
    tempPassword: string;
    loginId: string;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Calculate Next Serial & Preview Login ID
  const nextSerial = useMemo(() => {
    const matchingYearUsers = users.filter(
      (u) => u.companyCode === activeCompany.code && u.yearOfJoining === yearOfJoining
    );
    return matchingYearUsers.length + 1;
  }, [users, activeCompany.code, yearOfJoining]);

  const previewNameCode = useMemo(() => extractNameCode(name || 'New Employee'), [name]);

  const previewLoginId = useMemo(() => {
    return generateLoginId(
      activeCompany.name,
      name || 'New Employee',
      yearOfJoining,
      nextSerial
    );
  }, [activeCompany.name, name, yearOfJoining, nextSerial]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = () => {
    if (!createdResult) return;
    const summary = `Dayflow HRMS Credentials:
Company: ${activeCompany.name}
Name: ${createdResult.user.name}
Login ID: ${createdResult.loginId}
Temporary Password: ${createdResult.tempPassword}
Portal: https://dayflow.odoo.internal
Note: You will be prompted to set your permanent password on first login.`;

    navigator.clipboard.writeText(summary);
    setCopiedField('all');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter the employee full name.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!jobTitle.trim()) {
      setErrorMessage('Please enter the job title / designation.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = createEmployee({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || '+91 98000 00000',
        department,
        jobTitle: jobTitle.trim(),
        yearOfJoining,
      });

      setCreatedResult(res);
      setIsLoading(false);
    }, 500);
  };

  const handleResetAndClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setJobTitle('');
    setCreatedResult(null);
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Onboard New Employee</h3>
              <p className="text-xs text-purple-200/80">
                Auto-generates Login ID and temporary secure password
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {createdResult ? (
            /* Success & Credentials Reveal Screen */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Employee Successfully Provisioned!
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Account for <strong>{createdResult.user.name}</strong> is created. Share these credentials with the employee.
                  </p>
                </div>
              </div>

              {/* Credentials Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Generated Credentials
                  </span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">
                    Auto Generated
                  </span>
                </div>

                {/* Login ID */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">LOGIN ID</span>
                    <span className="font-mono font-bold text-purple-700 text-sm">
                      {createdResult.loginId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(createdResult.loginId, 'id')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === 'id' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Temporary Password */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">
                      TEMPORARY PASSWORD
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {createdResult.tempPassword}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(createdResult.tempPassword, 'pw')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === 'pw' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Security Note */}
                <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>First-time sign-in policy:</strong> The employee will be forced to change this temporary password immediately upon their first login.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedField === 'all' ? 'Copied Summary!' : 'Copy Full Credential Pack'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedResult(null);
                    setName('');
                    setEmail('');
                    setJobTitle('');
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
                >
                  + Add Another
                </button>
              </div>
            </motion.div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Live Formula Preview Bar */}
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-purple-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Auto-Generated ID Preview:
                  </span>
                  <span className="font-mono font-bold text-purple-700 text-xs bg-white px-2 py-0.5 rounded border border-purple-200">
                    {previewLoginId}
                  </span>
                </div>
                <div className="text-[10px] text-purple-700/80 font-mono">
                  [{activeCompany.code}] + [{previewNameCode}] + [{yearOfJoining}] + [{String(nextSerial).padStart(4, '0')}]
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@odoo.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98111 22334"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Department & Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as Department)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Year of Joining */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Joining
                </label>
                <input
                  type="number"
                  min="2020"
                  max="2030"
                  value={yearOfJoining}
                  onChange={(e) => setYearOfJoining(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Generate Credentials &amp; Onboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
