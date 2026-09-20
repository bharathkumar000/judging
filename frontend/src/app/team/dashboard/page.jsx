'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Users, 
  FileText, 
  Github, 
  ExternalLink,
  Sparkles,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

export default function TeamDashboardPage() {
  const { currentUser, teams, missions, evaluations, rubrics, eventSettings, loginAs } = useDataStore();

  const currentTeam = teams.find(t => 
    t.id === currentUser?.team_id || 
    t.team_code === currentUser?.team_code ||
    t.team_code === currentUser?.full_name
  ) || teams[0];

  const mission = missions.find(m => m.id === currentTeam?.mission_id);
  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];

  const teamEvals = evaluations.filter(e => e.team_id === currentTeam?.id && !e.is_draft);
  const isEvaluated = teamEvals.length > 0;

  const avgScore = isEvaluated 
    ? teamEvals.reduce((acc, curr) => acc + curr.total_score, 0) / teamEvals.length 
    : 0;

  const submission = currentTeam?.submission || currentTeam?.submission_details || {};
  const membersList = currentTeam?.members || [
    { name: currentTeam?.leader_name || 'Team Leader', role: 'Team Lead', email: 'lead@club.edu' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* GTA 6 Vice City Sunset Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)]" />
          
          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <span>TEAM LEADER PORTAL</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">{currentTeam?.team_code}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {currentTeam?.name}
              </h1>

              <p className="text-sm text-slate-300">
                Track: <span className="text-[#ff2a85] font-bold">{mission?.title || currentTeam?.mission_id}</span> &bull; Room: <strong className="text-white">{currentTeam?.room || currentTeam?.assigned_room || 'Seminar Hall A'}</strong> &bull; Slot: <strong className="text-white">{currentTeam?.pitch_slot || '10:00 AM'}</strong>
              </p>
            </div>

            {/* Team Demo Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-950/70 border border-white/10 p-3.5 rounded-2xl backdrop-blur-md">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">Switch Team Persona</label>
                <select 
                  value={currentTeam?.id}
                  onChange={(e) => loginAs('team', e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-500 cursor-pointer"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.team_code}: {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href="/schedule"
                className="px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-semibold rounded-xl transition-colors self-end sm:self-auto mt-2 sm:mt-0"
              >
                Schedule &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column Split View: Blueprint & Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Project Blueprint & Resources (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Blueprint Card */}
            <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-3xl space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Project Blueprint
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/30 rounded">
                  {currentTeam?.team_code}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Problem Statement (PS)
                  </span>
                  <p className="p-3.5 bg-[#080c14] rounded-xl border border-white/5 text-slate-300 leading-relaxed">
                    {submission.problem_statement || currentTeam?.description || 'Problem statement submitted for evaluation.'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Proposed Solution Blueprint
                  </span>
                  <p className="p-3.5 bg-[#080c14] rounded-xl border border-white/5 text-slate-300 leading-relaxed">
                    {submission.solution || currentTeam?.description || 'Technical solution and implementation roadmap.'}
                  </p>
                </div>

                {submission.tech_stack && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1.5">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {submission.tech_stack.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-purple-950/60 text-purple-300 rounded-lg border border-purple-800/40 text-[11px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                    Team Members
                  </span>
                  <div className="space-y-2">
                    {membersList.map((m, i) => (
                      <div key={i} className="p-2.5 bg-[#080c14] rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-xs">{typeof m === 'string' ? m : m.name}</div>
                          <div className="text-[10px] text-pink-400">{typeof m === 'object' ? m.role : 'Member'}</div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {typeof m === 'object' ? m.email : 'member@club.edu'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                    Project Deliverables
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={submission.github_url || submission.repo_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-[#080c14] hover:bg-slate-800 border border-white/5 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 text-[#ff2a85]" />
                      <span className="font-semibold">GitHub Repo</span>
                    </a>

                    <a
                      href={submission.deck_url || submission.slide_deck_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-[#080c14] hover:bg-slate-800 border border-white/5 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold">Pitch Deck</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scorecard & Feedback (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {isEvaluated ? (
              <>
                {/* Score Summary Box */}
                <div className="clean-card p-6 bg-[#101726]/90 border border-emerald-500/40 rounded-3xl shadow-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Jury Verified Score</span>
                    <div className="text-4xl font-extrabold font-mono text-emerald-400 flex items-baseline gap-2 mt-1">
                      {avgScore.toFixed(1)}
                      <span className="text-base text-slate-500 font-normal">/ 100.0</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Evaluated ({teamEvals.length} {teamEvals.length === 1 ? 'Judge' : 'Judges'})
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Official Rubric Result</p>
                  </div>
                </div>

                {/* Criteria Marks Breakdown */}
                <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-3xl space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Official Criteria Marks Breakdown
                  </h3>
                  
                  <div className="space-y-4">
                    {activeRubric?.criteria.map((criterion, idx) => {
                      const critTotal = teamEvals.reduce((acc, ev) => acc + (ev.criteria_scores?.[criterion.id] || 0), 0);
                      const critAvg = critTotal / teamEvals.length;
                      const pct = Math.round((critAvg / criterion.max_marks) * 100);

                      return (
                        <div key={criterion.id} className="p-4 bg-[#080c14] border border-white/5 rounded-2xl space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200">
                              {idx + 1}. {criterion.name}
                            </span>
                            <span className="font-mono font-bold text-[#ff2a85]">
                              {critAvg.toFixed(1)} / {criterion.max_marks} pts
                            </span>
                          </div>
                          
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#ff2a85] via-purple-500 to-emerald-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-500">{criterion.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Qualitative Feedback from Judges */}
                <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-3xl space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Jury Remarks & Constructive Feedback
                  </h3>

                  {teamEvals.map((ev, i) => (
                    <div key={i} className="p-4 bg-[#080c14] border border-white/5 rounded-2xl space-y-3">
                      <div className="text-xs font-mono text-[#ff2a85]">Evaluation Sheet #{i + 1}</div>

                      {ev.strengths && (
                        <div>
                          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Key Strengths</div>
                          <p className="text-xs text-slate-300 italic bg-[#101726] p-3 rounded-xl border border-white/5">
                            &ldquo;{ev.strengths}&rdquo;
                          </p>
                        </div>
                      )}

                      {ev.areas_for_improvement && (
                        <div>
                          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">Areas for Improvement</div>
                          <p className="text-xs text-slate-300 italic bg-[#101726] p-3 rounded-xl border border-white/5">
                            &ldquo;{ev.areas_for_improvement}&rdquo;
                          </p>
                        </div>
                      )}

                      {ev.notes && (
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Deliberation Remarks</div>
                          <p className="text-xs text-slate-300 italic bg-[#101726] p-3 rounded-xl border border-white/5">
                            &ldquo;{ev.notes}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Pending State */
              <div className="clean-card p-12 bg-[#101726]/60 border border-white/[0.08] rounded-3xl text-center space-y-4 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-[#ff2a85] flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Evaluation in Progress</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your pitch slot is scheduled for <strong className="text-white">{currentTeam?.pitch_slot || '10:00 AM'}</strong> in <strong className="text-white">{currentTeam?.room || currentTeam?.assigned_room || 'Seminar Hall A'}</strong>. Once panel judges finalize marks, your complete scorecard and feedback will appear here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/leaderboard"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    View Live Leaderboard &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
