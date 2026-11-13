import React, { useState } from 'react'
import {
  X,
  Trash2,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp,
  Edit3
} from 'lucide-react'
import { ProductImage } from './ProductImage'
import { CuteMessagePicker } from './CuteMessagePicker'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useCurrency } from '../context/CurrencyContext'
import { STUDIO_INFO, getWhatsAppOrderUrl, getEmailOrderUrl } from '../data/studioInfo'

export interface CartItem {
  id: string
  type: 'catalog' | 'bespoke'
  title: string
  price: number
  ribbon: string
  giftNote?: string
  personalMemory?: string
  recipientName?: string
  boxType?: string
  includedItems?: string[]
  imageUrl?: string
  isCustomQuote?: boolean
  minOrderQty?: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  onUpdateItemGiftNote?: (id: string, note: string) => void
}

const NIGERIAN_DELIVERY_ZONES = [
  { id: 'abuja', label: 'Abuja FCT (Maitama, Asokoro, Wuse, Central)', note: 'Fast courier & careful doorstep delivery' },
  { id: 'lagos', label: 'Lagos (Island & Mainland)', note: 'Express courier & careful doorstep delivery' },
  { id: 'port-harcourt', label: 'Port Harcourt & Rivers State', note: '1–2 business days express dispatch' },
  { id: 'ibadan', label: 'Ibadan & Oyo State', note: 'Next-day regional logistics' },
  { id: 'enugu', label: 'Enugu & South East (Anambra, Imo, Abia, Ebonyi)', note: '2 business days secure dispatch' },
  { id: 'kano-kaduna', label: 'Kano, Kaduna & Northern Region', note: '2–3 business days insured logistics' },
  { id: 'delta-edo', label: 'Asaba, Warri, Benin & South-South', note: '2 business days secure dispatch' },
  { id: 'nationwide', label: 'All Other Nigerian States (Nationwide)', note: 'Insured transit to all 36 states' },
  { id: 'diaspora', label: 'International Diaspora (UK, USA, Canada & Europe)', note: '3–5 days DHL Express air shipping' }
]

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onUpdateItemGiftNote
}) => {
  const { formatPrice, currency } = useCurrency()
  const [copied, setCopied] = useState(false)
  const [selectedZone, setSelectedZone] = useState('lagos')
  const [senderPhone, setSenderPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inquirySentStatus, setInquirySentStatus] = useState<string | null>(null)
  const [showQueuedPreview, setShowQueuedPreview] = useState(false)
  const [editingNoteItemId, setEditingNoteItemId] = useState<string | null>(null)

  if (!isOpen) return null

  const fixedSubtotal = items
    .filter((item) => !item.isCustomQuote && item.price > 0)
    .reduce((sum, item) => sum + item.price, 0)
  const hasCustomQuoteItems = items.some((item) => item.isCustomQuote || item.price === 0)
  const allCustomQuoteItems = items.length > 0 && items.every((item) => item.isCustomQuote || item.price === 0)
  const activeZoneObj = NIGERIAN_DELIVERY_ZONES.find(z => z.id === selectedZone)

  const generateOrderSummaryText = () => {
    let body = `Hello ONE O Gift Studio,\n\nI would like to order / request a quote for the following personalized gift(s):\n\n`
    items.forEach((item, idx) => {
      const isQuote = Boolean(item.isCustomQuote || item.price === 0)
      body += `----------------------------------------\n`
      body += `Gift ${idx + 1}: ${item.title}\n`
      body += `Gift Type: ${item.type === 'bespoke' ? 'Custom Gift Box' : 'Personalized Gift'}\n`
      body += `Price: ${isQuote ? 'Customizable — Please share a quote based on my chosen items & quantity' : formatPrice(item.price)}\n`
      if (item.minOrderQty) body += `Minimum Order: ${item.minOrderQty} pieces\n`
      body += `Ribbon / Finish Note: ${item.ribbon}\n`
      if (item.boxType) body += `Gift Box: ${item.boxType}\n`
      if (item.recipientName) body += `Recipient / Wording Note: ${item.recipientName}\n`
      if (item.personalMemory) body += `Personal Memory / Feeling to Convey: "${item.personalMemory}"\n`
      if (item.giftNote) body += `Handwritten Card Note: "${item.giftNote}"\n`
      if (item.includedItems && item.includedItems.length > 0) {
        body += `Items Inside / Options:\n`
        item.includedItems.forEach(i => { body += `  - ${i}\n` })
      }
      body += `\n`
    })

    body += `----------------------------------------\n`
    if (allCustomQuoteItems) {
      body += `Order Total: Custom Quote Requested (based on item mix & quantity)\n`
    } else if (hasCustomQuoteItems) {
      body += `Priced Items Total: ${formatPrice(fixedSubtotal)} (+ Custom Quote items above)\n`
    } else {
      body += `Total Order Value: ${formatPrice(fixedSubtotal)}\n`
    }
    body += `Selected Delivery Zone: ${activeZoneObj?.label || 'Lagos'}\n`
    if (deliveryAddress.trim()) body += `Delivery Address: ${deliveryAddress.trim()}\n`
    if (senderPhone.trim()) body += `Contact / WhatsApp Phone: ${senderPhone.trim()}\n\n`
    body += `How I Want My Gift(s) Made (Colors, Design & Personalization):\n`
    body += `I will share the exact colors, flowers/sparkles/clear look, item quantities, and wording I want directly with your representative right here on WhatsApp.\n\n`
    body += `Please confirm pricing/quote, timing, total cost with delivery, and payment details.\n`
    return body
  }

  const handleOpenWhatsApp = () => {
    const text = generateOrderSummaryText()
    window.open(getWhatsAppOrderUrl(text), '_blank')
  }

  const handleOpenEmailClient = async () => {
    setIsSubmitting(true)
    const totalSubject = allCustomQuoteItems
      ? 'Request Quote'
      : hasCustomQuoteItems
      ? `${formatPrice(fixedSubtotal)} + Custom Quote`
      : formatPrice(fixedSubtotal)
    const subject = `ONE O Gifting Order — ${items.length} Suite${items.length > 1 ? 's' : ''} (${totalSubject})`
    const bodyText = generateOrderSummaryText()

    if (isSupabaseConfigured) {
      try {
        await supabase.from('order_enquiries').insert([
          {
            items_summary: items.map(i => `${i.title} (${i.isCustomQuote ? 'Quote' : i.price})`).join(', '),
            total_amount: fixedSubtotal,
            currency: currency,
            delivery_zone: selectedZone,
            sender_phone: senderPhone,
            created_at: new Date().toISOString()
          }
        ])
      } catch (err) {
        console.warn('Supabase log skipped:', err)
      }
    }

    setIsSubmitting(false)
    setInquirySentStatus(`Order draft ready. Sending to ${STUDIO_INFO.email}...`)
    window.location.href = getEmailOrderUrl(subject, bodyText)
  }

  const handleCopyToClipboard = () => {
    const text = generateOrderSummaryText()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#161514]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col border-l border-[#E8E6E1]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#DDD8CE] flex items-center justify-between bg-[#F5F4F0]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#1B3326] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#C2A264]" />
                <span>Your Gift Bag · Nationwide Delivery</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#191817] tracking-tight mt-0.5">
                Your Personalized Gifts
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4A4640] hover:text-[#191817] transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#F5F4F0] flex items-center justify-center text-[#1B3326]">
                  <Sparkles className="w-6 h-6 text-[#C2A264]" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#191817]">
                  Your gift bag is currently empty
                </h4>
                <p className="text-sm text-[#38342F] max-w-xs mx-auto leading-relaxed">
                  Browse our personalized photo frames, initial keychains, ring dishes, or build a custom gift box for someone special.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors"
                >
                  <span>Browse the Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#FAFAF8] border border-[#DDD8CE] space-y-3 relative group"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-[#F5F4F0] overflow-hidden flex-shrink-0 border border-[#DDD8CE]">
                          <ProductImage
                            src={item.imageUrl || '/src/assets/images/hero_resin_art_gifting_1793922100724.jpg'}
                            alt={item.title}
                            aspectRatio="auto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-serif text-base font-semibold text-[#191817] truncate">
                              {item.title}
                            </h5>
                            <span className="text-sm font-semibold text-[#1B3326] flex-shrink-0">
                              {item.isCustomQuote || item.price === 0 ? 'Request Quote' : formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-xs text-[#4A4640] mt-1">
                            Ribbon: <span className="font-medium text-[#191817]">{item.ribbon}</span>
                          </p>
                          {item.boxType && (
                            <p className="text-xs text-[#4A4640]">
                              Packaging: <span className="font-medium text-[#191817]">{item.boxType}</span>
                            </p>
                          )}
                          {item.recipientName && (
                            <p className="text-xs text-[#4A4640]">
                              For: <span className="font-medium text-[#191817]">{item.recipientName}</span>
                            </p>
                          )}
                          {item.personalMemory && (
                            <p className="text-xs text-[#38342F] mt-1 bg-white border border-[#EAE6DE] px-2 py-1">
                              <span className="font-semibold text-[#1B3326]">Memory / Feeling: </span>
                              "{item.personalMemory}"
                            </p>
                          )}
                        </div>
                      </div>

                      {item.giftNote ? (
                        <div className="p-3 bg-white border border-[#DDD8CE] text-sm text-[#38342F] leading-relaxed flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-[#4A4640] block font-sans font-semibold mb-0.5">Card Note:</span>
                            "{item.giftNote}"
                          </div>
                          {onUpdateItemGiftNote && (
                            <button
                              onClick={() => setEditingNoteItemId(editingNoteItemId === item.id ? null : item.id)}
                              className="text-xs text-[#1B3326] font-semibold hover:underline flex items-center gap-0.5 shrink-0 pt-0.5"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{editingNoteItemId === item.id ? 'Close' : 'Change'}</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        onUpdateItemGiftNote && (
                          <div className="pt-0.5">
                            <button
                              onClick={() => setEditingNoteItemId(editingNoteItemId === item.id ? null : item.id)}
                              className="text-xs text-[#1B3326] font-semibold flex items-center gap-1 hover:underline"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                              <span>+ Add Sweet Card Message</span>
                            </button>
                          </div>
                        )
                      )}

                      {/* Inline Message Picker if editing */}
                      {editingNoteItemId === item.id && onUpdateItemGiftNote && (
                        <div className="p-3 bg-white border border-[#C2A264]/40 shadow-sm space-y-2 mt-2">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#191817]">
                            <span className="flex items-center gap-1 text-[#1B3326]">
                              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                              <span>Pick or Type Your Card Message</span>
                            </span>
                            <button
                              onClick={() => setEditingNoteItemId(null)}
                              className="text-xs text-[#4A4640] hover:text-[#191817] font-semibold"
                            >
                              Done
                            </button>
                          </div>
                          <CuteMessagePicker
                            onSelectMessage={(msg) => {
                              onUpdateItemGiftNote(item.id, msg)
                              setEditingNoteItemId(null)
                            }}
                            currentMessage={item.giftNote}
                          />
                        </div>
                      )}

                      {item.includedItems && item.includedItems.length > 0 && (
                        <div className="text-xs text-[#4A4640]">
                          <span className="font-semibold text-[#191817]">Includes: </span>
                          {item.includedItems.slice(0, 3).join(', ')}
                          {item.includedItems.length > 3 && ` +${item.includedItems.length - 3} more`}
                        </div>
                      )}

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-[#8A4A3E] hover:text-[#5E2B21] flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Zone Selection */}
                <div className="pt-4 border-t border-[#DDD8CE] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#191817] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#1B3326]" />
                    <span>Where Should We Deliver?</span>
                  </div>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                  >
                    {NIGERIAN_DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#4A4640]">
                    {activeZoneObj?.note}
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-[#38342F] uppercase tracking-wider mb-1">
                      Street Address &amp; Nearest Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. 15 Admiralty Way, Lekki Phase 1, Lagos"
                      className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#38342F] uppercase tracking-wider mb-1">
                      Your Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="e.g. 09064248263 or 08031234567"
                      className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#F5F4F0] border-t border-[#DDD8CE] space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-serif text-lg font-semibold text-[#191817]">
                    {allCustomQuoteItems ? 'Estimated Price' : 'Total Price'}
                  </span>
                  <p className="text-xs text-[#4A4640]">
                    {hasCustomQuoteItems
                      ? 'Quote confirmed based on chosen items & quantity'
                      : 'Gift box & ribbon included'}
                  </p>
                </div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#1B3326] text-right">
                  {allCustomQuoteItems
                    ? 'Request Quote'
                    : hasCustomQuoteItems
                    ? `${formatPrice(fixedSubtotal)} + Quote`
                    : formatPrice(fixedSubtotal)}
                </span>
              </div>

              <div className="p-3 bg-white border border-[#DDD8CE] text-xs text-[#38342F] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#191817]">Next Step on WhatsApp:</strong> Tell our representative your exact colors, design style, and wording when you send this order.
                </span>
              </div>

              {inquirySentStatus && (
                <div className="p-2.5 bg-[#EBF2ED] border border-[#BDD4C1] text-xs text-[#1B3326] font-medium text-center">
                  {inquirySentStatus}
                </div>
              )}

              <div className="space-y-2">
                {/* Instant WhatsApp Order Button */}
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1B3326] text-white text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#122319] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#C2A264]" />
                  <span>Order on WhatsApp (09064248263) &rarr;</span>
                </button>

                {/* Preview Order Message Toggle */}
                <div className="border border-[#DDD8CE] bg-white">
                  <button
                    type="button"
                    onClick={() => setShowQueuedPreview((prev) => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#191817] hover:bg-[#FAFAF8] transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1B3326]" />
                      <span>Check Your Order Message</span>
                    </span>
                    {showQueuedPreview ? (
                      <ChevronUp className="w-4 h-4 text-[#4A4640]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4A4640]" />
                    )}
                  </button>
                  {showQueuedPreview && (
                    <pre className="p-3 border-t border-[#EAE6DE] bg-[#FAF9F5] text-xs text-[#38342F] whitespace-pre-wrap font-sans max-h-40 overflow-y-auto leading-relaxed">
                      {generateOrderSummaryText()}
                    </pre>
                  )}
                </div>

                {/* Email alternative */}
                <button
                  onClick={handleOpenEmailClient}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-[#1B3326] bg-transparent text-[#1B3326] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Order by Email</span>
                </button>

                <button
                  onClick={handleCopyToClipboard}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-[#D5D2CB] bg-white text-[#38342F] text-xs uppercase tracking-wider font-medium hover:bg-[#FAFAF8] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800 font-semibold">Order Details Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#4A4640]" />
                      <span>Copy Order Details</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Studio Contact Bar */}
              <div className="pt-2 border-t border-[#DDD8CE] text-xs text-[#38342F] space-y-1 text-center">
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#1B3326] font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#1B3326]" />
                    <span>WhatsApp / Call: {STUDIO_INFO.phoneDisplay}</span>
                  </a>
                </div>
                <div className="text-xs text-[#4A4640]">
                  <span>Email: {STUDIO_INFO.email}</span> · <span>TikTok: {STUDIO_INFO.tiktokHandle}</span>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onClearCart}
                  className="text-xs font-medium text-[#4A4640] hover:text-[#191817] underline underline-offset-2"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
