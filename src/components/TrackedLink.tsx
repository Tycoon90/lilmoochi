'use client';
import { analytics } from '@/lib/analytics';

interface TrackedOutboundProps {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export function TrackedOutboundLink({
  href,
  label,
  className,
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
}: TrackedOutboundProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => analytics.outboundLink(href, label)}
    >
      {children}
    </a>
  );
}

interface TrackedCtaProps {
  href: string;
  label: string;
  destination: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedCtaLink({ href, label, destination, className, children }: TrackedCtaProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => analytics.ctaClick(label, destination)}
    >
      {children}
    </a>
  );
}

interface TrackedTrainingCardProps {
  title: string;
  tag: string;
  icon: string;
  desc: string;
  index: number;
}

export function TrackedTrainingCard({ title, tag, icon, desc, index }: TrackedTrainingCardProps) {
  return (
    <button
      className={`p-8 flex flex-col gap-4 group text-left transition-colors w-full ${index === 0 ? 'bg-[#1e3a8a]' : 'bg-zinc-950 hover:bg-zinc-900'}`}
      onClick={() => analytics.watchTraining(title)}
    >
      <div className="text-4xl">{icon}</div>
      <span className={`text-xs font-bold uppercase tracking-widest ${index === 0 ? 'text-blue-200' : 'text-[#e8132a]'}`}>{tag}</span>
      <h3 className="text-xl font-black uppercase">{title}</h3>
      <p className={`text-sm leading-relaxed flex-1 ${index === 0 ? 'text-blue-100' : 'text-gray-400'}`}>{desc}</p>
      <span className={`text-xs font-bold uppercase tracking-widest mt-2 ${index === 0 ? 'text-white' : 'text-[#e8132a]'} group-hover:underline`}>
        Watch Now →
      </span>
    </button>
  );
}
