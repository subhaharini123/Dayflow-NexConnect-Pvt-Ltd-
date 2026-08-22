import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  KeyRound,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BrandSidePanel: React.FC = () => {
  const { activeCompany } = useAuth();

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-full bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden rounded-3xl lg:rounded-r-none border border-white/10 shadow-2xl">
      {/* Dynamic Background Mesh & Animated Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Purple Glow Blob */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-purple-600/30 blur-3xl"
        />

        {/* Soft Blue Glow Blob */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-600/25 blur-3xl"
        />

        {/* Indigo Center Orb */}
        <motion.div
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/20 blur-2xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      </div>

      {/* Header Logo & Wordmark */}
      <div className="relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 p-[2px] shadow-lg shadow-purple-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 backdrop-blur-md rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                NexConnect
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wider">
                HRMS
              </span>
            </div>
            <p className="text-xs font-normal text-purple-300/80 -mt-0.5 font-heading">
              Dayflow
            </p>
            <p className="text-xs text-purple-200/80 font-medium tracking-wide mt-0.5">
              Every workday, perfectly aligned.
            </p>
          </div>
        </div>
      </div>

      {/* Center Interactive Visual: Automated Architecture Showcase */}
      <div className="relative z-10 my-8 space-y-4">
        {/* Floating Feature Card 1: Real-time Attendance & Auto Sync */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.1] transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Smart Shift Attendance</h4>
                <p className="text-[11px] text-slate-300">Single-click check-in &amp; automatic hour logs</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-white/10 text-center">
            <div className="bg-slate-900/40 rounded-lg p-1.5">
              <span className="text-[10px] text-slate-400 block">Late Flag</span>
              <span className="text-xs font-bold text-amber-300">&gt; 10:00 AM</span>
            </div>
            <div className="bg-slate-900/40 rounded-lg p-1.5">
              <span className="text-[10px] text-slate-400 block">Half-Day Auto</span>
              <span className="text-xs font-bold text-sky-300">&lt; 4.0 Hrs</span>
            </div>
            <div className="bg-slate-900/40 rounded-lg p-1.5">
              <span className="text-[10px] text-slate-400 block">Workday</span>
              <span className="text-xs font-bold text-emerald-300">8.0h Target</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Feature Card 2: Auto Login ID & Security System */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-xl border border-purple-500/20 shadow-xl"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/20">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Automated Credential Engine</h4>
              <p className="text-[11px] text-purple-200/80">
                Deterministic ID schema + auto-temp passwords
              </p>
            </div>
          </div>

          {/* Schema Visualization Pill */}
          <div className="bg-slate-950/60 rounded-xl p-2.5 border border-white/10 font-mono text-[11px] flex items-center justify-between gap-1 overflow-x-auto">
            <div className="flex items-center gap-1 text-slate-300">
              <span className="text-purple-400 font-bold bg-purple-500/20 px-1.5 py-0.5 rounded">
                OI
              </span>
              <span className="text-blue-400 font-bold bg-blue-500/20 px-1.5 py-0.5 rounded">
                JODO
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                2026
              </span>
              <span className="text-amber-400 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded">
                0002
              </span>
            </div>
            <span className="text-[10px] text-purple-300 font-sans font-medium whitespace-nowrap">
              Login ID Schema
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer Section: Trust & Policy Note */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Role-Based Access • Admin Provisioned</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium text-white">{activeCompany.name}</span>
        </div>
      </div>
    </div>
  );
};
