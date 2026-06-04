'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Training', href: '/#classes' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Highlights', href: '/highlights' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080808]/98 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#080808]/95 backdrop-blur-md'} border-b border-white/5`}>
      <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-[44px_1fr_44px] md:flex md:items-center md:justify-between items-center">
        {/* Left spacer on mobile */}
        <div className="md:hidden" />

        <Link href="/" className="flex items-center justify-center md:justify-start gap-1 md:gap-1.5" aria-label="Lil Moochi Boxing — Home">
          <span className="text-lg md:text-2xl leading-none">🇺🇸</span>
          <span className="text-lg md:text-2xl leading-none">🇵🇸</span>
          <span className="text-lg md:text-2xl leading-none">🇨🇺</span>
          <span className="text-lg md:text-2xl leading-none">🇲🇽</span>
          <span className="text-lg md:text-2xl leading-none">🇷🇺</span>
          <span className="text-lg md:text-2xl leading-none">🇵🇷</span>
          <span className="text-lg md:text-2xl leading-none">🇮🇪</span>
          <span className="text-lg md:text-2xl leading-none">🇸🇦</span>
          <span className="text-lg md:text-2xl leading-none">🇲🇦</span>
          <span className="text-lg md:text-2xl leading-none">🇭🇳</span>
          <span className="text-lg md:text-2xl leading-none">🇱🇧</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
          <a href="https://www.instagram.com/lilmoochi2020" target="_blank" rel="noopener noreferrer" className="hover:text-[#5b9bd5] transition-colors">Instagram</a>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`hover:text-[#5b9bd5] transition-colors ${pathname === l.href ? 'text-[#5b9bd5]' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/store" className="bg-[#1e3a8a] text-white px-5 py-2.5 hover:bg-blue-700 transition-colors">
            Shop Merch
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-end flex-shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="Navigation menu"
          className="md:hidden bg-[#080808] border-t border-white/5 px-4 py-4 flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-widest text-center"
        >
          <a
            href="https://www.instagram.com/lilmoochi2020"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="hover:text-[#5b9bd5] w-full py-3 min-h-[48px] flex items-center justify-center"
          >
            Instagram
          </a>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hover:text-[#5b9bd5] w-full py-3 min-h-[48px] flex items-center justify-center"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/store"
            onClick={() => setOpen(false)}
            className="bg-[#1e3a8a] text-white px-5 py-3 text-center hover:bg-blue-700 w-full mt-2 min-h-[48px] flex items-center justify-center"
          >
            Shop Merch
          </Link>
        </div>
      )}
    </nav>
  );
}
