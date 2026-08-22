import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  KeyRound,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { calculatePasswordStrength } from '../../utils/idGenerator';

export const FirstLoginChangePasswordModal: React.FC = () => {
  const { pendingFirstLoginUser, changePasswordOnFirstLogin, setAuthView, signOut } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const strength = useMemo(() => calculatePasswordStrength(newPassword), [newPassword]);
  const isMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const isMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters.');
      triggerShake();
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Confirm password does not match.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = await changePasswordOnFirstLogin(newPassword);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to update password.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      {/* Top Banner */}
      <div className="text-center sm:text-left mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Mandatory Security Step</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Set Permanent Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Welcome to Dayflow, <strong className="text-slate-800">{pendingFirstLoginUser?.name || 'Team Member'}</strong>!
          Because this is your first time signing in with a temporary credentials pack, please choose a private password.
        </p>
      </div>

      {/* Account Details Box */}
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Your Login ID</span>
          <span className="font-mono font-bold text-purple-700 text-sm">{pendingFirstLoginUser?.loginId}</span>
        </div>
        <div className="text-right">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Role</span>
          <span className="font-semibold text-slate-700 capitalize">{pendingFirstLoginUser?.jobTitle || 'Employee'}</span>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            New Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new permanent password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span>Confirm New Password <span className="text-rose-500">*</span></span>
            {isMatch && (
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> Matches
              </span>
            )}
            {isMismatch && (
              <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-0.5">
                <XCircle className="w-3 h-3" /> Mismatch
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 transition-all ${
                isMatch
                  ? 'border-emerald-500 focus:border-emerald-500'
                  : isMismatch
                  ? 'border-rose-400 focus:border-rose-400'
                  : 'border-slate-300 focus:border-purple-600'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Real-time Strength Meter */}
        {newPassword.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Security Strength:</span>
              <span className={`font-bold ${strength.color}`}>{strength.label}</span>
            </div>
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
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Save &amp; Enter Dayflow</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.form>

      <div className="mt-5 pt-3 border-t border-slate-200 text-center">
        <button
          type="button"
          onClick={signOut}
          className="text-xs text-slate-500 hover:text-slate-700 hover:underline"
        >
          Sign in as a different user
        </button>
      </div>
    </div>
  );
};
