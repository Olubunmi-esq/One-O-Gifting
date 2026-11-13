import React, { useMemo, useState } from 'react'
import {
  Heart,
  Award,
  Sparkles,
  Home,
  Sun,
  HandHeart,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  Copy,
  Check,
  Gift
} from 'lucide-react'
import { SAMPLE_PRODUCTS, Product } from '../data/products'
import { STORY_BUNDLES, StoryBundle } from '../data/storyBundles'
import { ProductImage } from '../components/ProductImage'
import { CartItem } from '../components/CartDrawer'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { STUDIO_INFO } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface GiftingGuideViewProps {
  onSelectProduct: (product: Product) => void
  onAddToCart: (item: CartItem) => void
  onOpenCart: () => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

type EmotionId = 'loved' | 'proud' | 'grateful' | 'joyful' | 'welcomed' | 'remembered'
type BudgetFilterId = 'all' | 'under-10k' | '10k-25k' | '25k-plus'

interface EmotionGuide {
  id: EmotionId
  feelingLabel: string
  shortHint: string
  icon: React.FC<{ className?: string }>
  headline: string
  plainStory: string
  whoItFits: string
  whatToWritePrompt: string
  sampleCardMessages: string[]
  bundleId: string
  productIds: string[]
}

const EMOTION_GUIDES: EmotionGuide[] = [
  {
    id: 'loved',
    feelingLabel: 'Deeply Loved & Held Close',
    shortHint: 'Husband · Wife · Partner · Anniversary',
    icon: Heart,
    headline: 'Make them feel chosen, cherished, and safe in your love',
    plainStory:
      'Flowers dry up in a week and perfumes finish, but seeing your favorite photo together glowing softly beside the bed every night reminds them you still choose them—quietly, warmly, every single day.',
    whoItFits: 'Husband, wife, fiancé, partner, or a couple celebrating an anniversary',
    whatToWritePrompt: 'Write one favorite memory you share or tell them why your life is sweeter with them.',
    sampleCardMessages: [
      'Thank you for being my safe place, my best friend, and my favorite part of every day.',
      'Years pass, but my heart still smiles the same way whenever you walk into the room.',
      'Here is something that stays bright forever—just like what we have built together.'
    ],
    bundleId: 'bundle-wedding-anniversary-romance',
    productIds: [
      'personalized-led-night-lamp-frame',
      'couple-spotify-photo-plaque',
      'couple-floral-ring-dish-tray',
      'anniversary-date-block-sculpture',
      'couple-coasters-and-stopper-duo',
      'couple-matching-pendant-bracelet-set'
    ]
  },
  {
    id: 'proud',
    feelingLabel: 'Proud & Truly Respected',
    shortHint: 'Boss · Promotion · Call to Bar · Retirement',
    icon: Award,
    headline: 'Honor their hard work in a way they can see on their desk every day',
    plainStory:
      'High achievers rarely buy special things for themselves. When they unwrap a standing desk nameplate or a quiet desk clock carrying their exact title and name, they immediately feel seen for every late night and sacrifice it took to get here.',
    whoItFits: 'Managing directors, bosses, doctors, lawyers, graduates, or retiring elders',
    whatToWritePrompt: 'Mention one specific way their leadership or hard work inspired you.',
    sampleCardMessages: [
      'You earned every bit of this milestone. Thank you for leading with kindness and excellence.',
      'May every hour this desk clock counts bring you peace, honor, and bigger wins ahead.',
      'Your hard work opened doors for so many of us. We are deeply proud of you.'
    ],
    bundleId: 'bundle-executive-director-tribute',
    productIds: [
      'executive-sculpted-desk-nameplate',
      'executive-desk-clock-suite',
      'distinguished-retirement-milestone-clock-suite',
      'corporate-desk-award-trophy',
      'executive-resin-paperweight-pyramid',
      'resin-executive-ballpoint-pen'
    ]
  },
  {
    id: 'grateful',
    feelingLabel: 'Grateful From the Heart',
    shortHint: 'Parents · Pastors · Teachers · Mentors',
    icon: HandHeart,
    headline: 'Say the big thank-you that ordinary words feel too small to carry',
    plainStory:
      'Sometimes a simple "thank you" text message does not feel enough for someone who prayed for you, taught you, or carried you through a hard season. A personal gift with their name and your heartfelt note written by hand inside lets them feel how truly thankful you are.',
    whoItFits: 'Mum & Dad, pastors, teachers, mentors, doctors, or people who stood by you',
    whatToWritePrompt: 'Tell them the exact moment they helped you and why you still remember it.',
    sampleCardMessages: [
      'More grateful than words can ever say. Thank you for standing by me when it mattered most.',
      'Your prayers, patience, and kindness changed my year. God bless you richly.',
      'Every time you use this, please remember there is someone praying for your joy.'
    ],
    bundleId: 'bundle-mentor-retirement-honor',
    productIds: [
      'executive-retirement-farewell-box',
      'pastor-mentor-appreciation-plaque',
      'teacher-doctor-appreciation-journal-suite',
      'retirement-service-achievement-frame',
      'personalized-mini-pocket-prayer-token',
      'resin-executive-ballpoint-pen'
    ]
  },
  {
    id: 'joyful',
    feelingLabel: 'Pure Joy & Birthday Smiles',
    shortHint: 'Birthdays · Best Friends · Musicians',
    icon: Sparkles,
    headline: 'Give them that wide-eyed "Wait—did you really get this made for me?" smile',
    plainStory:
      'The best birthday gifts feel personal, not rushed from a store shelf the night before. A custom gift set in their favorite colors with their name inside—or a padded guitar strap made with their stage name—makes them feel genuinely known.',
    whoItFits: 'Sisters, best friends, birthday celebrants, worship leaders, or musicians',
    whatToWritePrompt: 'Keep it warm and personal—celebrate who they are, not just their age.',
    sampleCardMessages: [
      'Happy Birthday to someone who brings warmth into every room. May this year be your sweetest yet.',
      'I had this gift box made specially for you—because you deserve things prepared with love.',
      'Keep shining and doing what you love. Always cheering the loudest for you!'
    ],
    bundleId: 'bundle-birthday-queen-botanical',
    productIds: [
      'birthday-curated-luxury-gift-box',
      'bespoke-resin-accent-guitar-strap',
      'afrobeat-stage-jacquard-guitar-strap',
      'personalized-vanity-catchall-tray',
      'birthday-sculpted-nameplate-plaque',
      'personalized-initial-letter-keychain'
    ]
  },
  {
    id: 'welcomed',
    feelingLabel: 'Welcomed & Right at Home',
    shortHint: 'New House · Newlyweds · Home Hosts',
    icon: Home,
    headline: 'Turn their dining table and kitchen into a warm place everyone loves gathering',
    plainStory:
      'A new house feels empty until you put warm, personal things inside it. A wooden serving board or rotating tray customized in the exact colors they love with their family name turns weekend meals and hosting guests into sweet memories.',
    whoItFits: 'New homeowners, newlywed couples, mums, or anyone who loves hosting friends',
    whatToWritePrompt: 'Bless their home with warmth, good meals, laughter, and peaceful evenings.',
    sampleCardMessages: [
      'May your new home be filled with laughter, warm food, open doors, and deep peace.',
      'Here is to many happy evenings around this table with the people you love most.',
      'Congratulations on your new home—made especially with your family name.'
    ],
    bundleId: 'bundle-pinterest-kitchen-entertainer',
    productIds: [
      'pinterest-emerald-waterfall-kitchen-board',
      'pinterest-u-shaped-kitchen-nook-lazy-susan',
      'pinterest-galley-kitchen-river-paddle-board',
      'pinterest-breakfast-nook-trio-tapas-platter',
      'faceted-resin-wine-bottle-stopper',
      'single-geode-crystal-agate-coaster'
    ]
  },
  {
    id: 'remembered',
    feelingLabel: 'Remembered on an Ordinary Day',
    shortHint: 'Sweet Surprises · Pocket Gifts Under ₦10,000',
    icon: Sun,
    headline: 'Show them they were on your mind—no big occasion needed',
    plainStory:
      'Making someone feel loved does not wait for a birthday or cost ₦100,000. An initial keychain clipped to their car keys, a customized bookmark inside their Bible or novel, or a pocket stone travels with them all week long.',
    whoItFits: 'Friends, colleagues, students, siblings, or anyone going through a busy week',
    whatToWritePrompt: 'One simple sentence from the heart is more than enough.',
    sampleCardMessages: [
      'Just wanted to brighten your week and remind you that I am rooting for you.',
      'A little something with your initial so you carry a smile everywhere you go.',
      'Saw this and thought of you right away. Hope today treats you kindly!'
    ],
    bundleId: 'bundle-starter-thoughtful-keepsake',
    productIds: [
      'resin-alphabet-keychain-gold',
      'bougainvillea-resin-bookmark-tassel',
      'personalized-mini-pocket-prayer-token',
      'mini-pocket-resin-jotter-notebook',
      'jeweled-resin-phone-stand',
      'single-geode-crystal-agate-coaster'
    ]
  }
]

const BUDGET_FILTERS: Array<{ id: BudgetFilterId; label: string }> = [
  { id: 'all', label: 'Any Budget' },
  { id: 'under-10k', label: 'Under ₦10,000' },
  { id: '10k-25k', label: '₦10,000 – ₦25,000' },
  { id: '25k-plus', label: '₦25,000+' }
]

export const GiftingGuideView: React.FC<GiftingGuideViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenCart,
  setCurrentView,
  onRequestQuote
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId>('loved')
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilterId>('all')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { formatPrice } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const activeGuide = useMemo(
    () => EMOTION_GUIDES.find((g) => g.id === selectedEmotion) || EMOTION_GUIDES[0],
    [selectedEmotion]
  )

  const matchedBundle: StoryBundle | undefined = useMemo(
    () => STORY_BUNDLES.find((b) => b.id === activeGuide.bundleId),
    [activeGuide]
  )

  const matchedProducts: Product[] = useMemo(() => {
    const baseProducts = activeGuide.productIds
      .map((id) => SAMPLE_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))

    if (budgetFilter === 'all') return baseProducts
    if (budgetFilter === 'under-10k') return baseProducts.filter((p) => !p.isCustomQuote && p.price < 10000)
    if (budgetFilter === '10k-25k') return baseProducts.filter((p) => !p.isCustomQuote && p.price >= 10000 && p.price <= 25000)
    return baseProducts.filter((p) => p.isCustomQuote || p.price > 25000)
  }, [activeGuide, budgetFilter])

  const handleCopyNote = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const handleAddBundleToBag = (bundle: StoryBundle) => {
    const item: CartItem = {
      id: `guide-bundle-${bundle.id}-${Date.now()}`,
      type: 'bespoke',
      title: bundle.title,
      price: bundle.bundlePrice,
      isCustomQuote: bundle.isCustomQuote,
      minOrderQty: bundle.minOrderQty,
      ribbon: 'Custom Colors & Ribbon (Confirmed on WhatsApp)',
      recipientName: bundle.recommendedPersonalization,
      boxType: 'Complete Gift Box with Ribbon & Handwritten Card',
      includedItems: bundle.items.map((i) => i.name),
      imageUrl: bundle.imageUrl
    }
    onAddToCart(item)
    onOpenCart()
  }

  const handleQuickAddProduct = (product: Product) => {
    const item: CartItem = {
      id: `guide-item-${product.id}-${Date.now()}`,
      type: 'catalog',
      title: product.title,
      price: product.price,
      isCustomQuote: product.isCustomQuote,
      minOrderQty: product.minOrderQty,
      ribbon: 'Custom Colors & Ribbon (Confirmed on WhatsApp)',
      recipientName: 'Confirm colors, design & name on WhatsApp',
      imageUrl: product.imageUrl
    }
    onAddToCart(item)
    onOpenCart()
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* Warm Intro Header */}
      <section className="bg-[#F5F4F0] border-b border-[#E8E6E1] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold">
            Simple Gifting Guide · Zero Guesswork
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#191817] tracking-tight leading-tight">
            Choose How You Want Them to Feel
          </h1>
          <p className="text-sm sm:text-base text-[#38342F] max-w-2xl mx-auto leading-relaxed">
            A great gift starts with a feeling, not a shopping list. Pick the feeling you want in their heart when they open the box—and we will show you the exact handmade resin pieces, complete gift boxes, and card messages that bring that moment to life.
          </p>
        </div>
      </section>

      {/* Step 1: Pick the Feeling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#4A4640] font-bold">
              Step 1 · Pick a Feeling
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] mt-1 font-semibold">
              When they untie the ribbon, what should they feel?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4640] font-medium">
            Tap any feeling below to see matching gifts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMOTION_GUIDES.map((guide) => {
            const Icon = guide.icon
            const isActive = guide.id === selectedEmotion
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => {
                  setSelectedEmotion(guide.id)
                  setBudgetFilter('all')
                  setCopiedIndex(null)
                }}
                className={`text-left p-5 border transition-all flex items-start gap-4 ${
                  isActive
                    ? 'bg-[#1B3326] text-white border-[#1B3326] shadow-md'
                    : 'bg-white text-[#191817] border-[#D8D4CC] hover:border-[#1B3326]'
                }`}
              >
                <div
                  className={`p-2.5 shrink-0 border ${
                    isActive
                      ? 'bg-[#264635] border-[#385E49] text-[#E5C07B]'
                      : 'bg-[#F5F4F0] border-[#D8D4CC] text-[#1B3326]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span
                    className={`block text-lg font-bold leading-snug ${
                      isActive ? 'text-white' : 'text-[#191817]'
                    }`}
                  >
                    {guide.feelingLabel}
                  </span>
                  <span
                    className={`block text-xs sm:text-sm leading-relaxed ${
                      isActive ? 'text-[#E5EFE7]' : 'text-[#4A4640]'
                    }`}
                  >
                    {guide.shortHint}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Step 2: Emotional Story + Card Message Ideas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white border border-[#D8D4CC] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Feeling Story */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#1B3326] font-bold">
                {activeGuide.feelingLabel} · {activeGuide.whoItFits}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] leading-snug font-semibold">
                {activeGuide.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
                {activeGuide.plainStory}
              </p>

              {/* Featured Matching Complete Gift Set */}
              {matchedBundle && (
                <div className="pt-4 border-t border-[#E8E6E1] mt-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#4A4640] font-bold mb-3">
                    Easiest Complete Box For This Feeling
                  </p>
                  <div className="bg-[#FAF9F5] border border-[#D8D4CC] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-44 aspect-[4/3] shrink-0 overflow-hidden border border-[#D8D4CC] bg-white">
                      <ProductImage
                        src={matchedBundle.imageUrl}
                        alt={matchedBundle.title}
                        aspectRatio="auto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2.5 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-[#191817]">
                          {matchedBundle.title}
                        </h3>
                        {matchedBundle.isCustomQuote ? (
                          <button
                            type="button"
                            onClick={() =>
                              onRequestQuote?.({
                                id: matchedBundle.id,
                                title: matchedBundle.title,
                                subtitle: matchedBundle.tagline,
                                imageUrl: matchedBundle.imageUrl,
                                minOrderQty: matchedBundle.minOrderQty,
                                itemsIncluded: matchedBundle.items.map((i) => i.name)
                              })
                            }
                            className="px-3.5 py-1.5 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0 self-start sm:self-auto"
                          >
                            Request a Quote
                          </button>
                        ) : (
                          <span className="font-serif text-xl font-bold text-[#1B3326] tabular-nums shrink-0">
                            {formatPrice(matchedBundle.bundlePrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A4640] leading-relaxed font-medium">
                        {matchedBundle.tagline}
                        {!matchedBundle.isCustomQuote && ` · Save ${formatPrice(matchedBundle.savingsAmount)} as a complete box`}
                      </p>
                      <ul className="text-xs sm:text-sm text-[#38342F] space-y-1 pt-1">
                        {matchedBundle.items.map((bi, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                            <span>{bi.name} ({bi.role})</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 flex flex-col sm:flex-row gap-2">
                        {matchedBundle.isCustomQuote ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                onRequestQuote?.({
                                  id: matchedBundle.id,
                                  title: matchedBundle.title,
                                  subtitle: matchedBundle.tagline,
                                  imageUrl: matchedBundle.imageUrl,
                                  minOrderQty: matchedBundle.minOrderQty,
                                  itemsIncluded: matchedBundle.items.map((i) => i.name)
                                })
                              }
                              className="px-4 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Sparkles className="w-4 h-4 text-[#C2A264]" />
                              <span>Request a Quote</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddBundleToBag(matchedBundle)}
                              className="px-4 py-2.5 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#F5F4F0] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Quote Bag</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleAddBundleToBag(matchedBundle)}
                              className="px-4 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                              <span>Add Complete Box</span>
                            </button>
                            <a
                              href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                                `Hello ONE O! I want someone to feel "${activeGuide.feelingLabel}". I love the "${matchedBundle.title}" (${formatPrice(matchedBundle.bundlePrice)}). Can we add a custom name on it?`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2.5 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#F5F4F0] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Order on WhatsApp</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Free Handwritten Card Helper */}
            <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#D8D4CC] p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#1B3326] font-bold">
                  Free Handwritten Card Ideas
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#191817]">
                  What to write inside the card
                </h3>
                <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                  {activeGuide.whatToWritePrompt} Pick any message below—we will write it out neatly by hand for free:
                </p>
              </div>

              <div className="space-y-3">
                {activeGuide.sampleCardMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D8D4CC] p-4 space-y-2.5"
                  >
                    <p className="text-sm text-[#191817] leading-relaxed">
                      "{msg}"
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopyNote(msg, idx)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B3326] hover:text-[#122319]"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-emerald-700">Copied Message</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                          `Hello ONE O! I want to send a gift that makes them feel "${activeGuide.feelingLabel}". Please use this card message:\n"${msg}"`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-wider text-[#38342F] hover:text-[#1B3326] underline"
                      >
                        Send via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Individual Handmade Resin Gifts That Fit This Feeling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#4A4640] font-bold">
              Step 2 · Handmade Pieces That Carry This Feeling
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] mt-1 font-semibold">
              Gifts for "{activeGuide.feelingLabel}"
            </h2>
          </div>

          {/* Simple Budget Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {BUDGET_FILTERS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudgetFilter(b.id)}
                className={`px-3.5 py-2 text-xs font-bold border transition-colors ${
                  budgetFilter === b.id
                    ? 'bg-[#1B3326] text-white border-[#1B3326]'
                    : 'bg-white text-[#38342F] border-[#D8D4CC] hover:border-[#1B3326] hover:text-[#191817]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="bg-white border border-[#D8D4CC] p-10 text-center space-y-4">
            <p className="font-serif text-xl font-semibold text-[#191817]">
              No gifts for "{activeGuide.feelingLabel}" sit in that budget range.
            </p>
            <p className="text-sm text-[#4A4640] max-w-md mx-auto">
              Switch back to "Any Budget" above, or explore our "Remembered on an Ordinary Day" feeling for gifts starting from ₦3,000.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setBudgetFilter('all')}
                className="px-5 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319]"
              >
                Show All Prices For This Feeling
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedEmotion('remembered')
                  setBudgetFilter('under-10k')
                }}
                className="px-5 py-2.5 border border-[#1B3326] text-[#1B3326] bg-white text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF9F5]"
              >
                See Gifts Under ₦10,000
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {matchedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#D8D4CC] hover:border-[#1B3326] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div
                  onClick={() => onSelectProduct(product)}
                  className="cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden border-b border-[#E8E6E1]">
                    <ProductImage
                      src={product.imageUrl}
                      alt={product.title}
                      aspectRatio="auto"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    {product.bestSeller && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-white shadow-sm">
                        Most Loved
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className={`absolute top-3 right-3 p-2.5 rounded-full transition-all shadow-sm ${
                        isWishlisted(product.id)
                          ? 'bg-white text-[#D47563] shadow-md'
                          : 'bg-white/90 hover:bg-white text-[#4A4640] hover:text-[#D47563]'
                      }`}
                      aria-label={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted(product.id) ? 'fill-[#D47563] text-[#D47563]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs uppercase tracking-wider text-[#4A4640] font-bold truncate">
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
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#1B3326] tabular-nums shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#4A4640] leading-relaxed">
                      {product.subtitle}
                    </p>

                    <p className="text-xs font-semibold text-[#1B3326] bg-[#FAF9F5] px-2.5 py-1 border border-[#E8E6E1]">
                      Design &amp; Colors: <span className="text-[#191817]">{product.resinPalette}</span>
                    </p>

                    <div className="pt-2 border-t border-[#F0ECE4] space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                        What You Get Inside:
                      </p>
                      <ul className="text-xs text-[#38342F] space-y-1">
                        {product.itemsIncluded.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 border-t border-[#E8E6E1] grid grid-cols-2 gap-2.5">
                  {product.isCustomQuote ? (
                    <>
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
                        className="py-2.5 px-3 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                        <span>Request a Quote</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="py-2.5 px-3 border border-[#191817] bg-white text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF9F5] transition-colors text-center"
                      >
                        Details &amp; Reviews
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="py-2.5 px-3 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors text-center"
                      >
                        Pick Colors &amp; Name
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddProduct(product)}
                        className="py-2.5 px-3 border border-[#191817] bg-white text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF9F5] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Helpful Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="bg-[#1B3326] text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C2A264] font-semibold flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              <span>Want to Mix & Match Yourself?</span>
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal">
              Build your own gift box or tell us who you are celebrating
            </h2>
            <p className="text-sm text-[#D5E3D8] leading-relaxed">
              Mix any resin items inside one box with your choice of ribbon and a handwritten card—or chat directly with us on WhatsApp for quick help in under 2 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setCurrentView('builder')}
              className="px-6 py-3.5 bg-white text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-[#F5F4F0] transition-colors flex items-center justify-center gap-2"
            >
              <span>Build Your Own Box</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('catalogue')}
              className="px-6 py-3.5 border border-white/40 text-white text-xs uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors"
            >
              Browse All Gifts
            </button>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                `Hello ONE O! I was looking at your Gifting Guide ("${activeGuide.feelingLabel}") and need help choosing the right gift.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
