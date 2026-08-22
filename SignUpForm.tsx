import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Shield,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  calculatePasswordStrength,
  extractCompanyCode,
  extractNameCode,
  generateLoginId,
} from '../../utils/idGenerator';

export const SignUpForm: React.FC = () => {
  const { signUpAdmin, setAuthView } = useAuth();

  const [companyName, setCompanyName] = useState('Odoo India');
  const [companyLogo, setCompanyLogo] = useState<string | undefined>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Live Login ID Calculation
  const currentYear = new Date().getFullYear();
  const previewCompanyCode = useMemo(() => extractCompanyCode(companyName), [companyName]);
  const previewNameCode = useMemo(() => extractNameCode(fullName || 'Admin User'), [fullName]);
  const previewLoginId = useMemo(
    () => generateLoginId(companyName || 'Dayflow', fullName || 'Admin User', currentYear, 1),
    [companyName, fullName, currentYear]
  );

  // Password strength computation
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  // Password match status
  const isPasswordMatch = confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  // Handle Logo Upload (File / Drag & Drop)
  const handleLogoFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCompanyLogo(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validations
    if (!companyName.trim()) {
      setErrorMessage('Please enter your Company Name.');
      triggerShake();
      return;
    }
    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      triggerShake();
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid work email address.');
      triggerShake();
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please enter a valid contact phone number.');
      triggerShake();
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      triggerShake();
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const res = await signUpAdmin({
      companyName: companyName.trim(),
      companyLogo,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
    });

    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to create organization account.');
      triggerShake();
    } else {
      setIsSuccess(true);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-2">
      {/* Top Title & Header */}
      <div className="text-center sm:text-left mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Organization &amp; HR Onboarding</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Create Company Admin
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Set up your organization workspace. Your Admin Login ID will be automatically generated.
        </p>
      </div>

      {/* Live Auto-Generated Login ID Preview Pill */}
      <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-200/80">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-purple-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            System Auto-Generated Login ID:
          </span>
          <span className="text-[10px] font-medium text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">
            Real-time Formula
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold">
          <span className="bg-white border border-purple-300 text-purple-700 px-2 py-1 rounded-lg shadow-2xs">
            {previewCompanyCode}
            <span className="font-sans font-normal text-[9px] text-slate-400 block">Company</span>
          </span>
          <span className="text-slate-400">+</span>
          <span className="bg-white border border-blue-300 text-blue-700 px-2 py-1 rounded-lg shadow-2xs">
            {previewNameCode}
            <span className="font-sans font-normal text-[9px] text-slate-400 block">Name</span>
          </span>
          <span className="text-slate-400">+</span>
          <span className="bg-white border border-emerald-300 text-emerald-700 px-2 py-1 rounded-lg shadow-2xs">
            {currentYear}
            <span className="font-sans font-normal text-[9px] text-slate-400 block">Year</span>
          </span>
          <span className="text-slate-400">+</span>
          <span className="bg-white border border-amber-300 text-amber-700 px-2 py-1 rounded-lg shadow-2xs">
            0001
            <span className="font-sans font-normal text-[9px] text-slate-400 block">Serial</span>
          </span>
          <span className="text-slate-400">=</span>
          <span className="bg-purple-600 text-white px-2.5 py-1 rounded-lg shadow-sm font-bold text-xs ml-auto">
            {previewLoginId}
          </span>
        </div>
      </div>

      {/* Main Sign Up Form */}
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* Error message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <p className="font-medium">{errorMessage}</p>
          </motion.div>
        )}

        {/* Company Name & Logo Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* Company Name */}
          <div className="sm:col-span-7">
            <label
              htmlFor="signup-company"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Company Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                id="signup-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Odoo India"
                className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Company Code: <strong className="text-purple-600 font-mono">{previewCompanyCode}</strong>
            </span>
          </div>

          {/* Company Logo Upload Box */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Logo
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-xl p-2 bg-purple-50/30 hover:bg-purple-50/60 transition-colors flex items-center gap-2 cursor-pointer group"
            >
              {companyLogo ? (
                <div className="flex items-center gap-2 w-full">
                  <img
                    src={companyLogo}
                    alt="Logo preview"
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-slate-700 block truncate">
                      Logo Uploaded
                    </span>
                    <label
                      htmlFor="logo-input"
                      className="text-[10px] text-purple-600 font-medium hover:underline cursor-pointer"
                    >
                      Change image
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompanyLogo(undefined);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-full hover:bg-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo-input"
                  className="flex items-center justify-center gap-1.5 w-full py-1 text-slate-500 hover:text-purple-600 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-[11px] font-medium">Upload Logo</span>
                </label>
              )}
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleLogoFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-fullname"
            className="block text-xs font-semibold text-slate-700 mb-1"
          >
            Admin Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="signup-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Sarah Connor"
              className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
            />
          </div>
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Work Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@odoo.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-phone"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 chars"
                className="w-full pl-9 pr-8 py-2 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="signup-confirm-password"
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between"
            >
              <span>Confirm Password <span className="text-rose-500">*</span></span>
              {isPasswordMatch && (
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Match
                </span>
              )}
              {isPasswordMismatch && (
                <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-0.5">
                  <XCircle className="w-3 h-3" /> Mismatch
                </span>
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full pl-9 pr-8 py-2 bg-slate-50/70 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 transition-all ${
                  isPasswordMatch
                    ? 'border-emerald-500 focus:border-emerald-500'
                    : isPasswordMismatch
                    ? 'border-rose-400 focus:border-rose-400'
                    : 'border-slate-300 focus:border-purple-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Password Strength Meter Bar */}
        {password.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Password Strength:</span>
              <span className={`font-bold ${strength.color}`}>{strength.label}</span>
            </div>
            {/* 4 Segment Progress Bar */}
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-full rounded-full transition-all duration-300 ${
                    step <= strength.score ? strength.bgColor : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-500">
              <span className={strength.passedCriteria.length ? 'text-emerald-600 font-medium' : ''}>
                ✓ 8+ Chars
              </span>
              <span className={strength.passedCriteria.hasUpper ? 'text-emerald-600 font-medium' : ''}>
                ✓ Uppercase
              </span>
              <span className={strength.passedCriteria.hasLower ? 'text-emerald-600 font-medium' : ''}>
                ✓ Lowercase
              </span>
              <span className={strength.passedCriteria.hasNumber ? 'text-emerald-600 font-medium' : ''}>
                ✓ Number
              </span>
            </div>
          </div>
        )}

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Organization Workspace...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Organization Created</span>
            </>
          ) : (
            <>
              <span>Sign Up &amp; Launch HRMS</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.form>

      {/* Footer Navigation */}
      <div className="mt-5 pt-3 border-t border-slate-200/80 text-center">
        <p className="text-xs text-slate-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setAuthView('signin')}
            className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
