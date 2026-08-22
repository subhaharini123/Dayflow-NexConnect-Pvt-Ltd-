import React from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHRMS();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
        let borderClass = 'border-emerald-200 bg-white text-slate-800 shadow-md';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />;
          borderClass = 'border-rose-200 bg-white text-slate-800 shadow-md';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />;
          borderClass = 'border-blue-200 bg-white text-slate-800 shadow-md';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border text-sm transition-all duration-200 ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 mr-2">
              {icon}
              <span className="font-medium text-slate-800 text-xs sm:text-sm">{toast.message}</span>
            </div>
            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
