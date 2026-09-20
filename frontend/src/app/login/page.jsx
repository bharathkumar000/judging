'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDataStore } from '@/lib/dataStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShieldCheck, 
  Award, 
  ClipboardCheck, 
  Users, 
  ArrowRight, 
  Lock, 
  Sparkles,
  CheckCircle2,
  KeyRound,
  UserCheck,
  Building,
  Clock,
  Zap,
  Target
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, teams, judges, coordinators, missions, eventSettings } = useDataStore();
  
  const [selectedRole, setSelectedRole] = useState('admin');
  const [customIdentifier, setCustomIdentifier] = useState('IDEA-01');
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'admin') setCustomIdentifier('admin');
    else if (role === 'judge') setCustomIdentifier('JDG-01');
    else if (role === 'coordinator') setCustomIdentifier('CRD-01');
    else if (role === 'team') setCustomIdentifier('IDEA-01');
  };

  const handleQuickLogin = (role, identifier, targetUrl) => {
    setIsLoading(true);
    loginAs(role, identifier);
    setTimeout(() => {
      router.push(targetUrl);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let target = '/';
    if (selectedRole === 'admin') {
      loginAs('admin');
      target = '/admin/dashboard';
    } else if (selectedRole === 'judge') {
      loginAs('judge', customIdentifier);
      target = '/judge/dashboard';
    } else if (selectedRole === 'coordinator') {
      loginAs('coordinator', customIdentifier);
      target = '/coordinator/dashboard';
    } else {
      loginAs('team', customIdentifier);
      target = '/team/dashboard';
    }

    setTimeout(() => {
      router.push(target);
    }, 300);
  };

  const roleConfigs = [
    {
      id: 'admin',
      title: 'Admin Command',
      subtitle: 'Organizer & Lead ("Me")',
      icon: ShieldCheck,
      badge: 'SUPERUSER',
      color: 'pink',
      target: '/admin/dashboard',
      defaultId: 'admin',
      image: '/assets/roles/admin.png',
      desc: 'Master evaluation matrix, rubric weights, lock/release scores, CSV export.'
    },
    {
      id: 'judge',
      title: 'Panel Judge',
      subtitle: 'Technical Jury & Evaluator',
      icon: Award,
      badge: 'EVALUATION',
      color: 'purple',
      target: '/judge/dashboard',
      defaultId: 'JDG-01',
      image: '/assets/roles/judge.png',
      desc: 'Assigned team queue, 100-pt criterion sliders, instant score computation & notes.'
    },
    {
      id: 'coordinator',
      title: 'Club Coordinator',
      subtitle: 'Room Lead & Timekeeper',
      icon: ClipboardCheck,
      badge: 'OPS CHAMBER',
      color: 'cyan',
      target: '/coordinator/dashboard',
      defaultId: 'CRD-01',
      image: '/assets/roles/coordinator.png',
      desc: 'Room queue, 5m pitch + 3m Q&A interactive timer, attendance verification.'
    },
    {
      id: 'team',
      title: 'Team Leader',
      subtitle: 'Participant Squad Portal',
      icon: Users,
      badge: 'PARTICIPANT',
      color: 'gold',
      target: '/team/dashboard',
      defaultId: 'IDEA-01',
      image: '/assets/roles/teamlead.png',
      desc: 'Project blueprint, presentation room & slot, live criterion marks scorecard.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero & System Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>ACCESS GATEWAY · VVCE 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Digitalized Ideathon Judging Suite
              </h1>
              
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Official digital scoring and operations gateway for VVCE Ideathon. Select your role or use 1-click launch to access your dedicated workspace.
              </p>
            </div>

            {/* Quick Live Telemetry Info Card */}
            <div className="bg-[#101726]/90 border border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Event Telemetry</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Round 1 Session
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#080c14]/80 p-3.5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Problem Tracks</div>
                  <div className="text-lg font-bold text-white mt-0.5">{missions.length} Tracks</div>
                </div>

                <div className="bg-[#080c14]/80 p-3.5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Registered Teams</div>
                  <div className="text-lg font-bold text-pink-400 mt-0.5">{teams.length} Teams</div>
                </div>

                <div className="bg-[#080c14]/80 p-3.5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Panel Judges</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">{judges.length} Active</div>
                </div>

                <div className="bg-[#080c14]/80 p-3.5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Rubric Scale</div>
                  <div className="text-lg font-bold text-purple-400 mt-0.5">100 Max Pts</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <Link
                href="/teams"
                className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors"
              >
                Browse Teams Directory →
              </Link>
              <span className="text-slate-600">&bull;</span>
              <Link
                href="/leaderboard"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
              >
                Live Leaderboard →
              </Link>
            </div>
          </div>

          {/* Right Auth Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#101726]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Select Your Role Portal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose your authorized persona to launch directly or customize your ID.
              </p>
            </div>

            {/* 4 Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roleConfigs.map((config) => {
                const IconComponent = config.icon;
                const isSelected = selectedRole === config.id;

                return (
                  <div
                    key={config.id}
                    onClick={() => handleRoleSelect(config.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-950/40 via-[#101726] to-purple-950/40 border-pink-500 shadow-xl shadow-pink-500/20 ring-1 ring-pink-500/50'
                        : 'bg-[#080c14]/80 border-white/10 hover:border-pink-500/30 hover:bg-[#080c14]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-slate-900 shadow-md">
                            <img 
                              src={config.image} 
                              alt={config.title}
                              className="w-full h-full object-cover object-top" 
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">{config.title}</h3>
                            <p className="text-[11px] text-pink-300 font-medium">{config.subtitle}</p>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' : 'bg-white/5 text-slate-400'
                        }`}>
                          {config.badge}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed bg-[#101726]/60 p-2.5 rounded-xl border border-white/5">{config.desc}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">ID: {config.defaultId}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickLogin(config.id, config.defaultId, config.target);
                        }}
                        className="px-3 py-1.5 text-[11px] font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-1 shadow-md shadow-pink-500/20 font-mono"
                      >
                        <span>Launch ⚡</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Identifier Form */}
            <form onSubmit={handleSubmit} className="pt-4 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    {selectedRole === 'admin' ? 'Admin Access Code' :
                     selectedRole === 'judge' ? 'Judge Code (e.g. JDG-01)' :
                     selectedRole === 'coordinator' ? 'Coordinator Code (e.g. CRD-01)' :
                     'Team Code (e.g. IDEA-01)'}
                  </label>
                  <input
                    type="text"
                    value={customIdentifier}
                    onChange={(e) => setCustomIdentifier(e.target.value)}
                    required
                    className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Passcode / Security PIN (Optional)
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Verifying Session...' : `Enter ${selectedRole.toUpperCase()} Portal →`}</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

