'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  BarChart3, 
  Clock, 
  Layers, 
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Compass,
  FileSpreadsheet,
  Zap,
  MapPin
} from 'lucide-react';
import { useDataStore } from '@/lib/dataStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LandingLaunchpad() {
  const router = useRouter();
  const { 
    eventSettings, 
    missions, 
    teams, 
    judges, 
    coordinators, 
    evaluations, 
    rubrics, 
    loginAs 
  } = useDataStore();

  const activeRubric = rubrics.find(r => r.is_active) || rubrics[0];
  const totalEvaluations = evaluations.filter(e => !e.is_draft).length;
  const totalPossible = teams.length * judges.length;
  const progressPct = totalPossible > 0 ? Math.round((totalEvaluations / totalPossible) * 100) : 0;

  const handleLaunchRole = (role, identifier, url) => {
    loginAs(role, identifier);
    router.push(url);
  };

  const roles = [
    {
      id: 'admin',
      title: 'Admin Command',
      subtitle: 'Event Organizer & Jury Lead ("Me")',
      description: 'Master scoring matrix cross-tabulation across all judges, dynamic rubric weights builder, lock & visibility toggles, and instant CSV export.',
      badge: 'SUPERUSER',
      badgeClass: 'badge-pink',
      icon: ShieldCheck,
      iconColor: 'text-[#ff2a85]',
      image: '/assets/roles/admin.png',
      actionText: 'Launch Admin Control',
      actionUrl: '/admin/dashboard',
      loginRole: 'admin',
      loginIdentifier: null
    },
    {
      id: 'judge',
      title: 'Judge Evaluation Chamber',
      subtitle: 'Technical Jury & Evaluators',
      description: 'Review assigned team dossiers, score on interactive 100-point rubric sliders with guidelines, calculate live marks, and write constructive remarks.',
      badge: 'EVALUATOR',
      badgeClass: 'badge-purple',
      icon: Award,
      iconColor: 'text-purple-400',
      image: '/assets/roles/judge.png',
      actionText: 'Launch Judge Chamber',
      actionUrl: '/judge/dashboard',
      loginRole: 'judge',
      loginIdentifier: 'JDG-01'
    },
    {
      id: 'coordinator',
      title: 'Club Coordinator Hub',
      subtitle: 'Room Lead & Timekeeper',
      description: 'Manage room presentation queues, 5m pitch + 3m Q&A interactive countdown timer, attendance check-in, and live judge progress tracker.',
      badge: 'COORDINATOR',
      badgeClass: 'badge-cyan',
      icon: ClipboardCheck,
      iconColor: 'text-cyan-400',
      image: '/assets/roles/coordinator.png',
      actionText: 'Launch Coordinator Hub',
      actionUrl: '/coordinator/dashboard',
      loginRole: 'coordinator',
      loginIdentifier: 'CRD-01'
    },
    {
      id: 'team',
      title: 'Team Leader Portal',
      subtitle: 'Participant Squad Portal',
      description: 'Inspect assigned pitch time slot, presentation room location, project blueprint dossier, and jury-verified criteria marks with feedback remarks.',
      badge: 'PARTICIPANT',
      badgeClass: 'badge-amber',
      icon: Users,
      iconColor: 'text-amber-400',
      image: '/assets/roles/teamlead.png',
      actionText: 'Launch Team Portal',
      actionUrl: '/team/dashboard',
      loginRole: 'team',
      loginIdentifier: 'IDEA-01'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Vice City Sunset Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-gradient-to-r from-[#0c1220] via-[#1a122e] to-[#2a133d]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,42,133,0.3),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.25),transparent_50%)]" />
          
          <div className="relative p-8 sm:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 text-xs font-mono font-bold bg-[#ff2a85]/15 text-[#ff2a85] border border-[#ff2a85]/40 rounded-md">
                  CLUB IDEATHON 2026
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-900 text-slate-300 rounded border border-white/10">
                  VVCE Mysuru
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Next-Gen <br />
                <span className="gta-text-gradient">Ideas & Live Judging.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A purpose-engineered digital evaluation and timekeeping suite built specifically for college technical ideathons, hackathons, and symposiums.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/teams"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  <span>Browse All Teams Roster</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/leaderboard"
                  className="btn-secondary text-xs py-2.5 px-5"
                >
                  <Award className="w-4 h-4 text-[#ff2a85]" />
                  <span>Live Leaderboard</span>
                </Link>
              </div>
            </div>

            {/* Live Metrics Widget on Banner Right */}
            <div className="bg-slate-950/70 border border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-4 max-w-sm w-full">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>ROUND 1 TELEMETRY</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ON-AIR
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#080c14] rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono">Teams Registered</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{teams.length}</div>
                </div>

                <div className="p-3 bg-[#080c14] rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono">Panel Judges</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{judges.length}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Evaluation Progress</span>
                  <span className="text-pink-400 font-bold">{progressPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#ff2a85] via-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Dedicated Role Portals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Select Your Authorized Workspace
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct entry with personalized data channels for all 4 event roles.
              </p>
            </div>
            <Link href="/login" className="text-xs font-mono text-[#ff2a85] hover:underline hidden sm:block">
              Custom Login &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const IconComp = role.icon;
              return (
                <div
                  key={role.id}
                  className="clean-card bg-[#101726]/90 border border-white/[0.08] hover:border-[#ff2a85]/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-200 group shadow-2xl hover:shadow-[#ff2a85]/10"
                >
                  {/* Visual Header with Character Image Artwork */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={role.image} 
                      alt={role.title}
                      className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101726] via-[#101726]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#101726]/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                        <IconComp className={`w-5 h-5 ${role.iconColor}`} />
                      </div>
                      <span className={role.badgeClass}>
                        {role.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-5 right-5">
                      <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors tracking-tight">
                        {role.title}
                      </h3>
                      <p className="text-xs font-semibold text-pink-300/80 mt-0.5">
                        {role.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-2 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#080c14]/80 p-4 rounded-2xl border border-white/5">
                      {role.description}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleLaunchRole(role.loginRole, role.loginIdentifier, role.actionUrl)}
                        className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-[#ff2a85] hover:to-purple-600 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-pink-400 shadow-md group-hover:shadow-pink-500/20"
                      >
                        <span>{role.actionText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem Tracks Quick Overview */}
        <div className="clean-card p-8 bg-[#101726]/90 border border-white/[0.08] rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#ff2a85] font-bold uppercase tracking-wider">
                INNOVATION CHALLENGES
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Approved Problem Tracks
              </h3>
            </div>
            <Link
              href="/missions"
              className="btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto"
            >
              <span>Explore All Track Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {missions.map((m) => {
              const trackTeams = teams.filter(t => t.mission_id === m.id);
              return (
                <div 
                  key={m.id}
                  className="p-4 bg-[#080c14] border border-white/5 rounded-2xl space-y-2 hover:border-pink-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded">
                      {m.code || m.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {trackTeams.length} {trackTeams.length === 1 ? 'team' : 'teams'}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs line-clamp-1">{m.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{m.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
