import React, { useState, useEffect, useMemo } from 'react'
import {
  X,
  Check,
  MessageCircle,
  ShoppingBag,
  Copy,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Heart,
  Layers
} from 'lucide-react'
import { ProductImage } from './ProductImage'
import { CartItem } from './CartDrawer'
import { STUDIO_INFO, getWhatsAppOrderUrl, getEmailOrderUrl } from '../data/studioInfo'

export interface QuoteInquiryTarget {
  id: string
  title: string
  subtitle?: string
  imageUrl?: string
  collection?: string
  minOrderQty?: number
  itemsIncluded?: string[]
  initialNotes?: string
  initialRecipient?: string
}

interface QuoteInquiryModalProps {
  target: QuoteInquiryTarget | null
  onClose: () => void
  onAddQuoteToBag?: (item: CartItem) => void
  onOpenCart?: () => void
}

function getSuggestedMixItems(target: QuoteInquiryTarget): string[] {
  const lower = `${target.id} ${target.title} ${target.collection || ''}`.toLowerCase()

  if (lower.includes('retire') || lower.includes('farewell')) {
    return [
      'Silent Standing Parlor / Study Clock',
      'Lifetime Service Tribute Frame / Plaque',
      'Home Catch-All & Valet Tray',
      'A5 Memoir & Gratitude Notebook + Pen',
      'Parlor Coasters (Set of 4)',
      'Personalized Bottle Stopper',
      'Gentleman’s Cufflinks & Tie Clip OR Lady’s Jewelry & Mirror',
      'Executive Chest & Farewell Tribute Card'
    ]
  }

  if (lower.includes('proposal') || lower.includes('engage') || lower.includes('marry')) {
    return [
      'Resin Engagement Letter / "Will You Marry Me?" Plaque',
      'Custom Engagement Ring-Box Topper / Tray Accent',
      'Optional Warm LED Bedside Light Base',
      'Couple Portrait Photo Frame',
      'Pair of Initial Couple Keychains',
      'Discreet Proposal Chest & "Yes" Keepsake Card'
    ]
  }

  if (lower.includes('memory') || lower.includes('preservation') || lower.includes('invitation') || lower.includes('bouquet') || lower.includes('vow')) {
    return [
      'Wedding Invitation & Vows Preservation Block',
      'Preserved Bouquet Pressed-Flower Coasters (Set of 4)',
      'Wedding-Date Display Plaque',
      'Couple Portrait Photo Frame (A5)',
      'Freestanding Flower Preservation Pyramid',
      'Archival Memory Box & UV Care Card'
    ]
  }

  if (lower.includes('conference') || lower.includes('badge') || lower.includes('medal') || lower.includes('seminar')) {
    return [
      'Custom Resin Conference Name Badges (with Lanyard/Pin)',
      'Company-Logo Keychains',
      'Branded Ballpoint Resin Pens',
      'Custom Resin Event Tags & Luggage Tags',
      'Custom Award Medals on Satin Ribbons',
      'Speaker Appreciation Award Plaques',
      'Color-Matched Guest Pouches & Event Date Tags'
    ]
  }

  if (lower.includes('owambe') || lower.includes('souvenir') || lower.includes('favor') || lower.includes('lapel')) {
    return [
      'Drink Coasters (Single or Pair)',
      'Small Resin Trinket Trays',
      'Customized Bridesmaids Pack',
      'Customized Groomsmen Pack',
      'Initial Keychains',
      'Customized Writing Pens',
      'Aso-Ebi Monogram Lapel Pins',
      'Slot-Together Phone Stands',
      'Wine Bottle Stoppers',
      'Custom Thank-You Card & Individual Pouch'
    ]
  }

  if (lower.includes('bridal') || lower.includes('groomsmen')) {
    return [
      'Customized Bridesmaids Pack (Mirror, Comb, Keychain)',
      'Customized Groomsmen Pack (Cufflinks, Tie Clip, Jotter, Phone Stand)',
      'Personalized Name Tags / Mini Plaques',
      'Monogram Aso-Ebi Lapel Pins',
      'Ring Dish / Catch-All Trays',
      'Individual Gift Boxes & Thank-You Cards'
    ]
  }

  if (lower.includes('kids') || (lower.includes('birthday') && lower.includes('favour'))) {
    return [
      'Mini Resin Keychains or Initial Backpack Bag Charms',
      'Custom Birthday Name & Age Favour Tags',
      'Color-Matched Organza Party Pouches',
      'Extra Matching Bookmark or Sticker Charm for VIP Cousins',
      'Birthday Child Keepsake Plaque'
    ]
  }

  if (lower.includes('birthday')) {
    return [
      'Custom Resin Photo Frame (A5 Portrait) or Mini Frame',
      'Personalized Name / Photo Resin Keychain',
      'A5 Hardcover Jotter or A7 Pocket Jotter',
      'Matching Resin Ballpoint Pen + Bookmark',
      'Custom Phone Cover / Desktop Phone Stand',
      'Optional Wearable Jewelry Set OR Gentleman’s Cufflinks',
      'Custom Vanity Tray / Jewelry Dish Stand & Name Plaque',
      'Luxury Presentation Box & Handwritten Birthday Card'
    ]
  }

  if (lower.includes('naming') && (lower.includes('favour') || lower.includes('pack'))) {
    return [
      'Mini Resin Footprint or Baby Initial Keychains',
      'Printed Baby Name & Ceremony Date Favour Tags',
      'Pastel Organza or Velvet Guest Pouches',
      'Head-Table / Grandparents Keepsake Plaque',
      'Extra Naming Ceremony Coasters'
    ]
  }

  if (lower.includes('baby') || lower.includes('christening') || lower.includes('family')) {
    return [
      'Baby Name & Birth Stats Nursery Plaque',
      'Ultrasound Scan / Newborn Footprint & Hair-Curl Block',
      'Christening / Dedication Name, Date & Scripture Plaque',
      'Baby Portrait or Family Photo Resin Frame (A5)',
      '"Welcome to Our Home" / Family Surname Sign',
      'Individual Family Member / Parent Name Keychains',
      'Pastel Presentation Box, Welcome Card & UV Care Sheet'
    ]
  }

  if (lower.includes('onboarding') || lower.includes('executive') || lower.includes('staff') || lower.includes('launch') || lower.includes('corporate')) {
    return [
      'Executive Desk Nameplate (Name, Title & Logo)',
      'Retractable Name Badge Reel / Lanyard ID Tag',
      'Company-Logo Resin Keychains (with optional NFC tag)',
      'Branded Resin Ballpoint Pens + Personalized Bookmarks',
      'A5 Hardcover Corporate Notebooks & Logo Coasters',
      'Campaign / Award Logo Appreciation Plaque',
      'Branded Presentation Boxes / Velvet Pouches & Welcome Cards'
    ]
  }

  if (lower.includes('ramadan') || lower.includes('eid') || lower.includes('christmas') || lower.includes('new year') || lower.includes('church') || lower.includes('pastor') || lower.includes('ministry')) {
    return [
      'Custom Prayer-Time / Eid Dua / Scripture Tribute Plaque',
      'Resin Serving Tray & Dedicated Dates Dish Holder',
      'Family Surname Sign & Dated Photo Christmas Tree Ornament',
      'New Year Goal / Word-of-the-Year Plaque & Mini Photo Frame',
      'Pastoral Desk Nameplate, Coaster & Smooth Signing Pen',
      'Presentation Box, Festive Card & Care Instructions'
    ]
  }

  if (lower.includes('graduation') || lower.includes('school')) {
    return [
      'School-Leaving / Degree & Honours Plaque (University & Class Year)',
      'Graduation Gown Portrait Photo Frame (A5)',
      'Graduation Cap & Class-Year Resin Keychain',
      'Matching Engraved Resin Signing Pen',
      'Presentation Box, Tassel Ribbon & Congratulations Card'
    ]
  }

  return [
    'Photo Memory Plaque',
    'Illuminated LED Bedside Night Light',
    'Wedding Bouquet Preservation Block',
    'Jewelry Dish Stand / Ring Tray',
    'Pair of Initial Keychains',
    'Couple Coasters & Bottle Stopper',
    'Presentation Gift Box & Handwritten Card'
  ]
}

export const QuoteInquiryModal: React.FC<QuoteInquiryModalProps> = ({
  target,
  onClose,
  onAddQuoteToBag,
  onOpenCart
}) => {
  const [contactName, setContactName] = useState('')
  const [eventOrHonoreeName, setEventOrHonoreeName] = useState('')
  const [phone, setPhone] = useState('')
  const [cityAndDate, setCityAndDate] = useState('')
  const [quantity, setQuantity] = useState<number>(25)
  const [selectedMix, setSelectedMix] = useState<string[]>([])
  const [customNotes, setCustomNotes] = useState('')
  const [copied, setCopied] = useState(false)
  const [addedNotice, setAddedNotice] = useState(false)

  const suggestedMix = useMemo(
    () => (target ? getSuggestedMixItems(target) : []),
    [target]
  )

  useEffect(() => {
    if (!target) return
    const defaultMin = target.minOrderQty || 1
    setQuantity(defaultMin)
    setEventOrHonoreeName(target.initialRecipient || '')
    setCustomNotes(target.initialNotes || '')
    setAddedNotice(false)
    setCopied(false)

    // Pre-select the first 3 helpful options
    const items = getSuggestedMixItems(target)
    setSelectedMix(items.slice(0, 3))
  }, [target])

  if (!target) return null

  const minQty = target.minOrderQty || 1
  const isBulkMin = Boolean(target.minOrderQty && target.minOrderQty >= 5)

  const toggleMixItem = (itemLabel: string) => {
    setSelectedMix((prev) =>
      prev.includes(itemLabel)
        ? prev.filter((i) => i !== itemLabel)
        : [...prev, itemLabel]
    )
  }

  const handleQtyChange = (val: number) => {
    if (Number.isNaN(val)) return
    setQuantity(Math.max(minQty, val))
  }

  const buildInquiryMessage = () => {
    const lines = [
      'Hello ONE O Personalized Gifts!',
      '',
      `I would like to request a custom quote for: *${target.title}*`,
      eventOrHonoreeName.trim() ? `Couple / Honoree / Event: ${eventOrHonoreeName.trim()}` : '',
      contactName.trim() ? `Requested By: ${contactName.trim()}` : '',
      phone.trim() ? `WhatsApp / Phone: ${phone.trim()}` : '',
      `Estimated Quantity: ${quantity} ${quantity === 1 ? 'set / piece' : 'pieces / sets'}${
        target.minOrderQty ? ` (Min. order ${target.minOrderQty} pcs)` : ''
      }`,
      cityAndDate.trim() ? `Event Date & Delivery Location: ${cityAndDate.trim()}` : '',
      '',
      selectedMix.length > 0
        ? `Items I Want Included:\n${selectedMix.map((m) => `- ${m}`).join('\n')}`
        : '',
      customNotes.trim()
        ? `\nColors, Wording & Special Notes:\n${customNotes.trim()}`
        : '\nColors & Wording: I will share my preferred colors, wording/names, and thank-you card details on WhatsApp.',
      '',
      'Please send a tailored quote, production timeline, and delivery options.'
    ]
    return lines.filter((l, idx) => l !== '' || lines[idx - 1] !== '').join('\n')
  }

  const inquiryText = buildInquiryMessage()
  const whatsAppUrl = getWhatsAppOrderUrl(inquiryText)
  const emailUrl = getEmailOrderUrl(`ONE O Custom Quote Request — ${target.title}`, inquiryText)

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const handleSaveToBag = () => {
    if (!onAddQuoteToBag) return
    const item: CartItem = {
      id: `quote-${target.id}-${Date.now()}`,
      type: 'bespoke',
      title: `${target.title} (${quantity} ${quantity === 1 ? 'Unit' : 'Pieces'})`,
      price: 0,
      isCustomQuote: true,
      minOrderQty: target.minOrderQty,
      ribbon: 'Custom Colors, Design & Card (Quote Requested)',
      recipientName: eventOrHonoreeName.trim() || contactName.trim() || 'Custom Quote Request',
      personalMemory: customNotes.trim() || undefined,
      boxType: isBulkMin ? 'Individual Guest Pouches / Cartons with Thank-You Cards' : 'Presentation Gift Box with Handwritten Card',
      includedItems: [
        `Requested Quantity: ${quantity}`,
        ...(cityAndDate.trim() ? [`Date & Location: ${cityAndDate.trim()}`] : []),
        ...selectedMix
      ],
      imageUrl: target.imageUrl
    }
    onAddQuoteToBag(item)
    setAddedNotice(true)
    setTimeout(() => {
      setAddedNotice(false)
      onClose()
      if (onOpenCart) onOpenCart()
    }, 650)
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#161514]/75 backdrop-blur-sm transition-opacity"
        />

        <div className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl my-8 border border-[#E8E6E1]">
          {/* Header Banner */}
          <div className="bg-[#1B3326] text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-[#122319]">
            <div className="flex items-center gap-4 min-w-0">
              {target.imageUrl && (
                <div className="w-16 h-16 shrink-0 overflow-hidden border border-white/25 bg-white hidden sm:block">
                  <ProductImage
                    src={target.imageUrl}
                    alt={target.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#E5C07B] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customized Order Quote Inquiry</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {target.title}
                </h3>
                {target.minOrderQty && (
                  <p className="text-xs text-[#D5E3D8] font-medium">
                    Minimum order quantity: {target.minOrderQty} pieces · Tell us your exact count &amp; item mix below
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors shrink-0"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Form */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto bg-[#FAFAF8]">
            {target.subtitle && (
              <p className="text-sm text-[#38342F] bg-white p-3.5 border border-[#E2DDD3] leading-relaxed">
                {target.subtitle}
              </p>
            )}

            {/* 1. Quantity Selector */}
            <div className="bg-white p-4 sm:p-5 border border-[#DDD8CE] space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label
                  htmlFor="quote-qty-input"
                  className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-[#1B3326]" />
                  <span>1. How Many Pieces / Sets Do You Need?</span>
                </label>
                {target.minOrderQty && (
                  <span className="text-xs font-semibold text-[#1B3326] bg-[#E8F3EB] px-2.5 py-0.5">
                    Min. {target.minOrderQty} Pieces
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="quote-qty-input"
                  type="number"
                  min={minQty}
                  value={quantity}
                  onChange={(e) => handleQtyChange(Number(e.target.value))}
                  className="w-28 text-base font-bold text-[#1B3326] px-3 py-2 bg-[#FAFAF8] border border-[#1B3326] focus:outline-none"
                />

                {(isBulkMin ? [25, 40, 50, 75, 100, 150, 200] : [1, 2, 5, 10, 25]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    disabled={preset < minQty}
                    onClick={() => setQuantity(preset)}
                    className={`px-3 py-2 text-xs font-bold border transition-all ${
                      quantity === preset
                        ? 'bg-[#1B3326] text-white border-[#1B3326]'
                        : 'bg-[#FAFAF8] text-[#38342F] border-[#DDD8CE] hover:border-[#1B3326]'
                    } disabled:opacity-40`}
                  >
                    {preset} {preset === 1 ? 'Set' : 'Pcs'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose / Confirm Item Mix */}
            <div className="bg-white p-4 sm:p-5 border border-[#DDD8CE] space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#C2A264]" />
                  <span>2. Select Items to Include in Your Quote</span>
                </span>
                <span className="text-xs text-[#4A4640]">
                  {selectedMix.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedMix.map((option) => {
                  const checked = selectedMix.includes(option)
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMixItem(option)}
                      className={`p-3 text-left border transition-all flex items-start gap-2.5 text-xs sm:text-sm ${
                        checked
                          ? 'border-[#1B3326] bg-[#F5F8F6] text-[#191817] font-semibold ring-1 ring-[#1B3326]'
                          : 'border-[#DDD8CE] bg-[#FAFAF8] text-[#38342F] hover:border-[#8C8881]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 mt-0.5 shrink-0 border flex items-center justify-center ${
                          checked
                            ? 'bg-[#1B3326] border-[#1B3326] text-white'
                            : 'bg-white border-[#B5B0A6]'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Couple / Honoree & Contact Info */}
            <div className="bg-white p-4 sm:p-5 border border-[#DDD8CE] space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C2A264]" />
                <span>3. Event, Honoree &amp; Contact Details</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#38342F] mb-1">
                    Couple / Honoree / Event Name
                  </label>
                  <input
                    type="text"
                    value={eventOrHonoreeName}
                    onChange={(e) => setEventOrHonoreeName(e.target.value)}
                    placeholder="e.g. Chinedu & Amaka / Chief Adeyemi's Farewell"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38342F] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Mrs. Bisi / Event Planner"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38342F] mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38342F] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1B3326]" />
                    <MapPin className="w-3.5 h-3.5 text-[#1B3326]" />
                    <span>Event Date &amp; Delivery City</span>
                  </label>
                  <input
                    type="text"
                    value={cityAndDate}
                    onChange={(e) => setCityAndDate(e.target.value)}
                    placeholder="e.g. Dec 14 · Lekki, Lagos"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#38342F] mb-1">
                  Colors, Aso-Ebi Shade, Wording &amp; Personal Memory Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Share your party colors, names to write on the pieces, Thank-You Card message, or any extra items you want quoted..."
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-white px-6 py-4 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 px-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>Send Custom Quote on WhatsApp ({STUDIO_INFO.phoneDisplay})</span>
            </a>

            {onAddQuoteToBag && (
              <button
                type="button"
                onClick={handleSaveToBag}
                disabled={addedNotice}
                className="py-3.5 px-5 bg-[#1B3326] hover:bg-[#122319] text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Quote Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C2A264]" />
                    <span>Add to Quote Bag</span>
                  </>
                )}
              </button>
            )}

            <a
              href={emailUrl}
              className="py-3.5 px-4 border border-[#DDD8CE] bg-[#FAFAF8] hover:bg-white text-[#191817] text-xs uppercase tracking-wider font-semibold transition-colors text-center"
            >
              Email
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="py-3.5 px-4 border border-[#DDD8CE] bg-[#FAFAF8] hover:bg-white text-[#191817] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-800">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#4A4640]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
