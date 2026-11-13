import React, { useState } from 'react'
import {
  Gift,
  FileDown,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  Star,
  Award,
  ChevronRight,
  Info,
  Clock,
  ArrowRight,
  Tag,
  Building2,
  Users
} from 'lucide-react'
import {
  FESTIVE_HAMPERS,
  FESTIVE_A_LA_CARTE,
  FestiveHamperPackage
} from '../data/festiveHampers'
import { SAMPLE_PRODUCTS, Product } from '../data/products'
import { STUDIO_INFO } from '../data/studioInfo'
import { ProductImage } from './ProductImage'
import { CartItem } from './CartDrawer'
import { useCurrency } from '../context/CurrencyContext'

interface FestiveHamperSectionProps {
  onAddToCart?: (item: CartItem) => void
  onOpenCart?: () => void
  onSelectProduct?: (product: Product) => void
}

export const FestiveHamperSection: React.FC<FestiveHamperSectionProps> = ({
  onAddToCart = () => {},
  onOpenCart,
  onSelectProduct
}) => {
  const { formatPrice } = useCurrency()
  const [isBulkMode, setIsBulkMode] = useState<boolean>(false)
  const [showAlaCarteModal, setShowAlaCarteModal] = useState<boolean>(false)
  const [selectedChoices, setSelectedChoices] = useState<Record<string, Record<string, string>>>({
    'december-sparkle-starter': {
      '02': 'Holiday Hanging Ornament'
    },
    'december-appreciation-classic': {
      '02': 'Personalised Initial Keychain',
      '03': 'Jewelry Dish Stand / Catch-All Stand'
    },
    'december-executive-luxe': {
      '01': 'Set of 4 Drink Coasters'
    }
  })

  const handleChoiceChange = (hamperId: string, itemNumber: string, choiceVal: string) => {
    setSelectedChoices(prev => ({
      ...prev,
      [hamperId]: {
        ...(prev[hamperId] || {}),
        [itemNumber]: choiceVal
      }
    }))
  }

  const handleAddHamperToBag = (hamper: FestiveHamperPackage) => {
    const activePrice = isBulkMode ? hamper.bulkPrice : hamper.retailPrice
    const quantityLabel = isBulkMode ? 'Bulk Order (10+ Units)' : 'Retail Piece'
    const userSelections = selectedChoices[hamper.id] || {}

    const includedItemsList = hamper.items.map(it => {
      const selected = userSelections[it.number]
      return selected ? `${it.number}. ${it.title} (${selected})` : `${it.number}. ${it.title}`
    })

    const cartItem: CartItem = {
      id: `festive-${hamper.id}-${Date.now()}`,
      type: 'bespoke',
      title: `${hamper.name} (${quantityLabel})`,
      price: activePrice,
      ribbon: 'Custom Ribbon & Box Finish (Confirmed on WhatsApp)',
      recipientName: `Festive Gifting · ${hamper.targetAudience}`,
      boxType: hamper.packagingDetails,
      includedItems: includedItemsList,
      imageUrl: hamper.imageUrl
    }

    onAddToCart(cartItem)
    if (onOpenCart) onOpenCart()
  }

  const handleOpenProductModal = (hamperId: string) => {
    const matched = SAMPLE_PRODUCTS.find(p => p.id === `${hamperId}-hamper`)
    if (matched && onSelectProduct) {
      onSelectProduct(matched)
    }
  }

  const getWhatsAppProposalInquiry = (hamper?: FestiveHamperPackage) => {
    const greeting = 'Hello ONE O Personalised Gifts!'
    let body = `I would like to inquire about your December Festive Hampers.`
    if (hamper) {
      const priceStr = isBulkMode
        ? `Bulk tier (₦${hamper.bulkPrice.toLocaleString()} / 10+ units)`
        : `Retail tier (₦${hamper.retailPrice.toLocaleString()})`
      body = `I am interested in ordering the *${hamper.name}* (${priceStr}).\nTarget Audience: ${hamper.targetAudience}.\nPlease provide delivery timeline and invoice details.`
    } else {
      body += `\nI would like a customized corporate package quotation for our team/clients.`
    }
    const cleanNumber = STUDIO_INFO.whatsappContact.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`${greeting}\n\n${body}`)}`
  }

  return (
    <section id="festive-hampers" className="relative scroll-mt-20">
      {/* Background Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F4F1EA] to-[#FAFAF8] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Proposal Header Banner */}
        <div className="border border-[#E2DDD3] bg-white shadow-sm p-6 sm:p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-[#C2A264]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-44 h-44 bg-[#1B3326]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B3326] text-white text-xs uppercase tracking-[0.14em] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>Side Seasonal Catalog · December &amp; Holiday Edition</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#191817] tracking-tight leading-tight">
                Special Year-End &amp; December Hamper Sets
              </h2>

              <p className="text-sm sm:text-base text-[#38342F] font-normal leading-relaxed">
                Alongside our year-round gift store, this special seasonal catalog brings together ready-made holiday boxes for office teams, valued clients, and family visits. You decide every color, design, and personal wording directly with our representative on WhatsApp.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm text-[#4A4640]">
                <span className="flex items-center gap-1.5 font-medium text-[#1B3326]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Standard Nigerian Pricing</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C2A264]" />
                  <span>Order early to get delivery in December</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium text-[#191817]">
                  <Building2 className="w-4 h-4 text-[#1B3326]" />
                  <span>We can print your company logo</span>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href={getWhatsAppProposalInquiry()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order Hampers on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowAlaCarteModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 border border-[#1B3326] text-[#1B3326] bg-white hover:bg-[#F9F8F5] text-xs uppercase tracking-wider font-semibold transition-all"
              >
                <Tag className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>See Price List for Single Pieces</span>
              </button>
            </div>
          </div>

          {/* Pricing Mode Toggle (Single vs Bulk 10+) */}
          <div className="mt-8 pt-6 border-t border-[#EAE6DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191817]">
                How Many Do You Need?
              </span>
              <span className="text-xs sm:text-sm text-[#4A4640]">
                {isBulkMode ? 'Showing Bulk Discount Prices (10 or more)' : 'Showing Single Piece Prices (1 to 9)'}
              </span>
            </div>

            <div className="inline-flex items-center bg-[#F4F1EA] p-1 border border-[#DDD8CE]">
              <button
                type="button"
                onClick={() => setIsBulkMode(false)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  !isBulkMode
                    ? 'bg-white text-[#191817] shadow-sm'
                    : 'text-[#4A4640] hover:text-[#191817]'
                }`}
              >
                Single Pieces (1–9)
              </button>
              <button
                type="button"
                onClick={() => setIsBulkMode(true)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isBulkMode
                    ? 'bg-[#1B3326] text-white shadow-sm'
                    : 'text-[#4A4640] hover:text-[#191817]'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>Bulk 10+ (Save up to 18%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Festive Hamper Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FESTIVE_HAMPERS.map((hamper, idx) => {
            const activePrice = isBulkMode ? hamper.bulkPrice : hamper.retailPrice
            const priceRange = isBulkMode ? hamper.bulkRange : hamper.retailRange
            const isExecutive = hamper.id === 'december-executive-luxe'
            const isClassic = hamper.id === 'december-appreciation-classic'

            return (
              <div
                key={hamper.id}
                className={`bg-white border transition-all flex flex-col justify-between relative group ${
                  isExecutive
                    ? 'border-[#C2A264] shadow-md ring-1 ring-[#C2A264]/40'
                    : isClassic
                    ? 'border-[#1B3326] shadow-sm'
                    : 'border-[#E2DDD3] shadow-sm hover:border-[#1B3326]'
                }`}
              >
                {/* Top Badge */}
                <div className="absolute -top-3.5 left-6 z-10">
                  <span
                    className="px-3.5 py-1 text-xs uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1 text-white"
                    style={{ backgroundColor: hamper.highlightColor }}
                  >
                    <Star className="w-3 h-3 text-[#E5C07B] fill-current" />
                    <span>{hamper.badge}</span>
                  </span>
                </div>

                <div>
                  {/* Image banner */}
                  <div className="aspect-[16/10] bg-[#F5F4F0] relative overflow-hidden border-b border-[#EAE6DE]">
                    <ProductImage
                      src={hamper.imageUrl}
                      alt={hamper.name}
                      aspectRatio="auto"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs uppercase tracking-wider text-[#E5C07B] font-semibold">
                        {hamper.tagline}
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                        {hamper.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    {/* Price Header */}
                    <div className="pb-4 border-b border-[#F0ECE1]">
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#4A4640] font-semibold block">
                            {isBulkMode ? 'Bulk Price Each (10+ Units)' : 'Single Item Price (1–9)'}
                          </span>
                          <span className="font-serif text-3xl font-bold text-[#191817]">
                            {formatPrice(activePrice)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs uppercase tracking-wider text-[#4A4640] block">
                            Typical Range
                          </span>
                          <span className="text-xs font-semibold text-[#1B3326] bg-[#F4F1EA] px-2 py-0.5 border border-[#DDD8CE]">
                            {priceRange}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4A4640] mt-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C2A264] shrink-0" />
                        <span>Great for: <strong className="text-[#191817]">{hamper.targetAudience}</strong></span>
                      </p>
                    </div>

                    {/* What's Included */}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-wider font-bold text-[#191817] flex items-center justify-between gap-2 flex-wrap">
                        <span>What You Get Inside:</span>
                        <span className="text-xs font-semibold text-emerald-900 bg-[#E8F3EB] px-2 py-0.5">Includes Gift Box &amp; Ribbon</span>
                      </p>

                      <div className="space-y-2.5">
                        {hamper.items.map((item) => (
                          <div
                            key={item.number}
                            className="p-3.5 bg-[#FAF9F5] border border-[#EFECE6] text-xs sm:text-sm space-y-1.5"
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-serif font-bold text-[#1B3326] shrink-0 text-sm mt-0.5">
                                {item.number}.
                              </span>
                              <div className="flex-1">
                                <p className="font-bold text-[#191817]">{item.title}</p>
                                <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* User Choice selector if item has variants */}
                            {item.choice && item.choice.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-[#E8E4DA] pl-4">
                                <label className="text-xs uppercase tracking-wider font-semibold text-[#38342F] block mb-1">
                                  Pick Which Item You Prefer:
                                </label>
                                <select
                                  value={selectedChoices[hamper.id]?.[item.number] || item.choice[0]}
                                  onChange={(e) => handleChoiceChange(hamper.id, item.number, e.target.value)}
                                  className="w-full text-xs sm:text-sm bg-white border border-[#DDD8CE] px-2.5 py-2 text-[#191817] focus:border-[#1B3326] focus:outline-none"
                                >
                                  {item.choice.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packaging Note */}
                    <div className="text-xs sm:text-sm text-[#38342F] bg-[#F5F2EB] p-3 border border-[#DDD8CE]">
                      <span className="font-bold text-[#191817] block">Packaging Included:</span>
                      <span>{hamper.packagingDetails}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleAddHamperToBag(hamper)}
                    className="w-full py-3.5 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-[0.14em] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C2A264] group-hover:scale-110 transition-transform" />
                    <span>Add {hamper.name.split(' ')[0]} to Bag</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenProductModal(hamper.id)}
                      className="py-2.5 px-3 border border-[#DDD8CE] text-[#191817] bg-white hover:bg-[#FAF9F5] text-xs font-semibold transition-all text-center truncate"
                    >
                      Personalize Details
                    </button>

                    <a
                      href={getWhatsAppProposalInquiry(hamper)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 border border-[#25D366] text-[#128C7E] bg-white hover:bg-[#F0FDF4] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Order</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Corporate & Event Gifting Assurance Footer */}
        <div className="mt-12 bg-white border border-[#E2DDD3] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F4F1EA] border border-[#DDD8CE] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#C2A264]" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#191817]">
                Need Large Company Hamper Orders (50 to 500+ Units)?
              </h4>
              <p className="text-sm text-[#38342F] leading-relaxed">
                We add your company logo cleanly, prepare formal company invoices, and deliver safely across Lagos, Abuja, Port Harcourt, and all 36 states.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent('Corporate Festive December Hamper Inquiry')}`}
              className="px-5 py-3 border border-[#191817] text-[#191817] hover:bg-[#F9F8F5] text-xs uppercase tracking-wider font-semibold transition-all"
            >
              Send Us an Email
            </a>
            <a
              href={getWhatsAppProposalInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal: Single Pieces & Extra Items Price List */}
      {showAlaCarteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#E2DDD3] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#EAE6DE] pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
                  Single Item Prices
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
                  Single Items &amp; Extra Pieces Price List
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAlaCarteModal(false)}
                className="text-[#4A4640] hover:text-[#191817] text-2xl w-9 h-9 flex items-center justify-center border border-[#DDD8CE]"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-[#38342F] mb-4 leading-relaxed">
              These are our honest prices in Nigeria for single items, so you can order individual pieces or mix and match your own gift box.
            </p>

            <div className="divide-y divide-[#EFECE6] border border-[#EFECE6]">
              <div className="grid grid-cols-12 bg-[#F4F1EA] p-3 text-xs font-bold uppercase tracking-wider text-[#191817]">
                <div className="col-span-6">Product / Item</div>
                <div className="col-span-3 text-right">Single (1–9)</div>
                <div className="col-span-3 text-right">Bulk (10+)</div>
              </div>

              {FESTIVE_A_LA_CARTE.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 p-3 text-xs sm:text-sm items-center hover:bg-[#FAF9F5]">
                  <div className="col-span-6 pr-2">
                    <p className="font-semibold text-[#191817]">{item.item}</p>
                    <p className="text-xs text-[#4A4640]">{item.note}</p>
                  </div>
                  <div className="col-span-3 text-right font-serif font-bold text-[#191817]">
                    {formatPrice(item.retail)}
                  </div>
                  <div className="col-span-3 text-right font-serif font-bold text-emerald-800">
                    {formatPrice(item.bulk)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAE6DE] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`https://wa.me/2349064248263?text=${encodeURIComponent('Hello ONE O! I want to order individual Christmas items from your single item price list.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-[#1B3326] hover:underline flex items-center gap-1.5 font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order Single Pieces on WhatsApp (09064248263) &rarr;</span>
              </a>

              <button
                type="button"
                onClick={() => setShowAlaCarteModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Close Price List
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
