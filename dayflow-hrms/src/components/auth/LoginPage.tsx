import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';

interface LoginPageProps {
  onNavigateSignup?: () => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
}) => {
  const { login } = useHRMS();

  // Form input states
  const [loginIdOrEmail, setLoginIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation & Error states
  const [loginIdError, setLoginIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Form Submission & Validation
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setLoginIdError(null);
    setPasswordError(null);
    setFormError(null);

    const trimmedLoginId = loginIdOrEmail.trim();
    let hasError = false;

    // 1. Validate Login ID
    if (!trimmedLoginId) {
      setLoginIdError('Please enter your Login ID.');
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
      // Simulate slight delay for smooth visual transition
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const success = login(trimmedLoginId, password);

      if (success) {
        onLoginSuccess();
      } else {
        setFormError('Incorrect Login ID or password.');
      }
    } catch {
      setFormError('An error occurred during sign in. Please try again.');
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
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      {/* Centered Login Card */}
      <div className="w-full max-w-[420px] bg-white border border-slate-300 rounded-lg shadow-sm p-6 sm:p-8">
        
        {/* 1. Logo Area */}
        <div className="mb-6 text-center flex flex-col items-center">
          <img
            src="/logo_nexconnect.jpeg"
            alt="NexConnect Logo"
            className="w-16 h-16 rounded-xl object-cover shadow-xs mb-3 border border-slate-200"
          />
          <h2 className="font-brand font-bold text-xl tracking-tight text-slate-900">
            NexConnect
          </h2>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            NexConnect Pvt Ltd
          </p>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            Every workday, perfectly aligned.
          </p>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div
            id="login-error-banner"
            className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-600 text-xs font-medium text-center"
          >
            {formError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSignIn} noValidate className="space-y-4">
          {/* 2. Login ID */}
          <div>
            <label
              htmlFor="loginIdInput"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Login ID :-
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="loginIdInput"
                type="text"
                value={loginIdOrEmail}
                onChange={(e) => {
                  setLoginIdOrEmail(e.target.value);
                  if (loginIdError) setLoginIdError(null);
                  if (formError) setFormError(null);
                }}
                placeholder="Enter Login ID (e.g. NCARKU20220001)"
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors ${
                  loginIdError ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
            </div>
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
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Password :-
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
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
                className={`w-full pl-9 pr-10 py-2.5 text-xs bg-white border rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors ${
                  passwordError ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
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
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-xs rounded transition-colors cursor-pointer disabled:opacity-75 tracking-wider flex items-center justify-center gap-1.5"
            >
              <span>{isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}</span>
              {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {/* Test Accounts helper for reviewer convenience */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Demo Credentials (Click to fill)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('NCANRA20230001', 'Password@123')}
              className="p-2 rounded bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-purple-700 block">HR Admin</span>
              <span className="text-[10px] text-slate-500 block truncate">NCANRA20230001</span>
              <span className="text-[10px] text-slate-400">Password@123</span>
            </button>

            <button
              type="button"
              onClick={() => handleFillDemo('NCPRSH20250005', 'Password@123')}
              className="p-2 rounded bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-purple-700 block">Employee</span>
              <span className="text-[10px] text-slate-500 block truncate">NCPRSH20250005</span>
              <span className="text-[10px] text-slate-400">Password@123</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
