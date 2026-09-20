'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TeamDossierModal from '@/components/ui/TeamDossierModal';
import { 
  Users, 
  Search, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  ChevronRight,
  Filter,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AllTeamsPage() {
  const { teams = [], missions = [], evaluations = [] } = useDataStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [activeModalTeam, setActiveModalTeam] = useState(null);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.team_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.submission?.problem_statement || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTrack = selectedTrack === 'ALL' || team.mission_id === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* GTA 6 Vice City Sunset Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d] p-8 sm:p-10">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-20">
            <img 
              src="/assets/roles/teamlead.png" 
              alt="Teams" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1220] via-[#1a122e]/80 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>TEAM BLUEPRINTS &amp; ROSTER DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              All Participating Teams
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore complete team rosters, problem statement definitions, presentation rooms, pitch slots, and live jury evaluations. Click any team card to open their full dossier.
            </p>
          </div>
        </div>

        {/* Controls: Search & Track Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team name, code, or problem statement..."
              className="w-full bg-[#101726] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 shadow-md"
            />
          </div>

          {/* Track Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                selectedTrack === 'ALL'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                  : 'bg-[#101726] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Tracks ({teams.length})
            </button>
            {missions.map(m => {
              const count = teams.filter(t => t.mission_id === m.id).length;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedTrack(m.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                    selectedTrack === m.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                      : 'bg-[#101726] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {m.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => {
            const mission = missions.find(m => m.id === team.mission_id);
            const teamEvals = evaluations.filter(e => e.team_id === team.id && !e.is_draft);
            const hasScore = teamEvals.length > 0;
            const avgScore = hasScore 
              ? (teamEvals.reduce((acc, ev) => acc + (ev.total_score || 0), 0) / teamEvals.length) 
              : null;

            return (
              <div
                key={team.id}
                onClick={() => setActiveModalTeam(team)}
                className="clean-card bg-[#101726]/90 border border-white/10 hover:border-pink-500/50 p-6 rounded-3xl cursor-pointer transition-all duration-200 group shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Code + Track + Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30">
                        {team.team_code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {mission?.title || 'General'}
                      </span>
                    </div>

                    {team.status === 'completed' ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Evaluated</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Team Title */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {team.submission?.problem_statement || team.problem_statement || 'Standard Track Innovation Blueprint'}
                    </p>
                  </div>

                  {/* Room & Time Pill */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#080c14]/80 p-3 rounded-2xl border border-white/5 font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">{team.room || 'Seminar Hall A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{team.pitch_slot || '10:00 AM'}</span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  {team.submission?.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {team.submission.tech_stack.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-white/5">
                          {t}
                        </span>
                      ))}
                      {team.submission.tech_stack.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                          +{team.submission.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Members Count & Score / Trigger */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{team.members?.length || 3} members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {avgScore !== null ? (
                      <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                        {avgScore.toFixed(1)} / 100
                      </span>
                    ) : null}
                    <span className="text-xs font-semibold text-pink-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      <span>Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-[#101726]/40 rounded-3xl border border-white/5">
            <Users className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No teams matched your query.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing the search filter or selecting another track.</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Interactive Team Dossier Popup Modal */}
      <TeamDossierModal
        team={activeModalTeam}
        isOpen={Boolean(activeModalTeam)}
        onClose={() => setActiveModalTeam(null)}
      />
    </div>
  );
}
