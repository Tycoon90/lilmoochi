import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Videos and moments from Lil Moochi\'s boxing journey — training, fights, and championship moments.',
  alternates: { canonical: 'https://lilmoochi.com/gallery' },
  openGraph: {
    title: 'Lil Moochi Gallery — Training & Fight Videos',
    description: 'Behind the scenes of a boxing prodigy. Videos from training sessions, fights, and life inside the ring.',
    url: 'https://lilmoochi.com/gallery',
  },
};

const BASE = 'https://i7waoonl8n9ptnk1.public.blob.vercel-storage.com';

const videos = [
  { src: `${BASE}/gallery-1.mp4`, caption: 'Training Session' },
  { src: `${BASE}/gallery-2-compressed.mp4`, caption: 'Combo Drills' },
  { src: `${BASE}/gallery-3.mp4`, caption: 'Ring Work' },
  { src: `${BASE}/gallery-4.mp4`, caption: 'Footwork Training' },
  { src: `${BASE}/gallery-5.mp4`, caption: 'Sparring Prep' },
  { src: `${BASE}/gallery-6.mp4`, caption: 'Champion Mindset' },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute right-0 top-0 h-full w-64 bg-[#e8132a]/5 skew-x-[-8deg] translate-x-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Journey</span>
          </div>
          <h1 className="font-black uppercase leading-none mb-4" style={{ fontSize: 'clamp(2rem, 10vw, 5rem)' }}>
            Video<br /><span className="text-[#5b9bd5]">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            Behind the scenes of a champion in the making.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <div key={i} className="group relative overflow-hidden bg-zinc-900 rounded-sm">
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                poster="/images/moochi-logo.png"
                className="w-full aspect-video object-cover"
              />
              <div className="px-4 py-3 border-t border-white/5">
                <p className="text-[#5b9bd5] font-bold text-xs uppercase tracking-widest">{video.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-14 px-4 text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">More content daily</p>
        <a
          href="https://www.instagram.com/lilmoochi2020"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#1e3a8a] hover:bg-blue-700 transition-colors px-10 py-4 font-black uppercase tracking-wide text-white text-sm"
        >
          Follow @lilmoochi2020 on Instagram
        </a>
      </section>

      <Footer />
    </div>
  );
}
