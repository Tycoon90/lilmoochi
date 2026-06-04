import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Highlights',
  description: 'Watch Lil Moochi\'s best boxing highlights — knockouts, combinations, and championship moments.',
  alternates: { canonical: 'https://lilmoochi.com/highlights' },
  openGraph: {
    title: 'Lil Moochi Highlights — Best Boxing Moments',
    description: 'Watch the youngest boxing prodigy in action. Knockouts, drills, and fight highlights.',
    url: 'https://lilmoochi.com/highlights',
  },
};

const highlights = [
  {
    title: 'Training Session — Combo Drills',
    description: 'Watch Moochi throw lightning-fast combinations in a recent training session.',
    tag: 'Training',
    src: '/images/moochie-video.mp4',
    poster: '/images/moochi-logo.png',
  },
];

export default function HighlightsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Video</span>
          </div>
          <h1 className="font-black uppercase leading-none mb-4" style={{ fontSize: 'clamp(2rem, 10vw, 5rem)' }}>
            Fight<br /><span className="text-[#5b9bd5]">Highlights</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            Every round. Every knockout. Every moment that proves the future is now.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((h, i) => (
            <div key={i} className="group bg-zinc-900 border border-white/5 hover:border-[#e8132a]/30 transition-colors">
              <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                <video
                  src={h.src}
                  poster={h.poster}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[#e8132a] text-xs font-bold uppercase tracking-widest mb-2 block">{h.tag}</span>
                <h3 className="font-black text-lg uppercase mb-2">{h.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.description}</p>
              </div>
            </div>
          ))}

          {/* Instagram CTA */}
          <div className="bg-gradient-to-br from-[#1e3a8a]/20 to-[#e8132a]/10 border border-white/5 p-8 flex flex-col justify-center items-center text-center">
            <p className="text-4xl mb-4">📱</p>
            <h3 className="font-black text-xl uppercase mb-3">More on Instagram</h3>
            <p className="text-gray-400 text-sm mb-6">Follow <span className="text-white font-bold">@lilmoochi2020</span> for daily training clips, fight previews, and behind-the-scenes content.</p>
            <a
              href="https://www.instagram.com/lilmoochi2020"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e3a8a] text-white font-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-blue-700 transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
