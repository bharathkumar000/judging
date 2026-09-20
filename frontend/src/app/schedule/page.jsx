'use client';

import React from 'react';
import { useDataStore } from '@/features/shared/services/storage/dataStore';
import Navbar from '@/components/layout/Navbar';
import { Clock, Calendar, CheckCircle2, Award, CalendarDays, Zap } from 'lucide-react';

export default function SchedulePage() {
  const { schedule = [] } = useDataStore();

  const sortedSchedule = [...schedule].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/70 border border-pink-500/20 p-8 sm:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>OFFICIAL TIMELINE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ideathon Schedule &amp; Order of Events
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Order of presentation slots, coordinator checkpoints, deliberation sessions, and final podium announcement.
            </p>
          </div>
        </div>

        {/* Schedule list */}
        <div className="space-y-4">
          {sortedSchedule.map((phase) => {
            const isCurrent = phase.status === 'active';
            const isDone = phase.status === 'completed';

            return (
              <div
                key={phase.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-pink-500 bg-[#101726] shadow-xl shadow-pink-500/10'
                    : isDone
                    ? 'bg-[#101726]/60 border-white/5 opacity-85'
                    : 'bg-[#101726]/40 border-white/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-850 bg-slate-800 text-pink-300 border border-pink-500/20">
                      {phase.phase_number}
                    </span>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center gap-1.5 animate-pulse">
                        <Zap className="w-3 h-3" />
                        <span>LIVE NOW</span>
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      <Clock className="w-3.5 h-3.5" />
                      {phase.time_slot}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white mb-1.5">
                  {phase.phase_name}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

