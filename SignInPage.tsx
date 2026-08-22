import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignInPage: React.FC = () => {
  const { users, currentUser, signIn, signOut } = useAuth();

  // Form input states
  const [loginIdOrEmail, setLoginIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation & Error states
  const [loginIdError, setLoginIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Signup notice state (since signup page should not be built)
  const [showSignUpNotice, setShowSignUpNotice] = useState(false);

  // If user is already authenticated, show the simple role-based destination screen
  if (currentUser) {
    const isHRorAdmin = currentUser.role === 'admin';
    const destinationDashboard = isHRorAdmin ? 'HR / Admin Dashboard' : 'Employee Dashboard';

    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
          {/* Logo placeholder */}
          <div className="w-full py-3 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center mb-2">
            <span className="font-heading font-bold text-xl tracking-wide text-gray-800 leading-tight">
              NexConnect
            </span>
            <span className="font-heading text-xs font-normal text-gray-500 tracking-normal leading-tight mt-0.5">
              Dayflow
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-6">Every workday, perfectly aligned.</p>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-md mb-5 text-left">
            <div className="flex items-center gap-2 text-purple-800 font-medium text-sm mb-1">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>Authentication Successful</span>
            </div>
            <p className="text-xs text-gray-700">
              Welcome back, <strong className="text-gray-900">{currentUser.name}</strong>!
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Designated Destination: <span className="font-semibold text-purple-700">{destinationDashboard}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              Login ID: {currentUser.loginId} | Role: {currentUser.role.toUpperCase()}
            </p>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out & Return to Login</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle Form Submission & Validation
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setLoginIdError(null);
    setPasswordError(null);
    setFormError(null);

    const trimmedLoginId = loginIdOrEmail.trim();
    let hasError = false;

    // 1. Validate Login ID / Email
    if (!trimmedLoginId) {
      setLoginIdError('Please enter your Login ID or Email.');
      hasError = true;
    }

    // 2. Validate Password
    if (!password) {
      setPasswordError('Please enter your password.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(trimmedLoginId, password);

      if (!result.success) {
        setFormError('Incorrect Login ID or password.');
      }
    } catch {
      setFormError('Incorrect Login ID or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (id: string, pass: string) => {
    setLoginIdOrEmail(id);
    setPassword(pass);
    setLoginIdError(null);
    setPasswordError(null);
    setFormError(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      {/* Centered Login Card */}
      <div className="w-full max-w-[420px] bg-white border border-gray-300 rounded-lg shadow-sm p-6 sm:p-8">
        
        {/* 1. Logo Area */}
        <div className="mb-6 text-center">
          <div className="w-full py-3 bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-2xl tracking-wide text-gray-800 leading-tight">
              NexConnect
            </span>
            <span className="font-heading text-xs font-normal text-gray-500 tracking-normal leading-tight mt-0.5">
              Dayflow
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-normal">
            Every workday, perfectly aligned.
          </p>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div
            id="login-error-banner"
            className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded text-red-600 text-xs font-medium text-center"
          >
            {formError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSignIn} noValidate className="space-y-4">
          {/* 2. Login ID / Email */}
          <div>
            <label
              htmlFor="loginIdInput"
              className="block text-sm font-medium text-gray-800 mb-1.5"
            >
              Login ID / Email :-
            </label>
            <input
              id="loginIdInput"
              type="text"
              value={loginIdOrEmail}
              onChange={(e) => {
                setLoginIdOrEmail(e.target.value);
                if (loginIdError) setLoginIdError(null);
                if (formError) setFormError(null);
              }}
              placeholder="Enter Login ID or Email"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 transition-colors ${
                loginIdError ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
              }`}
            />
            {loginIdError && (
              <p className="text-xs text-red-600 mt-1 font-normal">
                {loginIdError}
              </p>
            )}
          </div>

          {/* 3. Password */}
          <div>
            <label
              htmlFor="passwordInput"
              className="block text-sm font-medium text-gray-800 mb-1.5"
            >
              Password :-
            </label>
            <div className="relative">
              <input
                id="passwordInput"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                  if (formError) setFormError(null);
                }}
                placeholder="Enter Password"
                className={`w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 transition-colors ${
                  passwordError ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-600 mt-1 font-normal">
                {passwordError}
              </p>
            )}
          </div>

          {/* 4. Sign In Button */}
          <div className="pt-2">
            <button
              id="signInButton"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm rounded shadow-xs transition-colors cursor-pointer disabled:opacity-75 tracking-wider"
            >
              {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </div>
        </form>

        {/* 5. Sign Up Link */}
        <div className="mt-5 text-center">
          <p className="text-xs text-gray-600">
            Don't have an Account?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                setShowSignUpNotice(true);
              }}
              className="text-purple-600 font-semibold hover:text-purple-700 hover:underline cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Sign Up Notice Modal / Info */}
        {showSignUpNotice && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 text-center">
            <span>Navigation target: <strong>/signup</strong></span>
            <button
              type="button"
              onClick={() => setShowSignUpNotice(false)}
              className="block mx-auto mt-1.5 text-[11px] text-gray-500 hover:text-gray-800 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Test Accounts helper for reviewer convenience */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">
            Demo Credentials (Click to fill)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('sarah.connor@odoo.com', 'Password@123')}
              className="p-2 rounded bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-purple-700 block">HR / Admin</span>
              <span className="text-[10px] text-gray-500 block truncate">sarah.connor@odoo.com</span>
              <span className="text-[10px] text-gray-400">Password@123</span>
            </button>

            <button
              type="button"
              onClick={() => handleFillDemo('alex.chen@odoo.com', 'Password@123')}
              className="p-2 rounded bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-purple-700 block">Employee</span>
              <span className="text-[10px] text-gray-500 block truncate">alex.chen@odoo.com</span>
              <span className="text-[10px] text-gray-400">Password@123</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;
