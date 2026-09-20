'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080c14]/90 backdrop-blur-md py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-white font-bold tracking-wider">IDEA<span className="text-pink-400">JUDGE</span></span>
          <span>· DIGITALIZED IDEATHON SUITE</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/rules" className="hover:text-pink-400 transition-colors">Rubrics &amp; Rules</Link>
          <Link href="/missions" className="hover:text-pink-400 transition-colors">Tracks</Link>
          <Link href="/schedule" className="hover:text-pink-400 transition-colors">Timeline</Link>
          <Link href="/leaderboard" className="hover:text-cyan-400 transition-colors">Live Leaderboard</Link>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Official Club Evaluation Engine · 2026
        </div>
      </div>
    </footer>
  );
}

export default Footer;
