'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TeamDossierModal from '@/components/ui/TeamDossierModal';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  Info,
  Sliders,
  Bell,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';

export default function JudgeDashboard() {
  const { 
    currentUser, 
    judges, 
    assignments, 
    teams, 
    evaluations, 
    missions,
    announcements,
    schedule,
    loginAs
  } = useDataStore();

  const [activeTab, setActiveTab] = useState('ALL'); // ALL, PENDING, COMPLETED, DRAFTS
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalTeam, setActiveModalTeam] = useState(null);

  const currentJudge = judges.find(j => 
    j.id === currentUser?.judge_id || 
    j.id === currentUser?.id ||
    j.judge_code === currentUser?.full_name
  ) || judges[0];

  // Get assignments for this judge
  const myAssignments = assignments.filter(a => a.judge_id === currentJudge?.id);

  const enrichedTeams = myAssignments.map(assignment => {
    const team = teams.find(t => t.id === assignment.team_id);
    const evaluation = evaluations.find(e => e.judge_id === currentJudge?.id && e.team_id === assignment.team_id);
    const mission = missions.find(m => m.id === team?.mission_id);

    let status = 'pending';
    if (evaluation) {
      status = evaluation.is_draft ? 'draft' : 'completed';
    }

    return {
      assignment,
      team,
      evaluation,
      mission,
      status
    };
  }).filter(item => item.team);

  // Filter teams by tab & search
  const filteredTeams = enrichedTeams.filter(item => {
    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'PENDING' ? item.status === 'pending' :
      activeTab === 'COMPLETED' ? item.status === 'completed' :
      activeTab === 'DRAFTS' ? item.status === 'draft' : true;

    const matchesTrack = selectedTrack === 'ALL' || item.team.mission_id === selectedTrack;

    const matchesSearch = 
      item.team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.team.team_code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesTrack && matchesSearch;
  });

  const totalAssigned = enrichedTeams.length;
  const completedCount = enrichedTeams.filter(t => t.status === 'completed').length;
  const pendingCount = enrichedTeams.filter(t => t.status === 'pending').length;
  const draftCount = enrichedTeams.filter(t => t.status === 'draft').length;
  const completionRate = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* GTA 6 Vice City Sunset Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d]">
          {/* Subtle background glow & city vibes */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.2),transparent_50%)]" />
          
          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#ff2a85] font-bold flex items-center gap-2">
                <span>GOOD EVENING // OFFICIAL JURY CHAMBER</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">VVCE 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="gta-text-gradient">{currentJudge?.name || 'Judge'}.</span>
              </h1>

              <p className="text-sm text-slate-300">
                Review and evaluate your assigned teams. Every idea counts.
              </p>
            </div>

            {/* Neon Accent Card on Right */}
            <div className="hidden lg:flex flex-col items-end text-right bg-slate-950/60 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-xs font-mono font-bold text-[#ff2a85] tracking-widest uppercase">
                &ldquo;Good Ideas, Brighter Tomorrows&rdquo;
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Room: <strong className="text-white">{currentJudge?.assigned_room || 'Room Alpha (Lab 101)'}</strong>
              </span>
              <div className="mt-2">
                <select
                  value={currentJudge?.id}
                  onChange={(e) => loginAs('judge', e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-[11px] text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-pink-500 cursor-pointer"
                >
                  {judges.map(j => (
                    <option key={j.id} value={j.id}>{j.judge_code}: {j.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>ASSIGNED TEAMS</span>
              <Users className="w-4 h-4 text-[#ff2a85]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              {totalAssigned}
            </div>
            <div className="text-[11px] text-slate-400">Total assigned to you</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>EVALUATED</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
              {completedCount}
            </div>
            <div className="text-[11px] text-slate-400">Official marks locked</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>PENDING</span>
              <Clock className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b] mt-1 font-mono">
              {pendingCount}
            </div>
            <div className="text-[11px] text-slate-400">Awaiting pitch marks</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>COMPLETION RATE</span>
              <BarChart3 className="w-4 h-4 text-[#06b6d4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#06b6d4] mt-1 font-mono">
              {completionRate}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
              <div 
                className="h-full bg-gradient-to-r from-[#ff2a85] to-[#06b6d4] rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content: Left Column (Teams Queue) + Right Column (Schedule & Announcements) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Assigned Teams Queue (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101726]/80 p-4 rounded-2xl border border-white/[0.08]">
              {/* Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'ALL'
                      ? 'bg-[#ff2a85] text-white shadow-lg shadow-pink-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  All Teams ({totalAssigned})
                </button>
                <button
                  onClick={() => setActiveTab('PENDING')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'PENDING'
                      ? 'bg-[#f59e0b] text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveTab('COMPLETED')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'COMPLETED'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Evaluated ({completedCount})
                </button>
              </div>

              {/* Search & Track Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assigned teams..."
                    className="bg-[#080c14] border border-white/[0.08] text-xs text-white rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-pink-500 w-44 sm:w-48"
                  />
                </div>
              </div>
            </div>

            {/* Team Queue Cards */}
            <div className="space-y-4">
              {filteredTeams.map(({ team, evaluation, mission, status }) => {
                const submission = team.submission || team.submission_details || {};
                const isCompleted = status === 'completed';

                return (
                  <div
                    key={team.id}
                    className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] hover:border-[#ff2a85]/40 transition-all rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/30 rounded">
                          {team.team_code}
                        </span>
                        
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded">
                          {mission?.title || 'Open Track'}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          Slot: <strong className="text-white">{team.pitch_slot || '10:00 AM'}</strong>
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#ff4797] transition-colors">
                          {team.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {submission.problem_statement || team.description || 'Project proposal ready for judging.'}
                        </p>
                      </div>

                      {/* Team Member Avatars Stack */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-slate-500 font-mono">Members:</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(team.members || []).slice(0, 3).map((m, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 border border-white/5 rounded text-slate-300">
                              {typeof m === 'string' ? m : m.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      {isCompleted && evaluation ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                            <CheckCircle2 className="w-3 h-3" /> Evaluated
                          </span>
                          <div className="text-base font-bold font-mono text-emerald-300 mt-1">
                            {evaluation.total_score.toFixed(1)} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Pending Marks
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalTeam(team)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors border border-white/10"
                        >
                          View Dossier
                        </button>

                        <Link
                          href={`/judge/evaluate/${team.id}`}
                          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-md ${
                            isCompleted
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
                              : 'btn-primary'
                          }`}
                        >
                          <span>{isCompleted ? 'Edit Marks' : 'Evaluate'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredTeams.length === 0 && (
                <div className="clean-card p-12 text-center bg-[#101726]/60 border border-white/[0.08] rounded-2xl">
                  <p className="text-sm text-slate-400">No teams found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Schedule Timeline & Announcements (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Today's Schedule Box */}
            <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ff2a85]" />
                  <span>Today&apos;s Schedule</span>
                </h3>
                <Link href="/schedule" className="text-[11px] font-mono text-[#ff2a85] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4 relative pl-4 border-l-2 border-pink-500/30">
                {enrichedTeams.slice(0, 4).map(({ team }, i) => (
                  <div key={team.id} className="relative space-y-0.5">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#ff2a85] ring-4 ring-[#101726]" />
                    <div className="text-[11px] font-mono text-slate-400">{team.pitch_slot || `10:${i * 2}0 AM`}</div>
                    <div className="text-xs font-bold text-white">{team.name}</div>
                    <div className="text-[11px] text-slate-500">{team.room || 'Seminar Hall A'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Announcements Box */}
            <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span>Announcements</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500">LIVE</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#080c14] border border-white/5 rounded-xl space-y-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Judging Round 1 Active</span>
                    <span className="text-[10px] text-slate-500">10:00 AM</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    5 min pitch + 3 min Q&A. Submit marks before 01:00 PM.
                  </p>
                </div>

                <div className="p-3 bg-[#080c14] border border-white/5 rounded-xl space-y-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Rubric Breakdown Verified</span>
                    <span className="text-[10px] text-slate-500">09:30 AM</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Standard 100-pt rubric active across all 4 criteria.
                  </p>
                </div>
              </div>
            </div>

            {/* Neon Motivation Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-pink-950/40 to-purple-950/30 border border-pink-500/20 text-center space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ff2a85] uppercase">
                IDEAS TODAY. A BRIGHTER TOMORROW.
              </span>
              <p className="text-[11px] text-slate-400">
                Mysuru 2026 &bull; VVCE Technical Symposium
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Team Dossier Modal */}
      <TeamDossierModal
        team={activeModalTeam}
        isOpen={!!activeModalTeam}
        onClose={() => setActiveModalTeam(null)}
      />

      <Footer />
    </div>
  );
}
