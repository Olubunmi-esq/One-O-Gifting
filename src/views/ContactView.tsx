import React, { useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin, Clock, Check, Copy, HelpCircle, ChevronDown, ChevronUp, Gift } from 'lucide-react'
import { PRICE_RANGES } from '../data/products'
import { STUDIO_INFO, getWhatsAppOrderUrl, getEmailOrderUrl } from '../data/studioInfo'

export const ContactView: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('Birthday Celebration')
  const [budgetTier, setBudgetTier] = useState('₦10,000 – ₦25,000 (Ring Dishes & Coaster Sets)')
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const generateEmailBody = () => {
    let body = `Hello ONE O Team,\n\n`
    body += `I would like to inquire about a personalized resin gift with the following details:\n\n`
    body += `Name: ${name || '[My Name]'}\n`
    body += `Phone / WhatsApp: ${phone || '[My Phone Number]'}\n`
    body += `Occasion: ${occasion}\n`
    body += `Budget Tier: ${budgetTier}\n\n`
    body += `Personalization Details & Message:\n${message || '[Details about names, songs, photos, or event souvenirs]'}\n\n`
    body += `Thank you,\n${name || '[My Name]'}\n`
    return body
  }

  const handleLaunchWhatsApp = () => {
    const text = generateEmailBody()
    window.open(getWhatsAppOrderUrl(text), '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `ONE O Personalized Gifting Inquiry — ${occasion} (${name || 'Client'})`
    const body = generateEmailBody()
    setFeedback(`Draft opened! You can also chat with us directly on WhatsApp at ${STUDIO_INFO.phoneDisplay}.`)
    window.location.href = getEmailOrderUrl(subject, body)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmailBody()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const faqs = [
    {
      q: 'How long does personalization and studio production take?',
      a: 'Individual personalized gifts (photo plaques, letter keychains, ring dishes, bookmarks) are prepared and cured within 3 to 5 business days. Bulk wedding/Owambe souvenir packs (25 to 100+ pieces) take 5 to 8 business days.'
    },
    {
      q: 'How do I submit my photo and song for a photo and song plaque?',
      a: 'When ordering or chatting with our team on WhatsApp, simply send your clear photo, the song title and artist, and tell us any colors or style you would like. We make sure everything looks clean and clear before sealing it inside shiny resin.'
    },
    {
      q: 'Can you preserve my real wedding or bridal shower flowers?',
      a: 'Yes! We save real wedding flowers, bouquets, and special blooms. You can send your flowers from anywhere in Nigeria by courier—we carefully dry them first before sealing them inside a clear resin memory block in the style you choose.'
    },
    {
      q: 'How does nationwide delivery work across all 36 Nigerian states?',
      a: 'We ship safely to every Nigerian state using tracked express delivery services. Every gift is wrapped in thick protective bubble wrap, placed in a neat gift box, and sealed safely for transit.'
    },
    {
      q: 'How do I take care of my resin gifts?',
      a: 'Keep resin pieces out of hot afternoon sun and away from hot pots. Wipe gently with a soft cloth and mild soapy water when needed. Do not put resin items in a dishwasher or microwave.'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="inline-block text-xs uppercase tracking-[0.18em] text-[#1B3326] font-semibold bg-white px-3.5 py-1.5 border border-[#DDD8CE]">
          Customer Care &amp; Help
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] tracking-tight">
          Message Our Gift Team
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          Have a question about adding a name, matching your party colors, or sending an urgent birthday gift across Nigeria? We are always happy to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 border border-[#DDD8CE] shadow-sm space-y-5">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
              Send Us a Gift Question or Order Note
            </h3>
            <p className="text-sm text-[#4A4640] mt-1 leading-relaxed">
              Fill in what you want below and send it straight to our WhatsApp or email.
            </p>
          </div>

          {feedback && (
            <div className="p-3 bg-[#EBF2ED] border border-[#BDD4C1] text-sm text-[#1B3326] font-medium text-center">
              {feedback}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bukola Adeyemi"
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 803 123 4567"
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                  What Is the Occasion?
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                >
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Love & Anniversary">Love, Valentine &amp; Anniversary</option>
                  <option value="Wedding / Owambe Souvenirs">Wedding / Party Souvenirs</option>
                  <option value="Appreciation & Thank You">Thank You &amp; Gratitude Gift</option>
                  <option value="Bridal Bouquet Preservation">Wedding Flower Saving</option>
                  <option value="Custom Gift Box">Custom Gift Box</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                  Your Budget Range
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
                >
                  <option value="Under ₦10,000 (Keychains & Bookmarks)">Under ₦10,000 (Keychains &amp; Bookmarks)</option>
                  <option value="₦10,000 – ₦25,000 (Ring Dishes & Coasters)">₦10,000 – ₦25,000 (Ring Dishes &amp; Coasters)</option>
                  <option value="₦25,000 – ₦50,000 (Photo Plaques & Floral Blocks)">₦25,000 – ₦50,000 (Photo Plaques &amp; Blocks)</option>
                  <option value="₦50,000 – ₦100,000 (Gift Hampers & 25-Pack Favors)">₦50,000 – ₦100,000 (Gift Sets &amp; 25-Pack Favors)</option>
                  <option value="₦100,000+ (Bulk 50–100+ Souvenir Packs)">₦100,000+ (Bulk 50–100+ Souvenir Packs)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#191817]">
                Name to Write, Colors &amp; Extra Details *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us their name or initial, song title for music plaque, favorite colors, or when you need it delivered..."
                className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleLaunchWhatsApp}
                className="flex-1 py-3.5 px-5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#C2A264]" />
                <span>Chat with Us on WhatsApp</span>
              </button>

              <button
                type="submit"
                className="py-3.5 px-5 border border-[#1B3326] bg-transparent text-[#1B3326] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAFAF8] transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3.5 px-4 border border-[#D0CCC4] bg-[#FAFAF8] text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
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
          </form>
        </div>

        {/* Right Column: Direct Info & FAQ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F5F4F0] p-5 sm:p-6 border border-[#DDD8CE] space-y-4">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#191817]">
              Shop Details &amp; Delivery
            </h4>
            <ul className="space-y-3.5 text-sm text-[#38342F]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block text-[#191817]">Nationwide Delivery</span>
                  <span className="text-[#38342F]">Safe tracked delivery to Lagos, Abuja, Port Harcourt &amp; all 36 states</span>
                  <span className="text-xs text-[#4A4640] block mt-0.5">Carefully wrapped in thick bubble wrap inside strong gift boxes</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <span className="font-semibold block text-[#191817]">Phone &amp; WhatsApp</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1B3326] font-bold hover:underline"
                    >
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                    <span className="text-[#4A4640]">/</span>
                    <a
                      href={STUDIO_INFO.phoneTel}
                      className="text-[#38342F] hover:underline font-medium"
                    >
                      Call Directly
                    </a>
                  </div>
                  <span className="text-xs text-[#4A4640] block">Online on WhatsApp for fast replies &amp; orders</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block text-[#191817]">Email Address</span>
                  <a href={`mailto:${STUDIO_INFO.email}`} className="text-[#1B3326] font-medium hover:underline block break-all">
                    {STUDIO_INFO.email}
                  </a>
                  <span className="text-xs text-[#4A4640]">For receipts, custom orders &amp; company requests</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-1 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.34 6.34 0 0 0-.85-.06A6.33 6.33 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.94-4.5V8.82a8.28 8.28 0 0 0 4.84 1.56V6.93a4.85 4.85 0 0 1-1.16-.24z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-[#191817]">Official TikTok</span>
                  <a
                    href={STUDIO_INFO.tiktokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1B3326] font-medium hover:underline block"
                  >
                    {STUDIO_INFO.tiktokHandle}
                  </a>
                  <span className="text-xs text-[#4A4640]">Watch real pouring videos &amp; customer unboxings</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1B3326] flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block text-[#191817]">Working Hours</span>
                  <span className="text-[#38342F]">Monday – Saturday: 9:00am – 6:00pm</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Resin FAQ Accordion */}
          <div className="bg-white p-5 sm:p-6 border border-[#DDD8CE] space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#1B3326]" />
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#191817]">
                Common Questions
              </h4>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[#F0ECE4] pb-2.5">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left py-1.5 flex items-center justify-between gap-2 text-sm font-semibold text-[#191817] hover:text-[#1B3326] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#1B3326] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4A4640] flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <p className="text-sm text-[#38342F] pb-1.5 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
