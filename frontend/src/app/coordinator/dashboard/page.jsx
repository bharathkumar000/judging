'use client';

import React, { useState, useEffect } from 'react';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TeamDossierModal from '@/components/ui/TeamDossierModal';
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  AlertCircle,
  Award,
  Search,
  Check,
  X,
  Info,
  MapPin,
  Volume2,
  Calendar
} from 'lucide-react';

export default function CoordinatorDashboard() {
  const { 
    currentUser, 
    teams = [], 
    judges = [], 
    assignments = [], 
    evaluations = [], 
    missions = [], 
    updateTeamPitchStatus, 
    updateTeamCheckIn 
  } = useDataStore();

  const [selectedRoom, setSelectedRoom] = useState('ALL');
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins default
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('pitch'); // 'pitch' (5m) or 'qa' (3m)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalTeam, setActiveModalTeam] = useState(null);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleResetTimer = (mode = 'pitch') => {
    setTimerMode(mode);
    setTimerRunning(false);
    setTimerSeconds(mode === 'pitch' ? 300 : 180);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredTeams = teams.filter(t => {
    const matchesRoom = selectedRoom === 'ALL' || (t.room || t.assigned_room || '').includes(selectedRoom);
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.team_code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoom && matchesSearch;
  });

  const checkedInCount = teams.filter(t => t.checked_in).length;
  const presentingTeam = teams.find(t => t.pitch_status === 'presenting');

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* GTA 6 Vice City Sunset Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.2),transparent_50%)]" />
          
          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <span>CLUB OPERATIONS // ROOM TIMEKEEPER</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">VVCE 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="gta-text-gradient">Coordinator.</span>
              </h1>

              <p className="text-sm text-slate-300">
                Keep official pitch time, track team check-ins, and manage live room queues.
              </p>
            </div>

            {/* Room Selector Filter in Banner */}
            <div className="flex items-center gap-3 bg-slate-950/70 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
              <MapPin className="w-4 h-4 text-[#ff2a85]" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Managing Room</div>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-slate-900">All Presentation Rooms</option>
                  <option value="Seminar Hall A" className="bg-slate-900">Seminar Hall A (AI & Web3)</option>
                  <option value="Auditorium B" className="bg-slate-900">Auditorium B (HealthTech & IoT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left (Live Pitch Room Timer) + Right (Pitch Queue & Check-In) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Pitch Timekeeper (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="clean-card p-6 bg-[#101726]/95 border border-white/[0.08] rounded-3xl space-y-6 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Official Pitch Clock
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/30 rounded">
                  {timerMode === 'pitch' ? '5M PITCH' : '3M Q&A'}
                </span>
              </div>

              {/* Huge Neon Timer Display */}
              <div className="text-center py-4 space-y-2">
                <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,42,133,0.35)]">
                  {formatTimer(timerSeconds)}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {timerRunning ? (
                    <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      CLOCK RUNNING
                    </span>
                  ) : timerSeconds === 0 ? (
                    <span className="text-rose-400 font-bold">TIME EXPIRED</span>
                  ) : (
                    <span>CLOCK PAUSED</span>
                  )}
                </div>
              </div>

              {/* Mode Switchers (5m Pitch vs 3m Q&A) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleResetTimer('pitch')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    timerMode === 'pitch'
                      ? 'bg-[#ff2a85] text-white shadow-lg shadow-pink-500/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  5m Pitch Mode
                </button>
                <button
                  type="button"
                  onClick={() => handleResetTimer('qa')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    timerMode === 'qa'
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  3m Q&A Mode
                </button>
              </div>

              {/* Action Controls (Play / Pause / Reset) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                    timerRunning
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'btn-primary'
                  }`}
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{timerRunning ? 'Pause Clock' : 'Start Timer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleResetTimer(timerMode)}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors border border-white/10"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Currently Presenting Team Banner */}
              {presentingTeam && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                    Currently On Stage
                  </span>
                  <div className="font-bold text-white text-sm">{presentingTeam.name}</div>
                  <div className="text-[11px] text-slate-400">{presentingTeam.room} &bull; {presentingTeam.team_code}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Room Pitch Queue & Check-In (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101726]/80 p-4 rounded-2xl border border-white/[0.08]">
              <div>
                <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Live Room Pitch Queue
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check in teams and advance pitch status in real time.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search room queue..."
                  className="bg-[#080c14] border border-white/[0.08] text-xs text-white rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-pink-500 w-48"
                />
              </div>
            </div>

            {/* Queue Table */}
            <div className="clean-card bg-[#101726]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#080c14]/90 text-slate-400 uppercase font-mono text-[11px] border-b border-white/[0.08]">
                    <tr>
                      <th className="p-4">Slot</th>
                      <th className="p-4">Team & Blueprint</th>
                      <th className="p-4 text-center">Attendance</th>
                      <th className="p-4 text-center">Pitch State</th>
                      <th className="p-4 text-center">Scorecards</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 bg-[#101726]/60">
                    {filteredTeams.map((team) => {
                      const teamEvals = evaluations.filter(e => e.team_id === team.id && !e.is_draft);
                      const isPresenting = team.pitch_status === 'presenting';
                      const isDone = team.pitch_status === 'completed';

                      return (
                        <tr 
                          key={team.id}
                          className={`transition-colors ${
                            isPresenting ? 'bg-amber-950/30' : 'hover:bg-[#162035]'
                          }`}
                        >
                          <td className="p-4 font-mono text-slate-300">
                            <div className="font-bold text-white">{team.pitch_slot || '10:00 AM'}</div>
                            <div className="text-[10px] text-slate-500">{team.room || 'Seminar Hall A'}</div>
                          </td>

                          <td className="p-4">
                            <div 
                              onClick={() => setActiveModalTeam(team)}
                              className="font-bold text-white text-sm hover:text-[#ff4797] cursor-pointer transition-colors flex items-center gap-1.5"
                              title="Click to view full team dossier"
                            >
                              <span>{team.name}</span>
                              <Info className="w-3.5 h-3.5 text-[#ff2a85]" />
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              <span className="text-[#ff2a85] font-bold">{team.team_code}</span>
                              <span className="mx-1.5">&bull;</span>
                              <span>{team.members?.length || 3} members</span>
                            </div>
                          </td>

                          {/* Check-in Toggle */}
                          <td className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => updateTeamCheckIn(team.id, !team.checked_in)}
                              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 mx-auto transition-all ${
                                team.checked_in
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                              }`}
                            >
                              {team.checked_in ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              <span>{team.checked_in ? 'Present' : 'Absent'}</span>
                            </button>
                          </td>

                          {/* Pitch Status Controls */}
                          <td className="p-4 text-center">
                            <div className="inline-flex items-center gap-1 bg-[#080c14] p-1 rounded-xl border border-white/10">
                              <button
                                type="button"
                                onClick={() => updateTeamPitchStatus(team.id, 'pending')}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                  team.pitch_status === 'pending'
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                Queue
                              </button>
                              <button
                                type="button"
                                onClick={() => updateTeamPitchStatus(team.id, 'presenting')}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                  team.pitch_status === 'presenting'
                                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow animate-pulse'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                On Stage
                              </button>
                              <button
                                type="button"
                                onClick={() => updateTeamPitchStatus(team.id, 'completed')}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                  team.pitch_status === 'completed'
                                    ? 'bg-emerald-600 text-white font-bold'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                Concluded
                              </button>
                            </div>
                          </td>

                          {/* Judge Completion Dots */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              {judges.map(j => {
                                const ev = evaluations.find(e => e.judge_id === j.id && e.team_id === team.id && !e.is_draft);
                                return (
                                  <span
                                    key={j.id}
                                    title={`${j.name}: ${ev ? 'Marks Submitted' : 'Pending'}`}
                                    className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                                      ev
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                        : 'bg-slate-900 text-slate-600 border border-white/5'
                                    }`}
                                  >
                                    {j.judge_code}: {ev ? '✓' : '…'}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
