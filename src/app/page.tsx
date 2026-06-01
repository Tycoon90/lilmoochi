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
  { name: 'Coach Rico', role: 'Head Trainer', exp: '15 yrs', emoji: '👨‍🏫' },
  { name: 'Coach Maya', role: 'Conditioning', exp: '10 yrs', emoji: '👩‍🏫' },
  { name: 'Coach D', role: 'Sparring Coach', exp: '12 yrs', emoji: '🧑‍🏫' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-4 pt-24 pb-12">
        {/* Background slant */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#e8132a] opacity-90" style={{clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'}} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Future World Champion</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-6">
              LIL<br />
              <span className="text-[#e8132a]">MOOCHI</span><br />
              BOXING
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              5 years old. Unstoppable heart. Watch the youngest boxing prodigy train, compete, and dominate — one round at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#classes"
                className="bg-[#e8132a] text-white font-black px-8 py-4 uppercase tracking-wide hover:bg-red-500 transition-colors">
                See Training
              </Link>
              <Link href="/store"
                className="border-2 border-white/20 text-white font-black px-8 py-4 uppercase tracking-wide hover:border-white transition-colors">
                Shop Merch
              </Link>
            </div>
          </div>

          {/* Logo/photo panel */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-[#e8132a]/20 rounded-full blur-3xl" />
              <Image
                src="/images/logo-transparent.png"
                alt="Lil Moochi"
                fill
                className="object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#e8132a]">
          <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center border-r border-red-400/30 last:border-0 py-2">
                <p className="text-2xl md:text-3xl font-black">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-red-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-zinc-900 rounded-none w-full h-80 md:h-[480px] flex items-center justify-center text-[10rem] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#e8132a]" />
              <span>🥊</span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#e8132a] p-6 text-center">
              <p className="text-4xl font-black">2</p>
              <p className="text-xs uppercase tracking-widest">Started at<br/>age 2</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Story</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight mb-6">
              Born To<br /><span className="text-[#e8132a]">Fight</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              From the moment Moochi could walk, the ring was calling. At just 2 years old, tiny gloves were laced up for the first time — and nothing has been the same since.
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
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
      <section id="classes" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-0.5 bg-[#e8132a]" />
                <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Training</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
                Watch &<br /><span className="text-[#e8132a]">Learn</span>
              </h2>
            </div>
            <Link href="/#highlights" className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors self-start md:self-auto">
              All Highlights →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {classes.map((c, i) => (
              <div key={c.title} className={`p-8 flex flex-col gap-4 group cursor-pointer transition-colors ${i === 0 ? 'bg-[#e8132a]' : 'bg-zinc-950 hover:bg-zinc-900'}`}>
                <div className="text-4xl">{c.icon}</div>
                <span className={`text-xs font-bold uppercase tracking-widest ${i === 0 ? 'text-red-200' : 'text-[#e8132a]'}`}>{c.tag}</span>
                <h3 className="text-xl font-black uppercase">{c.title}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${i === 0 ? 'text-red-100' : 'text-gray-400'}`}>{c.desc}</p>
                <button className={`text-xs font-bold uppercase tracking-widest mt-2 text-left ${i === 0 ? 'text-white' : 'text-[#e8132a]'} group-hover:underline`}>
                  Watch Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS BANNER */}
      <section id="highlights" className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e8132a] skew-y-1" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <p className="text-red-200 text-xs font-bold uppercase tracking-[0.3em] mb-4">Viral Moments</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">Top Highlights</h2>
          <p className="text-red-100 max-w-xl mx-auto mb-10">
            Millions of views. One 5-year-old with gloves and a dream. Watch the clips taking the internet by storm.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
            {['First Knockout 🎯', 'Speed Bag Drills ⚡', 'Ring Debut 🏆'].map((clip) => (
              <div key={clip} className="bg-black/30 border border-white/20 p-8 text-center hover:bg-black/50 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">▶</div>
                <p className="font-bold uppercase tracking-wide text-sm">{clip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Team</span>
          </div>
          <h2 className="text-5xl font-black uppercase mb-14">Meet The<br /><span className="text-[#e8132a]">Coaches</span></h2>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-800">
            {trainers.map((t) => (
              <div key={t.name} className="bg-[#080808] p-10 group hover:bg-zinc-900 transition-colors">
                <div className="w-20 h-20 bg-zinc-800 flex items-center justify-center text-4xl mb-6 group-hover:bg-[#e8132a] transition-colors">
                  {t.emoji}
                </div>
                <h3 className="text-2xl font-black uppercase mb-1">{t.name}</h3>
                <p className="text-[#e8132a] text-xs font-bold uppercase tracking-widest mb-1">{t.role}</p>
                <p className="text-gray-500 text-sm">{t.exp} experience</p>
              </div>
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
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight mb-6">
              Rep The<br /><span className="text-[#e8132a]">Champ</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
              Exclusive Lil Moochi merch — tees, hoodies, gloves, and more. Every purchase fuels a champion&apos;s journey.
            </p>
            <Link href="/store"
              className="bg-[#e8132a] text-white font-black px-10 py-4 uppercase tracking-wide hover:bg-red-500 transition-colors inline-block">
              Shop Now
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-zinc-800">
            {['👕 Tees', '🧥 Hoodies', '🥊 Gloves', '🧢 Caps'].map((item) => (
              <div key={item} className="bg-zinc-950 p-10 text-center text-2xl font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">
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
