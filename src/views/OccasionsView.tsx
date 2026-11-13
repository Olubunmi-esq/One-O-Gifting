import React, { useState } from 'react'
import {
  ArrowRight,
  Sparkles,
  Heart,
  Gift,
  Users,
  Briefcase,
  Award,
  FileDown,
  MessageCircle,
  CheckCircle2,
  Clock,
  Star,
  Tag,
  Building2,
  ChevronRight
} from 'lucide-react'
import { SAMPLE_PRODUCTS, Product } from '../data/products'
import { ProductImage } from '../components/ProductImage'
import { useCurrency } from '../context/CurrencyContext'
import { STUDIO_INFO } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface OccasionsViewProps {
  onSelectProduct: (product: Product) => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

type FestiveFilter = 'all' | 'hampers' | 'appreciation' | 'decor'

interface HolidayStoryMap {
  [productId: string]: {
    theme: string
    badge: 'Christmas Gift Hamper' | 'Thank-You Gift Set' | 'Holiday Home Decor'
    holidayStory: string
    festiveHighlights: string[]
  }
}

const HOLIDAY_STORIES: HolidayStoryMap = {
  'december-sparkle-starter-hamper': {
    theme: 'Warm Year-End & Holiday Gifts',
    badge: 'Christmas Gift Hamper',
    holidayStory:
      'Brings family, friends, and team members together with a thoughtful gift set made in whatever colors and design you choose directly with our representative on WhatsApp.',
    festiveHighlights: ['Personalised keychain', 'Holiday hanging ornament or fridge magnet', 'Customized bookmark', 'Gift box & custom card']
  },
  'december-appreciation-classic-hamper': {
    theme: 'Thank-You Gift for Clients & Partners',
    badge: 'Christmas Gift Hamper',
    holidayStory:
      'Say a warm thank-you to your clients and team leads for working with you this year. Every item inside is customized in your chosen colors, style, and wording on WhatsApp.',
    festiveHighlights: ['Set of 2 drink coasters', 'Jewelry dish stand / catch-all stand or ornament', 'Personalised keychain or customized pen', 'Gift box & custom card']
  },
  'december-executive-luxe-hamper': {
    theme: 'VIP Holiday Gift for Bosses & Directors',
    badge: 'Christmas Gift Hamper',
    holidayStory:
      'A thoughtful executive gift set for bosses, company directors, and honored leaders. Select your main centerpiece item, and decide exact colors, finishes, and wording with our WhatsApp team.',
    festiveHighlights: ['Main centerpiece (coasters, serving tray, or desk clock)', 'Personalised keychain', 'Festive hanging ornament', 'Customized pen & message card']
  },
  'festive-coasters-duo-gold': {
    theme: 'Dinner Table Drink Coasters (Pair)',
    badge: 'Thank-You Gift Set',
    holidayStory:
      'Two personalized drink coasters that protect tables from hot mugs and cold glasses—styled in whichever colors and finish you agree on with our WhatsApp representative.',
    festiveHighlights: ['Set of 2 drink coasters', 'Safe for hot mugs and cold drinks', 'Custom colors & wording via WhatsApp', 'Gift pouch included']
  },
  'festive-coasters-quartet-gold': {
    theme: 'Family Dinners & Hosting Coaster Set',
    badge: 'Thank-You Gift Set',
    holidayStory:
      'A matching set of 4 drink coasters ready for hosting family and guests. Colors, pattern, and lettering are left completely to your choice.',
    festiveHighlights: ['Set of 4 drink coasters', 'Protective table grip underneath', 'Custom design chosen on WhatsApp', 'Tied with gift ribbon']
  },
  'personalized-resin-journal-pen-set': {
    theme: 'A5 Hardcover Notebook & Matching Pen',
    badge: 'Thank-You Gift Set',
    holidayStory:
      'A personalized A5 hardcover notebook paired with a matching pen for goals, prayers, or daily notes—designed in any colors or look you choose.',
    festiveHighlights: ['A5 hardcover notebook', 'Matching writing pen', 'Refillable lined pages', 'Ready in a gift box']
  },
  'pastor-mentor-appreciation-plaque': {
    theme: 'Thank-You Plaque for Pastors & Mentors',
    badge: 'Thank-You Gift Set',
    holidayStory:
      'A standing table plaque with your pastor’s or mentor’s name and favorite verse or thank-you message, made in the colors you pick on WhatsApp.',
    festiveHighlights: ['Standing message plaque', 'Display stand included', 'Your choice of colors & wording', 'Free handwritten thank-you card']
  },
  'teacher-doctor-appreciation-journal-suite': {
    theme: 'Notebook, Bookmark & Pen Gift Set',
    badge: 'Thank-You Gift Set',
    holidayStory:
      'Say thank-you to a dedicated teacher, mentor, or doctor with a practical three-piece writing set made to your personal design.',
    festiveHighlights: ['A5 hardcover notebook', 'Customized bookmark', 'Matching writing pen', 'Gift box & ribbon wrap']
  },
  'festive-resin-christmas-tree-ornament': {
    theme: 'Hanging Holiday Ornament',
    badge: 'Holiday Home Decor',
    holidayStory:
      'A lightweight, shatter-resistant hanging ornament personalized with any name or family year, made in your choice of holiday colors.',
    festiveHighlights: ['Personalized hanging ornament', 'Includes hanging ribbon', 'Custom colors & name on WhatsApp', 'Comes in gift pouch']
  },
  'festive-resin-fridge-magnet': {
    theme: 'Decorative Fridge Magnet',
    badge: 'Holiday Home Decor',
    holidayStory:
      'A sweet personalized magnet for holding family photos and notes on the fridge—styled cleanly to whatever colors you choose.',
    festiveHighlights: ['Decorative fridge magnet', 'Strong hold magnet back', 'Custom name, colors & finish', 'Affordable thoughtful token']
  },
  'executive-desk-clock-suite': {
    theme: 'Standing Desk Clock',
    badge: 'Holiday Home Decor',
    holidayStory:
      'A quiet battery-powered standing desk clock personalized for their office or study table in your preferred colors and style.',
    festiveHighlights: ['Silent standing desk clock', 'Display stand included', 'Custom colors & lettering on WhatsApp', 'Presentation box']
  },
  'faceted-resin-wine-bottle-stopper': {
    theme: 'Wine & Bottle Stopper',
    badge: 'Holiday Home Decor',
    holidayStory:
      'A tight-sealing bottle stopper for keeping wine and party drinks fresh—finished in the colors and design you choose.',
    festiveHighlights: ['Reusable bottle stopper', 'Tight silicone seal', 'Custom top colors & style', 'Velvet gift pouch']
  }
}

export const OccasionsView: React.FC<OccasionsViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onRequestQuote
}) => {
  const { formatPrice } = useCurrency()
  const [festiveFilter, setFestiveFilter] = useState<FestiveFilter>('all')

  // Products belonging to the Festive December Category
  const festiveProductIds = [
    // Hampers
    'december-sparkle-starter-hamper',
    'december-appreciation-classic-hamper',
    'december-executive-luxe-hamper',
    // Appreciation Sets
    'festive-coasters-duo-gold',
    'festive-coasters-quartet-gold',
    'personalized-resin-journal-pen-set',
    'pastor-mentor-appreciation-plaque',
    'teacher-doctor-appreciation-journal-suite',
    // Seasonal Decor
    'festive-resin-christmas-tree-ornament',
    'festive-resin-fridge-magnet',
    'executive-desk-clock-suite',
    'faceted-resin-wine-bottle-stopper'
  ]

  const allFestiveProducts = festiveProductIds
    .map(id => SAMPLE_PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p))

  // Filtered festive products based on active sub-tab
  const displayedFestiveProducts = allFestiveProducts.filter(p => {
    const meta = HOLIDAY_STORIES[p.id]
    if (!meta) return true
    if (festiveFilter === 'hampers') return meta.badge === 'Christmas Gift Hamper'
    if (festiveFilter === 'appreciation') return meta.badge === 'Thank-You Gift Set'
    if (festiveFilter === 'decor') return meta.badge === 'Holiday Home Decor'
    return true
  })

  // Standard non-festive occasions
  const standardSections = [
    {
      id: 'pinterest-kitchen',
      title: 'Pinterest Kitchen & Dining Collections',
      subtitle: 'Serving Boards, Round Rotating Trays, Drink Coasters & Bottle Stoppers (₦5,500 – ₦32,500)',
      narrative: 'Custom kitchen serving boards, rotating table trays, tapas platters, drink coasters, and bottle stoppers. Tell us what colors and finish you want directly on WhatsApp.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Pinterest Kitchen & Dining Collections')),
      heroImage: '/src/assets/images/pinterest_kitchen_resin_1794047672822.jpg'
    },
    {
      id: 'corporate',
      title: 'Corporate Gift Collections & Office Recognition',
      subtitle: 'Desk Nameplates, Clocks & Pens (₦3,500 – ₦42,000) · Custom Onboarding & Event Packages (Request a Quote)',
      narrative: 'Make any office desk or business thank-you stand out with pride. Choose plain desk items—nameplate blocks, standing desk clocks, A5 notebooks, or writing pens—and customize every color and detail on WhatsApp.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Corporate & Office Collections')),
      heroImage: '/src/assets/images/nigerian_corporate_suite_1794042273984.jpg'
    },
    {
      id: 'wedding-anniversary',
      title: 'Wedding & Anniversary Sets',
      subtitle: 'LED Bedside Night Lights, Photo Plaques, Ring Dish Stands & Owambe Packs — Request a Quote',
      narrative: 'Celebrate your love story with personalized pieces built around your wedding date, couple names, and favorite song—plus customizable Owambe guest & bridal party souvenir packs starting at 25 pieces minimum.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Wedding & Anniversary Sets')),
      heroImage: '/src/assets/images/nigerian_couple_plaque_1794042243147.jpg'
    },
    {
      id: 'bridal-groomsmen',
      title: 'Bridesmaids & Groomsmen Wedding Favor Packages',
      subtitle: 'Customized Mirrors, Comb & Hair Accessories, Jewelry Sets, Cufflinks & Aso-Ebi Pins — Request a Quote',
      narrative: 'Thank your closest friends for standing by you. Bridal boxes include customized mirrors, hair accessories, and jewelry sets; groomsmen packs include cufflinks & tie clip sets and phone stands in any event colors you specify for your quote.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Bridal & Groomsmen Packages')),
      heroImage: '/src/assets/images/nigerian_bridal_gifts_1794042293044.jpg'
    },
    {
      id: 'birthdays',
      title: 'Birthday Sets & Milestone Celebrations',
      subtitle: 'Single Gifts & Boxes (₦3,000 – ₦50,500) · Custom Mini, Glow, Luxe, Crown & Kids Party Packages (Request a Quote)',
      narrative: 'Make someone feel deeply remembered on their birthday. Choose a birthday gift box or individual piece, then customize the exact colors, design style, and name with our representative on WhatsApp.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Birthday Celebrations')),
      heroImage: '/src/assets/images/birthday_queen_box_1794569207477.jpg'
    },
    {
      id: 'romance-love',
      title: 'Romance & Love Collections',
      subtitle: 'Matching Jewelry Sets, Couple Coasters, Bedside Night Lights & Photo Plaques (₦4,000 – ₦39,000)',
      narrative: 'Warm, personal gifts built around your story. Choose bedroom night lights, couple coasters, or photo plaques and pick how you want them finished on WhatsApp.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Romance & Love Sets')),
      heroImage: '/src/assets/images/nigerian_night_lamp_1794042246895.jpg'
    },
    {
      id: 'appreciation',
      title: 'Appreciation & Thank-You Sets',
      subtitle: 'For Pastors, Mentors, Doctors, Teachers, Mothers & Team Leads (₦3,000 – ₦42,000)',
      narrative: 'When a simple "thank you" does not feel big enough. Our personalized thank-you plaques, customized bookmarks, A5 notebooks, and pens carry sincere gratitude in the exact style you pick.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Appreciation Sets')),
      heroImage: '/src/assets/images/resin_journal_pen_1794041315474.jpg'
    },
    {
      id: 'retirement',
      title: 'Retirement & Years-of-Service Gifts',
      subtitle: 'Customizable Farewell Dinner Gift Box (Request Quote) · Parlor Clocks, Honor Frames & Accessories (₦12,500 – ₦42,000)',
      narrative: 'Honor decades of hard work with meaningful post-retirement pieces made for home life—parlor clocks, service tribute frames, home valet trays, memoir notebooks, and hosting coasters tailored specifically to the retiree.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Retirement Sets')),
      heroImage: '/src/assets/images/resin_clock_nameplate_1794041297795.jpg'
    },
    {
      id: 'baby-family',
      title: 'Baby Showers, Naming Ceremonies & Family Keepsakes',
      subtitle: 'Single Keepsakes (₦4,500 – ₦21,500) · Custom Baby Arrival, Naming Favours & Family Packages (Request a Quote)',
      narrative: 'Preserve delicate newborn scans, first hair curls, baby names, and family portraits in crystal-clear UV resin, alongside weather-sealed family entrance signs and warm home wall art.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Baby, Naming & Family')),
      heroImage: '/src/assets/images/resin_birthday_nameplate_1794569209140.jpg'
    },
    {
      id: 'graduations-religious',
      title: 'Graduations, Religious Celebrations & Remembrance Keepsakes',
      subtitle: 'Single Keepsakes (₦3,500 – ₦21,500) · Custom Eid, Ministry & Graduation Packages (Request a Quote)',
      narrative: 'Celebrate university graduations and NYSC milestones, honor pastors and cultural holidays with reverence, or bring gentle solace with commemorative portrait blocks and brass-shielded candle holders.',
      products: SAMPLE_PRODUCTS.filter(p => p.collections.includes('Graduations & Religious Celebrations')),
      heroImage: '/src/assets/images/recognition_plaque_clean_1794569240984.jpg'
    }
  ]

  const getWhatsAppFestiveInquiry = (productTitle?: string) => {
    const greeting = 'Hello ONE O Personalised Gifts!'
    const text = productTitle
      ? `${greeting}\n\nI am inquiring about the Festive December piece: *${productTitle}* from your Occasions catalog.\nPlease share personalization options, packaging, and delivery timelines to my location.`
      : `${greeting}\n\nI would like to inquire about your official Festive December Resin Hampers and Corporate Packages.\nPlease provide quote and volume timeline details.`
    const cleanNumber = STUDIO_INFO.whatsappContact.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
  }

  const scrollToOccasion = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-[#E8E6E1] text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
          <span>Gifts Organized by Occasion</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] tracking-tight">
          Gifts Made Around Your Special Moments
        </h1>

        <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
          From weddings, milestone birthdays, and office promotions to home serving boards, retirement honors, and our seasonal December gift hampers—every piece is handmade with love.
        </p>

        {/* Quick Nav Anchors */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => scrollToOccasion('wedding-anniversary')}
            className="px-3.5 py-2 bg-[#1B3326] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122319] transition-all shadow-sm"
          >
            Weddings &amp; Love
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('birthdays')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Milestone Birthdays
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('corporate')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Corporate &amp; Office
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('pinterest-kitchen')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Kitchen &amp; Dining
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('appreciation')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Thank-You &amp; Retirement
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('baby-family')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Baby &amp; Family
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('graduations-religious')}
            className="px-3.5 py-2 bg-white border border-[#DDD8CE] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold"
          >
            Graduations &amp; Faith
          </button>

          <button
            type="button"
            onClick={() => scrollToOccasion('festive-december')}
            className="px-3.5 py-2 bg-[#FAF8F2] border border-[#C2A264] text-xs text-[#191817] hover:border-[#1B3326] transition-all font-semibold flex items-center gap-1.5"
          >
            <span>December Hampers</span>
            <span className="text-xs text-[#4A4640] font-normal">(Seasonal)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          CORE YEAR-ROUND OCCASIONS (MAIN STORE COLLECTIONS)
      ========================================================================= */}
      <div className="space-y-12">
        {standardSections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`p-6 sm:p-8 border border-[#D8D4CC] scroll-mt-24 ${
              idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F4F0]'
            } shadow-sm space-y-6`}
          >
            {/* Section Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-[#E8E6E1] pb-6">
              <div className="lg:col-span-8 space-y-2.5">
                <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
                  Collection {idx + 1} · {section.products.length} Ready Options
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191817]">
                  {section.title}
                </h2>
                <p className="text-xs uppercase tracking-wider text-[#9E7835] font-bold">
                  {section.subtitle}
                </p>
                <p className="text-sm text-[#38342F] leading-relaxed pt-1 max-w-2xl">
                  {section.narrative}
                </p>

                {/* Quick Price Overview */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#191817]">
                  <span className="font-bold text-[#1B3326] uppercase tracking-wider">Items &amp; Prices Here:</span>
                  {section.products.map((p) => (
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
                      className="px-2.5 py-1 bg-white border border-[#D8D4CC] hover:border-[#1B3326] text-xs font-medium text-[#191817] transition-colors"
                    >
                      {p.title.split('(')[0].split('—')[0].trim()} — <strong className="text-[#1B3326]">{p.isCustomQuote ? 'Request a Quote' : formatPrice(p.price)}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-60 h-44 overflow-hidden border border-[#E0DDD7] bg-white shadow-sm">
                  <ProductImage
                    src={section.heroImage}
                    alt={section.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white border border-[#D8D4CC] hover:border-[#1B3326] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="aspect-[4/3] overflow-hidden bg-[#F5F4F0] border border-[#E8E6E1]">
                      <ProductImage
                        src={product.imageUrl}
                        alt={product.title}
                        aspectRatio="auto"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#4A4640] gap-2">
                        <span className="uppercase tracking-wider font-bold">{product.itemType}</span>
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
                          <span className="font-serif text-lg font-bold text-[#1B3326]">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug">
                        {product.title}
                      </h4>
                      <p className="text-sm text-[#4A4640] leading-relaxed">
                        {product.subtitle}
                      </p>
                      <p className="text-xs font-semibold text-[#1B3326] bg-[#FAF9F5] px-2.5 py-1 border border-[#E8E6E1]">
                        Design &amp; Colors: <span className="text-[#191817]">{product.resinPalette}</span>
                      </p>

                      {/* Explicit Included Items */}
                      <div className="pt-2 border-t border-[#F0ECE4] space-y-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#191817]">
                          What You Get Inside:
                        </p>
                        <ul className="text-xs text-[#38342F] space-y-1">
                          {product.itemsIncluded.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8E6E1] flex items-center justify-between gap-2">
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
                        className="px-3.5 py-2 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                        <span>Request a Quote</span>
                      </button>
                    ) : (
                      <span className="font-serif text-lg font-bold text-[#1B3326]">
                        {formatPrice(product.price)}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#1B3326] group-hover:underline uppercase tracking-wider flex items-center gap-1">
                      <span>{product.isCustomQuote ? 'Details & Reviews' : 'Pick Colors & Name'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Collection in Catalogue Link */}
            <div className="pt-2 text-right">
              <button
                onClick={() => setCurrentView('catalogue')}
                className="text-xs font-bold text-[#1B3326] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
              >
                <span>Open Full Gift Catalog ({section.products.length} items) &rarr;</span>
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* =========================================================================
          SECONDARY SEASONAL CATALOG: DECEMBER & HOLIDAY HAMPERS
      ========================================================================= */}
      <section
        id="festive-december"
        className="scroll-mt-24 p-6 sm:p-10 bg-gradient-to-b from-[#FDFBF7] via-[#F9F5EC] to-white border-2 border-[#C2A264] shadow-lg space-y-8 relative overflow-hidden"
      >
        {/* Subtle festive background lighting */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C24132]/5 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1B3326]/5 rounded-tr-full pointer-events-none" />

        {/* Festive Category Header Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E8E2D3] pb-8 relative z-10">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B3326] text-white text-xs uppercase tracking-[0.16em] font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Special Seasonal Catalog · December Edition</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191817] tracking-tight leading-tight">
              Festive December: Hampers, Thank-You Sets &amp; Holiday Decor
            </h2>

            <p className="text-xs uppercase tracking-wider text-[#9E7835] font-bold">
              Ready-Made Hampers · Gifts with Their Names · Honest Nigerian Prices (₦3,500 – ₦38,500)
            </p>

            <p className="text-sm sm:text-base text-[#38342F] leading-relaxed max-w-3xl">
              Celebrate this festive season with gifts they will keep for years. Food hampers get eaten in days, but these clear shiny resin coasters, photo plaques, table clocks, and Christmas ornaments stay in their homes and offices, reminding them of your love every single day.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#4A4640] font-medium">
              <span className="flex items-center gap-1 font-bold text-[#1B3326]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Handmade in Lagos, Nigeria
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#9E7835]" />
                Early December Delivery Available
              </span>
              <span className="flex items-center gap-1 font-bold text-[#C24132]">
                <Building2 className="w-4 h-4" />
                Bulk Discounts for 10+ Office Orders
              </span>
            </div>
          </div>

          {/* Action Hub for Festive December */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-end shrink-0 relative z-10">
            <a
              href={getWhatsAppFestiveInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Order Hampers on WhatsApp</span>
            </a>

            <button
              onClick={() => setCurrentView('builder')}
              className="px-5 py-3 border border-[#1B3326] bg-white text-[#1B3326] hover:bg-[#FAF9F5] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Build Custom Festive Box</span>
            </button>
          </div>
        </div>

        {/* Sub-Category Navigation Tabs inside Festive December */}
        <div className="space-y-5 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D3] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#191817]">
                Filter December Gifts:
              </span>
              <span className="text-xs text-[#4A4640] font-medium">
                ({displayedFestiveProducts.length} items shown)
              </span>
            </div>

            {/* Sub-Tabs */}
            <div className="inline-flex items-center p-1 bg-white border border-[#DDD8CE] shadow-sm flex-wrap">
              {[
                { id: 'all', label: 'All Festive Items' },
                { id: 'hampers', label: 'Christmas Hampers' },
                { id: 'appreciation', label: 'Thank-You Gift Sets' },
                { id: 'decor', label: 'Holiday Home Decor' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFestiveFilter(tab.id as FestiveFilter)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    festiveFilter === tab.id
                      ? 'bg-[#1B3326] text-white shadow-sm'
                      : 'text-[#4A4640] hover:text-[#191817]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Festive December Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFestiveProducts.map(product => {
              const meta = HOLIDAY_STORIES[product.id] || {
                theme: 'Holiday Celebration',
                badge: 'Thank-You Gift Set',
                holidayStory: product.description,
                festiveHighlights: product.resinDetails || []
              }

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#D8D4CC] hover:border-[#1B3326] transition-all p-5 shadow-sm hover:shadow-lg flex flex-col justify-between group relative"
                >
                  <div className="space-y-4">
                    {/* Visual Photo */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="aspect-[4/3] overflow-hidden bg-[#F5F4F0] border border-[#E8E4DA] cursor-pointer relative"
                    >
                      <ProductImage
                        src={product.imageUrl}
                        alt={product.title}
                        aspectRatio="auto"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      />

                      {/* Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-white shadow-sm">
                          {meta.badge}
                        </span>
                      </div>

                      {product.bulkPrice && (
                        <div className="absolute bottom-3 right-3 z-10 bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1B3326] border border-[#D5E3D8] shadow-sm">
                          Bulk: {formatPrice(product.bulkPrice)} (10+)
                        </div>
                      )}
                    </div>

                    {/* Product Metadata */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#4A4640]">
                        <span className="uppercase tracking-wider font-bold text-[#9C2F23]">
                          {meta.theme}
                        </span>
                        <span className="font-serif text-lg font-bold text-[#1B3326]">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="text-lg font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug cursor-pointer"
                      >
                        {product.title}
                      </h4>

                      <p className="text-sm text-[#4A4640] leading-relaxed">
                        {product.subtitle}
                      </p>

                      <p className="text-xs font-semibold text-[#1B3326] bg-[#FAF9F5] px-2.5 py-1 border border-[#E8E6E1]">
                        Design &amp; Colors: <span className="text-[#191817]">{product.resinPalette}</span>
                      </p>
                    </div>

                    {/* Warm Story & What Comes Inside */}
                    <div className="p-3.5 bg-[#FAF8F2] border border-[#EDE7D9] space-y-2.5">
                      <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                        {meta.holidayStory}
                      </p>

                      <div className="pt-2 border-t border-[#EDE7D9] space-y-1">
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

                  {/* Card Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-[#F0ECE1] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2.5 px-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Pick Colors &amp; Name</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getWhatsAppFestiveInquiry(product.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 border border-[#25D366] text-[#128C7E] bg-white hover:bg-[#F0FDF4] text-xs font-semibold transition-all flex items-center justify-center gap-1"
                      title="Order directly on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Guarantee for Festive Corporate Orders */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D3] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#38342F]">
          <p>
            Need custom company branding, bulk event boxes (50 to 500+ units), or personal thank-you cards for your team?
          </p>
          <a
            href={getWhatsAppFestiveInquiry()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1B3326] font-bold underline hover:text-[#C24132] shrink-0"
          >
            Chat with Our Team for Company Orders &rarr;
          </a>
        </div>
      </section>

      {/* Bulk Wedding & Owambe Favors Callout */}
      <div className="bg-[#181716] text-white p-7 sm:p-10 border border-[#292724] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#C2A264] font-bold flex items-center justify-center sm:justify-start gap-1.5">
            <Users className="w-4 h-4" />
            <span>Special &amp; Custom Orders</span>
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAFAF8]">
            Have a Special Event? We Can Make It Custom
          </h3>
          <p className="text-sm text-[#D8D4CC] max-w-lg leading-relaxed">
            Planning a church dedication, company anniversary, chieftaincy title, or family celebration? We can create custom handmade resin gifts around your exact event.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('contact')}
          className="px-6 py-3.5 bg-[#C2A264] text-[#191817] text-xs uppercase tracking-widest font-bold hover:bg-[#D4B679] transition-colors flex-shrink-0 flex items-center gap-2"
        >
          <Gift className="w-4 h-4" />
          <span>Ask About a Custom Gift</span>
        </button>
      </div>
    </div>
  )
}
