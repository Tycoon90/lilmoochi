import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MerchCard from '@/components/MerchCard';

const products = [
  { name: 'Lil Moochi Classic Tee', price: '$29.99', tag: 'Bestseller', emoji: '👕' },
  { name: 'Champion Hoodie', price: '$54.99', tag: 'New Drop', emoji: '🧥' },
  { name: 'Boxing Gloves (Youth)', price: '$39.99', tag: 'Signature', emoji: '🥊' },
  { name: 'Snapback Cap', price: '$24.99', tag: undefined, emoji: '🧢' },
  { name: 'Training Shorts', price: '$34.99', tag: undefined, emoji: '🩳' },
  { name: 'Gym Bag', price: '$44.99', tag: 'Limited', emoji: '🎒' },
  { name: 'Phone Case', price: '$19.99', tag: undefined, emoji: '📱' },
  { name: 'Sticker Pack (5x)', price: '$9.99', tag: undefined, emoji: '🏷️' },
];

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute right-0 top-0 h-full w-64 bg-[#1e3a8a]/10 skew-x-[-8deg] translate-x-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#1e3a8a]" />
            <span className="text-[#5b9bd5] text-xs font-bold uppercase tracking-[0.3em]">Official Merch</span>
          </div>
          <h1 className="font-black uppercase leading-none mb-4" style={{fontSize: 'clamp(2rem, 10vw, 5rem)'}}>
            Moochi<br /><span className="text-[#5b9bd5]">Store</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            Rep the future world champion. Every purchase supports Lil Moochi&apos;s journey to the top.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-b border-white/5 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-none" style={{scrollbarWidth: 'none'}}>
          <div className="flex gap-0 min-w-max px-4 md:px-4 md:min-w-0">
          {['All', 'Apparel', 'Accessories', 'Equipment'].map((cat) => (
            <button
              key={cat}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-white/5 transition-colors whitespace-nowrap min-h-[48px] ${
                cat === 'All'
                  ? 'bg-[#1e3a8a] text-white'
                  : 'text-gray-500 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900">
          {products.map((p) => (
            <MerchCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-[#1e3a8a] py-8 px-4 text-center">
        <p className="font-black text-base md:text-lg uppercase tracking-widest flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>Free Shipping Over $75</span>
          <span className="hidden sm:inline">·</span>
          <span>Code <span className="underline">MOOCHI10</span> for 10% Off</span>
        </p>
      </section>

      <Footer />
    </div>
  );
}
