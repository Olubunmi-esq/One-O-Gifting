import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  ArrowRight,
  Check,
  Heart,
  RefreshCw,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Star,
  Calendar
} from 'lucide-react'
import { CELEBRATIONS, CelebrationGuide } from '../data/celebrationsData'
import { STORY_BUNDLES, StoryBundle } from '../data/storyBundles'
import { SAMPLE_PRODUCTS, Product } from '../data/products'
import { CartItem } from './CartDrawer'
import { useCurrency } from '../context/CurrencyContext'
import { STUDIO_INFO } from '../data/studioInfo'
import { ProductImage } from './ProductImage'
import { QuoteInquiryTarget } from './QuoteInquiryModal'

interface GiftConciergeProps {
  onAddToCart: (item: CartItem) => void
  onSelectProduct: (product: Product) => void
  onOpenCart?: () => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

export const GiftConcierge: React.FC<GiftConciergeProps> = ({
  onAddToCart,
  onSelectProduct,
  onOpenCart,
  onRequestQuote
}) => {
  const { formatPrice } = useCurrency()

  const [activeMode, setActiveMode] = useState<'celebration-tabs' | 'guided-steps'>('celebration-tabs')
  const [activeCelebrationId, setActiveCelebrationId] = useState<string>('milestone-birthdays')
  const [filterBudget, setFilterBudget] = useState<'all' | 'under-10k' | '10k-25k' | '25k-50k' | '50k-plus'>('all')

  // Guided Steps State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [guidedRecipient, setGuidedRecipient] = useState<string>('boss')
  const [guidedCelebration, setGuidedCelebration] = useState<string>('career-promotion')
  const [guidedBudget, setGuidedBudget] = useState<string>('popular')

  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null)

  const activeCelebration = useMemo(() => {
    return CELEBRATIONS.find((c) => c.id === activeCelebrationId) || CELEBRATIONS[0]
  }, [activeCelebrationId])

  const activeBundle = useMemo(() => {
    return (
      STORY_BUNDLES.find((b) => b.id === activeCelebration.recommendedBundleId) ||
      STORY_BUNDLES[0]
    )
  }, [activeCelebration])

  const allCelebrationProducts = useMemo(() => {
    return activeCelebration.featuredProductIds
      .map((id) => SAMPLE_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
  }, [activeCelebration])

  const celebrationProducts = useMemo(() => {
    return allCelebrationProducts.filter((p) => {
      if (p.isCustomQuote) {
        return filterBudget === 'all' || filterBudget === '50k-plus'
      }
      if (filterBudget === 'under-10k' && p.price > 10000) return false
      if (filterBudget === '10k-25k' && (p.price < 10000 || p.price > 25000)) return false
      if (filterBudget === '25k-50k' && (p.price < 25000 || p.price > 50000)) return false
      if (filterBudget === '50k-plus' && p.price < 50000) return false
      return true
    })
  }, [allCelebrationProducts, filterBudget])

  const guidedMatchedCelebration = useMemo(() => {
    return CELEBRATIONS.find((c) => c.id === guidedCelebration) || CELEBRATIONS[0]
  }, [guidedCelebration])

  const guidedMatchedBundle = useMemo(() => {
    return (
      STORY_BUNDLES.find((b) => b.id === guidedMatchedCelebration.recommendedBundleId) ||
      STORY_BUNDLES[0]
    )
  }, [guidedMatchedCelebration])

  const handleAddBundleToCart = (bundle: StoryBundle, celebrationName: string) => {
    const bundleCartItem: CartItem = {
      id: `bundle-${bundle.id}-${Date.now()}`,
      type: 'bespoke',
      title: `${bundle.title} (${celebrationName})`,
      price: bundle.bundlePrice,
      isCustomQuote: bundle.isCustomQuote,
      minOrderQty: bundle.minOrderQty,
      ribbon: 'Custom Colors & Ribbon (Confirmed on WhatsApp)',
      recipientName: `Made for: ${bundle.recipient}`,
      boxType: 'Complete Gift Box with Handwritten Card',
      includedItems: bundle.items.map((i) => `${i.name} (${i.role})`),
      imageUrl: bundle.imageUrl
    }

    onAddToCart(bundleCartItem)
    setAddedNoticeId(bundle.id)
    setTimeout(() => {
      setAddedNoticeId(null)
      if (onOpenCart) onOpenCart()
    }, 600)
  }

  const handleAddProductToCart = (product: Product) => {
    const item: CartItem = {
      id: `product-${product.id}-${Date.now()}`,
      type: 'catalog',
      title: product.title,
      price: product.price,
      isCustomQuote: product.isCustomQuote,
      minOrderQty: product.minOrderQty,
      ribbon: 'Custom Colors & Ribbon (Confirmed on WhatsApp)',
      boxType: product.packaging || 'Presentation Gift Box with Ribbon',
      imageUrl: product.imageUrl,
      includedItems: product.itemsIncluded
    }

    onAddToCart(item)
    setAddedNoticeId(product.id)
    setTimeout(() => {
      setAddedNoticeId(null)
      if (onOpenCart) onOpenCart()
    }, 600)
  }

  const getWhatsAppInquiryUrl = (celebration: CelebrationGuide, bundleTitle?: string) => {
    const greeting = 'Hello ONE O Personalised Gifts!'
    const text =
      `${greeting}\n\n` +
      `I am looking at your gifts for: *${celebration.name}*.\n` +
      (bundleTitle ? `I want to order: *${bundleTitle}*.\n` : '') +
      `I would like to tell your representative the exact colors, design style, and names I want on my order.`
    const cleanNumber = STUDIO_INFO.whatsappContact.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="bg-white border border-[#E2DDD3] shadow-sm p-6 sm:p-10 relative overflow-hidden">
      {/* Header & Mode Switcher */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1B3326] text-white text-xs uppercase tracking-[0.14em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
          <span>Quick Gift Finder · Pick by Occasion</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] tracking-tight leading-tight">
          Find the Gift That Says Exactly How You Feel
        </h2>

        <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed max-w-2xl mx-auto">
          Pick the occasion below to see what comes inside each gift box, exact item prices, and how you can add their name or favorite photo.
        </p>

        {/* Mode Toggle */}
        <div className="inline-flex flex-wrap items-center justify-center p-1 bg-[#F4F1EA] border border-[#DDD8CE] mt-2">
          <button
            type="button"
            onClick={() => setActiveMode('celebration-tabs')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'celebration-tabs'
                ? 'bg-white text-[#191817] shadow-sm'
                : 'text-[#4A4640] hover:text-[#191817]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#1B3326]" />
            <span>1. Pick an Occasion</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('guided-steps')
              setStep(1)
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'guided-steps'
                ? 'bg-[#1B3326] text-white shadow-sm'
                : 'text-[#4A4640] hover:text-[#191817]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C2A264]" />
            <span>2. Answer 3 Quick Questions</span>
          </button>
        </div>
      </div>

      {/* MODE 1: BROWSE BY CELEBRATION */}
      {activeMode === 'celebration-tabs' && (
        <div className="space-y-8">
          {/* Celebration Tabs */}
          <div className="border-b border-[#EAE6DE] pb-5">
            <p className="text-xs uppercase tracking-wider font-bold text-[#4A4640] mb-3 text-center sm:text-left">
              Choose an occasion:
            </p>

            <div className="flex items-center gap-2.5 flex-wrap">
              {CELEBRATIONS.map((c) => {
                const isSelected = activeCelebrationId === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActiveCelebrationId(c.id)
                      setFilterBudget('all')
                    }}
                    className={`px-4 py-2.5 text-sm font-semibold border transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? 'bg-[#1B3326] text-white border-[#1B3326] shadow-sm'
                        : 'bg-[#FAF9F5] text-[#191817] border-[#DDD8CE] hover:border-[#1B3326]'
                    }`}
                  >
                    <span className="text-base">{c.icon}</span>
                    <span>{c.name.split('&')[0].trim()}</span>
                    {c.id === 'december-holiday' && (
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? 'text-[#E5C07B]' : 'text-[#57534D]'
                        }`}
                      >
                        (Seasonal)
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Celebration Header */}
          <div className="bg-[#FAF9F5] border border-[#E2DDD3] p-6 sm:p-8 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAE6DE] pb-5">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#1B3326]">
                  {activeCelebration.icon} {activeCelebration.badge} · Prices: {activeCelebration.priceRangeText}
                </p>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
                  {activeCelebration.name}
                </h3>

                <p className="text-sm text-[#4A4640] leading-relaxed">
                  {activeCelebration.subtitle}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={getWhatsAppInquiryUrl(activeCelebration)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] text-white text-sm font-bold hover:bg-[#1EBE5D] transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>Ask Us on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-sm">
              <div className="md:col-span-7 p-4 bg-white border border-[#E8E4DA] space-y-1.5">
                <p className="font-bold uppercase tracking-wider text-[#1B3326] text-xs flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#C2A264]" />
                  <span>How This Makes Them Feel</span>
                </p>
                <p className="text-[#4A4640] leading-relaxed">
                  {activeCelebration.whyItMatters}
                </p>
              </div>

              <div className="md:col-span-5 p-4 bg-white border border-[#E8E4DA] space-y-2">
                <p className="font-bold uppercase tracking-wider text-[#191817] text-xs">
                  Ways You Can Personalize It:
                </p>
                <ul className="space-y-1.5 text-[#4A4640]">
                  {activeCelebration.customizationIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1B3326] shrink-0 mt-0.5" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION A: COMPLETE GIFT SET FOR THIS OCCASION */}
          {activeBundle && (
            <div className="border-2 border-[#1B3326] bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DE] pb-5">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-[#1B3326] font-bold flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#C2A264] fill-current" />
                    <span>
                      {activeBundle.isCustomQuote
                        ? activeBundle.minOrderQty
                          ? `Customizable Event Suite · Minimum ${activeBundle.minOrderQty} Pieces`
                          : 'Customizable Gift Box · Built Around Your Honoree'
                        : `Complete Ready-to-Give Gift Box · Save ${formatPrice(activeBundle.savingsAmount)}`}
                    </span>
                  </p>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
                    {activeBundle.title}
                  </h4>
                  <p className="text-sm text-[#4A4640]">
                    {activeBundle.tagline}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 bg-[#FAF9F5] p-4 border border-[#E2DDD3]">
                  {activeBundle.isCustomQuote ? (
                    <div className="space-y-1.5">
                      <p className="text-xs text-[#4A4640] font-semibold">
                        {activeBundle.minOrderQty ? `Min. Order: ${activeBundle.minOrderQty} pieces` : 'Tailored to Chosen Items'}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onRequestQuote?.({
                            id: activeBundle.id,
                            title: activeBundle.title,
                            subtitle: activeBundle.tagline,
                            imageUrl: activeBundle.imageUrl,
                            minOrderQty: activeBundle.minOrderQty,
                            itemsIncluded: activeBundle.items.map((i) => i.name)
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Request a Quote</span>
                      </button>
                      <p className="text-xs font-bold text-emerald-800">
                        Price Customizable
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-[#57534D] line-through">
                        Single Items Total: {formatPrice(activeBundle.originalTotal)}
                      </p>
                      <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3326]">
                        {formatPrice(activeBundle.bundlePrice)}
                      </p>
                      <p className="text-xs font-bold text-emerald-800">
                        Complete Box Price
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 aspect-[4/3] overflow-hidden border border-[#E0DDD7] bg-[#F5F4F0]">
                  <ProductImage
                    src={activeBundle.imageUrl}
                    alt={activeBundle.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <p className="text-sm text-[#4A4640] leading-relaxed bg-[#FAF9F5] p-4 border border-[#E8E6E1]">
                    {activeBundle.emotionalStory}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                      What Is Inside This Box ({activeBundle.items.length} Items):
                    </p>
                    <ul className="text-sm text-[#191817] divide-y divide-[#F0ECE4] border border-[#EAE6DE]">
                      {activeBundle.items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-white">
                          <span className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#1B3326] shrink-0 mt-0.5" />
                            <span className="font-medium text-[#191817]">{item.name}</span>
                          </span>
                          <span className="text-xs font-semibold text-[#1B3326] shrink-0 whitespace-nowrap">
                            {item.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-[#4A4640] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1B3326] shrink-0 mt-0.5" />
                    <span>Packed in a hard gift box with satin ribbon, wax seal, and a free handwritten greeting card from you.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE6DE] flex flex-col sm:flex-row items-center gap-3">
                {activeBundle.isCustomQuote ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        onRequestQuote?.({
                          id: activeBundle.id,
                          title: activeBundle.title,
                          subtitle: activeBundle.tagline,
                          imageUrl: activeBundle.imageUrl,
                          minOrderQty: activeBundle.minOrderQty,
                          itemsIncluded: activeBundle.items.map((i) => i.name)
                        })
                      }
                      className="w-full sm:flex-1 py-3.5 px-6 bg-[#1B3326] text-white hover:bg-[#122319] text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C2A264]" />
                      <span>Request a Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddBundleToCart(activeBundle, activeCelebration.name)}
                      className="w-full sm:w-auto py-3.5 px-6 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#FAF9F5] text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedNoticeId === activeBundle.id ? 'Added!' : 'Add to Quote Bag'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAddBundleToCart(activeBundle, activeCelebration.name)}
                      className={`w-full sm:flex-1 py-3.5 px-6 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        addedNoticeId === activeBundle.id
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#1B3326] text-white hover:bg-[#122319]'
                      }`}
                    >
                      {addedNoticeId === activeBundle.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added Complete Box to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                          <span>{`Add Complete Box to Bag · ${formatPrice(activeBundle.bundlePrice)}`}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppInquiryUrl(activeCelebration, activeBundle.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366] text-white text-sm font-bold hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                      <span>Add Custom Name on WhatsApp</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SECTION B: SINGLE HANDMADE PIECES */}
          <div className="space-y-5 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#EAE6DE] pb-4">
              <div className="space-y-1">
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
                  Individual Gifts for {activeCelebration.name.split('&')[0].trim()} ({allCelebrationProducts.length} Options)
                </h4>
                <p className="text-sm text-[#4A4640]">
                  Every card below shows the exact price and items inside—you pick your exact colors and design with us on WhatsApp.
                </p>
              </div>

              {/* Budget Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#191817]">
                  Filter by Price:
                </span>
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-10k', label: 'Under ₦10k' },
                  { id: '10k-25k', label: '₦10k – ₦25k' },
                  { id: '25k-50k', label: '₦25k – ₦50k' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setFilterBudget(b.id as any)}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-semibold border transition-all ${
                      filterBudget === b.id
                        ? 'bg-[#1B3326] text-white border-[#1B3326]'
                        : 'bg-white text-[#4A4640] border-[#DDD8CE] hover:border-[#1B3326] hover:text-[#191817]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Clear Price Overview List so shoppers immediately see what single items exist & prices */}
            <div className="bg-[#FAF9F5] border border-[#E8E6E1] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1B3326] mb-2">
                Quick Price List for {activeCelebration.name.split('&')[0].trim()}:
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#191817]">
                {allCelebrationProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      p.isCustomQuote
                        ? onRequestQuote?.({
                            id: p.id,
                            title: p.title,
                            subtitle: p.subtitle,
                            imageUrl: p.imageUrl,
                            collection: p.collection,
                            minOrderQty: p.minOrderQty,
                            itemsIncluded: p.itemsIncluded
                          })
                        : onSelectProduct(p)
                    }
                    className="text-left hover:text-[#1B3326] underline decoration-[#D0CCC4] underline-offset-4"
                  >
                    <span className="font-medium">{p.title.split('(')[0].trim()}</span>{' '}
                    <strong className="text-[#1B3326]">({p.isCustomQuote ? 'Request a Quote' : formatPrice(p.price)})</strong>
                  </button>
                ))}
              </div>
            </div>

            {celebrationProducts.length === 0 ? (
              <div className="bg-[#FAF9F5] border border-[#E8E6E1] p-8 text-center space-y-3">
                <p className="text-base font-semibold text-[#191817]">
                  No items for this occasion fall in that price range.
                </p>
                <button
                  type="button"
                  onClick={() => setFilterBudget('all')}
                  className="px-5 py-2.5 bg-[#1B3326] text-white text-sm font-semibold hover:bg-[#122319]"
                >
                  Show All {allCelebrationProducts.length} Gifts &amp; Prices
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {celebrationProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E2DDD3] hover:border-[#1B3326] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="aspect-[4/3] bg-[#F5F4F0] overflow-hidden border-b border-[#EAE6DE] cursor-pointer relative"
                      >
                        <ProductImage
                          src={product.imageUrl}
                          alt={product.title}
                          aspectRatio="auto"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#1B3326]">
                            {product.itemType.split('&')[0].trim()}
                          </span>
                          {product.isCustomQuote ? (
                            <button
                              type="button"
                              onClick={() =>
                                onRequestQuote?.({
                                  id: product.id,
                                  title: product.title,
                                  subtitle: product.subtitle,
                                  imageUrl: product.imageUrl,
                                  collection: product.collection,
                                  minOrderQty: product.minOrderQty,
                                  itemsIncluded: product.itemsIncluded
                                })
                              }
                              className="px-2.5 py-1 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                            >
                              Request a Quote
                            </button>
                          ) : (
                            <span className="text-lg font-bold text-[#1B3326] tabular-nums shrink-0">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <h5
                          onClick={() => onSelectProduct(product)}
                          className="text-base sm:text-lg font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug cursor-pointer"
                        >
                          {product.title}
                        </h5>

                        <p className="text-xs sm:text-sm font-medium text-[#57534D]">
                          Design &amp; Colors: <span className="text-[#191817]">{product.resinPalette}</span>
                        </p>

                        <p className="text-sm text-[#4A4640] leading-relaxed">
                          {product.description}
                        </p>

                        {/* Always show clearly what comes inside */}
                        <div className="pt-3 border-t border-[#F0ECE4] space-y-1.5">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                            What You Get Inside:
                          </p>
                          <ul className="space-y-1 text-xs sm:text-sm text-[#4A4640]">
                            {product.itemsIncluded.slice(0, 4).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                <Check className="w-3.5 h-3.5 text-[#1B3326] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                            {product.itemsIncluded.length > 4 && (
                              <li className="text-xs font-semibold text-[#1B3326]">
                                +{product.itemsIncluded.length - 4} more items inside (tap Pick Colors &amp; Name)
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-3 border-t border-[#F0ECE1] flex items-center gap-2">
                      {product.isCustomQuote ? (
                        <button
                          type="button"
                          onClick={() =>
                            onRequestQuote?.({
                              id: product.id,
                              title: product.title,
                              subtitle: product.subtitle,
                              imageUrl: product.imageUrl,
                              collection: product.collection,
                              minOrderQty: product.minOrderQty,
                              itemsIncluded: product.itemsIncluded
                            })
                          }
                          className="flex-1 py-2.5 px-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-4 h-4 text-[#C2A264]" />
                          <span>Request a Quote</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddProductToCart(product)}
                          className="flex-1 py-2.5 px-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                          <span>{addedNoticeId === product.id ? 'Added!' : 'Quick Add'}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="py-2.5 px-3 border border-[#191817] text-[#191817] hover:bg-[#FAF9F5] text-xs sm:text-sm font-semibold transition-all"
                      >
                        {product.isCustomQuote ? 'Details & Reviews' : 'Pick Colors & Name'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: GUIDED 3-STEP CONCIERGE */}
      {activeMode === 'guided-steps' && (
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            {[
              { num: 1, label: 'Who Is It For?' },
              { num: 2, label: 'Occasion' },
              { num: 3, label: 'Budget' },
              { num: 4, label: 'Your Match' }
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => s.num < step && setStep(s.num as any)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all ${
                  step === s.num
                    ? 'text-[#1B3326] font-bold'
                    : step > s.num
                    ? 'text-[#1B3326]/80 cursor-pointer'
                    : 'text-[#4A4640]'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.num
                      ? 'bg-[#1B3326] text-white'
                      : step > s.num
                      ? 'bg-[#D5E3D8] text-[#1B3326]'
                      : 'bg-[#EAE8E3] text-[#4A4640]'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                {s.num < 4 && <span className="text-[#C7C3BD] hidden sm:inline ml-1">→</span>}
              </button>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-center text-base font-bold text-[#191817]">
                Question 1: Who are you buying this gift for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'boss', label: 'My Boss or Office Director', icon: '👔', tag: 'Office & Desk' },
                  { id: 'husband', label: 'My Husband or Boyfriend', icon: '💍', tag: 'For Him' },
                  { id: 'wife', label: 'My Wife or Girlfriend', icon: '🌹', tag: 'For Her' },
                  { id: 'professional', label: 'A Doctor, Lawyer or Graduate', icon: '⚖️', tag: 'Career & Work' },
                  { id: 'kitchen-host', label: 'A New Homeowner or Hostess', icon: '🏝️', tag: 'Home & Kitchen' },
                  { id: 'musician', label: 'A Musician or Worship Leader', icon: '🎸', tag: 'Music & Stage' },
                  { id: 'elder', label: 'My Pastor, Parent or Elder', icon: '👑', tag: 'Respect & Honor' },
                  { id: 'wedding-guests', label: 'Our Wedding Guests & Friends', icon: '👰', tag: 'Party Souvenirs' },
                  { id: 'friend', label: 'A Good Friend, Brother or Sister', icon: '🎂', tag: 'Family & Friends' }
                ].map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => setGuidedRecipient(rec.id)}
                    className={`p-4 text-left border transition-all flex flex-col justify-between ${
                      guidedRecipient === rec.id
                        ? 'border-[#1B3326] bg-white ring-2 ring-[#1B3326] shadow-sm'
                        : 'border-[#E0DDD7] bg-[#FAF9F5] hover:bg-white hover:border-[#1B3326]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{rec.icon}</span>
                      <span className="text-xs font-semibold text-[#1B3326]">
                        {rec.tag}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#191817] mt-2 leading-snug">
                      {rec.label}
                    </p>
                  </button>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 bg-[#1B3326] text-white text-sm font-semibold hover:bg-[#122319] transition-all inline-flex items-center gap-2"
                >
                  <span>Next: What is the Occasion?</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-center text-base font-bold text-[#191817]">
                Question 2: What is the celebration?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CELEBRATIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setGuidedCelebration(c.id)}
                    className={`p-4 text-left border transition-all flex items-start gap-3.5 ${
                      guidedCelebration === c.id
                        ? 'border-[#1B3326] bg-white ring-2 ring-[#1B3326] shadow-sm'
                        : 'border-[#E0DDD7] bg-[#FAF9F5] hover:bg-white hover:border-[#1B3326]'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{c.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#191817]">{c.name}</p>
                      <p className="text-xs text-[#4A4640] leading-relaxed mt-0.5">
                        {c.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-[#8C8881] text-sm font-semibold text-[#191817] hover:bg-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-[#1B3326] text-white text-sm font-semibold hover:bg-[#122319] transition-all inline-flex items-center gap-2"
                >
                  <span>Next: Choose Your Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-center text-base font-bold text-[#191817]">
                Question 3: How much do you want to spend?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'starter', label: 'Sweet Budget Gifts', range: 'Under ₦10,000', note: 'Keychains with first letters, real flower bookmarks, and writing pens' },
                  { id: 'popular', label: 'Most Popular Gifts', range: '₦10,000 to ₦25,000', note: 'Desk clocks, glowing night lights, nameplates, and drink coaster pairs' },
                  { id: 'executive', label: 'Luxury Gifts & Food Boards', range: '₦25,000 to ₦45,000', note: 'Kitchen river serving boards, gift boxes, and honor frames' },
                  { id: 'luxury', label: 'VIP Boxes & Souvenir Packs', range: '₦45,000 and above', note: 'Bulk 25 to 100 wedding favors and lifetime honor sets' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setGuidedBudget(b.id)}
                    className={`p-4 text-left border transition-all flex flex-col justify-between ${
                      guidedBudget === b.id
                        ? 'border-[#1B3326] bg-white ring-2 ring-[#1B3326] shadow-sm'
                        : 'border-[#E0DDD7] bg-[#FAF9F5] hover:bg-white hover:border-[#1B3326]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#191817]">
                        {b.label}
                      </span>
                      <span className="text-sm font-bold text-[#1B3326]">
                        {b.range}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A4640] mt-2">
                      {b.note}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 border border-[#8C8881] text-sm font-semibold text-[#191817] hover:bg-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 bg-[#1B3326] text-white text-sm font-semibold hover:bg-[#122319] transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C2A264]" />
                  <span>Show My Matching Gift Box</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-[#1B3326] shadow-md p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#EAE6DE]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#1B3326] font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#1B3326]" />
                      <span>Best Match for {guidedMatchedCelebration.name}</span>
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817] mt-1">
                      {guidedMatchedBundle.title}
                    </h3>
                    <p className="text-sm text-[#4A4640] mt-0.5">
                      {guidedMatchedBundle.tagline}
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0 bg-[#FAF9F5] p-3.5 border border-[#E2DDD3]">
                    {guidedMatchedBundle.isCustomQuote ? (
                      <div className="space-y-1.5">
                        <p className="text-xs text-[#4A4640] font-semibold">
                          {guidedMatchedBundle.minOrderQty ? `Min. Order: ${guidedMatchedBundle.minOrderQty} pcs` : 'Tailored to Your Mix'}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            onRequestQuote?.({
                              id: guidedMatchedBundle.id,
                              title: guidedMatchedBundle.title,
                              subtitle: guidedMatchedBundle.tagline,
                              imageUrl: guidedMatchedBundle.imageUrl,
                              minOrderQty: guidedMatchedBundle.minOrderQty,
                              itemsIncluded: guidedMatchedBundle.items.map((i) => i.name)
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Request a Quote</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-[#57534D] line-through">
                          Separate Value: {formatPrice(guidedMatchedBundle.originalTotal)}
                        </p>
                        <p className="font-serif text-2xl font-bold text-[#1B3326]">
                          {formatPrice(guidedMatchedBundle.bundlePrice)}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 aspect-[4/3] overflow-hidden border border-[#E0DDD7] bg-[#F5F4F0]">
                    <ProductImage
                      src={guidedMatchedBundle.imageUrl}
                      alt={guidedMatchedBundle.title}
                      aspectRatio="auto"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="p-4 bg-[#FAF9F5] border border-[#E8E6E1] space-y-1">
                      <p className="text-xs uppercase tracking-wider font-bold text-[#1B3326]">
                        Why this fits your celebration
                      </p>
                      <p className="text-sm text-[#4A4640] leading-relaxed">
                        {guidedMatchedCelebration.whyItMatters}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                        What Is Inside This Set:
                      </p>
                      <ul className="text-sm text-[#191817] divide-y divide-[#F0ECE4] border border-[#EAE6DE]">
                        {guidedMatchedBundle.items.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between gap-2 px-3 py-2 bg-white">
                            <span className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#1B3326] shrink-0 mt-0.5" />
                              <span className="font-medium">{item.name}</span>
                            </span>
                            <span className="text-xs font-semibold text-[#1B3326] shrink-0">
                              {item.role}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE6DE] flex flex-col sm:flex-row items-center gap-3">
                  {guidedMatchedBundle.isCustomQuote ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onRequestQuote?.({
                            id: guidedMatchedBundle.id,
                            title: guidedMatchedBundle.title,
                            subtitle: guidedMatchedBundle.tagline,
                            imageUrl: guidedMatchedBundle.imageUrl,
                            minOrderQty: guidedMatchedBundle.minOrderQty,
                            itemsIncluded: guidedMatchedBundle.items.map((i) => i.name)
                          })
                        }
                        className="w-full sm:flex-1 py-3.5 px-6 bg-[#1B3326] text-white hover:bg-[#122319] text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-[#C2A264]" />
                        <span>Request a Quote</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddBundleToCart(guidedMatchedBundle, guidedMatchedCelebration.name)}
                        className="w-full sm:w-auto py-3.5 px-6 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#FAF9F5] text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Quote Bag</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAddBundleToCart(guidedMatchedBundle, guidedMatchedCelebration.name)}
                        className="w-full sm:flex-1 py-3.5 px-6 bg-[#1B3326] text-white hover:bg-[#122319] text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                        <span>{`Add Complete Set to Bag · ${formatPrice(guidedMatchedBundle.bundlePrice)}`}</span>
                      </button>

                      <a
                        href={getWhatsAppInquiryUrl(guidedMatchedCelebration, guidedMatchedBundle.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366] text-white text-sm font-bold hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                        <span>Personalize on WhatsApp</span>
                      </a>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="p-3 text-sm text-[#4A4640] hover:text-[#191817] underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Start Again</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
