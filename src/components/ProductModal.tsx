import React, { useState, useEffect } from 'react'
import {
  X,
  Check,
  Gift,
  Box,
  Feather,
  Heart,
  ShieldCheck,
  Music,
  Star,
  ThumbsUp,
  MessageSquarePlus,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Type,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Droplets,
  Sun,
  AlertCircle
} from 'lucide-react'
import { Product, RIBBON_OPTIONS } from '../data/products'
import { getProductCareProfile } from '../data/productCare'
import { ProductImage } from './ProductImage'
import { CartItem } from './CartDrawer'
import { useCurrency } from '../context/CurrencyContext'
import {
  Review,
  getProductReviews,
  calculateReviewStats
} from '../data/reviews'
import {
  GUITAR_STRAP_COLORS,
  GUITAR_STRAP_THEMES,
  GUITAR_STRAP_STYLES,
  GUITAR_STRAP_HARDWARE,
  StrapColorOption,
  StrapThemeOption,
  StrapStyleOption,
  StrapHardwareOption
} from '../data/guitarStrapOptions'
import {
  FONT_TEMPLATES,
  METALLIC_LEAF_TEMPLATES,
  GRADIENT_TEMPLATES,
  LAYOUT_TEMPLATES,
  AESTHETIC_PRESETS,
  AestheticPreset
} from '../data/designTemplates'
import { CuteMessagePicker } from './CuteMessagePicker'
import { CustomizationPanel, CustomizationSelection, COLOR_PALETTES, RESIN_EFFECTS, BASE_MATERIALS } from './CustomizationPanel'
import { DesignAndColorPicker, SelectedDesignConfig } from './DesignAndColorPicker'
import { QuoteInquiryTarget } from './QuoteInquiryModal'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (item: CartItem) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

interface CompanionSuggestion {
  id: string
  name: string
  price: number
  role: string
  description: string
}

function getCompanionSuggestions(product: Product): CompanionSuggestion[] {
  if (
    product.isGuitarStrap ||
    product.itemType === 'Personalized Guitar Straps & Music Gifts'
  ) {
    return [
      {
        id: 'comp-picks',
        name: 'Matching Personalized Guitar Picks (Pack of 3)',
        price: 3500,
        role: 'Picks with Initials',
        description: 'Made in your chosen colors with the musician’s initials inside, ready in a gift case.'
      },
      {
        id: 'comp-keychain',
        name: 'Matching Letter Initial Keychain',
        price: 4000,
        role: 'Bag Keychain',
        description: 'Custom initial keychain finished in your chosen style and colors for their guitar bag.'
      }
    ]
  }

  if (
    product.itemType === 'Desk Nameplates & Signage' ||
    product.itemType === 'Desk & Wall Clocks' ||
    product.collection === 'Corporate & Office Collections' ||
    product.collection === 'Retirement Sets'
  ) {
    return [
      {
        id: 'comp-pen',
        name: 'Matching Personalized Writing Pen',
        price: 3500,
        role: 'Executive Pen',
        description: 'Smooth writing pen made in the colors and style you choose for their desk.'
      },
      {
        id: 'comp-clock-or-nameplate',
        name:
          product.itemType === 'Desk Nameplates & Signage'
            ? 'Matching Standing Desk Clock'
            : 'Matching Desk Nameplate Block',
        price: product.itemType === 'Desk Nameplates & Signage' ? 22500 : 20000,
        role: 'Office Desk Pair',
        description: 'Placed side-by-side on their desk, made in your chosen colors and wording.'
      }
    ]
  }

  if (
    product.collection === 'Wedding & Anniversary Sets' ||
    product.collection === 'Romance & Love Sets' ||
    product.itemType === 'Photo & Message Plaques' ||
    product.itemType === 'LED Night Lamps & Frames'
  ) {
    return [
      {
        id: 'comp-coasters',
        name: 'Matching Drink Coasters (Pair of 2)',
        price: 10500,
        role: 'Couple Coasters',
        description: 'Two matching coasters personalized with couple initials in your chosen colors.'
      },
      {
        id: 'comp-keychains-pair',
        name: 'His & Hers Matching Letter Keychains (Set of 2)',
        price: 8000,
        role: 'Couple Keychains',
        description: 'Two matching initial keychains finished in any colors you pick so they both have one.'
      }
    ]
  }

  // Default / Birthday Queen / Appreciation
  return [
    {
      id: 'comp-hand-mirror',
      name: 'Customized Pocket Mirror',
      price: 7500,
      role: 'Handbag Mirror',
      description: 'Customized pocket mirror finished in your preferred colors, design, and name.'
    },
    {
      id: 'comp-bookmark',
      name: 'Bookmark & Matching Pen Set',
      price: 6000,
      role: 'Book & Journal Set',
      description: 'Custom bookmark plus a matching writing pen made in the look you want.'
    }
  ]
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onRequestQuote
}) => {
  if (!product) return null

  return (
    <ProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAddToCart={onAddToCart}
      onRequestQuote={onRequestQuote}
    />
  )
}

interface ProductModalContentProps {
  product: Product
  onClose: () => void
  onAddToCart: (item: CartItem) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({
  product,
  onClose,
  onAddToCart,
  onRequestQuote
}) => {
  const { formatPrice } = useCurrency()
  const [activeTab, setActiveTab] = useState<'details' | 'customization' | 'inspirations' | 'reviews'>('details')
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0].name)
  const [recipientName, setRecipientName] = useState('')
  const [customDetail, setCustomDetail] = useState('')
  const [personalMemory, setPersonalMemory] = useState('')
  const [giftNote, setGiftNote] = useState('')
  const [added, setAdded] = useState(false)

  // CustomizationPanel selections (optional inspiration — customers may also decide everything on WhatsApp)
  const [hasPickedCustomStyle, setHasPickedCustomStyle] = useState(false)
  const [selectedCustomPalette, setSelectedCustomPalette] = useState(COLOR_PALETTES[0])
  const [selectedResinEffect, setSelectedResinEffect] = useState(RESIN_EFFECTS[0])
  const [selectedBaseMaterial, setSelectedBaseMaterial] = useState(BASE_MATERIALS[0])

  // Design Inspiration & Template Choices
  const [selectedFont, setSelectedFont] = useState<string>('Imperial Roman Serif')
  const [selectedMetallicLeaf, setSelectedMetallicLeaf] = useState<string>('24k Metallic Gold Leaf Flakes')
  const [selectedGradientTheme, setSelectedGradientTheme] = useState<string>('Emerald Malachite to 24k Gold Fade')
  const [presetAppliedMessage, setPresetAppliedMessage] = useState<string | null>(null)

  // Companion items state for easy bundling
  const [selectedCompanionIds, setSelectedCompanionIds] = useState<string[]>([])

  // Guitar Strap Personalization State
  const [strapColorCategory, setStrapColorCategory] = useState<'Solid Colors' | 'Design Gradients' | 'Champagne'>('Design Gradients')
  const [selectedStrapColor, setSelectedStrapColor] = useState<StrapColorOption>(
    GUITAR_STRAP_COLORS[1].options[0] // Emerald to 24k Gold Foil Fade
  )
  const [selectedStrapTheme, setSelectedStrapTheme] = useState<StrapThemeOption>(
    GUITAR_STRAP_THEMES[0] // 24k Gold Monogram Luxe
  )
  const [selectedStrapStyle, setSelectedStrapStyle] = useState<StrapStyleOption>(
    GUITAR_STRAP_STYLES[0] // 2.5" Ergonomic Padded Leather
  )
  const [selectedStrapHardware, setSelectedStrapHardware] = useState<StrapHardwareOption>(
    GUITAR_STRAP_HARDWARE[0] // 24k Polished Gold
  )
  const [musicianStageName, setMusicianStageName] = useState('')
  const [strapInscription, setStrapInscription] = useState('')
  const [includeMatchingPick, setIncludeMatchingPick] = useState(true)

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>([])
  const [starFilter, setStarFilter] = useState<'all' | 5 | 4 | 3>('all')
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({})
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({})

  // New review form
  const [showAddReview, setShowAddReview] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newOccasion, setNewOccasion] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newComment, setNewComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const companionSuggestions = getCompanionSuggestions(product)

  useEffect(() => {
    if (product) {
      const initialReviews = getProductReviews(
        product.id,
        product.collection,
        product.itemType
      )
      setReviewsList(initialReviews)
      setStarFilter('all')
      const initialCounts: Record<string, number> = {}
      initialReviews.forEach((r) => {
        initialCounts[r.id] = r.helpfulCount
      })
      setHelpfulMap(initialCounts)
      setShowAddReview(false)
      setReviewSubmitted(false)
      setActiveTab('details')
      setSelectedCompanionIds([])
      setHasPickedCustomStyle(false)
      setPersonalMemory('')
    }
  }, [product])

  const stats = calculateReviewStats(reviewsList)
  const filteredReviews =
    starFilter === 'all'
      ? reviewsList
      : reviewsList.filter((r) => Math.round(r.rating) === starFilter)

  const toggleCompanion = (id: string) => {
    setSelectedCompanionIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  // Calculate dynamic total price including chosen companion items
  const companionsCost = companionSuggestions
    .filter((c) => selectedCompanionIds.includes(c.id))
    .reduce((sum, c) => sum + c.price, 0)

  const totalItemPrice = product.price + companionsCost

  const careProfile = getProductCareProfile(
    product,
    selectedBaseMaterial.id,
    hasPickedCustomStyle
  )

  const buildQuotePayload = (): QuoteInquiryTarget => {
    const selectedAddonNames = companionSuggestions
      .filter((c) => selectedCompanionIds.includes(c.id))
      .map((c) => c.name)

    const styleNote = hasPickedCustomStyle
      ? `Style idea: ${selectedCustomPalette.name}, ${selectedResinEffect.name}, ${selectedFont}`
      : ''

    const notesParts = [
      personalMemory.trim(),
      giftNote.trim() ? `Card note: ${giftNote.trim()}` : '',
      selectedAddonNames.length > 0 ? `Add-ons: ${selectedAddonNames.join(', ')}` : '',
      styleNote
    ].filter(Boolean)

    return {
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      imageUrl: product.imageUrl,
      collection: product.collection,
      minOrderQty: product.minOrderQty,
      itemsIncluded: product.itemsIncluded,
      initialRecipient: recipientName.trim(),
      initialNotes: notesParts.join(' · ')
    }
  }

  const isStrap = Boolean(
    product.isGuitarStrap ||
      product.itemType === 'Personalized Guitar Straps & Music Gifts'
  )

  const activeColorGroup =
    GUITAR_STRAP_COLORS.find((c) => c.category === strapColorCategory) ||
    GUITAR_STRAP_COLORS[0]

  const handleHelpfulClick = (reviewId: string) => {
    if (userVoted[reviewId]) return
    setHelpfulMap((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }))
    setUserVoted((prev) => ({
      ...prev,
      [reviewId]: true
    }))
  }

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newComment.trim()) return

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      giftSetName: product.title,
      author: newName.trim(),
      verifiedBuyer: true,
      rating: newRating,
      title: newTitle.trim() || 'Thoughtful Handmade Finish',
      location: newLocation.trim() || 'Lagos, Nigeria',
      occasion: newOccasion.trim() || 'Special Celebration',
      comment: newComment.trim(),
      date: 'Just now',
      helpfulCount: 0
    }

    setReviewsList((prev) => [newReview, ...prev])
    setStarFilter('all')
    setReviewSubmitted(true)
    setTimeout(() => {
      setShowAddReview(false)
      setReviewSubmitted(false)
      setNewName('')
      setNewTitle('')
      setNewLocation('')
      setNewOccasion('')
      setNewComment('')
      setNewRating(5)
    }, 1500)
  }

  const handleAdd = () => {
    let finalRecipient: string | undefined
    let finalRibbon: string
    let finalIncludedItems: string[]

    const companionNames = companionSuggestions
      .filter((c) => selectedCompanionIds.includes(c.id))
      .map((c) => `+ Companion: ${c.name} (${c.role})`)

    if (isStrap) {
      finalRecipient = [
        musicianStageName.trim()
          ? `Musician: ${musicianStageName.trim()}`
          : recipientName.trim(),
        strapInscription.trim()
          ? `Inscription: "${strapInscription.trim()}"`
          : '',
        ...(hasPickedCustomStyle
          ? [
              `Color Idea: ${selectedStrapColor.name} [${selectedStrapColor.category}]`,
              `Theme Idea: ${selectedStrapTheme.name}`,
              `Style: ${selectedStrapStyle.name}`
            ]
          : ['Color & Design: Customer will confirm directly on WhatsApp'])
      ]
        .filter(Boolean)
        .join(' · ') || undefined

      finalRibbon = hasPickedCustomStyle
        ? `${selectedStrapColor.name} (${selectedStrapColor.category})`
        : 'Custom Colors & Design (Confirmed on WhatsApp)'

      finalIncludedItems = [
        ...(hasPickedCustomStyle
          ? [
              `Preferred Color: ${selectedStrapColor.name} (${selectedStrapColor.category})`,
              `Preferred Theme: ${selectedStrapTheme.name}`,
              `Strap Style: ${selectedStrapStyle.name} (${selectedStrapStyle.width})`,
              `Hardware Finish: ${selectedStrapHardware.name}`
            ]
          : ['Colors, Design & Hardware: Customer will confirm directly with ONE O representative on WhatsApp']),
        includeMatchingPick
          ? 'Matching Personalized Guitar Pick with Initials'
          : 'Built-in Pick Slot',
        ...companionNames,
        ...product.itemsIncluded
      ]
    } else {
      const combinedCustom = [
        recipientName.trim(),
        customDetail.trim() ? `Note/Song: ${customDetail.trim()}` : ''
      ]
        .filter(Boolean)
        .join(' · ')

      finalRecipient = combinedCustom || undefined
      finalRibbon = selectedRibbon
      finalIncludedItems = [
        ...(hasPickedCustomStyle
          ? [
              `Preferred Colors: ${selectedCustomPalette.name} (${selectedGradientTheme})`,
              `Style Idea: ${selectedResinEffect.name} · ${selectedMetallicLeaf}`,
              `Material & Lettering: ${selectedBaseMaterial.name} · ${selectedFont} (final confirmed on WhatsApp)`
            ]
          : [
              'Colors, Design & Wording: Your choice — confirm directly with our ONE O representative on WhatsApp'
            ]),
        ...companionNames,
        ...product.itemsIncluded
      ]
    }

    const itemTitle =
      selectedCompanionIds.length > 0
        ? `${product.title} (+ Matching Gift Set)`
        : product.title

    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      type: 'catalog',
      title: itemTitle,
      price: totalItemPrice,
      isCustomQuote: product.isCustomQuote,
      minOrderQty: product.minOrderQty,
      ribbon: finalRibbon,
      giftNote: giftNote.trim() || undefined,
      personalMemory: personalMemory.trim() || undefined,
      recipientName: finalRecipient,
      boxType: product.packaging,
      includedItems: finalIncludedItems,
      imageUrl: product.imageUrl
    }
    onAddToCart(item)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
    }, 700)
  }

  const handleApplyAestheticPreset = (preset: AestheticPreset) => {
    setHasPickedCustomStyle(true)
    setSelectedFont(preset.font)
    setSelectedMetallicLeaf(preset.metallicLeaf)
    setSelectedGradientTheme(preset.gradient)

    if (isStrap) {
      if (preset.id === 'preset-afrobeat-stage') {
        setStrapColorCategory('Design Gradients')
        const sunsetGrad = GUITAR_STRAP_COLORS[1].options.find(
          (o) => o.id === 'grad-sunset-amber'
        )
        if (sunsetGrad) setSelectedStrapColor(sunsetGrad)
        const afroTheme = GUITAR_STRAP_THEMES.find(
          (t) => t.id === 'theme-afrobeat-rhythm'
        )
        if (afroTheme) setSelectedStrapTheme(afroTheme)
      } else if (preset.id === 'preset-forever-vows') {
        setStrapColorCategory('Design Gradients')
        const roseGrad = GUITAR_STRAP_COLORS[1].options.find(
          (o) => o.id === 'grad-rose-quartz'
        )
        if (roseGrad) setSelectedStrapColor(roseGrad)
      } else if (preset.id === 'preset-executive-gold') {
        setStrapColorCategory('Design Gradients')
        const emeraldGrad = GUITAR_STRAP_COLORS[1].options.find(
          (o) => o.id === 'grad-emerald-gold'
        )
        if (emeraldGrad) setSelectedStrapColor(emeraldGrad)
      }
    }

    setPresetAppliedMessage(`Saved your color & style idea: "${preset.title}"!`)
    setTimeout(() => {
      setPresetAppliedMessage(null)
      setActiveTab('details')
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#161514]/75 backdrop-blur-sm transition-opacity"
        />

        <div className="relative inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl my-8 border border-[#E8E6E1]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-[#736E68] hover:text-[#191817] bg-white/90 hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Visual Photography Display (Left 5 Cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-[#F5F4F0] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E6E1]">
              <div>
                <div className="w-full aspect-[4/3] overflow-hidden shadow-sm border border-[#E0DDD7] bg-white">
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs sm:text-sm text-[#38342F]">
                  <Box className="w-4 h-4 text-[#1B3326] shrink-0" />
                  <span>{product.packaging}</span>
                </div>

                {/* For Guitar Straps: Highlight Personalization Badge */}
                {isStrap && (
                  <div className="mt-4 p-3.5 bg-white border border-[#D5E3D8] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B3326]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                      <span>Made Specially for Musicians</span>
                    </div>
                    <p className="text-xs text-[#38342F] leading-relaxed">
                      Made with real leather and clear shiny resin. Pick your solid color, color blend, or champagne sparkles. We seal their stage name or initials right inside the resin so it never rubs off.
                    </p>
                  </div>
                )}
              </div>

              {/* Social Proof Mini Quote */}
              <div className="mt-6 pt-5 border-t border-[#DDD8CE]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-0.5 text-[#C2A264]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(reviewsList[0]?.rating || 5)
                            ? 'fill-[#C2A264] text-[#C2A264]'
                            : 'text-[#C7C3BD]'
                        }`}
                      />
                    ))}
                  </div>
                  {reviewsList[0]?.giftSetName && (
                    <span className="text-xs font-semibold text-[#1B3326] truncate max-w-[180px]">
                      {reviewsList[0].giftSetName}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                  "{reviewsList[0]?.comment.slice(0, 125) ||
                    'Neat and thoughtful handmade gift, clear finish and wrapped ready to hand over.'}
                  ..."
                </p>
                <p className="text-xs text-[#4A4640] font-semibold mt-1.5">
                  — {reviewsList[0]?.author || 'Verified Buyer'} ·{' '}
                  {reviewsList[0]?.location || 'Lagos, Nigeria'}
                </p>
              </div>
            </div>

            {/* Right Column (7 Cols): Tabs + Interactive Content */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-white">
              <div>
                {/* Header info */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-[#4A4640]">
                    <span className="uppercase tracking-wider font-semibold">
                      {product.collection} · {product.itemType}
                    </span>
                    {product.bestSeller && (
                      <>
                        <span>·</span>
                        <span className="text-[#1B3326] font-semibold uppercase tracking-wider">
                          Most Loved
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817] tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#4A4640] mt-1">
                    {product.subtitle}
                  </p>
                  <div className="flex items-baseline justify-between mt-2.5 flex-wrap gap-2">
                    <div>
                      {product.isCustomQuote ? (
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => onRequestQuote?.(buildQuotePayload())}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Request a Quote</span>
                          </button>
                          <p className="text-xs text-[#4A4640] font-semibold">
                            {product.minOrderQty
                              ? `Minimum order: ${product.minOrderQty} pieces · Final price depends on your chosen item mix & quantity`
                              : 'Final price depends on the exact items & details you choose'}
                          </p>
                        </div>
                      ) : (
                        <p className="font-serif text-2xl font-bold text-[#1B3326]">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </div>

                    {/* Quick Rating Badge & Switcher */}
                    <button
                      type="button"
                      onClick={() => setActiveTab('reviews')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F8F6] border border-[#D5E3D8] hover:bg-[#EBF2ED] transition-colors text-left"
                    >
                      <div className="flex items-center text-[#C2A264]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.round(stats.average)
                                ? 'fill-[#C2A264] text-[#C2A264]'
                                : 'text-[#C7C3BD]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#191817]">
                        {stats.average.toFixed(1)}
                      </span>
                      <span className="text-xs text-[#1B3326] underline font-medium">
                        ({reviewsList.length} reviews)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Preset Applied Confirmation Toast */}
                {presetAppliedMessage && (
                  <div className="mb-3 p-3 bg-[#1B3326] text-white text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C2A264]" />
                      <span>{presetAppliedMessage}</span>
                    </div>
                    <span className="text-xs text-[#DEDAD1] uppercase tracking-wider">Selected</span>
                  </div>
                )}

                {/* Tab Navigation */}
                <div className="flex border-b border-[#DDD8CE] mt-4 mb-4 gap-3 sm:gap-5 overflow-x-auto scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 whitespace-nowrap transition-all ${
                      activeTab === 'details'
                        ? 'border-[#1B3326] text-[#1B3326]'
                        : 'border-transparent text-[#4A4640] hover:text-[#191817]'
                    }`}
                  >
                    1. Add Name &amp; Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('customization')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                      activeTab === 'customization'
                        ? 'border-[#1B3326] text-[#1B3326]'
                        : 'border-transparent text-[#4A4640] hover:text-[#191817]'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5 text-[#C2A264]" />
                    <span>2. Pick Colors</span>
                    <span className="bg-[#1B3326] text-white text-xs px-1.5 py-0.5 font-semibold">
                      Colors &amp; Gold
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('inspirations')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                      activeTab === 'inspirations'
                        ? 'border-[#1B3326] text-[#1B3326]'
                        : 'border-transparent text-[#4A4640] hover:text-[#191817]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                    <span>3. Design Ideas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                      activeTab === 'reviews'
                        ? 'border-[#1B3326] text-[#1B3326]'
                        : 'border-transparent text-[#4A4640] hover:text-[#191817]'
                    }`}
                  >
                    <span>4. Reviews</span>
                    <span className="bg-[#1B3326] text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {reviewsList.length}
                    </span>
                  </button>
                </div>

                {/* TAB 1: DETAILS & CUSTOMISATION */}
                {activeTab === 'details' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <p className="text-sm text-[#38342F] leading-relaxed">
                      {product.longDescription}
                    </p>

                    {/* ============================================================== */}
                    {/* DEDICATED GUITAR STRAP CUSTOMIZATION STUDIO                    */}
                    {/* ============================================================== */}
                    {isStrap ? (
                      <div className="space-y-5 pt-1">
                        {/* Interactive Live Medallion Preview Box */}
                        <div className="p-3.5 bg-[#F5F8F6] border border-[#C2D8C7] rounded-none">
                          <div className="flex items-center gap-3">
                            {/* Medallion Swatch Visualizer */}
                            <div className="relative flex-shrink-0">
                              <div
                                className="w-14 h-14 rounded-full shadow-md border-2 border-[#C2A264] flex items-center justify-center transition-all overflow-hidden"
                                style={{
                                  background:
                                    selectedStrapColor.gradientCss ||
                                    selectedStrapColor.hex
                                }}
                              >
                                <span className="font-serif font-black text-white text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                  {musicianStageName.trim()
                                    ? musicianStageName.trim().slice(0, 3).toUpperCase()
                                    : selectedStrapTheme.icon}
                                </span>
                              </div>
                              <span className="absolute -bottom-1 -right-1 bg-[#1B3326] text-[#C2A264] text-xs font-bold px-1.5 rounded-full border border-white">
                                {selectedStrapTheme.icon}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5">
                                  Live Preview
                                </span>
                                <span className="text-xs text-[#4A4640]">
                                  {selectedStrapColor.category}
                                </span>
                              </div>
                              <p className="text-sm font-bold text-[#191817] truncate mt-0.5">
                                {selectedStrapColor.name} · {selectedStrapTheme.name}
                              </p>
                              <p className="text-xs text-[#38342F] truncate">
                                Style: {selectedStrapStyle.name} ({selectedStrapHardware.name})
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* SECTION 1: Color Choices (Solid Colors, Two-Color Blends, Champagne Sparkles) */}
                        <div className="space-y-2.5 pt-2 border-t border-[#E8E6E1]">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                              <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
                              <span>Step 1: Pick Color &amp; Finish</span>
                            </label>
                            <span className="text-xs text-[#1B3326] font-semibold">
                              {selectedStrapColor.name}
                            </span>
                          </div>

                          {/* Category Switcher: Solid Colors, Two-Color Blends, Champagne */}
                          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F5F4F0] border border-[#DDD8CE]">
                            {GUITAR_STRAP_COLORS.map((cat) => (
                              <button
                                key={cat.category}
                                type="button"
                                onClick={() => {
                                  setStrapColorCategory(cat.category)
                                  setSelectedStrapColor(cat.options[0])
                                }}
                                className={`py-2 px-2 text-xs font-semibold uppercase tracking-wider text-center transition-all ${
                                  strapColorCategory === cat.category
                                    ? 'bg-[#1B3326] text-white shadow-sm'
                                    : 'text-[#38342F] hover:text-[#191817]'
                                }`}
                              >
                                {cat.category === 'Design Gradients' ? 'Two-Color Blends' : cat.category === 'Champagne' ? 'Champagne Sparkles' : cat.category}
                              </button>
                            ))}
                          </div>

                          {/* Swatches Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {activeColorGroup.options.map((color: StrapColorOption) => {
                              const isSelected = selectedStrapColor.id === color.id
                              return (
                                <button
                                  key={color.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedStrapColor(color)
                                    setHasPickedCustomStyle(true)
                                  }}
                                  className={`p-2.5 text-left border flex items-center gap-2 transition-all ${
                                    isSelected
                                      ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                      : 'border-[#DDD8CE] bg-[#FAFAF8] hover:border-[#8C8881]'
                                  }`}
                                >
                                  <div
                                    className="w-5 h-5 rounded-full border border-black/15 shadow-inner flex-shrink-0"
                                    style={{
                                      background: color.gradientCss || color.hex
                                    }}
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-[#191817] truncate leading-tight">
                                      {color.name}
                                    </p>
                                    <p className="text-xs text-[#4A4640] capitalize">
                                      {color.category}
                                    </p>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                          <p className="text-xs text-[#38342F] pl-1">
                            {selectedStrapColor.description}
                          </p>
                        </div>

                        {/* SECTION 2: Themes & Personalization Designs */}
                        <div className="space-y-2.5 pt-3 border-t border-[#E8E6E1]">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                              <span>Step 2: Pick Theme or Style</span>
                            </label>
                            <span className="text-xs text-[#1B3326] font-semibold">
                              {selectedStrapTheme.name}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {GUITAR_STRAP_THEMES.map((theme) => {
                              const isSelected = selectedStrapTheme.id === theme.id
                              return (
                                <button
                                  key={theme.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedStrapTheme(theme)
                                    setHasPickedCustomStyle(true)
                                  }}
                                  className={`p-3 text-left border transition-all flex items-start gap-2 ${
                                    isSelected
                                      ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                      : 'border-[#DDD8CE] bg-[#FAFAF8] hover:border-[#8C8881]'
                                  }`}
                                >
                                  <span className="text-base leading-none mt-0.5">
                                    {theme.icon}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-[#191817] leading-tight">
                                      {theme.name}
                                    </p>
                                    <p className="text-xs text-[#1B3326] font-medium">
                                      {theme.tagline}
                                    </p>
                                    <p className="text-xs text-[#4A4640] line-clamp-1 mt-0.5">
                                      {theme.description}
                                    </p>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* SECTION 3: Strap Style & Width */}
                        <div className="space-y-2.5 pt-3 border-t border-[#E8E6E1]">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                              <Box className="w-3.5 h-3.5 text-[#1B3326]" />
                              <span>Step 3: Strap Width &amp; Comfort</span>
                            </label>
                            <span className="text-xs text-[#1B3326] font-semibold">
                              {selectedStrapStyle.width}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {GUITAR_STRAP_STYLES.map((style) => {
                              const isSelected = selectedStrapStyle.id === style.id
                              return (
                                <button
                                  key={style.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedStrapStyle(style)
                                    setHasPickedCustomStyle(true)
                                  }}
                                  className={`w-full p-2.5 text-left border transition-all flex items-center justify-between gap-3 ${
                                    isSelected
                                      ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                      : 'border-[#DDD8CE] bg-[#FAFAF8] hover:border-[#8C8881]'
                                  }`}
                                >
                                  <div>
                                    <p className="text-xs sm:text-sm font-bold text-[#191817]">
                                      {style.name}
                                    </p>
                                    <p className="text-xs text-[#38342F]">
                                      {style.description}
                                    </p>
                                  </div>
                                  <span className="text-xs text-[#1B3326] font-semibold whitespace-nowrap bg-[#E8F3EB] px-2 py-0.5">
                                    {style.bestFor}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* SECTION 4: Hardware Finish */}
                        <div className="space-y-2 pt-3 border-t border-[#E8E6E1]">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#191817]">
                            Step 4: Metal Buckle Color
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {GUITAR_STRAP_HARDWARE.map((hw) => (
                              <button
                                key={hw.id}
                                type="button"
                                onClick={() => {
                                  setSelectedStrapHardware(hw)
                                  setHasPickedCustomStyle(true)
                                }}
                                className={`py-2 px-2 text-xs border text-center transition-all flex items-center justify-center gap-1.5 ${
                                  selectedStrapHardware.id === hw.id
                                    ? 'border-[#1B3326] bg-[#F7FAF8] font-bold text-[#191817] ring-1 ring-[#1B3326]'
                                    : 'border-[#DDD8CE] bg-[#FAFAF8] text-[#38342F] hover:border-[#191817]'
                                }`}
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                                  style={{ backgroundColor: hw.color }}
                                />
                                <span className="text-xs truncate">{hw.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* SECTION 5: Musician Name, Inscription & Pick */}
                        <div className="space-y-3 pt-3 border-t border-[#E8E6E1]">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1">
                              Musician Name or Initials (Sealed neatly inside the clear resin)
                            </label>
                            <input
                              type="text"
                              value={musicianStageName}
                              onChange={(e) => setMusicianStageName(e.target.value)}
                              placeholder="e.g. Elias Henshaw / TK Groove / Initials 'E.H'"
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1">
                              Special Message, Bible Verse, or Date (Optional)
                            </label>
                            <input
                              type="text"
                              value={strapInscription}
                              onChange={(e) => setStrapInscription(e.target.value)}
                              placeholder="e.g. Psalm 33:3 / Lead with Love / Tour 2026"
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gift-personal-memory-strap"
                              className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1 flex items-center justify-between"
                            >
                              <span className="flex items-center gap-1.5">
                                <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
                                <span>Personal Memory or Message Behind This Gift (Optional)</span>
                              </span>
                              <span className="text-xs text-[#4A4640] font-normal">
                                {personalMemory.length}/200
                              </span>
                            </label>
                            <input
                              id="gift-personal-memory-strap"
                              type="text"
                              maxLength={200}
                              value={personalMemory}
                              onChange={(e) => setPersonalMemory(e.target.value)}
                              placeholder="e.g. Thank you for every Sunday song, or celebrating your musical journey..."
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>

                          {/* Free Matching Resin Guitar Pick */}
                          <label className="flex items-center gap-2.5 p-3 bg-[#F9FAF9] border border-[#D5E3D8] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={includeMatchingPick}
                              onChange={(e) => setIncludeMatchingPick(e.target.checked)}
                              className="rounded border-[#1B3326] text-[#1B3326] focus:ring-[#1B3326]"
                            />
                            <div className="text-xs sm:text-sm">
                              <span className="font-bold text-[#191817]">
                                Include a Free Matching Resin Guitar Pick (₦0)
                              </span>
                              <p className="text-xs text-[#38342F]">
                                Made in the exact same color with their initials, tucked inside the strap&apos;s leather pocket.
                              </p>
                            </div>
                          </label>

                          {/* Handwritten Card */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817] mb-1 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Feather className="w-3.5 h-3.5 text-[#1B3326]" />
                                <span>Free Handwritten Gift Card</span>
                              </span>
                              <span className="text-xs text-[#4A4640] font-normal">
                                {giftNote.length}/250
                              </span>
                            </label>
                            <CuteMessagePicker
                              onSelectMessage={(msg) => setGiftNote(msg.slice(0, 250))}
                              currentMessage={giftNote}
                            />
                            <textarea
                              rows={2}
                              maxLength={250}
                              value={giftNote}
                              onChange={(e) => setGiftNote(e.target.value)}
                              placeholder="Write what you want us to say, or tap a cute message above. We will handwrite this inside a neat envelope and place it in the gift box for you..."
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ============================================================== */
                      /* STANDARD CATALOG ITEM CUSTOMIZATION                            */
                      /* ============================================================== */
                      <div className="space-y-4">
                        {/* Client-Chosen Customization Summary */}
                        <div className="p-3.5 bg-[#F7FAF8] border border-[#D5E3D8] space-y-2">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1B3326]">
                            <Heart className="w-4 h-4 text-[#C2A264] shrink-0" />
                            <span>{product.resinPalette}</span>
                          </div>
                          <ul className="text-xs sm:text-sm text-[#38342F] space-y-1">
                            {product.resinDetails?.map((detail, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* What's Included */}
                        <div className="pt-2 border-t border-[#E8E6E1]">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#191817] mb-2">
                            What You Get Inside the Box:
                          </h4>
                          <ul className="space-y-1.5 text-sm text-[#38342F]">
                            {product.itemsIncluded.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ribbon Choice */}
                        <div className="pt-2 border-t border-[#E8E6E1]">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1.5">
                            Pick Ribbon Color for the Box
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {RIBBON_OPTIONS.map((ribbon) => (
                              <button
                                key={ribbon.id}
                                type="button"
                                onClick={() => setSelectedRibbon(ribbon.name)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-all ${
                                  selectedRibbon === ribbon.name
                                    ? 'border-[#1B3326] bg-[#F5F8F6] text-[#191817] font-semibold ring-1 ring-[#1B3326]'
                                    : 'border-[#DDD8CE] bg-[#FAFAF8] text-[#38342F] hover:border-[#191817]'
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-black/10"
                                  style={{ backgroundColor: ribbon.color }}
                                />
                                <span>{ribbon.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Client-Driven Color & Design Choice Link */}
                        <div className="p-3.5 bg-[#FAF9F5] border border-[#C2A264]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                          <div className="space-y-0.5">
                            <span className="text-xs sm:text-sm font-bold text-[#191817] flex items-center gap-1.5">
                              <Palette className="w-4 h-4 text-[#C2A264]" />
                              <span>Your Colors, Design &amp; Look Are Up to You</span>
                            </span>
                            {hasPickedCustomStyle ? (
                              <p className="text-xs text-[#38342F]">
                                Idea saved: <strong className="text-[#1B3326]">{selectedCustomPalette.name}</strong> · <strong className="text-[#1B3326]">{selectedResinEffect.name}</strong> (you can adjust anytime with our WhatsApp representative).
                              </p>
                            ) : (
                              <p className="text-xs text-[#38342F]">
                                Decide your exact colors, flowers or sparkles, and layout directly when speaking with our representative on WhatsApp—or pick optional color ideas now.
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveTab('customization')}
                            className="px-3.5 py-2 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all self-start sm:self-auto shrink-0 shadow-sm flex items-center gap-1.5"
                          >
                            <Sliders className="w-3.5 h-3.5 text-[#C2A264]" />
                            <span>{hasPickedCustomStyle ? 'Change Idea →' : 'Pick Ideas Now →'}</span>
                          </button>
                        </div>

                        {/* Personalisation details */}
                        <div className="pt-2 border-t border-[#E8E6E1] space-y-3">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1">
                              Name or Letter Initial to Put on the Gift (Optional)
                            </label>
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="e.g. Dr. Chidi Okonkwo / Tunde & Chinwendu / Letter 'A'"
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1 flex items-center gap-1.5">
                              <Music className="w-3.5 h-3.5 text-[#1B3326]" />
                              <span>Favorite Song, Artist, or Special Date (Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={customDetail}
                              onChange={(e) => setCustomDetail(e.target.value)}
                              placeholder="e.g. Chike - Running to You / Asake - Lonely at the Top / 18th Nov"
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gift-personal-memory"
                              className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1 flex items-center justify-between"
                            >
                              <span className="flex items-center gap-1.5">
                                <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
                                <span>Share Your Personal Memory or Message to Convey (Optional)</span>
                              </span>
                              <span className="text-xs text-[#4A4640] font-normal">
                                {personalMemory.length}/200
                              </span>
                            </label>
                            <input
                              id="gift-personal-memory"
                              type="text"
                              maxLength={200}
                              value={personalMemory}
                              onChange={(e) => setPersonalMemory(e.target.value)}
                              placeholder="e.g. A memory from our wedding day, celebrating Mum's 60th, or saying 'I am proud of you'..."
                              className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                            <p className="text-xs text-[#4A4640] mt-1">
                              Saved with your item in the bag so our team keeps the feeling behind your gift in mind.
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] mb-1 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Feather className="w-3.5 h-3.5 text-[#1B3326]" />
                                <span>Free Handwritten Note Card (Included)</span>
                              </span>
                              <span className="text-xs text-[#4A4640] font-normal">
                                {giftNote.length}/250
                              </span>
                            </label>
                            <CuteMessagePicker
                              onSelectMessage={(msg) => setGiftNote(msg.slice(0, 250))}
                              currentMessage={giftNote}
                            />
                            <textarea
                              rows={3}
                              maxLength={250}
                              value={giftNote}
                              onChange={(e) => setGiftNote(e.target.value)}
                              placeholder="Type your personal message here, or click to pick a sweet note above. We will write it neatly on a clean card and place it inside the gift box..."
                              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                            />
                          </div>
                        </div>

                        {/* Emotional Story Hook */}
                        <div className="p-3.5 bg-[#FBF9F5] border border-[#DDD8CE] space-y-1">
                          <p className="text-xs uppercase tracking-wider font-bold text-[#1B3326] flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
                            <span>The Feeling Behind This Gift</span>
                          </p>
                          <p className="text-sm text-[#38342F] leading-relaxed">
                            {product.description} Made by hand so they can keep it on their table or shelf every day, smiling each time they see their name and remember how deeply you care.
                          </p>
                        </div>

                        {/* Put Together a Complete Gift Set (Companion Pairings) */}
                        <div className="pt-3 border-t border-[#E8E6E1] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                                <span>Add Matching Little Gifts (Make It a Full Set)</span>
                              </h4>
                              <p className="text-xs text-[#4A4640]">
                                Want to add extra pieces? Tick any matching item below to put it inside the same gift box:
                              </p>
                            </div>
                            {selectedCompanionIds.length > 0 && (
                              <span className="text-xs font-bold text-[#1B3326] bg-[#E8F3EB] px-2.5 py-0.5 rounded">
                                +{selectedCompanionIds.length} added
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            {companionSuggestions.map((comp) => {
                              const isChecked = selectedCompanionIds.includes(comp.id)
                              return (
                                <div
                                  key={comp.id}
                                  onClick={() => toggleCompanion(comp.id)}
                                  className={`p-3 border transition-all cursor-pointer flex items-start gap-2.5 ${
                                    isChecked
                                      ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                      : 'border-[#DDD8CE] bg-[#FAFAF8] hover:border-[#8C8881]'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {}} // handled by parent div
                                    className="mt-1 rounded border-[#1B3326] text-[#1B3326] focus:ring-[#1B3326]"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1 flex-wrap">
                                      <p className="text-xs sm:text-sm font-bold text-[#191817]">
                                        {comp.name}
                                      </p>
                                      <span className="text-xs sm:text-sm font-serif font-bold text-[#1B3326]">
                                        {product.isCustomQuote ? 'Add to Quote' : `+${formatPrice(comp.price)}`}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#38342F] mt-0.5">
                                      {comp.description}
                                    </p>
                                    <span className="inline-block text-xs font-semibold text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5 mt-1">
                                      {comp.role}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order, Packaging & Keepsake vs Food-Safe Notice */}
                    <div className="p-3.5 sm:p-4 bg-[#FAF9F5] border border-[#DDD8CE] space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#1B3326]" />
                          <span>Order &amp; Packaging Notice</span>
                        </span>
                        <span
                          className={`px-2 py-0.5 font-bold uppercase tracking-wider border ${
                            product.isFoodSafe
                              ? 'bg-[#E8F3EB] text-[#1B3326] border-[#C4DEC9]'
                              : 'bg-white text-[#38342F] border-[#D8D4CC]'
                          }`}
                        >
                          {product.isFoodSafe
                            ? 'Food-Safe Serving Surface'
                            : 'Decorative Keepsake / Gift (Non-Food)'}
                        </span>
                      </div>

                      <div className="bg-white p-2.5 border border-[#E8E6E1] text-[#38342F] leading-relaxed">
                        <p>
                          <strong className="text-[#191817]">Before Production Starts:</strong>{' '}
                          We confirm exact spelling/dates, high-resolution photos on WhatsApp (for photo pieces), color theme, production lead time &amp; nationwide delivery fee. Ships ribboned with your message card and printed care sheet.
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Material-Based Product Care Section */}
                    <div
                      aria-label="Product Care"
                      className="p-3.5 sm:p-4 bg-white border border-[#D5E3D8] shadow-xs space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-[#EEF3EF] pb-2.5">
                        <div className="space-y-0.5">
                          <span className="font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#C2A264]" />
                            <span>Product Care</span>
                          </span>
                          <p className="text-xs text-[#4A4640]">
                            {careProfile.summary}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 bg-[#F5F8F6] border border-[#C4DEC9] text-[#1B3326] font-bold">
                            {careProfile.materialType}
                          </span>
                          {careProfile.isCustomMaterialApplied && (
                            <span className="px-2 py-1 bg-[#FAF8F2] border border-[#C2A264] text-[#191817] font-semibold">
                              Updated to Selected Material
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[#38342F] leading-relaxed">
                        <div className="bg-[#FAF9F5] p-2.5 border border-[#E8E6E1] space-y-1">
                          <p className="font-bold text-[#191817] flex items-center gap-1.5">
                            <Droplets className="w-3.5 h-3.5 text-[#1B3326]" />
                            <span>Cleaning</span>
                          </p>
                          <p>{careProfile.cleaningStep}</p>
                        </div>

                        <div className="bg-[#FAF9F5] p-2.5 border border-[#E8E6E1] space-y-1">
                          <p className="font-bold text-[#191817] flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-[#C2A264]" />
                            <span>Heat &amp; Sunlight</span>
                          </p>
                          <p>{careProfile.heatAndSun}</p>
                        </div>

                        <div className="bg-[#FAF9F5] p-2.5 border border-[#E8E6E1] space-y-1">
                          <p className="font-bold text-[#191817] flex items-center gap-1.5">
                            <Box className="w-3.5 h-3.5 text-[#1B3326]" />
                            <span>Upkeep &amp; Storage</span>
                          </p>
                          <p>{careProfile.storageAndMaintenance}</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#FFFBF2] border border-[#E8D8B5] flex items-start gap-2 text-[#38342F] leading-relaxed">
                        <AlertCircle className="w-4 h-4 text-[#9E7835] shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-[#191817]">Avoid:</strong>{' '}
                          {careProfile.avoidTip}
                        </p>
                      </div>
                    </div>

                    {/* Inline Star Rating & Featured Gift Set Testimonials Preview */}
                    <div className="pt-4 border-t border-[#E8E6E1] space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-[#C2A264]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(stats.average)
                                    ? 'fill-[#C2A264] text-[#C2A264]'
                                    : 'text-[#C7C3BD]'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-[#191817]">
                            {stats.average.toFixed(1)} out of 5
                          </span>
                          <span className="text-xs text-[#4A4640]">
                            ({reviewsList.length} verified reviews)
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveTab('reviews')}
                          className="text-xs font-bold uppercase tracking-wider text-[#1B3326] hover:underline"
                        >
                          See All Reviews &amp; Rate &rarr;
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {reviewsList.slice(0, 2).map((rev) => (
                          <div
                            key={rev.id}
                            className="p-3 bg-[#FAF9F5] border border-[#E2DDD3] space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center text-[#C2A264]">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 ${
                                      idx < Math.round(rev.rating)
                                        ? 'fill-[#C2A264] text-[#C2A264]'
                                        : 'text-[#C7C3BD]'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-[#4A4640]">
                                {rev.location}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-[#191817] leading-snug">
                              "{rev.title}"
                            </p>
                            <p className="text-xs text-[#38342F] leading-relaxed line-clamp-2">
                              {rev.comment}
                            </p>
                            <p className="text-xs font-semibold text-[#1B3326]">
                              — {rev.author} ({rev.occasion})
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: CUSTOMIZATION PANEL (COLOR PALETTES, RESIN EFFECTS & BASE MATERIALS) */}
                {activeTab === 'customization' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <CustomizationPanel
                      recipientName={recipientName}
                      productTitle={product.title}
                      initialPaletteId={selectedCustomPalette.id}
                      initialEffectId={selectedResinEffect.id}
                      initialBaseMaterialId={selectedBaseMaterial.id}
                      onApply={(sel: CustomizationSelection) => {
                        setHasPickedCustomStyle(true)
                        setSelectedCustomPalette(sel.palette)
                        setSelectedResinEffect(sel.resinEffect)
                        setSelectedBaseMaterial(sel.baseMaterial)
                        setSelectedGradientTheme(sel.palette.name)
                        setSelectedMetallicLeaf(sel.resinEffect.name)
                        setPresetAppliedMessage(
                          `Saved color idea: ${sel.palette.name} + ${sel.resinEffect.name}!`
                        )
                        setActiveTab('details')
                      }}
                    />
                  </div>
                )}

                {/* TAB: DESIGN INSPIRATION GALLERY */}
                {activeTab === 'inspirations' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Hero helper banner */}
                    <div className="p-4 bg-gradient-to-r from-[#1B3326] to-[#244634] text-white space-y-2 border border-[#3A604B]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C2A264]" />
                        <h4 className="font-serif text-sm font-bold tracking-wide">
                          Optional Color &amp; Design Ideas (Finalized on WhatsApp)
                        </h4>
                      </div>
                      <p className="text-xs text-[#E0DDD7] leading-relaxed">
                        You choose how you want your gift made. Browse sample colors, lettering styles, or sparkle ideas below if you like, or share your own exact idea directly with our representative on WhatsApp when you finish your order.
                      </p>
                      {hasPickedCustomStyle && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs text-[#E5C07B] uppercase tracking-wider font-semibold">Saved Idea:</span>
                          <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded text-white font-medium border border-white/20">
                            Color Blend: {selectedGradientTheme}
                          </span>
                          <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded text-white font-medium border border-white/20">
                            Finish: {selectedMetallicLeaf}
                          </span>
                          <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded text-white font-medium border border-white/20">
                            Font: {selectedFont}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Design & Color Studio */}
                    <DesignAndColorPicker
                      previewTitle={recipientName.trim() || product.title}
                      currentConfig={{
                        paletteName: selectedGradientTheme,
                        metallicLeaf: selectedMetallicLeaf
                      }}
                      onApplyConfig={(cfg: SelectedDesignConfig) => {
                        setHasPickedCustomStyle(true)
                        setSelectedGradientTheme(cfg.paletteName)
                        setSelectedMetallicLeaf(cfg.metallicLeaf)
                        setPresetAppliedMessage(
                          `Saved design idea: ${cfg.paletteName} · ${cfg.patternName}!`
                        )
                        setActiveTab('details')
                      }}
                    />

                    {/* 1. Complete Ready-Made Presets (1-Click Solutions) */}
                    <div className="space-y-3 pt-4 border-t border-[#E8E6E1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#1B3326]" />
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                            Popular Ready-Made Looks (Tap to Choose)
                          </h4>
                        </div>
                        <span className="text-xs text-[#4A4640]">1-Tap Fast Choice</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {AESTHETIC_PRESETS.map((preset) => {
                          const isCurrentlyActive =
                            selectedFont === preset.font &&
                            selectedMetallicLeaf === preset.metallicLeaf &&
                            selectedGradientTheme === preset.gradient

                          return (
                            <div
                              key={preset.id}
                              className={`p-3.5 border transition-all flex flex-col justify-between ${
                                isCurrentlyActive
                                  ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                  : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <span className="inline-block text-xs uppercase tracking-wider font-bold text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5">
                                      {preset.themeTag}
                                    </span>
                                    <h5 className="font-serif text-base font-bold text-[#191817] mt-1">
                                      {preset.title}
                                    </h5>
                                  </div>
                                  {isCurrentlyActive && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-[#1B3326] bg-[#D4E8DA] px-2 py-0.5">
                                      <CheckCircle2 className="w-3 h-3" /> Selected
                                    </span>
                                  )}
                                </div>

                                {/* Visual swatch banner preview */}
                                <div
                                  className="w-full h-12 my-2.5 rounded-none flex items-center justify-between px-3 text-white shadow-inner relative overflow-hidden"
                                  style={{ background: preset.samplePreview.bgGradient }}
                                >
                                  <span className={`text-sm ${preset.samplePreview.fontStyle} text-white drop-shadow-md`}>
                                    {recipientName.trim() || 'Akin & Zainab'}
                                  </span>
                                  <span className="text-xs bg-black/50 backdrop-blur-xs px-2 py-0.5 text-[#F5D77F] border border-white/20 font-sans">
                                    {preset.samplePreview.leafEffect}
                                  </span>
                                </div>

                                <p className="text-xs text-[#38342F] leading-relaxed">
                                  {preset.description}
                                </p>

                                <div className="mt-2 text-xs text-[#4A4640] space-y-0.5 border-t border-[#F0EFEA] pt-1.5">
                                  <div><strong className="text-[#191817]">Font:</strong> {preset.font}</div>
                                  <div><strong className="text-[#191817]">Gold Flakes:</strong> {preset.metallicLeaf}</div>
                                  <div><strong className="text-[#191817]">Colors:</strong> {preset.gradient}</div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleApplyAestheticPreset(preset)}
                                className={`mt-3 w-full py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                                  isCurrentlyActive
                                    ? 'bg-[#1B3326] text-white'
                                    : 'bg-[#F2EFE9] hover:bg-[#1B3326] text-[#191817] hover:text-white'
                                }`}
                              >
                                {isCurrentlyActive ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Applied to Order</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                                    <span>Use This Look</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 2. Typography & Lettering Studio */}
                    <div className="space-y-3 pt-2 border-t border-[#E8E6E1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Type className="w-4 h-4 text-[#1B3326]" />
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                            Writing Fonts (How Their Name Will Look)
                          </h4>
                        </div>
                        <span className="text-xs text-[#4A4640]">Live Preview</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {FONT_TEMPLATES.map((fontItem) => {
                          const isSelected = selectedFont === fontItem.name
                          return (
                            <div
                              key={fontItem.id}
                              onClick={() => {
                                setSelectedFont(fontItem.name)
                                setHasPickedCustomStyle(true)
                              }}
                              className={`p-3 border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                  : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-[#191817]">{fontItem.name}</span>
                                <span className="text-xs uppercase tracking-wider font-semibold text-[#4A4640] bg-[#F2EFE9] px-1.5 py-0.5">
                                  {fontItem.category}
                                </span>
                              </div>

                              {/* Live preview of typed name */}
                              <div className="my-2 p-2 bg-[#FAFAF8] border border-[#EBE8E2] text-center">
                                <span className={`text-base text-[#1B3326] ${fontItem.fontFamilyClass}`}>
                                  {recipientName.trim() || fontItem.sampleText}
                                </span>
                              </div>

                              <p className="text-xs text-[#38342F] leading-snug">
                                {fontItem.description}
                              </p>

                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-[#4A4640]">
                                  Best for: {fontItem.bestFor.split(',')[0]}
                                </span>
                                <span
                                  className={`text-xs font-bold ${
                                    isSelected ? 'text-[#1B3326]' : 'text-[#4A4640]'
                                  }`}
                                >
                                  {isSelected ? '✓ Picked' : 'Pick'}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 3. Metallic Leaf & Foil Inlay Styles */}
                    <div className="space-y-3 pt-2 border-t border-[#E8E6E1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C2A264]" />
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                            Real Shiny Gold, Silver &amp; Rose Flakes
                          </h4>
                        </div>
                        <span className="text-xs text-[#4A4640]">Floating Inside Clear Resin</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {METALLIC_LEAF_TEMPLATES.map((leaf) => {
                          const isSelected = selectedMetallicLeaf === leaf.name
                          return (
                            <div
                              key={leaf.id}
                              onClick={() => {
                                setSelectedMetallicLeaf(leaf.name)
                                setHasPickedCustomStyle(true)
                              }}
                              className={`p-3 border cursor-pointer transition-all flex items-start gap-3 ${
                                isSelected
                                  ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                  : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                              }`}
                            >
                              <div
                                className="w-10 h-10 shrink-0 border border-black/10 shadow-sm"
                                style={{ background: leaf.previewGradient }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs sm:text-sm font-bold text-[#191817] truncate">{leaf.name}</p>
                                  {isSelected && <Check className="w-4 h-4 text-[#1B3326] shrink-0" />}
                                </div>
                                <p className="text-xs text-[#38342F] mt-0.5 leading-snug">
                                  {leaf.description}
                                </p>
                                <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5 mt-1">
                                  {leaf.vibe}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 4. Color Gradients & Resin Inlay Flow */}
                    <div className="space-y-3 pt-2 border-t border-[#E8E6E1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-[#1B3326]" />
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                            Smooth Color Blends &amp; Marble Swirls
                          </h4>
                        </div>
                        <span className="text-xs text-[#4A4640]">Hand-Poured Colors</span>
                      </div>

                      <div className="space-y-2">
                        {GRADIENT_TEMPLATES.map((grad) => {
                          const isSelected = selectedGradientTheme === grad.name
                          return (
                            <div
                              key={grad.id}
                              onClick={() => {
                                setSelectedGradientTheme(grad.name)
                                setHasPickedCustomStyle(true)
                              }}
                              className={`p-3 border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                                isSelected
                                  ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                                  : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-16 h-7 shrink-0 border border-black/10 shadow-xs"
                                  style={{ background: grad.gradientCss }}
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-[#191817]">{grad.name}</span>
                                    <span className="text-xs text-[#4A4640] bg-[#F2EFE9] px-1.5 py-0.5">
                                      {grad.category}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#38342F] mt-0.5">
                                    {grad.description}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`text-xs font-bold self-end sm:self-center ${
                                  isSelected ? 'text-[#1B3326]' : 'text-[#4A4640]'
                                }`}
                              >
                                {isSelected ? '✓ Picked' : 'Pick'}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 5. Structural Silhouettes & Tray Shapes */}
                    <div className="space-y-3 pt-2 border-t border-[#E8E6E1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#1B3326]" />
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                            Popular Tray &amp; Board Shapes (Ideas)
                          </h4>
                        </div>
                        <span className="text-xs text-[#4A4640]">Shape Options</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {LAYOUT_TEMPLATES.map((layout) => (
                          <div
                            key={layout.id}
                            className="p-3 border border-[#DDD8CE] bg-white space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base">{layout.icon}</span>
                                <h5 className="text-xs sm:text-sm font-bold text-[#191817]">{layout.name}</h5>
                              </div>
                              <span className="text-xs uppercase tracking-wider text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5 font-semibold">
                                {layout.shape}
                              </span>
                            </div>
                            <p className="text-xs text-[#38342F] leading-relaxed">
                              {layout.description}
                            </p>
                            <p className="text-xs text-[#4A4640] pt-1 border-t border-[#F2EFE9]">
                              Great for: {layout.bestFor}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Return to Personalization CTA */}
                    <div className="pt-3 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm text-[#38342F]">
                        Your chosen design will be made neatly by hand by our ONE O team.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#1B3326] hover:bg-[#254634] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Continue Customizing Item</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: VERIFIED REVIEWS & STAR RATINGS */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Rating Overview + 5-to-1 Star Breakdown Card */}
                    <div className="p-4 sm:p-5 bg-[#F8FAF9] border border-[#D5E3D8] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Left: Overall Star Score */}
                        <div className="sm:col-span-5 space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-4xl font-bold text-[#1B3326]">
                              {stats.average.toFixed(1)}
                            </span>
                            <span className="text-xs text-[#4A4640] font-semibold">
                              out of 5.0
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#C2A264]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(stats.average)
                                    ? 'fill-[#C2A264] text-[#C2A264]'
                                    : 'text-[#C7C3BD]'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#38342F] font-medium pt-0.5">
                            {stats.totalCount} verified customer reviews · {stats.recommendedPercent}% recommend
                          </p>
                        </div>

                        {/* Right: 5★ to 1★ Breakdown Bars */}
                        <div className="sm:col-span-7 sm:border-l sm:border-[#D5E3D8] sm:pl-4 space-y-1.5">
                          {[5, 4, 3, 2, 1].map((starLevel) => {
                            const count = stats.starCounts[starLevel] || 0
                            const pct =
                              stats.totalCount > 0
                                ? Math.round((count / stats.totalCount) * 100)
                                : 0
                            return (
                              <div key={starLevel} className="flex items-center gap-2 text-xs">
                                <span className="w-9 font-semibold text-[#191817] shrink-0">
                                  {starLevel} ★
                                </span>
                                <div className="flex-1 h-2 bg-[#E5EAE6] overflow-hidden">
                                  <div
                                    className="h-full bg-[#C2A264] transition-all duration-300"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="w-7 text-right text-[#4A4640] tabular-nums shrink-0">
                                  {count}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Community Assurance Highlights */}
                      <div className="pt-3 border-t border-[#E0DDD7] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#38342F]">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
                          <span>Clear Shiny Resin (Never turns yellow)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
                          <span>Gift Box with Ribbon &amp; Card</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
                          <span>Safe Doorstep Delivery Across Nigeria</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
                          <span>We Show You Photos on WhatsApp First</span>
                        </span>
                      </div>
                    </div>

                    {/* Filter & Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#191817] mr-1">
                          Filter:
                        </span>
                        {(
                          [
                            { id: 'all', label: `All (${reviewsList.length})` },
                            { id: 5, label: `5★ (${stats.starCounts[5] || 0})` },
                            { id: 4, label: `4★ (${stats.starCounts[4] || 0})` }
                          ] as const
                        ).map((f) => (
                          <button
                            key={String(f.id)}
                            type="button"
                            onClick={() => setStarFilter(f.id)}
                            className={`px-2.5 py-1 text-xs font-semibold border transition-colors ${
                              starFilter === f.id
                                ? 'bg-[#1B3326] text-white border-[#1B3326]'
                                : 'bg-white text-[#38342F] border-[#DDD8CE] hover:border-[#1B3326]'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowAddReview(!showAddReview)}
                        className="text-xs text-[#1B3326] font-bold flex items-center gap-1 hover:underline self-start sm:self-auto"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>{showAddReview ? 'Close Review Form' : 'Write a Review'}</span>
                      </button>
                    </div>

                    {/* Expandable Review Form */}
                    {showAddReview && (
                      <form
                        onSubmit={handleAddReviewSubmit}
                        className="p-3.5 bg-[#F5F4F0] border border-[#DDD8CE] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#191817]">
                            Rate "{product.title}"
                          </span>
                          {/* Star picker */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewRating(star)}
                                aria-label={`Rate ${star} out of 5 stars`}
                                className="p-0.5 hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= newRating
                                      ? 'fill-[#C2A264] text-[#C2A264]'
                                      : 'text-[#C7C3BD]'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Your Name (e.g. Kemi Adeyemi)"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="text-sm px-3 py-2 bg-white border border-[#D5E3D8] focus:outline-none focus:border-[#1B3326]"
                          />
                          <input
                            type="text"
                            placeholder="City / State (e.g. Lekki, Lagos / Abuja)"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="text-sm px-3 py-2 bg-white border border-[#D5E3D8] focus:outline-none focus:border-[#1B3326]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Occasion (e.g. Husband Birthday / Friend Wedding)"
                            value={newOccasion}
                            onChange={(e) => setNewOccasion(e.target.value)}
                            className="text-sm px-3 py-2 bg-white border border-[#D5E3D8] focus:outline-none focus:border-[#1B3326]"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Summary (e.g. He loved it so much!)"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="text-sm px-3 py-2 bg-white border border-[#D5E3D8] focus:outline-none focus:border-[#1B3326]"
                          />
                        </div>

                        <textarea
                          rows={2}
                          required
                          placeholder="How did the person feel when they opened it? What did you think of the finish and wrapping?"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full text-sm px-3 py-2 bg-white border border-[#D5E3D8] focus:outline-none focus:border-[#1B3326]"
                        />

                        <button
                          type="submit"
                          disabled={reviewSubmitted}
                          className="w-full py-2.5 bg-[#1B3326] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122319] transition-colors flex items-center justify-center gap-1.5"
                        >
                          {reviewSubmitted ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                              <span>Thank you! Your review is posted.</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                              <span>Submit Your Review</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {/* Testimonials List */}
                    <div className="space-y-3">
                      {filteredReviews.length === 0 ? (
                        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CE] text-center space-y-2">
                          <p className="text-sm font-semibold text-[#191817]">
                            No {starFilter}-star reviews for this selection yet.
                          </p>
                          <button
                            type="button"
                            onClick={() => setStarFilter('all')}
                            className="text-xs font-bold text-[#1B3326] underline"
                          >
                            Show all reviews ({reviewsList.length})
                          </button>
                        </div>
                      ) : (
                        filteredReviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-3.5 bg-white border border-[#DDD8CE] hover:border-[#1B3326]/40 transition-colors space-y-2 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                          >
                            {/* Reviewer Header */}
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-[#191817]">
                                    {review.author}
                                  </span>
                                  {review.verifiedBuyer && (
                                    <span className="inline-flex items-center gap-0.5 text-xs text-emerald-800 bg-[#E8F3EB] px-2 py-0.5 font-medium">
                                      <Check className="w-3 h-3" />
                                      <span>Verified Buyer</span>
                                    </span>
                                  )}
                                  {review.productId === product.id && (
                                    <span className="text-xs font-semibold text-[#1B3326] bg-[#FAF7F2] border border-[#DDD8CE] px-2 py-0.5">
                                      This Gift Set
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#4A4640] mt-0.5 flex-wrap">
                                  <span className="flex items-center gap-0.5">
                                    <MapPin className="w-3 h-3 text-[#1B3326]" />
                                    <span>{review.location}</span>
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-0.5 text-[#1B3326] font-medium">
                                    <Calendar className="w-3 h-3" />
                                    <span>{review.occasion}</span>
                                  </span>
                                </div>
                                {review.giftSetName && (
                                  <p className="text-xs text-[#4A4640] mt-1">
                                    Gift Set Reviewed:{' '}
                                    <strong className="text-[#191817]">{review.giftSetName}</strong>
                                  </p>
                                )}
                              </div>

                              {/* Stars & Date */}
                              <div className="text-right">
                                <div className="flex items-center text-[#C2A264] justify-end">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3.5 h-3.5 ${
                                        i < Math.round(review.rating)
                                          ? 'fill-[#C2A264] text-[#C2A264]'
                                          : 'text-[#E0DDD7]'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-[#4A4640]">
                                  {review.date}
                                </span>
                              </div>
                            </div>

                            {/* Testimonial Title */}
                            <h5 className="text-sm font-bold text-[#191817]">
                              "{review.title}"
                            </h5>

                            {/* Review Comment */}
                            <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                              {review.comment}
                            </p>

                            {/* Helpful Button */}
                            <div className="pt-2 flex items-center justify-between border-t border-[#F2F0EC] text-xs text-[#4A4640]">
                              <span>
                                Did this review help you decide?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleHelpfulClick(review.id)}
                                disabled={userVoted[review.id]}
                                className={`flex items-center gap-1 px-2.5 py-1 text-xs border transition-colors ${
                                  userVoted[review.id]
                                    ? 'bg-[#EBF2ED] text-[#1B3326] border-[#D5E3D8]'
                                    : 'bg-white hover:bg-[#FAFAF8] text-[#38342F] border-[#DDD8CE]'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>
                                  Helpful ({helpfulMap[review.id] || review.helpfulCount})
                                </span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button (Request a Quote / Add to Gifting Bag) */}
              <div className="pt-4 mt-3 border-t border-[#E8E6E1] space-y-2">
                {product.isCustomQuote ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => onRequestQuote?.(buildQuotePayload())}
                      className="flex-1 py-3.5 px-4 text-xs uppercase tracking-[0.14em] font-semibold bg-[#1B3326] text-white hover:bg-[#122319] flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[#C2A264]" />
                      <span>Request a Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={added}
                      className={`py-3.5 px-4 text-xs uppercase tracking-[0.12em] font-semibold border transition-all flex items-center justify-center gap-2 ${
                        added
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#FAF9F5]'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          <span>Add to Quote Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className={`w-full py-3.5 px-4 text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                      added
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#1B3326] text-white hover:bg-[#122319]'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Gift Bag</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 text-[#C2A264]" />
                        <span>
                          {selectedCompanionIds.length > 0
                            ? `Add Complete Set (${selectedCompanionIds.length + 1} Pieces) • ${formatPrice(totalItemPrice)}`
                            : `Add to Gift Bag • ${formatPrice(product.price)}`}
                        </span>
                      </>
                    )}
                  </button>
                )}

                {/* Direct WhatsApp Quick Decision Link */}
                <div className="text-center pt-1">
                  <a
                    href={`https://wa.me/2349064248263?text=${encodeURIComponent(
                      product.isCustomQuote
                        ? `Hello ONE O! I would like to request a custom quote for "${product.title}"${product.minOrderQty ? ` (minimum ${product.minOrderQty} pieces)` : ''}${personalMemory.trim() ? ` — Personal Memory/Message: "${personalMemory.trim()}"` : ''}. Here are the items, quantities & colors I would like:`
                        : `Hello ONE O! I am ordering "${product.title}" (${formatPrice(product.price)})${personalMemory.trim() ? ` — Personal Memory/Message: "${personalMemory.trim()}"` : ''} and would like to tell you the exact colors, design, and wording I want.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#1B3326] hover:text-[#0F1E16] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>
                      {product.isCustomQuote
                        ? 'Request your custom quote & choose exact items/colors on WhatsApp (09064248263) →'
                        : 'Finalize your colors, design & wording with our WhatsApp representative (09064248263) →'}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

