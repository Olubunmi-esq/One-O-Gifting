import React, { useState, useMemo, useRef } from 'react'
import {
  Search,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Gem,
  PenTool,
  Gift,
  Truck
} from 'lucide-react'
import { SAMPLE_PRODUCTS, HERO_IMAGE, Product } from '../data/products'
import { STORY_BUNDLES, StoryBundle } from '../data/storyBundles'
import { ProductImage } from '../components/ProductImage'
import { CartItem } from '../components/CartDrawer'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { STUDIO_INFO, getWhatsAppOrderUrl } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'
import { CatalogueFilterPreset } from './CatalogueView'

interface HomeViewProps {
  setCurrentView: (view: string) => void
  onSelectProduct: (product: Product) => void
  onAddToCart?: (item: CartItem) => void
  onOpenCart?: () => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
  onOpenCatalogueWithFilter?: (preset: CatalogueFilterPreset) => void
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  onSelectProduct,
  onAddToCart = () => {},
  onOpenCart,
  onRequestQuote,
  onOpenCatalogueWithFilter
}) => {
  const { formatPrice } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [heroSearch, setHeroSearch] = useState('')
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goToCatalogue = (preset: CatalogueFilterPreset) => {
    if (onOpenCatalogueWithFilter) {
      onOpenCatalogueWithFilter(preset)
    } else {
      setCurrentView('catalogue')
    }
  }

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goToCatalogue({ searchQuery: heroSearch.trim() })
  }

  // Curated Trending Picks with direct pricing for frictionless Quick Add
  const trendingPicks = useMemo(() => {
    const preferred = SAMPLE_PRODUCTS.filter(
      (p) => !p.isCustomQuote && (p.isStarterBestSeller || p.bestSeller)
    )
    return preferred.slice(0, 12)
  }, [])

  const featuredPackages = useMemo(() => {
    const preferredIds = [
      'bundle-birthday-queen-botanical',
      'bundle-wedding-vip-favors-50',
      'bundle-baby-arrival-box',
      'bundle-executive-director-tribute',
      'bundle-mentor-retirement-honor',
      'bundle-december-appreciation-classic'
    ]
    const matched = preferredIds
      .map((id) => STORY_BUNDLES.find((b) => b.id === id))
      .filter((b): b is StoryBundle => Boolean(b))
    return matched.length >= 6 ? matched : STORY_BUNDLES.slice(0, 6)
  }, [])

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const offset = direction === 'left' ? -340 : 340
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const handleQuickAddProduct = (product: Product) => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      type: 'catalog',
      title: product.title,
      price: product.price,
      ribbon: 'Custom Colors & Name (Confirmed on WhatsApp)',
      boxType: product.packaging,
      includedItems: product.itemsIncluded,
      imageUrl: product.imageUrl
    }
    onAddToCart(item)
    setRecentlyAddedId(product.id)
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev))
    }, 1400)
  }

  const handleAddBundleDirect = (bundle: StoryBundle) => {
    const item: CartItem = {
      id: `bundle-${bundle.id}-${Date.now()}`,
      type: 'bespoke',
      title: bundle.title,
      price: bundle.bundlePrice,
      isCustomQuote: bundle.isCustomQuote,
      minOrderQty: bundle.minOrderQty,
      ribbon: 'Custom Colors & Card (Confirmed on WhatsApp)',
      recipientName: bundle.recipient,
      boxType: 'Presentation Gift Box with Card',
      includedItems: bundle.items.map((i) => i.name),
      imageUrl: bundle.imageUrl
    }
    onAddToCart(item)
    if (onOpenCart) onOpenCart()
  }

  return (
    <div className="space-y-16 pb-20">
      {/* 1. COMPACT SHOP-FIRST HERO */}
      <section className="bg-[#F5F4F0] border-b border-[#EAE8E3] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Direct Search & Quick Shop Shortcuts */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#191817] tracking-tight leading-[1.12] text-balance">
                  Personalized resin gifts &amp; event souvenirs.
                </h1>
                <p className="text-sm sm:text-base text-[#57534D] max-w-md leading-relaxed">
                  Custom names, photos &amp; dates — boxed and delivered nationwide from ₦3,000.
                </p>
              </div>

              <form onSubmit={handleHeroSearchSubmit} className="flex gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#6B665F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search keychains, photo frames, clocks, wedding packs..."
                    className="w-full pl-10 pr-3 py-3 text-sm bg-white border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                    aria-label="Search products"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#1B3326] text-white text-sm font-semibold hover:bg-[#122319] transition-colors whitespace-nowrap shrink-0"
                >
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All Gifts', preset: {} },
                  { label: 'Occasion Packages', preset: { itemType: 'Occasion Gift Packages' } },
                  { label: 'Under ₦10k', preset: { budgetPreset: 'under-10k' as const } },
                  { label: 'Weddings & Owambe', preset: { collection: 'Wedding & Anniversary Sets' } },
                  { label: 'Birthdays', preset: { collection: 'Birthday Celebrations' } },
                  { label: 'Corporate', preset: { collection: 'Corporate & Office Collections' } }
                ].map((shortcut) => (
                  <button
                    key={shortcut.label}
                    type="button"
                    onClick={() => goToCatalogue(shortcut.preset)}
                    className="px-3.5 py-2 bg-white border border-[#DDD8CE] hover:border-[#1B3326] text-xs font-medium text-[#191817] transition-colors whitespace-nowrap"
                  >
                    {shortcut.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Clean Hero Image */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] lg:h-full overflow-hidden border border-[#E0DDD7] bg-[#EAE8E3]">
                <ProductImage
                  src={HERO_IMAGE}
                  alt="ONE O personalized resin tray, coasters, and gift box"
                  aspectRatio="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING PICKS CAROUSEL (IMAGE-FORWARD + SINGULAR QUICK ADD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4 border-b border-[#EAE8E3] pb-4">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] font-semibold">
              Trending Picks
            </h2>
            <p className="text-sm text-[#57534D]">
              Best-selling resin keepsakes ready to quick-add or personalize.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => goToCatalogue({})}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3326] hover:underline whitespace-nowrap"
            >
              <span>Shop all</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="p-2 border border-[#DDD8CE] bg-white text-[#191817] hover:border-[#1B3326] hover:text-[#1B3326] transition-colors"
                aria-label="Scroll trending picks left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="p-2 border border-[#DDD8CE] bg-white text-[#191817] hover:border-[#1B3326] hover:text-[#1B3326] transition-colors"
                aria-label="Scroll trending picks right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Snap Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none"
        >
          {trendingPicks.map((product) => {
            const isJustAdded = recentlyAddedId === product.id
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group w-[265px] sm:w-[295px] shrink-0 snap-start bg-white border border-[#E5E2DC] hover:border-[#1B3326] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden">
                    <ProductImage
                      src={product.imageUrl}
                      alt={product.title}
                      aspectRatio="auto"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors ${
                        isWishlisted(product.id)
                          ? 'bg-white text-[#D47563] shadow-sm'
                          : 'bg-white/85 hover:bg-white text-[#4A4640]'
                      }`}
                      aria-label={isWishlisted(product.id) ? 'Remove from saved' : 'Save item'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted(product.id) ? 'fill-[#D47563] text-[#D47563]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="px-4 pt-3.5 pb-2 space-y-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[#191817] group-hover:text-[#1B3326] leading-snug truncate">
                      {product.title}
                    </h3>
                    <p className="font-serif text-base font-bold text-[#1B3326] tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Singular Quick Add CTA */}
                <div className="px-4 pb-4 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleQuickAddProduct(product)
                    }}
                    className={`w-full py-2.5 px-4 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                      isJustAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#1B3326] hover:bg-[#122319] text-white'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => goToCatalogue({})}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3326] hover:underline"
          >
            <span>Shop all {SAMPLE_PRODUCTS.length} items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. POPULAR GIFT PACKAGES (CLEAN IMAGE-FIRST GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#EAE8E3] pb-4">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] font-semibold">
              Popular Gift Packages
            </h2>
            <p className="text-sm text-[#57534D]">
              Complete boxed sets for birthdays, weddings, baby showers &amp; corporate events.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentView('occasions')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3326] hover:underline whitespace-nowrap shrink-0"
          >
            <span>All occasions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPackages.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white border border-[#E5E2DC] hover:border-[#1B3326] transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#F5F4F0] overflow-hidden">
                  <ProductImage
                    src={bundle.imageUrl}
                    alt={bundle.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-4 pt-4 pb-2 space-y-1">
                  <p className="text-xs text-[#6B665F]">
                    {bundle.recipient} · {bundle.items.length} pieces
                  </p>
                  <h3 className="text-base font-semibold text-[#191817] leading-snug line-clamp-1">
                    {bundle.title}
                  </h3>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-3">
                {bundle.isCustomQuote ? (
                  <>
                    <span className="text-xs font-medium text-[#57534D]">
                      {bundle.minOrderQty ? `Min. ${bundle.minOrderQty} pcs` : 'Custom quote'}
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
                      className="px-4 py-2 bg-[#1B3326] hover:bg-[#122319] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      Request a Quote
                    </button>
                  </>
                ) : (
                  <>
                    <span className="font-serif text-lg font-bold text-[#1B3326] tabular-nums">
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddBundleDirect(bundle)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3326] hover:bg-[#122319] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY ONE-O (SUBTLE VALUE PROPOSITIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-y border-[#E5E2DC] py-10 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl text-[#191817] font-semibold">
            Why One-O
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-2">
              <Gem className="w-5 h-5 text-[#1B3326]" strokeWidth={1.6} />
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-[#191817]">100% Handcrafted</h3>
                <p className="text-xs text-[#57534D] leading-relaxed">
                  Poured and polished by hand in our studio.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <PenTool className="w-5 h-5 text-[#1B3326]" strokeWidth={1.6} />
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-[#191817]">Custom Made</h3>
                <p className="text-xs text-[#57534D] leading-relaxed">
                  Your names, photos, dates &amp; colors sealed inside.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Gift className="w-5 h-5 text-[#1B3326]" strokeWidth={1.6} />
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-[#191817]">Ready to Gift</h3>
                <p className="text-xs text-[#57534D] leading-relaxed">
                  Ribboned box, care guide &amp; personal note card.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Truck className="w-5 h-5 text-[#1B3326]" strokeWidth={1.6} />
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-[#191817]">Nationwide Delivery</h3>
                <p className="text-xs text-[#57534D] leading-relaxed">
                  Safe doorstep shipping across all 36 states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIMPLE 3-STEP ORDERING STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F4F0] border border-[#E5E2DC] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#1B3326]">01. Choose</p>
              <p className="text-sm font-semibold text-[#191817]">Pick a gift or package</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#1B3326]">02. Personalize</p>
              <p className="text-sm font-semibold text-[#191817]">Send names, photos &amp; colors</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#1B3326]">03. Deliver</p>
              <p className="text-sm font-semibold text-[#191817]">Boxed &amp; shipped nationwide</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentView('builder')}
              className="px-5 py-2.5 bg-[#1B3326] text-white text-xs font-semibold hover:bg-[#122319] transition-colors whitespace-nowrap"
            >
              Build Custom Box
            </button>
            <a
              href={getWhatsAppOrderUrl(
                'Hello ONE O Personalized Gifts! I would like help picking a custom resin gift or event souvenir.'
              )}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white border border-[#1B3326] text-[#1B3326] text-xs font-semibold hover:bg-[#FAFAF8] transition-colors whitespace-nowrap"
            >
              WhatsApp {STUDIO_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
