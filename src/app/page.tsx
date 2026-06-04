import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import Link from 'next/link';
import Image from 'next/image';
import { TrackedOutboundLink, TrackedCtaLink, TrackedTrainingCard } from '@/components/TrackedLink';

export const metadata: Metadata = {
  alternates: { canonical: 'https://lilmoochi.com' },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lil Moochi',
      description: '5-year-old boxing prodigy trained by Coach Bam Bam at BAM Boxing & Martial Arts.',
      url: 'https://lilmoochi.com',
      image: 'https://lilmoochi.com/images/IMG_1114.jpeg',
      sameAs: [
        'https://www.instagram.com/lilmoochi2020',
        'https://www.youtube.com/@lilmoochi',
      ],
      sport: 'Boxing',
      coach: {
        '@type': 'Person',
        name: 'Sean Hotusing',
        jobTitle: 'Head Boxing Trainer',
      },
    }),
  },
};

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

const stats = [
  { value: 5, suffix: '', label: 'Years Old' },
  { value: 1, suffix: '+', label: 'Years Training' },
  { value: 100, suffix: '%', label: 'Heart' },
  { value: 1, suffix: '', label: 'Goal: World Champ' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center px-4 pt-20 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#080808] opacity-90" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left" delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Future World Champion</span>
            </div>
            <h1 className="font-black uppercase leading-[0.9] mb-6" style={{ fontSize: 'clamp(2rem, 10vw, 5rem)' }}>
              LIL<br />
              <span className="text-[#5b9bd5]">MOOCHI</span><br />
              BOXING
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              5 years old. Unstoppable heart. Watch the youngest boxing prodigy train, compete, and dominate — one round at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <TrackedCtaLink
                href="/#classes"
                label="See Training"
                destination="/#classes"
                className="bg-[#1e3a8a] text-white font-black px-8 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors"
              >
                See Training
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/store"
                label="Shop Merch Hero"
                destination="/store"
                className="border-2 border-white/20 text-white font-black px-8 py-4 uppercase tracking-wide hover:border-white transition-colors"
              >
                Shop Merch
              </TrackedCtaLink>
            </div>
          </AnimatedSection>

          {/* Hero video */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative flex items-center justify-center flex-col gap-6">
              <div className="relative w-full max-w-md" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/IMG_1114.jpeg"
                  alt="Lil Moochi training"
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-white/10" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Partners</span>
                  <span className="w-6 h-0.5 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <Image src="/images/moochi-logo.png" alt="Lil Moochi Boxing" fill sizes="(max-width: 640px) 50vw, 220px" className="object-cover hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <Image src="/images/promo2.jpeg" alt="BAM Boxing & Martial Arts" fill sizes="(max-width: 640px) 50vw, 220px" className="object-cover hover:opacity-90 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#1e3a8a] py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="text-4xl font-black mb-1">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="bg-zinc-900 rounded-none w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#e8132a] z-10" />
                <Image
                  src="/images/moochi-homepage.jpg"
                  alt="Lil Moochi training"
                  width={1600}
                  height={1236}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Story</span>
            </div>
            <h2 className="font-black uppercase leading-tight mb-6" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
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
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[#5b9bd5] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
              See the Gallery <span>→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">The Team</span>
            </div>
            <h2 className="font-black uppercase mb-14" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>Meet The<br /><span className="text-[#e8132a]">Coaches</span></h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row justify-center gap-12">
            {trainers.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15} direction="up">
                <div className="bg-[#080808] group hover:bg-zinc-900 transition-colors w-full md:w-80">
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH & LEARN */}
      <section id="classes" className="py-20 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-0.5 bg-[#e8132a]" />
                  <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Training</span>
                </div>
                <h2 className="font-black uppercase leading-tight" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
                  Watch &<br /><span className="text-[#e8132a]">Learn</span>
                </h2>
              </div>
              <Link href="/highlights" className="text-[#5b9bd5] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                View All Highlights →
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800">
            {classes.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1} direction="up">
                <TrackedTrainingCard
                  title={c.title}
                  tag={c.tag}
                  icon={c.icon}
                  desc={c.desc}
                  index={i}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS PREVIEW */}
      <section id="highlights" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Video</span>
            </div>
            <h2 className="font-black uppercase mb-10" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
              Latest<br /><span className="text-[#5b9bd5]">Highlight</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative bg-black" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
                <video
                  src="https://i7waoonl8n9ptnk1.public.blob.vercel-storage.com/moochie-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/moochi-logo.png"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[#e8132a] text-xs font-bold uppercase tracking-widest mb-3">Latest Drop</p>
                <h3 className="font-black text-3xl uppercase mb-4">Training Session — Combo Drills</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Watch Moochi throw lightning-fast combinations in this recent training session. The footwork. The speed. The focus. This is what a future world champion looks like.
                </p>
                <Link href="/highlights" className="inline-flex items-center gap-2 bg-[#1e3a8a] text-white font-black px-8 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors text-sm">
                  All Highlights →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MERCH CTA */}
      <section className="py-20 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Official Gear</span>
            </div>
            <h2 className="font-black uppercase leading-tight mb-6" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
              Rep The<br /><span className="text-[#e8132a]">Champ</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
              Exclusive Lil Moochi merch — tees, hoodies, gloves, and more. Every purchase fuels a champion&apos;s journey.
            </p>
            <TrackedCtaLink
              href="/store"
              label="Shop Now Merch CTA"
              destination="/store"
              className="bg-[#1e3a8a] text-white font-black px-10 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors inline-block"
            >
              Shop Now
            </TrackedCtaLink>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-px bg-zinc-800">
              {['👕 Tees', '🧥 Hoodies', '🥊 Gloves', '🧢 Caps'].map((item) => (
                <Link key={item} href="/store" className="bg-zinc-950 aspect-square flex items-center justify-center text-xl md:text-2xl font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">
                  {item}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT / SPONSORSHIPS */}
      <section id="contact" className="py-20 px-4 bg-zinc-950">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#e8132a]" />
              <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Get In Touch</span>
              <span className="w-10 h-0.5 bg-[#e8132a]" />
            </div>
            <h2 className="font-black uppercase mb-6" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
              Sponsorships &<br /><span className="text-[#5b9bd5]">Partnerships</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
              Interested in sponsoring Lil Moochi, running a promotion, or partnering with the next world champion? We&apos;d love to hear from you.
            </p>
            <TrackedOutboundLink
              href="mailto:management@lilmoochi.com"
              label="Contact Email"
              target="_self"
              rel=""
              className="inline-flex items-center gap-3 bg-[#1e3a8a] hover:bg-blue-700 transition-colors px-10 py-4 font-black uppercase tracking-wide text-white"
            >
              <span>✉</span>
              management@lilmoochi.com
            </TrackedOutboundLink>
            <p className="text-gray-600 text-xs uppercase tracking-widest mt-6">
              For sponsor deals, brand partnerships &amp; promotional inquiries
            </p>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
