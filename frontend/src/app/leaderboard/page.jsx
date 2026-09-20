'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TeamDossierModal from '@/components/ui/TeamDossierModal';
import { 
  Trophy, 
  Search, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Medal,
  CheckCircle2,
  Info,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function LeaderboardPage() {
  const { teams, evaluations, rubrics, missions, eventSettings } = useDataStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMission, setSelectedMission] = useState('ALL');
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [activeModalTeam, setActiveModalTeam] = useState(null);

  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];

  // Rank teams based on composite score
  const allRanked = teams.map(team => {
    const teamEvals = evaluations.filter(e => e.team_id === team.id && !e.is_draft);
    const mission = missions.find(m => m.id === team.mission_id);
    
    let totalScore = 0;
    let criteriaAvg = {};

    if (teamEvals.length > 0) {
      totalScore = teamEvals.reduce((acc, curr) => acc + curr.total_score, 0) / teamEvals.length;
      
      activeRubric?.criteria.forEach(c => {
        const sum = teamEvals.reduce((acc, ev) => acc + (ev.criteria_scores?.[c.id] || 0), 0);
        criteriaAvg[c.id] = sum / teamEvals.length;
      });
    }

    return {
      ...team,
      mission,
      evalCount: teamEvals.length,
      totalScore,
      criteriaAvg,
      isEvaluated: teamEvals.length > 0
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  const filteredTeams = allRanked.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.team_code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMission = selectedMission === 'ALL' || t.mission_id === selectedMission;
    return matchesSearch && matchesMission;
  });

  const top3 = filteredTeams.slice(0, 3);
  const isLeaderboardHidden = !eventSettings?.show_leaderboard;

  if (isLeaderboardHidden) {
    return (
      <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-24 text-center">
          <div className="clean-card p-10 bg-[#101726]/90 border border-white/10 space-y-4 rounded-3xl shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[#ff2a85]">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Leaderboard Visibility Masked
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              The jury is currently finalizing Round 1 deliberation and normalizations. Scores will unlock once published by the Admin Lead.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/30 rounded">
                LIVE STANDINGS
              </span>
              <span className="text-xs text-slate-400">Jury Deliberation Chamber</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ideathon Master Scoreboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live standings computed across all multi-judge criteria panels (100 Max Points).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leaderboard..."
                className="bg-[#101726] border border-white/[0.08] text-xs text-white rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-pink-500 w-52"
              />
            </div>
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedMission('ALL')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              selectedMission === 'ALL'
                ? 'bg-[#ff2a85] text-white shadow-lg shadow-pink-500/25'
                : 'bg-[#101726] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Tracks ({allRanked.length})
          </button>
          {missions.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMission(m.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                selectedMission === m.id
                  ? 'bg-[#ff2a85] text-white shadow-lg shadow-pink-500/25'
                  : 'bg-[#101726] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* Top 3 Podium (Vice City Sunset Glow) */}
        {filteredTeams.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
            
            {/* 2nd Place */}
            <div 
              onClick={() => setActiveModalTeam(top3[1])}
              className="clean-card p-6 bg-[#101726]/90 border border-slate-700/60 rounded-3xl relative flex flex-col justify-between order-2 md:order-1 h-72 shadow-xl hover:border-slate-500 cursor-pointer transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-500 text-slate-200 font-bold text-sm flex items-center justify-center font-mono">
                    2
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{top3[1]?.team_code}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors mb-1 line-clamp-1">{top3[1]?.name}</h3>
                <p className="text-xs text-purple-400 line-clamp-1 mb-2">{top3[1]?.mission?.title}</p>
              </div>

              <div>
                <div className="text-3xl font-extrabold font-mono text-slate-200">
                  {top3[1]?.totalScore > 0 ? top3[1]?.totalScore.toFixed(1) : '--'}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono uppercase">Silver Podium</div>
              </div>
            </div>

            {/* 1st Place (Champion) */}
            <div 
              onClick={() => setActiveModalTeam(top3[0])}
              className="clean-card p-6 bg-gradient-to-b from-pink-950/60 via-[#101726] to-[#101726] border-2 border-[#ff2a85] rounded-3xl relative flex flex-col justify-between order-1 md:order-2 h-84 shadow-2xl hover:shadow-pink-500/20 cursor-pointer transition-all group"
            >
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 via-[#ff2a85] to-purple-600 text-white text-[11px] font-extrabold px-4 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                ★ 1st Place Champion ★
              </div>

              <div>
                <div className="flex items-center justify-between mb-3 mt-2">
                  <span className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 font-extrabold text-base flex items-center justify-center font-mono shadow-md">
                    1
                  </span>
                  <span className="text-xs font-mono font-bold text-pink-300">{top3[0]?.team_code}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors mb-1 line-clamp-1">{top3[0]?.name}</h3>
                <p className="text-xs text-pink-400 line-clamp-1 mb-2 font-medium">{top3[0]?.mission?.title}</p>
              </div>

              <div>
                <div className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400">
                  {top3[0]?.totalScore > 0 ? top3[0]?.totalScore.toFixed(1) : '--'}
                  <span className="text-sm text-slate-400 font-normal"> / 100</span>
                </div>
                <div className="text-xs text-pink-300 font-semibold mt-1 font-mono uppercase">Grand Track Leader</div>
              </div>
            </div>

            {/* 3rd Place */}
            <div 
              onClick={() => setActiveModalTeam(top3[2])}
              className="clean-card p-6 bg-[#101726]/90 border border-amber-800/40 rounded-3xl relative flex flex-col justify-between order-3 h-64 shadow-xl hover:border-amber-600 cursor-pointer transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-400 font-bold text-sm flex items-center justify-center font-mono">
                    3
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{top3[2]?.team_code}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-1">{top3[2]?.name}</h3>
                <p className="text-xs text-purple-400 line-clamp-1 mb-2">{top3[2]?.mission?.title}</p>
              </div>

              <div>
                <div className="text-3xl font-extrabold font-mono text-slate-200">
                  {top3[2]?.totalScore > 0 ? top3[2]?.totalScore.toFixed(1) : '--'}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <div className="text-[11px] text-amber-500/80 mt-1 font-mono uppercase">Bronze Podium</div>
              </div>
            </div>
          </div>
        )}

        {/* Master Ranking Table */}
        <div className="clean-card bg-[#101726]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/[0.08] bg-[#0c121e] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Comprehensive Team Standings
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredTeams.length} Teams
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080c14]/90 text-slate-400 uppercase font-mono text-[11px] border-b border-white/[0.08]">
                <tr>
                  <th className="p-4 w-14">Rank</th>
                  <th className="p-4">Team & Blueprint</th>
                  <th className="p-4">Track</th>
                  <th className="p-4">Room & Slot</th>
                  <th className="p-4">Criteria Breakdown</th>
                  <th className="p-4 text-right">Composite Score</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 bg-[#101726]/60">
                {filteredTeams.map((team, index) => {
                  const rank = index + 1;
                  const isExpanded = expandedTeamId === team.id;

                  return (
                    <React.Fragment key={team.id}>
                      <tr 
                        onClick={() => setActiveModalTeam(team)}
                        className="hover:bg-[#162035] transition-colors cursor-pointer group"
                      >
                        <td className="p-4 font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${
                            rank === 1 ? 'bg-gradient-to-tr from-amber-400 to-[#ff2a85] text-slate-950 font-extrabold shadow' :
                            rank === 2 ? 'bg-slate-300 text-slate-950 font-bold' :
                            rank === 3 ? 'bg-amber-600 text-white font-bold' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {rank}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-white text-sm group-hover:text-pink-400 transition-colors flex items-center gap-1.5">
                            <span>{team.name}</span>
                            <Info className="w-3.5 h-3.5 text-[#ff2a85]" />
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            <span className="text-[#ff2a85] font-bold">{team.team_code}</span>
                            <span>&bull;</span>
                            <span>{team.members?.length || 3} members</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-0.5 bg-slate-900 border border-white/10 rounded text-[11px] text-slate-300 font-medium">
                            {team.mission?.title || 'Open Track'}
                          </span>
                        </td>

                        <td className="p-4 font-mono text-slate-300">
                          <div>{team.pitch_slot || '10:00 AM'}</div>
                          <div className="text-[10px] text-slate-500">{team.room || team.assigned_room || 'Room Alpha'}</div>
                        </td>

                        <td className="p-4">
                          {team.isEvaluated ? (
                            <div className="flex items-center gap-1.5 font-mono text-[10px]">
                              {activeRubric?.criteria.map((c, i) => (
                                <span 
                                  key={c.id} 
                                  className="px-2 py-0.5 bg-[#080c14] border border-white/10 rounded text-slate-300"
                                >
                                  C{i+1}: <strong className="text-pink-400">{(team.criteriaAvg[c.id] || 0).toFixed(0)}</strong>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 font-mono text-[11px] italic">Deliberation in progress</span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="text-base font-extrabold font-mono text-white">
                            {team.totalScore > 0 ? (
                              <span className="text-emerald-400">{team.totalScore.toFixed(1)}</span>
                            ) : (
                              <span className="text-slate-600">--</span>
                            )}
                            <span className="text-xs text-slate-500 font-normal"> / 100</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {team.evalCount} {team.evalCount === 1 ? 'Jury sheet' : 'Jury sheets'}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
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
