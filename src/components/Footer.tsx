export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-2xl font-black uppercase mb-1">Lil Moochi</p>
            <p className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em] mb-4">Boxing</p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The youngest boxing prodigy on the rise. Follow the journey.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Navigate</p>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {['About', 'Training', 'Highlights', 'Store'].map((l) => (
                <a key={l} href={l === 'Store' ? '/store' : `/#${l.toLowerCase()}`}
                  className="hover:text-[#e8132a] transition-colors py-2 min-h-[44px] flex items-center">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Follow</p>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/lilmoochi2020' },
                { label: 'TikTok', href: 'https://tiktok.com' },
                { label: 'YouTube', href: 'https://youtube.com' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#e8132a] transition-colors py-2 min-h-[44px] flex items-center">{s.label}</a>
              ))}
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
