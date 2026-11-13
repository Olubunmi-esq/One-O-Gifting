import React, { useState } from 'react'
import { Briefcase, Check, Mail, Copy, ArrowRight, Building2, Calendar, Users, MessageCircle, Heart, Gift } from 'lucide-react'
import { CORPORATE_TIERS } from '../data/corporatePackages'
import { ProductImage } from '../components/ProductImage'
import { useCurrency } from '../context/CurrencyContext'
import { STUDIO_INFO, getWhatsAppOrderUrl, getEmailOrderUrl } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface CorporateViewProps {
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

export const CorporateView: React.FC<CorporateViewProps> = ({ onRequestQuote }) => {
  const { currency } = useCurrency()
  const [selectedTier, setSelectedTier] = useState<string>('owambe-souvenirs')
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [recipientCount, setRecipientCount] = useState('50')
  const [targetDate, setTargetDate] = useState('')
  const [customNotes, setCustomNotes] = useState('')
  const [copied, setCopied] = useState(false)
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null)

  const generateCorporateEmailBody = () => {
    let body = `Hello ONE O Event & Bulk Orders Team,\n\n`
    body += `I would like to inquire about bulk personalized resin favors / gifts with the following details:\n\n`
    body += `Event / Organisation Name: ${companyName || '[Event / Couple / Company Name]'}\n`
    body += `Contact Person: ${contactName || '[Your Name]'}\n`
    body += `Contact Email: ${contactEmail || '[Your Email]'}\n`
    body += `Contact Phone / WhatsApp: ${contactPhone || '[Your Phone]'}\n`
    body += `Selected Package Tier: ${CORPORATE_TIERS.find(t => t.id === selectedTier)?.name || selectedTier}\n`
    body += `Estimated Guest / Recipient Count: ${recipientCount} units\n`
    body += `Target Event Date / Delivery City: ${targetDate || 'Lagos / Abuja / Port Harcourt / Nationwide'}\n\n`
    body += `Color Theme & Custom Notes:\n${customNotes || '[Tell us your party colors, names, and how you want your souvenirs styled]'}\n\n`
    body += `Thank you,\n${contactName || '[Your Name]'}\n`
    return body
  }

  const handleOpenWhatsApp = () => {
    const text = generateCorporateEmailBody()
    window.open(getWhatsAppOrderUrl(text), '_blank')
  }

  const handleSendInquiry = () => {
    const subject = `ONE O Bulk Gifting Inquiry — ${companyName || 'Celebration'} (${recipientCount} Units)`
    const body = generateCorporateEmailBody()
    setSubmittedStatus(`Email client opened! You can also chat directly on WhatsApp: ${STUDIO_INFO.phoneDisplay}`)
    window.location.href = getEmailOrderUrl(subject, body)
  }

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(generateCorporateEmailBody()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#1B3326] font-semibold bg-white px-3.5 py-1.5 border border-[#DDD8CE]">
          <Gift className="w-3.5 h-3.5 text-[#C2A264]" />
          <span>Wedding Souvenirs, Party Favors &amp; Office Gifts</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#191817] tracking-tight">
          Bulk Personalized Resin Gifting
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          Whether you are planning a traditional wedding, 50th birthday party, bridal shower, or end-of-year staff appreciation, our handmade resin souvenirs give your guests a useful, beautiful gift they will truly cherish and keep.
        </p>
      </div>

      {/* Package Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CORPORATE_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id
          const priceDisplay = currency === 'USD' ? tier.priceRangeUSD : tier.priceRangeNaira
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-6 sm:p-7 transition-all flex flex-col justify-between cursor-pointer border ${
                isSelected
                  ? 'border-[#1B3326] bg-white shadow-lg ring-2 ring-[#1B3326]/20'
                  : 'border-[#DDD8CE] bg-[#FAFAF8] hover:border-[#B5B0A6]'
              }`}
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden border border-[#DDD8CE] bg-[#F5F4F0]">
                  <ProductImage
                    src={tier.imageUrl}
                    alt={tier.name}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
                    {tier.turnaround}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817] mt-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-[#4A4640] mt-1">
                    {tier.tagline}
                  </p>
                </div>

                {tier.id === 'owambe-souvenirs' || tier.id === 'vip-curated-boxes' || tier.id === 'conference-souvenir-pack' ? (
                  <div className="py-3 px-4 bg-[#F5F4F0] border border-[#DDD8CE] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#38342F] font-semibold block">Custom Pricing</span>
                      <p className="text-xs text-[#4A4640] mt-0.5">
                        Minimum order: {tier.minOrder} pieces
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRequestQuote?.({
                          id: tier.id,
                          title: tier.name,
                          subtitle: tier.tagline,
                          imageUrl: tier.imageUrl,
                          minOrderQty: tier.minOrder,
                          itemsIncluded: tier.features
                        })
                      }}
                      className="px-3.5 py-2 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                    >
                      Request a Quote
                    </button>
                  </div>
                ) : (
                  <div className="py-3 px-4 bg-[#F5F4F0] border border-[#DDD8CE]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#38342F] font-semibold">Price Range</span>
                      <span className="font-serif text-base sm:text-lg font-bold text-[#1B3326]">{priceDisplay}</span>
                    </div>
                    <p className="text-xs text-[#4A4640] mt-1">
                      Minimum order: {tier.minOrder} pieces
                    </p>
                  </div>
                )}

                <p className="text-sm text-[#38342F] leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2 border-t border-[#EAE6DE] pt-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                    What You Get Inside:
                  </h4>
                  <ul className="space-y-1.5 text-sm text-[#38342F]">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE6DE]">
                {tier.id === 'owambe-souvenirs' || tier.id === 'vip-curated-boxes' || tier.id === 'conference-souvenir-pack' ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTier(tier.id)
                      onRequestQuote?.({
                        id: tier.id,
                        title: tier.name,
                        subtitle: tier.tagline,
                        imageUrl: tier.imageUrl,
                        minOrderQty: tier.minOrder,
                        itemsIncluded: tier.features
                      })
                    }}
                    className="w-full py-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                  >
                    Request a Quote
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1B3326] text-white shadow-sm'
                        : 'border border-[#D0CCC4] bg-white text-[#191817] hover:bg-[#F5F4F0]'
                    }`}
                  >
                    {isSelected ? 'Selected in Form Below' : 'Pick This Option'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Capabilities */}
      <div className="bg-[#F5F4F0] p-6 sm:p-10 border border-[#DDD8CE] space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
            Easy &amp; Stress-Free Ordering
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
            How We Prepare Your Party or Office Souvenirs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white border border-[#DDD8CE] space-y-2">
            <h4 className="font-serif text-base font-bold text-[#191817]">
              1. Matching Your Event Colors
            </h4>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Tell us your party color theme or send a photo on WhatsApp. You decide the exact colors, flowers, sparkles, and style for your day.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#DDD8CE] space-y-2">
            <h4 className="font-serif text-base font-bold text-[#191817]">
              2. Ready-to-Share Pouches &amp; Tags
            </h4>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Every single item comes tucked inside a lovely gift pouch with a thank-you tag carrying your names and event date. Ready to hand straight to guests.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#DDD8CE] space-y-2">
            <h4 className="font-serif text-base font-bold text-[#191817]">
              3. Safe Delivery Across All 36 States
            </h4>
            <p className="text-sm text-[#38342F] leading-relaxed">
              We pack everything securely in strong cartons and deliver safely to Lagos, Abuja, Port Harcourt, Ibadan, Enugu, and anywhere else in Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white p-6 sm:p-10 border border-[#DDD8CE] shadow-md max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold">
            Event &amp; Bulk Orders
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#191817]">
            Ask for a Price Quote or Place a Bulk Order
          </h2>
          <p className="text-sm text-[#38342F] max-w-lg mx-auto leading-relaxed">
            Share your event details below to message us directly on WhatsApp or email.
          </p>
        </div>

        {submittedStatus && (
          <div className="p-3 bg-[#EBF2ED] border border-[#BDD4C1] text-sm text-[#1B3326] font-medium text-center">
            {submittedStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
              Celebration / Couple / Organization Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Tunde & Ifeoma's Wedding / Alhaja's 60th"
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
              Your Full Name
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Mrs. Adeyemi / Event Planner"
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#1B3326]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#1B3326]" />
              <span>How Many Pieces Do You Need?</span>
            </label>
            <select
              value={recipientCount}
              onChange={(e) => setRecipientCount(e.target.value)}
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            >
              <option value="25">25 Pieces (Minimum Order Quantity)</option>
              <option value="35-45">30 – 45 Pieces (Custom Intimate Guest Count)</option>
              <option value="50">50 Pieces (Classic Party Pack)</option>
              <option value="75">75 Pieces (Mid-Size Reception)</option>
              <option value="100">100 Pieces (Large Wedding Reception)</option>
              <option value="150+">150 – 200+ Pieces (Big Event / Custom Quote)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1B3326]" />
              <span>Event Date &amp; Delivery City</span>
            </label>
            <input
              type="text"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              placeholder="e.g. December 20th / Port Harcourt"
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="e.g. +234 803 123 4567"
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
              Event Colors, Names &amp; Extra Requests
            </label>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Tell us the colors you want, names or dates to write, and how you want the items styled..."
              className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleOpenWhatsApp}
            className="flex-1 py-3.5 px-5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#C2A264]" />
            <span>Chat on WhatsApp for Bulk Orders</span>
          </button>

          <button
            onClick={handleSendInquiry}
            className="py-3.5 px-5 border border-[#1B3326] bg-transparent text-[#1B3326] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAFAF8] transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </button>

          <button
            onClick={handleCopyInquiry}
            className="py-3.5 px-5 border border-[#D0CCC4] bg-[#FAFAF8] text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-800">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#4A4640]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
