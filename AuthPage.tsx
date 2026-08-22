import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { BrandSidePanel } from './BrandSidePanel';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { FirstLoginChangePasswordModal } from './FirstLoginChangePasswordModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export const AuthPage: React.FC = () => {
  const { authView } = useAuth();

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans relative overflow-hidden">
      {/* Background Animated Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>

      {/* Main Split-Screen Container */}
      <div className="relative z-10 w-full max-w-6xl min-h-[700px] bg-slate-900/60 backdrop-blur-2xl rounded-3xl sm:rounded-4xl border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Dynamic Brand Hero Panel (5 cols on lg) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col">
          <BrandSidePanel />
        </div>

        {/* Right Side: Auth Form Container (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 md:p-14 bg-white/[0.96] dark:bg-slate-900/90 backdrop-blur-xl relative">
          {/* Mobile Brand Bar (Visible only on mobile/tablet) */}
          <div className="lg:hidden mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                D
              </div>
              <div>
                <span className="font-heading text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  NexConnect
                </span>
                <span className="font-heading text-xs font-normal text-slate-500 block leading-tight">
                  Dayflow
                </span>
                <p className="text-[11px] text-purple-600 font-medium mt-0.5">Every workday, perfectly aligned.</p>
              </div>
            </div>
          </div>

          {/* Animated Card Switcher */}
          <AnimatePresence mode="wait">
            {authView === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <SignInForm />
              </motion.div>
            )}

            {authView === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <SignUpForm />
              </motion.div>
            )}

            {authView === 'first_login_change_password' && (
              <motion.div
                key="first_login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FirstLoginChangePasswordModal />
              </motion.div>
            )}

            {authView === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ForgotPasswordModal />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
