import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
  KeyRound,
  Shield,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignInForm: React.FC = () => {
  const { signIn, setAuthView, users } = useAuth();

  const [loginIdOrEmail, setLoginIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Quick Demo Accounts
  const adminDemo = users.find((u) => u.role === 'admin') || users[0];
  const firstLoginDemo = users.find((u) => u.isFirstLogin);
  const employeeDemo = users.find((u) => u.role === 'employee' && !u.isFirstLogin) || users[1];

  const handleFillDemo = (identifier: string, pass: string) => {
    setLoginIdOrEmail(identifier);
    setPassword(pass);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdOrEmail.trim()) {
      setErrorMessage('Please enter your Login ID or Work Email.');
      triggerShake();
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    // Simulate brief network latency for smooth interaction
    await new Promise((resolve) => setTimeout(resolve, 600));

    const result = await signIn(loginIdOrEmail, password, rememberMe);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
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
    <div className="w-full max-w-md mx-auto">
      {/* Top Logo and Header */}
      <div className="text-center sm:text-left mb-7">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Dayflow Unified Auth</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your auto-generated Login ID or Email to access your portal.
        </p>
      </div>

      {/* Quick Demo Credentials Bar */}
      <div className="mb-6 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-purple-600" />
            Quick Test Accounts:
          </span>
          <span className="text-[10px] text-slate-400">Click to autofill</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          {adminDemo && (
            <button
              type="button"
              onClick={() => handleFillDemo(adminDemo.loginId, 'Password@123')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-slate-700 text-xs transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-700">HR Admin</span>
                <span className="text-[9px] bg-purple-100 text-purple-700 px-1 rounded">Admin</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block truncate">
                {adminDemo.loginId}
              </span>
            </button>
          )}

          {firstLoginDemo && (
            <button
              type="button"
              onClick={() => handleFillDemo(firstLoginDemo.loginId, firstLoginDemo.password || 'Temp#987!')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-700 text-xs transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-amber-700">1st-Time Emp</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded">Reset PW</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block truncate">
                {firstLoginDemo.loginId}
              </span>
            </button>
          )}

          {employeeDemo && (
            <button
              type="button"
              onClick={() => handleFillDemo(employeeDemo.loginId, 'Password@123')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-slate-700 text-xs transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Employee</span>
                <span className="text-[9px] bg-blue-100 text-blue-700 px-1 rounded">Active</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block truncate">
                {employeeDemo.loginId}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Sign In Form */}
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* Error Alert */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 shadow-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1">
              <p className="font-medium">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Login ID / Email Input */}
        <div>
          <label
            htmlFor="signin-login-id"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Login ID / Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="signin-login-id"
              type="text"
              value={loginIdOrEmail}
              onChange={(e) => {
                setLoginIdOrEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="e.g. OIJODO20260002 or name@odoo.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
            Use your system-generated ID (e.g. <span className="font-mono text-slate-600 font-semibold">OIJODO20260002</span>) or email
          </p>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="signin-password"
              className="text-xs font-semibold text-slate-700"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setAuthView('forgot')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter your password"
              className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 accent-purple-600"
            />
            <span className="text-xs text-slate-600 font-medium">Remember this device</span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Signed In Successfully</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.form>

      {/* Sign Up Redirect & Business Rules Notice */}
      <div className="mt-7 pt-5 border-t border-slate-200/80 text-center space-y-3">
        <p className="text-xs text-slate-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setAuthView('signup')}
            className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors cursor-pointer"
          >
            Sign Up as Admin / HR
          </button>
        </p>

        {/* Access Policy Note */}
        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-purple-900/80 text-left flex items-start gap-2">
          <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-purple-950">Employee Access Policy:</strong> Standard
            employees cannot self-register. Your account and temporary password are automatically
            generated upon HR onboarding.
          </p>
        </div>
      </div>
    </div>
  );
};
