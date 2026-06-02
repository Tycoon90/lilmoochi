import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '5', label: 'Years Old' },
  { value: '3+', label: 'Yrs Training' },
  { value: '12+', label: 'Bouts' },
  { value: '10', label: 'Wins' },
];

const classes = [
  { title: 'Fundamentals', desc: 'Stance, footwork, and the jab. The foundation of every great boxer.', tag: 'Beginner', icon: '🥊' },
  { title: 'Combo Drills', desc: 'Lightning-fast combination sequences that build muscle memory.', tag: 'Intermediate', icon: '⚡' },
  { title: 'Shadowboxing', desc: 'Full rounds of movement and offense — no partner needed.', tag: 'All Levels', icon: '👤' },
  { title: 'Sparring Ready', desc: 'Defense, ring IQ, and reading your opponent in real time.', tag: 'Advanced', icon: '🏆' },
];

const trainers = [
  { name: 'Sean Hotusing', role: 'Coach Bam Bam', exp: 'Head Trainer', image: '/images/bam-bam.jpg' },
  { name: 'Sister Jurri', role: 'Assistant Trainer', exp: '', image: '/images/jurri.JPEG' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center px-4 pt-24 pb-12">
        {/* Background slant */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#080808] opacity-90" style={{clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'}} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Future World Champion</span>
            </div>
            <h1 className="font-black uppercase leading-[0.9] mb-6" style={{fontSize: 'clamp(2rem, 10vw, 5rem)'}}>
              LIL<br />
              <span className="text-[#5b9bd5]">MOOCHI</span><br />
              BOXING
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              5 years old. Unstoppable heart. Watch the youngest boxing prodigy train, compete, and dominate — one round at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#classes"
                className="bg-[#1e3a8a] text-white font-black px-8 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors">
                See Training
              </Link>
              <Link href="/store"
                className="border-2 border-white/20 text-white font-black px-8 py-4 uppercase tracking-wide hover:border-white transition-colors">
                Shop Merch
              </Link>
            </div>
          </div>

          {/* Hero video */}
          <div className="relative flex items-center justify-center flex-col gap-6">
            <div className="relative w-full max-w-md" style={{aspectRatio: '3/4'}}>
              <video
                src="/images/moochie-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/promo1.png"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Partners */}
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Partners</span>
              <div className="relative w-full max-w-md h-32 md:h-40">
                <Image src="/images/promo2.jpeg" alt="BAM Boxing & Martial Arts" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain rounded opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-zinc-900 rounded-none w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#e8132a] z-10" />
              <Image
                src="/images/IMG_1114.jpeg"
                alt="Lil Moochi training"
                width={1600}
                height={1236}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Story</span>
            </div>
            <h2 className="font-black uppercase leading-tight mb-6" style={{fontSize: 'clamp(1.5rem, 6vw, 3rem)'}}>
              Born To<br /><span className="text-[#e8132a]">Fight</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              From the moment Moochi could walk, the ring was calling. At just 4 years old, tiny gloves were laced up for the first time — and nothing has been the same since.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              With blazing hand speed, natural footwork, and a champion&apos;s mindset, Lil Moochi isn&apos;t just a kid who boxes. This is the future of the sport.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Hand Speed', 'Footwork', 'Ring IQ', 'Heart'].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#e8132a] rotate-45 inline-block flex-shrink-0" />
                  <span className="font-semibold text-sm uppercase tracking-wide">{skill}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/lilmoochi2020" target="_blank" rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 text-sm font-bold transition-colors uppercase tracking-wide">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 text-sm font-bold transition-colors uppercase tracking-wide">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES */}

      {/* TRAINERS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Team</span>
          </div>
          <h2 className="font-black uppercase mb-14" style={{fontSize: 'clamp(1.5rem, 6vw, 3rem)'}}>Meet The<br /><span className="text-[#e8132a]">Coaches</span></h2>

          <div className="flex flex-col md:flex-row justify-center gap-12">
            {trainers.map((t) => (
              <div key={t.name} className="bg-[#080808] group hover:bg-zinc-900 transition-colors w-full md:w-80">
                <div className="relative w-full h-96 overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black uppercase mb-1">{t.name}</h3>
                  <p className="text-[#e8132a] text-xs font-bold uppercase tracking-widest mb-1">{t.role}</p>
                  {t.exp && <p className="text-gray-500 text-sm">{t.exp}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH & LEARN */}
      <section id="classes" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-0.5 bg-[#e8132a]" />
                <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Training</span>
              </div>
              <h2 className="font-black uppercase leading-tight" style={{fontSize: 'clamp(1.5rem, 6vw, 3rem)'}}>
                Watch &<br /><span className="text-[#e8132a]">Learn</span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {classes.map((c, i) => (
              <button key={c.title} className={`p-8 flex flex-col gap-4 group text-left transition-colors w-full ${i === 0 ? 'bg-[#1e3a8a]' : 'bg-zinc-950 hover:bg-zinc-900'}`}>
                <div className="text-4xl">{c.icon}</div>
                <span className={`text-xs font-bold uppercase tracking-widest ${i === 0 ? 'text-blue-200' : 'text-[#e8132a]'}`}>{c.tag}</span>
                <h3 className="text-xl font-black uppercase">{c.title}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${i === 0 ? 'text-blue-100' : 'text-gray-400'}`}>{c.desc}</p>
                <span className={`text-xs font-bold uppercase tracking-widest mt-2 ${i === 0 ? 'text-white' : 'text-[#e8132a]'} group-hover:underline`}>
                  Watch Now →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH CTA */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Official Gear</span>
            </div>
            <h2 className="font-black uppercase leading-tight mb-6" style={{fontSize: 'clamp(1.5rem, 6vw, 3rem)'}}>
              Rep The<br /><span className="text-[#e8132a]">Champ</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
              Exclusive Lil Moochi merch — tees, hoodies, gloves, and more. Every purchase fuels a champion&apos;s journey.
            </p>
            <Link href="/store"
              className="bg-[#1e3a8a] text-white font-black px-10 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors inline-block">
              Shop Now
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-zinc-800">
            {['👕 Tees', '🧥 Hoodies', '🥊 Gloves', '🧢 Caps'].map((item) => (
              <div key={item} className="bg-zinc-950 aspect-square flex items-center justify-center text-xl md:text-2xl font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
