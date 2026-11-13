import React, { useState } from 'react'
import { ShieldAlert, FileText, Lock, ArrowLeft } from 'lucide-react'

interface LegalViewProps {
  initialTab?: 'privacy' | 'terms'
  setCurrentView: (view: string) => void
}

export const LegalView: React.FC<LegalViewProps> = ({
  initialTab = 'privacy',
  setCurrentView
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#38342F] hover:text-[#1B3326] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </button>
      </div>

      {/* Mandatory Owner/Legal Review Disclaimer Banner */}
      <div className="p-4 sm:p-5 bg-[#F5F4F0] border border-[#DDD8CE] flex items-start gap-3.5 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-[#C2A264] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#191817]">
            [DRAFT TEMPLATE — Subject to Owner &amp; Legal Review]
          </h4>
          <p className="text-sm text-[#38342F] leading-relaxed">
            The legal text below is a draft prepared for ONE O. Before accepting live online payments, this text should be reviewed by the business owner to reflect final courier and return rules.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-[#DDD8CE]">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-3 px-6 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'privacy'
              ? 'border-[#1B3326] text-[#1B3326]'
              : 'border-transparent text-[#4A4640] hover:text-[#191817]'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`py-3 px-6 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'border-[#1B3326] text-[#1B3326]'
              : 'border-transparent text-[#4A4640] hover:text-[#191817]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* Privacy Policy Content */}
      {activeTab === 'privacy' ? (
        <article className="prose prose-stone max-w-none text-sm text-[#38342F] space-y-6 leading-relaxed bg-white p-8 border border-[#DDD8CE] shadow-sm">
          <div className="border-b border-[#EAE6DE] pb-4">
            <h1 className="font-serif text-3xl font-bold text-[#191817] m-0">
              ONE O — Privacy Policy (Draft)
            </h1>
            <p className="text-xs text-[#4A4640] mt-1">
              Last updated: November 2026 · Prepared for ONE O Gifting
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">1. Information We Collect</h3>
            <p>
              ONE O ("we", "us", or "our") respects your privacy. When you browse our shop, build a custom gift box, or send us a question, we may collect details you share, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name, email address, and phone or WhatsApp number.</li>
              <li>Recipient names, delivery addresses, and personal messages to write on gift cards.</li>
              <li>Event or company names and the number of souvenirs needed.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">2. How We Use Your Information</h3>
            <p>
              We use your information only to make and deliver your gifts properly:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Making your personalized gift pieces and packing them with care for delivery.</li>
              <li>Handwriting your personal message neatly onto clean greeting cards.</li>
              <li>Answering your WhatsApp or email questions about gift options, dates, and bulk pricing.</li>
              <li>Keeping simple business records as required.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">3. Sharing Information</h3>
            <p>
              We never sell or rent your details to anyone. Details are only shared with delivery riders or trusted email and order partners needed to complete your gift.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">4. Keeping Surprises &amp; Cards Private</h3>
            <p>
              Because many orders are surprise gifts with heartfelt personal notes, we keep all recipient addresses and messages strictly private. You may ask us to update or delete your details anytime via oneopersonalisedgift@gmail.com or WhatsApp at 09064248263.
            </p>
          </section>
        </article>
      ) : (
        <article className="prose prose-stone max-w-none text-sm text-[#38342F] space-y-6 leading-relaxed bg-white p-8 border border-[#DDD8CE] shadow-sm">
          <div className="border-b border-[#EAE6DE] pb-4">
            <h1 className="font-serif text-3xl font-bold text-[#191817] m-0">
              ONE O — Terms &amp; Conditions (Draft)
            </h1>
            <p className="text-xs text-[#4A4640] mt-1">
              Last updated: November 2026 · Prepared for ONE O Gifting
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">1. Using Our Shop</h3>
            <p>
              By browsing the ONE O shop or placing an order for ready-made hampers or custom gift boxes, you agree to these simple terms.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">2. Handmade Resin Variations</h3>
            <p>
              Every ONE O gift is poured, shaped, and finished by hand based on the colors, style, and details you choose. Because everything is handmade, gentle natural swirls and placement mean each piece is truly one of a kind.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">3. Orders &amp; Payment</h3>
            <p>
              Storefront prices are shown in Nigerian Naira (₦) or USD ($) when switched. Orders sent through WhatsApp or email are confirmed once payment or deposit is received before dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">4. Caring for Your Resin Gift &amp; Returns</h3>
            <p>
              Our trays and coasters are finished with safe clear topcoats. Wipe or wash gently by hand with mild soap and lukewarm water. Do NOT place resin pieces in dishwashers, microwaves, ovens, or hot sunlight above 50°C. Because gifts with names, photos, and saved flowers are made specially for one person, custom orders cannot be returned once cast. If anything arrives broken in transit, send us a clear photo within 48 hours and we will replace it right away.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#191817]">5. Accurate Delivery Addresses</h3>
            <p>
              Please double-check your recipient’s full address and active phone number so our riders can reach them without delay.
            </p>
          </section>
        </article>
      )}
    </div>
  )
}
