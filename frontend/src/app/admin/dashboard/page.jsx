'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TeamDossierModal from '@/components/ui/TeamDossierModal';
import { 
  Users, 
  UserCheck, 
  Activity, 
  Download, 
  Sliders, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Award,
  Clock,
  Layers,
  Sparkles,
  BarChart2,
  PieChart,
  ChevronRight,
  Search,
  Settings,
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    currentUser, 
    eventSettings, 
    updateEventSettings, 
    teams = [], 
    judges = [], 
    assignments = [], 
    evaluations = [], 
    missions = [], 
    rubrics = [],
    showToast 
  } = useDataStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [activeModalTeam, setActiveModalTeam] = useState(null);

  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];
  const activeJudges = judges.filter(j => j.is_active);

  // Compute composite scores
  const rankedTeams = teams.map(team => {
    const teamEvals = evaluations.filter(e => e.team_id === team.id && !e.is_draft);
    const mission = missions.find(m => m.id === team.mission_id);
    const totalScore = teamEvals.length > 0
      ? teamEvals.reduce((acc, curr) => acc + curr.total_score, 0) / teamEvals.length
      : 0;

    return {
      ...team,
      mission,
      teamEvals,
      totalScore,
      isCompleted: teamEvals.length > 0
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  const filteredTeams = rankedTeams.filter(team => {
    const matchesTrack = selectedTrack === 'ALL' || team.mission_id === selectedTrack;
    const matchesSearch = 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.team_code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const totalTeams = teams.length;
  const totalJudges = judges.length;
  const totalEvals = evaluations.filter(e => !e.is_draft).length;
  const completionRate = totalTeams > 0 ? Math.round((totalEvals / (totalTeams * Math.max(1, activeJudges.length))) * 100) : 0;

  // Export CSV
  const handleExportCSV = () => {
    let csv = 'Rank,Team Code,Team Name,Track,Room,Pitch Slot,';
    activeJudges.forEach(j => {
      csv += `${j.name} (${j.judge_code}),`;
    });
    csv += 'Aggregate Final Score (/100)\n';

    rankedTeams.forEach((t, idx) => {
      let row = `${idx + 1},"${t.team_code}","${t.name}","${t.mission?.title || ''}","${t.room || t.assigned_room || ''}","${t.pitch_slot || ''}",`;
      activeJudges.forEach(j => {
        const ev = evaluations.find(e => e.judge_id === j.id && e.team_id === t.id);
        row += ev && !ev.is_draft ? `${ev.total_score},` : '-,';
      });
      row += `${t.totalScore.toFixed(1)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ideathon_master_scorecard_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Score matrix exported as CSV', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* GTA 6 Vice City Sunset Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d]">
          {/* Character Art Backdrop */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 overflow-hidden pointer-events-none opacity-25 md:opacity-40">
            <img 
              src="/assets/roles/admin.png" 
              alt="Admin Leader" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1220] via-[#1a122e]/80 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.2),transparent_50%)]" />
          
          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#ff2a85] font-bold flex items-center gap-2">
                <span>ADMIN COMMAND &bull; MASTER HQ</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">VVCE 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="gta-text-gradient">Admin.</span>
              </h1>

              <p className="text-sm text-slate-300">
                Manage teams, judges, rubrics, and live scoring — all in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleExportCSV}
                className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-2 rounded-xl"
              >
                <Download className="w-4 h-4 text-[#ff2a85]" />
                <span>Export CSV Matrix</span>
              </button>

              <Link
                href="/rules"
                className="btn-primary text-xs py-2 px-3.5 flex items-center gap-2 rounded-xl"
              >
                <Sliders className="w-4 h-4" />
                <span>Rubrics & Guidelines</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Telemetry Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>REGISTERED TEAMS</span>
              <Users className="w-4 h-4 text-[#ff2a85]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              {totalTeams}
            </div>
            <div className="text-[11px] text-pink-400 font-semibold">+100% On-Campus Verified</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>PANEL JUDGES</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              {totalJudges}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold">{activeJudges.length} Active on Duty</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>EVALUATIONS DONE</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 mt-1 font-mono">
              {totalEvals}
            </div>
            <div className="text-[11px] text-slate-400">Jury scorecards recorded</div>
          </div>

          <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center justify-between">
              <span>ROUND COMPLETION</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mt-1 font-mono">
              {completionRate}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
              <div 
                className="h-full bg-gradient-to-r from-[#ff2a85] via-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, completionRate)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Controls Bar */}
        <div className="clean-card p-5 bg-[#101726]/90 border border-white/[0.08] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Live Event Controls:
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Show Live Score Toggle */}
            <button
              onClick={() => updateEventSettings({ show_live_score: !eventSettings.show_live_score })}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                eventSettings.show_live_score
                  ? 'bg-pink-500/20 text-[#ff2a85] border border-pink-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              {eventSettings.show_live_score ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Live Score: {eventSettings.show_live_score ? 'Visible to Teams' : 'Hidden'}</span>
            </button>

            {/* Show Leaderboard Toggle */}
            <button
              onClick={() => updateEventSettings({ show_leaderboard: !eventSettings.show_leaderboard })}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                eventSettings.show_leaderboard
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Leaderboard: {eventSettings.show_leaderboard ? 'Public Standings' : 'Masked'}</span>
            </button>

            {/* Lock Results Toggle */}
            <button
              onClick={() => updateEventSettings({ results_locked: !eventSettings.results_locked })}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                eventSettings.results_locked
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              {eventSettings.results_locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              <span>Final Marks: {eventSettings.results_locked ? 'Locked' : 'Unlocked'}</span>
            </button>
          </div>
        </div>

        {/* Master Evaluation Matrix */}
        <div className="clean-card bg-[#101726]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl space-y-0">
          <div className="p-5 border-b border-white/[0.08] bg-[#0c121e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Master Evaluation Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Team-wise cross-tabulated marks from all assigned panel judges.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter matrix..."
                  className="bg-[#080c14] border border-white/10 text-xs text-white rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-pink-500 w-44"
                />
              </div>

              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="bg-[#080c14] border border-white/10 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                <option value="ALL">All Tracks</option>
                {missions.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080c14]/90 text-slate-400 uppercase font-mono text-[11px] border-b border-white/[0.08]">
                <tr>
                  <th className="p-4 w-14">Rank</th>
                  <th className="p-4">Team / Blueprint</th>
                  <th className="p-4">Track</th>
                  {activeJudges.map(j => (
                    <th key={j.id} className="p-4 text-center">
                      <div className="text-pink-400">{j.judge_code}</div>
                      <div className="text-[9px] text-slate-500 font-normal truncate max-w-[80px]">{j.name.split(' ')[0]}</div>
                    </th>
                  ))}
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right font-bold text-white">Composite Score</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 bg-[#101726]/60">
                {filteredTeams.map((team, idx) => (
                  <tr 
                    key={team.id}
                    className="hover:bg-[#162035] transition-colors group cursor-pointer"
                    onClick={() => setActiveModalTeam(team)}
                  >
                    <td className="p-4 font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-white text-sm group-hover:text-pink-400 transition-colors">
                        {team.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-[#ff2a85] font-bold">{team.team_code}</span>
                        <span>&bull;</span>
                        <span>{team.room || team.assigned_room || 'Room Alpha'}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-slate-900 border border-white/10 rounded text-[11px] text-slate-300 font-medium">
                        {team.mission?.title || 'Open Track'}
                      </span>
                    </td>

                    {activeJudges.map(j => {
                      const ev = evaluations.find(e => e.judge_id === j.id && e.team_id === team.id);
                      if (!ev) {
                        return (
                          <td key={j.id} className="p-4 text-center text-slate-600 font-mono">
                            &mdash;
                          </td>
                        );
                      }
                      if (ev.is_draft) {
                        return (
                          <td key={j.id} className="p-4 text-center font-mono text-amber-400 text-[10px]">
                            Draft
                          </td>
                        );
                      }
                      return (
                        <td key={j.id} className="p-4 text-center font-mono font-bold text-emerald-400">
                          {ev.total_score.toFixed(1)}
                        </td>
                      );
                    })}

                    <td className="p-4 text-center">
                      {team.isCompleted ? (
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                          Evaluated
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right font-mono font-bold text-base text-white">
                      {team.totalScore > 0 ? (
                        <span className="text-emerald-400">{team.totalScore.toFixed(1)}</span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                      <span className="text-xs text-slate-500 font-normal"> / 100</span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalTeam(team);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white rounded-lg transition-colors border border-white/10"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lower Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-2xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Evaluation Completion
            </h3>
            <div className="flex items-center justify-center p-4">
              <div className="w-28 h-28 rounded-full border-4 border-[#ff2a85] flex flex-col items-center justify-center shadow-lg shadow-pink-500/20">
                <span className="text-2xl font-extrabold font-mono text-white">{completionRate}%</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Completed</span>
              </div>
            </div>
            <div className="flex justify-around text-xs text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>Done: <strong className="text-emerald-400">{totalEvals}</strong></span>
              <span>Total Teams: <strong className="text-white">{totalTeams}</strong></span>
            </div>
          </div>

          <div className="clean-card p-6 bg-[#101726]/90 border border-white/[0.08] rounded-2xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Track-Wise Teams
            </h3>
            <div className="space-y-3">
              {missions.map(m => {
                const count = teams.filter(t => t.mission_id === m.id).length;
                const pct = totalTeams > 0 ? (count / totalTeams) * 100 : 0;
                return (
                  <div key={m.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 truncate max-w-[180px]">{m.title}</span>
                      <span className="font-mono font-bold text-pink-400">{count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-pink-950/40 via-[#131a2a] to-purple-950/30 border border-pink-500/20 flex flex-col justify-between text-center space-y-4 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ff2a85] uppercase">
                IDEATHON 2026
              </span>
              <h4 className="text-xl font-extrabold text-white tracking-tight">
                Empowering Next-Gen Innovators
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time multi-judge scoring engine with instant CSV analytics and full rubric transparency.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
              Vidyavardhaka College of Engineering &bull; Mysuru
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
