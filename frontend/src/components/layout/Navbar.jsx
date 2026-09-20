'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDataStore } from '@/lib/dataStore';
import { 
  Award, 
  Terminal, 
  Trophy, 
  User, 
  LogOut, 
  LayoutDashboard,
  Calendar,
  Layers,
  Sparkles,
  ClipboardList,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, eventSettings } = useDataStore();

  const getPortalLink = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'admin') return '/admin/dashboard';
    if (currentUser.role === 'coordinator') return '/coordinator/dashboard';
    if (currentUser.role === 'judge') return '/judge/dashboard';
    if (currentUser.role === 'team') return '/team/dashboard';
    return '/login';
  };

  const navLinks = [
    { name: 'Launchpad', href: '/' },
    { name: 'All Teams', href: '/teams' },
    { name: 'Live Leaderboard', href: '/leaderboard' },
    { name: 'Problem Tracks', href: '/missions' },
    { name: 'Guidelines & Rubrics', href: '/rules' },
    { name: 'Timeline', href: '/schedule' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080c14]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - GTA 6 / Vice City Style */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2a85] via-[#d946ef] to-[#8b5cf6] flex items-center justify-center text-white font-black text-base shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
            IJ
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base text-white tracking-tight">
                Idea<span className="text-[#ff2a85]">Judge</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded">
                VVCE 2026
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              IDEATHON JUDGING SUITE
            </span>
          </div>
        </Link>

        {/* Global Search Bar with ⌘ K */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div 
            onClick={() => router.push('/teams')}
            className="w-full bg-[#101726] hover:bg-[#162035] border border-white/[0.08] hover:border-pink-500/40 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-slate-400 transition-all cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search teams, tracks, or keywords...</span>
            </div>
            <span className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-white/5">
              ⌘ K
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-sans text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 transition-all rounded-lg ${
                  isActive 
                    ? 'text-white bg-[#ff2a85]/15 border border-[#ff2a85]/40 text-[#ff4797]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Session & Role Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              {/* Notification Bell */}
              <button 
                onClick={() => router.push('/schedule')}
                className="relative p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="Event Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff2a85] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                  1
                </span>
              </button>

              {/* User Avatar & Role Badge */}
              <Link
                href={getPortalLink()}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-[#101726] hover:bg-[#162035] border border-white/10 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.full_name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-white leading-none">
                    {currentUser.full_name?.split(' ')[0] || 'User'}
                  </span>
                  <span className="text-[10px] font-mono text-[#ff2a85] font-semibold uppercase leading-tight">
                    {currentUser.role}
                  </span>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                title="End Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Launch</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
