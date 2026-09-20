'use client';

import React from 'react';
import Link from 'next/link';
import { useDataStore } from '@/features/shared/services/storage/dataStore';
import Navbar from '@/components/layout/Navbar';
import { Target, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProblemTracksPage() {
  const { missions, teams } = useDataStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/70 border border-pink-500/20 p-8 sm:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>IDEATHON 2026 MISSIONS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Problem Tracks &amp; Focus Domains
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Official challenge tracks. All registered teams develop solutions within these designated technical domains evaluated across Innovation, Execution, Feasibility, and Presentation.
            </p>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => {
            const trackTeams = teams.filter(t => t.mission_id === mission.id);

            return (
              <div
                key={mission.id}
                className="bg-[#101726]/90 border border-white/10 hover:border-pink-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-lg hover:shadow-pink-500/10 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-lg">
                      {mission.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trackTeams.length} {trackTeams.length === 1 ? 'Team' : 'Teams'}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-[#080c14]/70 p-4 rounded-xl border border-white/5">
                    {mission.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-pink-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                    <span>Official Track</span>
                  </span>

                  <Link
                    href={`/teams?track=${mission.id}`}
                    className="px-3.5 py-1.5 bg-[#1a243b] hover:bg-pink-600/80 text-white text-xs font-semibold rounded-xl transition-all border border-white/10 flex items-center gap-1.5"
                  >
                    <span>View Teams</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

