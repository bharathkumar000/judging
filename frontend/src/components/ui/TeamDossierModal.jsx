'use client';

import React from 'react';
import { 
  X, 
  Users, 
  MapPin, 
  Clock, 
  Github, 
  ExternalLink, 
  FileText, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  FolderGit2,
  Code2,
  Target
} from 'lucide-react';
import { useDataStore } from '@/lib/dataStore';

export function TeamDossierModal({ team, isOpen, onClose }) {
  const { missions = [], judges = [], rubrics = [], evaluations = [] } = useDataStore();

  if (!isOpen || !team) return null;

  const mission = missions.find(m => m.id === team.mission_id);
  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];
  const teamEvals = evaluations.filter(e => e.team_id === team.id && !e.is_draft);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#101726] border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Banner - Vice City Style */}
        <div className="relative bg-gradient-to-r from-purple-950 via-[#101726] to-pink-950 px-6 py-5 border-b border-white/10 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                {team.team_code}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {mission?.title || team.track || 'Track Mission'}
              </span>
              {team.status === 'completed' && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Evaluated</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{team.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Round 1 Slot & Room Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#080c14]/70 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-pink-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Presentation Room</div>
                <div className="text-sm font-bold text-white">{team.room || 'Seminar Hall 1'}</div>
              </div>
            </div>

            <div className="bg-[#080c14]/70 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Round 1 Slot</div>
                <div className="text-sm font-bold text-white">{team.pitch_slot || '10:00 AM - 10:08 AM'}</div>
              </div>
            </div>

            <div className="bg-[#080c14]/70 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Award className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Average Score</div>
                <div className="text-sm font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                  {team.average_score > 0 ? `${team.average_score.toFixed(1)} / 100` : 'Pending Review'}
                </div>
              </div>
            </div>
          </div>

          {/* Problem Statement & Solution */}
          <div className="bg-[#080c14]/80 p-5 rounded-2xl border border-white/10 space-y-4">
            <div>
              <div className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>PROBLEM STATEMENT (PS)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed bg-[#101726]/80 p-3.5 rounded-xl border border-white/5">
                {team.submission?.problem_statement || team.problem_statement || 'Standard Track Problem Statement'}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>PROPOSED ARCHITECTURE &amp; SOLUTION</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed bg-[#101726]/80 p-3.5 rounded-xl border border-white/5">
                {team.submission?.solution || team.solution_description || 'Technical implementation blueprint and prototype design.'}
              </p>
            </div>

            {/* Tech Stack */}
            {team.submission?.tech_stack?.length > 0 && (
              <div>
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5">TECH STACK</div>
                <div className="flex flex-wrap gap-1.5">
                  {team.submission.tech_stack.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-[#101726] text-pink-300 border border-pink-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Team Members Roster */}
          <div className="bg-[#080c14]/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>TEAM MEMBERS ROSTER</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(team.members || []).map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#101726] border border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold font-mono text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-white">{m.name}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                    {m.role || 'Member'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Marks Breakdown & Judge Observations */}
          <div className="bg-[#080c14]/80 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>ROUND 1 EVALUATIONS &amp; MARKS BREAKDOWN</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {teamEvals.length} {teamEvals.length === 1 ? 'Judge Evaluation' : 'Judge Evaluations'} Logged
              </span>
            </div>

            {teamEvals.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs bg-[#101726]/60 rounded-xl border border-white/5">
                No official scores recorded yet. Presentation pending or in deliberation.
              </div>
            ) : (
              <div className="space-y-3">
                {teamEvals.map((ev, eIdx) => {
                  const judgeObj = judges.find(j => j.id === ev.judge_id);
                  const totalScore = (ev.criteria_scores || []).reduce((acc, c) => acc + (Number(c.score) || 0), 0);

                  return (
                    <div key={eIdx} className="bg-[#101726] p-4 rounded-xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-400" />
                          <span className="text-xs font-bold text-white">
                            {judgeObj?.name || `Judge ${eIdx + 1}`}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            ({judgeObj?.specialization || 'Panel Jury'})
                          </span>
                        </div>
                        <span className="text-sm font-mono font-bold text-pink-400">
                          {totalScore.toFixed(1)} / 100
                        </span>
                      </div>

                      {/* Criteria scores */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
                        {(ev.criteria_scores || []).map((cs, cIdx) => {
                          const criterion = activeRubric?.criteria?.find(c => c.id === cs.criterion_id);
                          return (
                            <div key={cIdx} className="bg-[#080c14] p-2 rounded-lg border border-white/5 text-[11px]">
                              <div className="text-slate-400 truncate">{criterion?.name || `Criterion ${cIdx + 1}`}</div>
                              <div className="font-mono font-bold text-white mt-0.5">
                                {cs.score} <span className="text-[9px] text-slate-400">/ {criterion?.max_marks || 25}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Feedback remarks */}
                      {ev.feedback && (
                        <div className="text-[11px] text-slate-300 bg-[#080c14]/80 p-2.5 rounded-lg border border-white/5 italic">
                          "{ev.feedback}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Project Deliverables Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {team.submission?.github_url && (
              <a
                href={team.submission.github_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#080c14] hover:bg-slate-900 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-pink-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {team.submission?.deck_url && (
              <a
                href={team.submission.deck_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#080c14] hover:bg-slate-900 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Pitch Deck Presentation</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {team.submission?.demo_url && (
              <a
                href={team.submission.demo_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-pink-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Prototype URL</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080c14] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamDossierModal;
