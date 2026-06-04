import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Press kit, media inquiries, and coverage of Lil Moochi — the youngest boxing prodigy.',
  alternates: { canonical: 'https://lilmoochi.com/press' },
  openGraph: {
    title: 'Lil Moochi — Press & Media Kit',
    description: 'Media resources, press inquiries, and coverage for Lil Moochi Boxing.',
    url: 'https://lilmoochi.com/press',
  },
};

const pressPoints = [
  { label: 'Age', value: '5 Years Old' },
  { label: 'Started Boxing', value: 'Age 4' },
  { label: 'Trainer', value: 'Coach Bam Bam' },
  { label: 'Gym', value: 'BAM Boxing & MMA' },
  { label: 'Style', value: 'Orthodox / Combo Fighter' },
  { label: 'Based In', value: 'United States' },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Media</span>
          </div>
          <h1 className="font-black uppercase leading-none mb-4" style={{ fontSize: 'clamp(2rem, 10vw, 5rem)' }}>
            Press<br /><span className="text-[#5b9bd5]">& Media</span>
          </h1>
          <p className="text-gray-400 max-w-lg">
            For media inquiries, interview requests, partnership opportunities, and press assets, reach out below.
          </p>
        </div>
      </section>

      {/* Press Kit */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Bio */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Official Bio</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Lil Moochi is a 5-year-old boxing prodigy who began training at age 4 under head trainer Coach Bam Bam (Sean Hotusing) at BAM Boxing & Martial Arts. In less than two years, Moochi has developed elite-level hand speed, natural footwork, and a champion&apos;s mentality that has shocked the boxing community.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Known for blazing combination sequences and a ring IQ far beyond his age, Lil Moochi is being trained with one goal in mind: to become a future world champion. His journey is documented across social media, where his training videos have attracted international attention from boxing fans, trainers, and media outlets worldwide.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Sponsorship and partnership inquiries are welcome from brands aligned with youth sports, fitness, and athletic excellence.
            </p>
          </div>

          {/* Stats + Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Quick Facts</span>
            </div>
            <div className="border border-white/5 mb-8">
              {pressPoints.map((p, i) => (
                <div key={i} className={`flex justify-between px-5 py-4 ${i % 2 === 0 ? 'bg-zinc-900/50' : ''}`}>
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-wide">{p.label}</span>
                  <span className="text-white font-black text-sm">{p.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Media Contact</span>
            </div>
            <a
              href="mailto:management@lilmoochi.com"
              className="flex items-center gap-3 bg-[#1e3a8a] hover:bg-blue-700 transition-colors px-6 py-4 font-black uppercase tracking-wide text-sm w-full justify-center"
            >
              <span>✉</span>
              management@lilmoochi.com
            </a>
            <p className="text-gray-600 text-xs mt-3 text-center">
              For press, sponsorships, interviews & brand deals
            </p>
          </div>
        </div>
      </section>

      {/* Assets CTA */}
      <section className="border-t border-white/5 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black uppercase text-2xl mb-4">Need Press Assets?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Photos, logos, and video b-roll available upon request for approved media outlets.</p>
          <a
            href="mailto:management@lilmoochi.com?subject=Press Assets Request"
            className="bg-transparent border-2 border-white/20 hover:border-white text-white font-black px-10 py-4 uppercase tracking-wide transition-colors inline-block text-sm"
          >
            Request Assets
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
