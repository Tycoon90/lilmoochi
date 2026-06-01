'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-transparent.png"
            alt="Moochi Boxing"
            width={72}
            height={72}
            className="object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-base font-black uppercase leading-none tracking-wider text-white">Moochi</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8132a]">Boxing</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          <Link href="/#about" className="hover:text-[#e8132a] transition-colors">About</Link>
          <Link href="/#classes" className="hover:text-[#e8132a] transition-colors">Training</Link>
          <Link href="/#highlights" className="hover:text-[#e8132a] transition-colors">Highlights</Link>
          <Link href="/store" className="bg-[#e8132a] text-white px-5 py-2.5 hover:bg-red-500 transition-colors">
            Shop Merch
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#080808] border-t border-white/5 px-4 py-6 flex flex-col gap-5 text-xs font-bold uppercase tracking-widest">
          <Link href="/#about" onClick={() => setOpen(false)} className="hover:text-[#e8132a]">About</Link>
          <Link href="/#classes" onClick={() => setOpen(false)} className="hover:text-[#e8132a]">Training</Link>
          <Link href="/#highlights" onClick={() => setOpen(false)} className="hover:text-[#e8132a]">Highlights</Link>
          <Link href="/store" onClick={() => setOpen(false)} className="bg-[#e8132a] text-white px-5 py-3 text-center hover:bg-red-500">
            Shop Merch
          </Link>
        </div>
      )}
    </nav>
  );
}
