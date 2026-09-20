'use client';

import React from 'react';
import Link from 'next/link';
import { useDataStore } from '@/features/shared/services/storage/dataStore';
import Navbar from '@/components/layout/Navbar';
import { BookOpen, Award, Clock, HelpCircle, ShieldCheck, Scale } from 'lucide-react';

export default function GuidelinesPage() {
  const { rubrics } = useDataStore();
  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];

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
              <Scale className="w-3.5 h-3.5" />
              <span>OFFICIAL JUDGING DIRECTIVE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Rules, Guidelines &amp; Rubrics
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Standardized scoring rubric matrix and pitch chamber guidelines. All evaluations are transparently computed using the 100-point rubric formula.
            </p>
          </div>
        </div>

        {/* 100-pt Rubric Standards */}
        <div className="bg-[#101726]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">CRITERIA SPECIFICATION</span>
              <h2 className="text-2xl font-bold text-white mt-1">{activeRubric?.title} (100 Marks Total)</h2>
            </div>
            <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-xl self-start sm:self-auto flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Active Official Standard</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRubric?.criteria.map((criterion, idx) => (
              <div key={criterion.id} className="bg-[#080c14]/80 border border-white/10 rounded-2xl p-5 hover:border-pink-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    {criterion.name}
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-pink-500/10 text-pink-300 border border-pink-500/30 rounded-lg">
                    {criterion.max_points || criterion.max_marks} Pts
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-8">{criterion.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pitch Rules & Chamber Format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#101726]/80 border border-white/10 rounded-2xl p-6 hover:border-pink-500/30 transition-all shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mb-4 text-sm font-mono font-bold">
              5m
            </div>
            <h3 className="text-base font-bold text-white mb-2">5-Min Pitch Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Teams have exactly 5 minutes for uninterrupted presentation and live prototype walkthrough. Room coordinators trigger the official clock.
            </p>
          </div>

          <div className="bg-[#101726]/80 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4 text-sm font-mono font-bold">
              3m
            </div>
            <h3 className="text-base font-bold text-white mb-2">3-Min Jury Q&amp;A</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Judges engage in direct technical and feasibility inquiries before logging marks into the digital evaluation chamber.
            </p>
          </div>

          <div className="bg-[#101726]/80 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 text-sm font-mono font-bold">
              100%
            </div>
            <h3 className="text-base font-bold text-white mb-2">Fair Play &amp; Originality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All code and architectures must be authentic. Plagiarism or undisclosed external code results in instant disqualification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

