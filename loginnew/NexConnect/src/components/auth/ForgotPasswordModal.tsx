import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordModal: React.FC = () => {
  const { requestPasswordReset, setAuthView } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetData, setResetData] = useState<{ tempPassword?: string; loginId?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Please enter your Login ID or Work Email.');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = await requestPasswordReset(identifier);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Unable to find an account matching these details.');
    } else {
      setResetData({
        tempPassword: res.tempPassword,
        loginId: res.loginId,
      });
    }
  };

  const handleCopy = () => {
    if (resetData?.tempPassword) {
      navigator.clipboard.writeText(resetData.tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      <button
        type="button"
        onClick={() => setAuthView('signin')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-600 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Sign In
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Reset Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Enter your Login ID or Work Email to generate a one-time temporary access key.
        </p>
      </div>

      {resetData ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200"
        >
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Temporary Password Generated</span>
          </div>
          <p className="text-xs text-slate-600">
            A temporary password has been provisioned for account{' '}
            <strong className="font-mono text-purple-700">{resetData.loginId}</strong>. Upon sign-in, you
            will be prompted to set your new permanent password.
          </p>

          <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Temp Password</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{resetData.tempPassword}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAuthView('signin')}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Return to Sign In
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Login ID or Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. OIJODO20260002 or john.doe@odoo.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Generate Temporary Access Key</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
