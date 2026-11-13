import React from 'react'
import {
  Sparkles,
  ArrowRight,
  Heart,
  Gift,
  Star,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react'
import { SAMPLE_PRODUCTS, HERO_IMAGE, COLLECTIONS, Product } from '../data/products'
import { STORY_BUNDLES, StoryBundle } from '../data/storyBundles'
import { ProductImage } from '../components/ProductImage'
import { GiftConcierge } from '../components/GiftConcierge'
import { FestiveHamperSection } from '../components/FestiveHamperSection'
import { CartItem } from '../components/CartDrawer'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { STUDIO_INFO } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface HomeViewProps {
  setCurrentView: (view: string) => void
  onSelectProduct: (product: Product) => void
  onAddToCart?: (item: CartItem) => void
  onOpenCart?: () => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  onSelectProduct,
  onAddToCart = () => {},
  onOpenCart,
  onRequestQuote
}) => {
  const { formatPrice } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()

  // Featured signature items
  const featured = [
    SAMPLE_PRODUCTS.find((p) => p.id === 'bespoke-resin-accent-guitar-strap') || SAMPLE_PRODUCTS[0],
    SAMPLE_PRODUCTS.find((p) => p.id === 'executive-sculpted-desk-nameplate')!,
    SAMPLE_PRODUCTS.find((p) => p.id === 'couple-spotify-photo-plaque')!,
    SAMPLE_PRODUCTS.find((p) => p.id === 'personalized-led-night-lamp-frame')!,
    SAMPLE_PRODUCTS.find((p) => p.id === 'wedding-souvenir-pack-25')!,
    SAMPLE_PRODUCTS.find((p) => p.id === 'executive-desk-clock-suite')!
  ].filter(Boolean)

  const handleAddBundleDirect = (bundle: StoryBundle) => {
    const item: CartItem = {
      id: `bundle-${bundle.id}-${Date.now()}`,
      type: 'bespoke',
      title: bundle.title,
      price: bundle.bundlePrice,
      isCustomQuote: bundle.isCustomQuote,
      minOrderQty: bundle.minOrderQty,
      ribbon: 'Custom Colors, Ribbon & Card (Confirmed on WhatsApp)',
      recipientName: `Made for: ${bundle.recipient}`,
      boxType: 'Presentation Gift Box with Personalized Handwritten Card',
      includedItems: bundle.items.map((i) => `${i.name} (${i.role})`),
      imageUrl: bundle.imageUrl
    }
    onAddToCart(item)
    if (onOpenCart) onOpenCart()
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden bg-[#F5F4F0] border-b border-[#E8E6E1] py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#1B3326] font-semibold bg-white/90 px-3.5 py-1.5 border border-[#E8E6E1] shadow-xs">
                <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>Handmade, Personalized Keepsakes · Made in Nigeria</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#191817] tracking-tight leading-[1.1] text-balance">
                Handmade keepsakes for{' '}
                <span className="italic font-light block text-[#1B3326] mt-1 text-3xl sm:text-4xl lg:text-5xl">
                  life&apos;s important moments.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#57534D] font-normal max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Customized resin gifts and event souvenirs for weddings, birthdays, baby showers, corporate events, religious celebrations, graduations, and festive gifting. Seal their exact name, special date, or favorite photo inside crystal-clear resin—presented in a branded box with satin ribbon, care card, and handwritten note.
              </p>

              {/* Action Buttons to eliminate hesitation */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCurrentView('guide')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#122319] transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#C2A264]" />
                  <span>Gifting Guide (By Feeling)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('gift-concierge')}
                  className="w-full sm:w-auto px-6 py-3.5 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#FAF9F5] text-xs uppercase tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm group"
                >
                  <span>30-Sec Quick Helper</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('catalogue')}
                  className="w-full sm:w-auto px-6 py-3.5 border border-[#191817] text-[#191817] bg-white hover:bg-[#FAFAF8] text-xs uppercase tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Browse All Resin Gifts</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E8E6E1] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">From ₦3,000</p>
                  <p className="text-xs uppercase tracking-wider text-[#4A4640] font-semibold mt-0.5">Honest Nigeria Prices</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">100% Custom</p>
                  <p className="text-xs uppercase tracking-wider text-[#4A4640] font-semibold mt-0.5">Any Name, Photo or Title</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">All 36 States</p>
                  <p className="text-xs uppercase tracking-wider text-[#4A4640] font-semibold mt-0.5">Fast &amp; Safe Delivery</p>
                </div>
              </div>
            </div>

            {/* Right Hero Photography */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] overflow-hidden shadow-xl border border-[#E0DDD7] bg-[#EAE8E3]">
                <ProductImage
                  src={HERO_IMAGE}
                  alt="ONE O handmade personalized resin gift box"
                  aspectRatio="auto"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#4A4640] flex-wrap gap-2">
                <span className="font-medium">Sample shown: Serving Tray, 4 Drink Coasters &amp; Ring Dish (made in any colors you choose)</span>
                <span className="flex items-center gap-1 font-semibold text-[#1B3326]">
                  <MapPin className="w-3.5 h-3.5" />
                  Lagos · Abuja · Port Harcourt · Delivered Nationwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE 30-SECOND GIFT HELPER */}
      <section id="gift-concierge" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <GiftConcierge
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          onOpenCart={onOpenCart}
          onRequestQuote={onRequestQuote}
        />
      </section>

      {/* SECTION 0B: LAUNCH OFFER SPOTLIGHT & 3 SERVICE LEVELS + UNBOXING STANDARD */}
      {(() => {
        const launchOffer = STORY_BUNDLES.find((b) => b.isLaunchOffer)
        const starterBestSellers = SAMPLE_PRODUCTS.filter((p) => p.isStarterBestSeller)
        return (
          <>
            {launchOffer && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-[#1B3326] via-[#213F2F] to-[#16291F] text-white border border-[#122319] shadow-lg p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] overflow-hidden border border-white/20 bg-white">
                      <ProductImage
                        src={launchOffer.imageUrl}
                        alt={launchOffer.title}
                        aspectRatio="auto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-[#C2A264] text-[#191817] text-xs uppercase tracking-widest font-bold">
                        Suggested Launch Offer
                      </span>
                      <span className="px-3 py-1 bg-white/10 border border-white/20 text-[#E5EFE7] text-xs uppercase tracking-wider font-semibold">
                        Save {formatPrice(launchOffer.savingsAmount)}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                      {launchOffer.title}
                    </h2>
                    <p className="text-sm text-[#E5EFE7] leading-relaxed">
                      {launchOffer.emotionalStory}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {launchOffer.items.map((item, idx) => (
                        <div key={idx} className="bg-white/10 border border-white/15 px-3 py-2 text-xs flex items-center justify-between gap-2">
                          <span className="font-medium text-white">{item.name}</span>
                          <span className="text-[#E5C07B] font-semibold shrink-0">{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                      <div>
                        <span className="text-xs text-[#C7D6CA] line-through block">
                          Itemized Value: {formatPrice(launchOffer.originalTotal)}
                        </span>
                        <span className="font-serif text-3xl font-bold text-[#E5C07B]">
                          {formatPrice(launchOffer.bundlePrice)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleAddBundleDirect(launchOffer)}
                          className="px-6 py-3 bg-[#C2A264] hover:bg-[#D4B679] text-[#191817] text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Order Launch Box</span>
                        </button>
                        <a
                          href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                            `Hello ONE O! I want to order "${launchOffer.title}" (${formatPrice(launchOffer.bundlePrice)}). Here are the birthday name, photo & color details:`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                          <span>WhatsApp Order</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 3 Service Levels & Packaging Unboxing Standard */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#FAF8F4] border border-[#DDD8CE] p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white p-5 border border-[#E2DDD3] space-y-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#1B3326]">Service Level 01</span>
                    <h3 className="font-serif text-lg font-bold text-[#191817]">Ready-Made Gifts</h3>
                    <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                      Stock-ready initial keychains, coasters, phone stands &amp; seasonal hampers prepared for same-day or next-day Lagos dispatch.
                    </p>
                  </div>
                  <div className="bg-white p-5 border border-[#E2DDD3] space-y-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#1B3326]">Service Level 02</span>
                    <h3 className="font-serif text-lg font-bold text-[#191817]">Personalized Pieces</h3>
                    <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                      Customized with exact names, high-res photos, milestone dates, scriptures, or colors—previewed cleanly with you on WhatsApp.
                    </p>
                  </div>
                  <div className="bg-white p-5 border border-[#E2DDD3] space-y-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#1B3326]">Service Level 03</span>
                    <h3 className="font-serif text-lg font-bold text-[#191817]">Event Bulk &amp; Corporate</h3>
                    <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                      Weddings, Owambe, naming ceremonies &amp; conferences (20–500+ pcs) sorted individually with thank-you tags &amp; volume quotes.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 border border-[#D5E3D8] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B3326] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C2A264]" />
                      <span>Included Inside Every ONE O Gift Package</span>
                    </span>
                    <p className="text-xs text-[#38342F]">
                      Branded box/velvet pouch + satin ribbon · Free handwritten message card · Resin Care Guide card · Thank-You &amp; Reorder card · Protective bubble wrap
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#1B3326] bg-[#E8F3EB] px-3 py-1.5 shrink-0">
                    Food-Safe vs. Keepsake Notice Included
                  </span>
                </div>
              </div>
            </section>

            {/* 12 Best-Selling Starter Collection */}
            {starterBestSellers.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-bold">
                      12 Best-Selling Starter Collection
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] font-semibold mt-1">
                      Most-Requested Personalized Essentials
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentView('catalogue')}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-bold text-[#1B3326] hover:underline"
                  >
                    <span>Explore All {SAMPLE_PRODUCTS.length} Items</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {starterBestSellers.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectProduct(item)}
                      className="bg-white border border-[#D8D4CC] hover:border-[#1B3326] p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all hover:shadow-md group"
                    >
                      <div className="space-y-2.5">
                        <div className="aspect-[4/3] bg-[#F5F4F0] overflow-hidden border border-[#E8E6E1] relative">
                          <ProductImage
                            src={item.imageUrl}
                            alt={item.title}
                            aspectRatio="auto"
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#1B3326] text-[#E5C07B] text-[10px] uppercase tracking-wider font-bold">
                            Starter Top 12 · C
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#191817] group-hover:text-[#1B3326] leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#4A4640] line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between gap-2">
                        {item.isCustomQuote ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRequestQuote?.({
                                id: item.id,
                                title: item.title,
                                subtitle: item.subtitle,
                                imageUrl: item.imageUrl,
                                collection: item.collection,
                                minOrderQty: item.minOrderQty,
                                itemsIncluded: item.itemsIncluded
                              })
                            }}
                            className="px-2.5 py-1 bg-[#1B3326] text-[#E5C07B] text-xs uppercase tracking-wider font-bold"
                          >
                            Request a Quote
                          </button>
                        ) : (
                          <span className="font-serif text-base font-bold text-[#1B3326]">
                            {formatPrice(item.price)}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#1B3326] group-hover:underline">
                          Open &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )
      })()}

      {/* SECTION 2: COMPLETE READY-TO-GIVE GIFT SETS (CORE STORE) */}
      <section id="curated-bundles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-bold flex items-center justify-center gap-1.5">
            <Gift className="w-4 h-4 text-[#C2A264]" />
            <span>Complete Gift Sets · Zero Repetition</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] tracking-tight font-semibold">
            Ready-to-Give Occasion Packages
          </h2>
          <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
            Birthdays, weddings &amp; proposals, baby showers &amp; naming ceremonies, Ramadan/Eid, Christmas, graduations, retirements, and corporate kits—each curated cleanly with zero overlap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STORY_BUNDLES.filter((b) => !b.isLaunchOffer).map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white border border-[#D8D4CC] hover:border-[#1B3326] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual */}
                <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden border-b border-[#E8E6E1]">
                  <ProductImage
                    src={bundle.imageUrl}
                    alt={bundle.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-white shadow-sm">
                      {bundle.recipient}
                    </span>
                    {bundle.bestSeller && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#C2A264] text-[#191817] shadow-sm">
                        Most Loved Set
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1B3326] border border-[#D5E3D8] shadow-sm">
                    {bundle.isCustomQuote
                      ? bundle.minOrderQty
                        ? `Min. Order: ${bundle.minOrderQty} Pcs`
                        : 'Customizable Box'
                      : `Save ${formatPrice(bundle.savingsAmount)}`}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#1B3326] block">
                      {bundle.occasion}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug mt-1">
                      {bundle.title}
                    </h3>
                  </div>

                  {/* Emotional Feeling Quote */}
                  <p className="text-sm text-[#38342F] bg-[#FAF9F5] p-3.5 border border-[#E8E6E1] leading-relaxed">
                    "{bundle.emotionalStory.slice(0, 145)}..."
                  </p>

                  {/* Included Items List */}
                  <div className="space-y-2 pt-1">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                      What Comes Inside This Box:
                    </p>
                    <ul className="text-sm text-[#38342F] space-y-1.5">
                      {bundle.items.map((item, idx) => (
                        <li key={idx} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                          <span className="flex items-start gap-2 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                            <span>{item.name}</span>
                          </span>
                          <span className="text-xs text-[#4A4640] font-semibold shrink-0">
                            {item.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 sm:p-6 pt-4 border-t border-[#E8E6E1] space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {bundle.isCustomQuote ? (
                    <div className="space-y-1">
                      <span className="text-xs text-[#4A4640] font-semibold block">
                        {bundle.minOrderQty ? `Minimum Order: ${bundle.minOrderQty} Pieces` : 'Tailored to Chosen Items'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onRequestQuote?.({
                            id: bundle.id,
                            title: bundle.title,
                            subtitle: bundle.tagline,
                            imageUrl: bundle.imageUrl,
                            minOrderQty: bundle.minOrderQty,
                            itemsIncluded: bundle.items.map((i) => i.name)
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Request a Quote</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs text-[#57534D] line-through block">
                        {formatPrice(bundle.originalTotal)}
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#1B3326]">
                        {formatPrice(bundle.bundlePrice)}
                      </span>
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#1B3326] bg-[#E8F3EB] px-2.5 py-1 shrink-0">
                    {bundle.isCustomQuote ? 'Customizable' : 'Complete Gift Set'}
                  </span>
                </div>

                {bundle.isCustomQuote ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        onRequestQuote?.({
                          id: bundle.id,
                          title: bundle.title,
                          subtitle: bundle.tagline,
                          imageUrl: bundle.imageUrl,
                          minOrderQty: bundle.minOrderQty,
                          itemsIncluded: bundle.items.map((i) => i.name)
                        })
                      }
                      className="w-full py-3 px-3 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[#C2A264]" />
                      <span>Request a Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddBundleDirect(bundle)}
                      className="w-full py-3 px-3 border border-[#1B3326] text-[#1B3326] bg-white text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF9F5] transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Quote Bag</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAddBundleDirect(bundle)}
                      className="w-full py-3 px-3 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                        `Hello ONE O! I want to order the "${bundle.title}" (${formatPrice(bundle.bundlePrice)}). Please send me the personalization details.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SHOP BY RELATIONSHIP (WHO YOU'RE CELEBRATING) */}
      <section className="bg-[#F5F4F0] py-16 border-y border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-bold">
              Find Their Joy Faster
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-semibold">
              Who Do You Want to Make Smile Today?
            </h2>
            <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
              Tap the person you are thinking about. We will show you gifts made to make them feel truly seen, loved, and appreciated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'The Boss, Director or Retiring Mentor',
                icon: '👔',
                insight: 'Give them a standing desk nameplate, standing desk clock, or organizer personalized in the exact colors you choose.',
                link: 'catalogue'
              },
              {
                title: 'My Husband, Fiancé or Boyfriend',
                icon: '💍',
                insight: 'Custom cufflinks & tie clip set, photo plaque, desk organizer, or phone stand made around your favorite moments.',
                link: 'catalogue'
              },
              {
                title: 'My Wife, Fiancée or Girlfriend',
                icon: '🌹',
                insight: 'LED bedside night light, jewelry dish stand / catch-all stand, jewelry set, customized mirror, comb & hair accessories, or A5 hardcover notebook.',
                link: 'catalogue'
              },
              {
                title: 'The Musician, Guitarist or Worship Leader',
                icon: '🎸',
                insight: 'Padded guitar straps with a custom badge, matching guitar picks, and an initial keychain made in their favorite colors.',
                link: 'catalogue'
              },
              {
                title: 'Bridal Party & Owambe Wedding Guests',
                icon: '👰',
                insight: 'Matching drink coasters, customized mirrors, hair accessories, cufflinks & tie clips, or initial keychains styled to your wedding colors on WhatsApp.',
                link: 'corporate'
              },
              {
                title: 'Parents, Pastors & Respected Elders',
                icon: '👑',
                insight: 'Honor plates, standing desk clocks, customized jotters, and engraved plaques with your personal message inside.',
                link: 'catalogue'
              },
              {
                title: 'New Homeowner, Host & Kitchen Lover',
                icon: '🏝️',
                insight: 'Serving boards, round rotating table trays, wine bottle stoppers, and matching coaster sets designed your way.',
                link: 'catalogue'
              },
              {
                title: 'Everyday Sweet Surprises (Under ₦10k)',
                icon: '💎',
                insight: 'Initial keychains, customized bookmarks, writing pens, fridge magnets, and phone stands starting from just ₦3,000.',
                link: 'catalogue'
              }
            ].map((rel, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentView(rel.link)}
                className="bg-white p-6 border border-[#D8D4CC] hover:border-[#1B3326] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{rel.icon}</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#1B3326] bg-[#E8F3EB] px-2.5 py-1">
                      Fast Match
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors mt-3.5 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-sm text-[#4A4640] mt-2 leading-relaxed">
                    {rel.insight}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1B3326] mt-4">
                  <span>Explore Matching Gifts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE INDIVIDUAL PERSONALIZED PIECES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-bold">
              Most Ordered Pieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] mt-1 font-semibold">
              Top Loved Handcrafted Gifts Across Nigeria
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('catalogue')}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-bold text-[#1B3326] hover:text-[#0E1C15] group"
          >
            <span>View All ({SAMPLE_PRODUCTS.length} items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white border border-[#D8D4CC] hover:border-[#1B3326] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden border-b border-[#E8E6E1]">
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.bestSeller && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-white shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#C2A264] text-[#191817] shadow-sm">
                        New In
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10 shadow-sm ${
                      isWishlisted(product.id)
                        ? 'bg-white text-[#D47563] shadow-md scale-105'
                        : 'bg-white/90 hover:bg-white text-[#4A4640] hover:text-[#D47563]'
                    }`}
                    title={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isWishlisted(product.id) ? 'fill-[#D47563] text-[#D47563] scale-110' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#4A4640] gap-2">
                    <span className="uppercase tracking-wider truncate max-w-[165px] font-bold">
                      {product.itemType}
                    </span>
                    {product.isCustomQuote ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRequestQuote?.({
                            id: product.id,
                            title: product.title,
                            subtitle: product.subtitle,
                            imageUrl: product.imageUrl,
                            collection: product.collection,
                            minOrderQty: product.minOrderQty,
                            itemsIncluded: product.itemsIncluded
                          })
                        }}
                        className="px-2.5 py-1 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                      >
                        Request a Quote
                      </button>
                    ) : (
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#1B3326] shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-sm text-[#4A4640] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  <p className="text-xs font-semibold text-[#1B3326] bg-[#FAF9F5] px-2.5 py-1 border border-[#E8E6E1]">
                    Design &amp; Colors: <span className="text-[#191817]">{product.resinPalette}</span>
                  </p>

                  {/* What You Get Inside */}
                  <div className="pt-2 border-t border-[#F0ECE4] space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                      What You Get Inside:
                    </p>
                    <ul className="text-xs sm:text-sm text-[#38342F] space-y-1">
                      {product.itemsIncluded.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-3 border-t border-[#E8E6E1] flex items-center justify-between gap-2">
                {product.isCustomQuote ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRequestQuote?.({
                        id: product.id,
                        title: product.title,
                        subtitle: product.subtitle,
                        imageUrl: product.imageUrl,
                        collection: product.collection,
                        minOrderQty: product.minOrderQty,
                        itemsIncluded: product.itemsIncluded
                      })
                    }}
                    className="px-3.5 py-2 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                    <span>Request a Quote</span>
                  </button>
                ) : (
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#191817]">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-xs font-bold text-[#1B3326] group-hover:underline uppercase tracking-wider shrink-0">
                  {product.isCustomQuote ? 'View Details & Reviews →' : 'Pick Colors & Name →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUTE MESSAGES & FREE HANDWRITTEN CARD SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F5F2EB] to-[#FAF7F2] p-6 sm:p-8 border border-[#E8E4DA] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#1B3326] text-xs uppercase tracking-wider font-bold border border-[#DDD8CE]">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Free Gift Cards Included</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
              Never Struggle with What to Write on the Card
            </h3>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Every single gift from ONE O comes with a neat, handwritten card inside the gift box. If you don't know what to say, tap our <strong>sweet ready-made messages</strong> for birthdays, anniversaries, appreciation, or holidays. We will write it out by hand for you!
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-[#1B3326]">
              <span className="bg-white px-3 py-1 border border-[#D8D4CC]">"My favorite person in the world"</span>
              <span className="bg-white px-3 py-1 border border-[#D8D4CC]">"To my forever person"</span>
              <span className="bg-white px-3 py-1 border border-[#D8D4CC]">"More grateful than words can say"</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setCurrentView('builder')}
              className="px-5 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Build a Gift with Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('occasions')}
              className="px-5 py-3.5 border border-[#1B3326] bg-white text-[#1B3326] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF9F5] transition-colors"
            >
              <span>Shop by Occasion</span>
            </button>
          </div>
        </div>
      </section>

      {/* SPECIAL SEASONAL CATALOG: DECEMBER & HOLIDAY HAMPERS */}
      <FestiveHamperSection
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
        onSelectProduct={onSelectProduct}
      />

      {/* SECTION 6: DIRECT WHATSAPP HELP CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3326] text-white p-8 sm:p-12 border border-[#122319] shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#C2A264] text-xs uppercase tracking-widest font-bold">
              <MessageCircle className="w-3.5 h-3.5 fill-[#C2A264] text-transparent" />
              <span>Direct Order &amp; Gift Help</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Want help planning a special surprise? Chat with us on WhatsApp in 2 minutes.
            </h2>
            <p className="text-sm sm:text-base text-[#E5EFE7] leading-relaxed max-w-xl">
              Tell us who you want to celebrate, how you want them to feel, and your budget. We will share 3 warm gift ideas and photos right away—packed with your message and delivered anywhere in Nigeria.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                  "Hello ONE O! I need help putting a personalized gift together for someone special. Here is my budget and occasion:"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-[0.14em] font-bold hover:bg-[#1EBE5D] transition-all shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Chat on WhatsApp ({STUDIO_INFO.phoneDisplay})</span>
              </a>

              <button
                type="button"
                onClick={() => setCurrentView('builder')}
                className="px-6 py-3.5 bg-white text-[#191817] text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#F5F4F0] transition-all"
              >
                Build Custom Gift Box
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
