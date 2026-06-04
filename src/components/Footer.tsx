'use client';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/lilmoochi2020' },
  { label: 'YouTube', href: 'https://www.youtube.com/@lilmoochi' },
];

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Training', href: '/#classes' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Highlights', href: '/highlights' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Store', href: '/store' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="text-2xl font-black uppercase mb-1">Lil Moochi</p>
            <p className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em] mb-4">Boxing</p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              The youngest boxing prodigy on the rise. Follow the journey to the top.
            </p>
            <a
              href="mailto:management@lilmoochi.com"
              className="text-xs text-gray-600 hover:text-white transition-colors font-mono"
            >
              management@lilmoochi.com
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Navigate</p>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-[#e8132a] transition-colors py-1.5 flex items-center"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Follow</p>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e8132a] transition-colors py-1.5 flex items-center"
                  onClick={() => analytics.outboundLink(s.href, s.label)}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Press</p>
              <Link href="/press" className="text-sm font-semibold hover:text-[#5b9bd5] transition-colors">
                Media Kit
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Lil Moochi Boxing. All rights reserved.</p>
          <p>www.lilmoochi.com</p>
        </div>
      </div>
    </footer>
  );
}
