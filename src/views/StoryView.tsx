import React from 'react'
import { Layers, Heart, Sparkles, ShieldCheck, MapPin, Gift, CheckCircle2 } from 'lucide-react'
import { ProductImage } from '../components/ProductImage'
import { HERO_IMAGE } from '../data/products'

interface StoryViewProps {
  setCurrentView: (view: string) => void
}

export const StoryView: React.FC<StoryViewProps> = ({ setCurrentView }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold bg-white/80 px-3 py-1 border border-[#E8E6E1]">
          Our Craft & Story · Handcrafted in Nigeria
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#191817] tracking-tight leading-tight">
          Thoughtful, personalized gifting.{' '}
          <span className="italic font-light block text-[#1B3326] mt-1">
            Made with you in mind.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          ONE O was born from a love for thoughtful, meaningful gifting in Nigeria. We create handmade personalized resin gifts—photo plaques, letter keychains, ring dishes, and party souvenirs—that turn special memories into lasting treasures.
        </p>
      </div>

      {/* Narrative Section 1 with Real Resin Photography */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#1B3326] font-bold">
            <Heart className="w-4 h-4 text-[#C2A264]" />
            <span>Personalization at the Heart of Every Gift</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
            "Gifts Should Tell a Personal Story"
          </h2>
          <p className="text-sm text-[#38342F] leading-relaxed">
            In Nigeria, celebrations are deeply personal. Whether welcoming a new year of life on a milestone birthday, honoring parents and mentors, showing love to your partner, or thanking wedding guests at a big Owambe party, a gift should carry real feeling.
          </p>
          <p className="text-sm text-[#38342F] leading-relaxed">
            Instead of plain gifts that get forgotten, every ONE O piece is made specifically for the person receiving it—with the exact colors, style, flowers, or sparkle you choose when chatting with us on WhatsApp. Every gift holds real feeling and brings lasting smiles.
          </p>
          <p className="text-sm text-[#38342F] leading-relaxed">
            We are proud to be an open, authentic Nigerian brand—making thoughtful personalized gifts affordable with clear prices for everyday celebrations and events nationwide.
          </p>
        </div>
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-md aspect-[4/3] overflow-hidden shadow-xl border border-[#E0DDD7] bg-[#F5F4F0]">
            <ProductImage
              src={HERO_IMAGE}
              alt="ONE O handmade personalized resin gift box"
              aspectRatio="auto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Studio Standards */}
      <div className="bg-[#F5F4F0] p-6 sm:p-10 border border-[#D8D4CC] space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
            Our Promise to You
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
            Our Quality Promise
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-base font-bold text-[#191817]">
              <Sparkles className="w-4 h-4 text-[#C2A264]" />
              <span>Clear Glass-Like Resin</span>
            </div>
            <p className="text-sm text-[#38342F] leading-relaxed">
              We pour with high-grade resin that stays bright and clear for years without turning yellow, keeping the colors, photos, flowers, or sparkles you choose looking brand new.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-base font-bold text-[#191817]">
              <Gift className="w-4 h-4 text-[#1B3326]" />
              <span>Packed Ready to Hand Over</span>
            </div>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Every order arrives neatly packed—from pretty gift bags for party favors, to strong gift boxes with ribbons and handwritten note cards.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-base font-bold text-[#191817]">
              <ShieldCheck className="w-4 h-4 text-[#1B3326]" />
              <span>Clear, Fair Nigerian Pricing</span>
            </div>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Everyone deserves to give something deeply personal. Our prices start from ₦3,000 for everyday bookmarks and ₦4,000 for keychains, plus bulk rates for event souvenirs.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-base font-bold text-[#191817]">
              <MapPin className="w-4 h-4 text-[#C2A264]" />
              <span>Safe Delivery Across All 36 States</span>
            </div>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Whether you are sending a surprise gift to Lagos, Abuja, Port Harcourt, Ibadan, Kano, or Enugu, our bubble-wrapped boxes arrive safely at their door.
            </p>
          </div>
        </div>
      </div>

      {/* Action links */}
      <div className="text-center space-y-3 pt-2">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
          Discover Personalized Gifting
        </h3>
        <p className="text-sm text-[#38342F] max-w-md mx-auto leading-relaxed">
          Explore our photo plaques, initial keychains, and ready-made gift boxes, or put together your own box with our builder.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentView('catalogue')}
            className="px-6 py-3 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors"
          >
            Shop All Gifts
          </button>
          <button
            onClick={() => setCurrentView('builder')}
            className="px-6 py-3 border border-[#191817] text-[#191817] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            Build a Gift Box
          </button>
        </div>
      </div>
    </div>
  )
}
