export interface CorporateTier {
  id: string
  name: string
  tagline: string
  priceRangeNaira: string
  priceRangeUSD: string
  minOrder: number
  turnaround: string
  imageUrl: string
  description: string
  features: string[]
  recommendedFor: string
  popularAddons: string[]
}

export const CORPORATE_TIERS: CorporateTier[] = [
  {
    id: 'owambe-souvenirs',
    name: 'Owambe & Wedding Souvenir Favors',
    tagline: 'Coasters, resin trays, bridesmaids & groomsmen packs, keychains, pens & custom Thank-You Card (Min. 25 pieces)',
    priceRangeNaira: 'Customizable — Request a Quote (Min. 25 pcs)',
    priceRangeUSD: 'Customizable — Request a Quote (Min. 25 pcs)',
    minOrder: 25,
    turnaround: '5–8 Business Days (Fast dispatch across Nigeria)',
    imageUrl: '/src/assets/images/nigerian_wedding_favors_1794042251744.jpg',
    description: 'Order any guest count starting at 25 pieces minimum—choose drink coasters, small resin trays, customized bridesmaids & groomsmen packs, initial keychains, customized pens, phone stands, or bottle stoppers matched to your exact party colors on WhatsApp.',
    features: [
      'Drink Coasters (Single or Pair Sets) & Small Resin Trinket Trays',
      'Customized Bridesmaids Pack & Customized Groomsmen Pack',
      'Guest Souvenirs: Initial Keychains, Writing Pens, Bookmarks & Phone Stands',
      'Individual Gift Pouch & Custom Printed Thank-You Card per Piece'
    ],
    recommendedFor: 'Traditional weddings (Yorùbá, Igbo, Hausa/Edo), white wedding receptions, bridal showers, milestone 40th/50th/60th birthdays, baby dedications',
    popularAddons: ['Stamped wax seal on thank-you cards', 'Matching bottle stoppers for in-laws', 'Direct venue or event planner delivery']
  },
  {
    id: 'appreciation-suites',
    name: 'The Appreciation & Milestone Suite',
    tagline: 'Customized photo plaque, pair of drink coasters & wooden display easel in a gift box',
    priceRangeNaira: '₦29,500 – ₦35,000 per suite',
    priceRangeUSD: '$20 – $24 per suite',
    minOrder: 5,
    turnaround: '5–10 Business Days',
    imageUrl: '/src/assets/images/nigerian_corporate_suite_1794042273984.jpg',
    description: 'A heartfelt thank-you set for pastors, mentors, doctors, teachers, department heads, and committee members. Tell our WhatsApp representative your preferred colors, photos, and inscriptions.',
    features: [
      'Customized Photo Plaque (A5)',
      'Pair of Matching Drink Coasters',
      'Tabletop Wooden Display Stand',
      'Presentation Gift Box & Handwritten Greeting Card'
    ],
    recommendedFor: 'Pastor appreciation day, medical staff & teacher thank you, department retirement gifts, milestone anniversary celebrations, committee recognition',
    popularAddons: ['Scannable song code', 'Custom engraved logo/tag', 'Direct recipient courier']
  },
  {
    id: 'vip-curated-boxes',
    name: 'The VIP All-in-One Gift Box',
    tagline: 'Photo frame, drink coasters, bookmark, jewelry dish stand / catch-all stand & greeting card',
    priceRangeNaira: 'Customizable — Request a Quote',
    priceRangeUSD: 'Customizable — Request a Quote',
    minOrder: 5,
    turnaround: '7–12 Business Days',
    imageUrl: '/src/assets/images/with_love_birthday_box_1794569208169.jpg',
    description: 'A complete gift chest made to make directors, guest speakers, bridal parties, or VIP sponsors feel deeply honored. Every item’s colors, floral or sparkle style, and wording are customized directly with you on WhatsApp.',
    features: [
      'Customized Photo Frame with Standing Stand',
      'Jewelry Dish Stand / Catch-All Stand',
      'Customized Bookmark & Matching Pen',
      'Pair of Drink Coasters',
      'Presentation Gift Box & Greeting Card'
    ],
    recommendedFor: 'Guest speakers, VIP wedding sponsors & godparents, executives, valued client thank-you gifting, bride & groom morning hampers',
    popularAddons: ['Custom desk nameplate', 'Company crest or monogram', 'Multi-city courier delivery']
  },
  {
    id: 'staff-appreciation-mini',
    name: 'Staff Appreciation Mini Pouch',
    tagline: 'Personalized resin pen + company-logo keychain + thank-you card inside a branded velvet pouch',
    priceRangeNaira: '₦6,800 per unit (10+ bulk) · ₦7,800 single',
    priceRangeUSD: '$4.50 – $5.20 per unit',
    minOrder: 10,
    turnaround: '4–6 Business Days',
    imageUrl: '/src/assets/images/resin_letter_keychains_1794039961345.jpg',
    description: 'Smart, practical appreciation for entire teams, International Women’s Day, Workers’ Day, and departmental rewards without straining budgets.',
    features: [
      'Branded Resin Ballpoint Pen (Smooth Refillable Ink)',
      'Company-Logo Resin Keychain (with optional NFC contact tag)',
      'Printed Appreciation Card & Branded Velvet Gift Pouch',
      'Exact Corporate HEX/Brand Color Matching on WhatsApp'
    ],
    recommendedFor: 'Company-wide staff appreciation, Workers’ Day, onboarding goodie bags, SME client thank-yous',
    popularAddons: ['Add customized pocket jotter', 'Upgrade to organza or rigid box']
  },
  {
    id: 'onboarding-welcome-kit',
    name: 'Employee Onboarding & Client Welcome Kit',
    tagline: 'Name badge reel, company-logo keychain, branded pen, desk coaster & welcome card inside branded box',
    priceRangeNaira: '₦16,800 per kit (10+ bulk) · ₦19,500 single',
    priceRangeUSD: '$11 – $13 per kit',
    minOrder: 5,
    turnaround: '5–8 Business Days',
    imageUrl: '/src/assets/images/nigerian_corporate_suite_1794042273984.jpg',
    description: 'Designed to make new hires feel at home on Day One and delight retained B2B accounts—pairing practical desk gear with your exact corporate colors and individual employee names.',
    features: [
      'Retractable Badge Reel / ID Holder Topper with Staff Name',
      'Company-Logo Keychain + Branded Ballpoint Pen',
      'Company-Logo Resin Desk Coaster',
      'Branded Presentation Box, Welcome Note & Care Card'
    ],
    recommendedFor: 'HR employee onboarding kits, banking & tech teams, client retention packages, retreats',
    popularAddons: ['Desk paperweight with logo', 'Personalized resin pen holder']
  },
  {
    id: 'conference-souvenir-pack',
    name: 'Conference, Seminar & Event Souvenir Pack (50–500 Pcs)',
    tagline: 'Logo keychains, resin conference badges/event tags, branded pens & color-matched event pouches',
    priceRangeNaira: 'Customizable — Request a Quote (Min. 50 pcs)',
    priceRangeUSD: 'Customizable — Request a Quote (Min. 50 pcs)',
    minOrder: 50,
    turnaround: '6–10 Business Days',
    imageUrl: '/src/assets/images/recognition_plaque_clean_1794569240984.jpg',
    description: 'High-impact conference favors and award medals sorted cleanly for registration desks—combining branded pens, conference name badges, resin event tags, or medals tailored to your delegate count.',
    features: [
      'Minimum 50 Pieces: Conference Badges, Event Tags or Resin Medals',
      'Company-Logo Keychains & Branded Writing Pens',
      'Color-Matched Guest Pouches with Event Date Tags',
      'Priority Venue or Hotel Delivery Across Nigeria'
    ],
    recommendedFor: 'Conferences, AGMs, trade fairs, alumni homecomings, sports days, medical/legal seminars',
    popularAddons: ['Speaker award plaques', 'VIP dinner table coasters', 'Express hotel drop-off']
  },
  {
    id: 'product-launch-pack',
    name: 'Product Launch & End-of-Year PR Box',
    tagline: 'Logo appreciation plaque, branded keychain, logo coaster, pen, launch card & rigid presentation box',
    priceRangeNaira: '₦35,000 per box (10+ bulk) · ₦39,500 single',
    priceRangeUSD: '$23 – $26 per box',
    minOrder: 10,
    turnaround: '6–10 Business Days',
    imageUrl: '/src/assets/images/resin_festive_luxe_hamper_1794516583158.jpg',
    description: 'Unforgettable PR unboxing for brand influencers, board partners, and product launches. Every piece reinforces your brand logo and campaign palette without disposable clutter.',
    features: [
      'Custom Logo Appreciation Plaque / Campaign Keepsake',
      'Company-Logo Desk Coaster & Branded Resin Pen',
      'Company-Logo Keychain + Custom Launch Card',
      'Luxury Ribboned PR Box with Foam Cradle & Care Instructions'
    ],
    recommendedFor: 'Influencer PR drops, brand rebranding launches, AGM partner boxes, year-end VIP lists',
    popularAddons: ['Engraved wooden lid insert', 'QR press-kit card inside']
  }
]
