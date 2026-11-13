// Simple, easy-to-understand celebration guide for ONE O gifts.
// Written in plain English so any visitor immediately pictures what the gift looks like and why it is special.

export interface CelebrationGuide {
  id: string
  name: string
  badge: string
  icon: string
  subtitle: string
  emotionalHeadline: string
  whyItMatters: string
  recommendedBundleId: string
  featuredProductIds: string[]
  suitableRecipients: string[]
  priceRangeText: string
  customizationIdeas: string[]
}

export const CELEBRATIONS: CelebrationGuide[] = [
  {
    id: 'milestone-birthdays',
    name: 'Birthday Celebrations & Pampering',
    badge: 'Birthday Specials',
    icon: '🎂',
    subtitle: 'A5 hardcover notebooks, customized jotters, jewelry sets, jewelry dish stands, customized mirrors, phone stands & gift boxes',
    emotionalHeadline: 'Give a birthday gift made in their exact favorite look and style.',
    whyItMatters: 'Every birthday celebrant has their own taste. Pick the gift set or single items you want—and tell our WhatsApp representative the exact colors, flowers, glitter, or wording you want made just for them.',
    recommendedBundleId: 'bundle-birthday-queen-botanical',
    featuredProductIds: [
      'birthday-curated-luxury-gift-box',
      'personalized-led-night-lamp-frame',
      'personalized-resin-journal-pen-set',
      'couple-floral-ring-dish-tray',
      'bougainvillea-resin-bookmark-tassel',
      'resin-alphabet-keychain-gold'
    ],
    suitableRecipients: ['Wife or Girlfriend', 'Husband or Boyfriend', 'Mother or Father', 'Best Friend or Sister'],
    priceRangeText: '₦3,000 to ₦50,500',
    customizationIdeas: [
      'Pick any colors, dried flowers, sparkles, or clear look on WhatsApp',
      'Add their name, initials, age, or a special birthday wish',
      'Swap or match pieces inside any birthday box via WhatsApp'
    ]
  },
  {
    id: 'wedding-anniversary',
    name: 'Weddings & Marriage Anniversaries',
    badge: 'Love & Romance',
    icon: '💖',
    subtitle: 'Couple photo plaques, LED bedside lights, jewelry dish stands, bouquet preservation & gift sets',
    emotionalHeadline: 'Keep your wedding memories fresh and shining the way you love.',
    whyItMatters: 'Wedding cakes finish and fresh flowers fade, but a photo light, couple plaque, or ring dish crafted in your wedding colors keeps that joy glowing beside you every night.',
    recommendedBundleId: 'bundle-wedding-anniversary-romance',
    featuredProductIds: [
      'couple-spotify-photo-plaque',
      'personalized-led-night-lamp-frame',
      'bridal-party-luxury-gift-package',
      'wedding-bouquet-preservation-pyramid',
      'couple-floral-ring-dish-tray',
      'couple-coasters-and-stopper-duo'
    ],
    suitableRecipients: ['Husband', 'Wife', 'Newlywed Couple', 'Parents Celebrating Anniversary'],
    priceRangeText: 'Customizable · Request a Quote',
    customizationIdeas: [
      'Send your wedding photo, couple names & date on WhatsApp',
      'Choose your own color scheme, flowers, or sparkle finish',
      'Include your favorite song link or love note inside the card'
    ]
  },
  {
    id: 'career-promotion',
    name: 'Job Promotions, Law Call to Bar & Graduations',
    badge: 'Work & Office Honors',
    icon: '⚖️',
    subtitle: 'Office desk nameplates, standing desk clocks, matching pens, cufflinks & catch-all trays',
    emotionalHeadline: 'Celebrate their hard work with a gift they will put on their desk with pride.',
    whyItMatters: 'When someone earns a promotion, gets called to the Nigerian Bar, or qualifies as a doctor, seeing their name and new title crafted in the colors you choose makes all their hard work feel deeply honored.',
    recommendedBundleId: 'bundle-executive-director-tribute',
    featuredProductIds: [
      'executive-sculpted-desk-nameplate',
      'executive-desk-clock-suite',
      'resin-executive-ballpoint-pen',
      'executive-desk-organizer-catchall',
      'groomsmen-bespoke-package',
      'traditional-owambe-lapel-pin'
    ],
    suitableRecipients: ['New Lawyers (Call to Bar)', 'Doctors & Medical Staff', 'Bosses, Managers & Directors', 'Graduating Students'],
    priceRangeText: '₦3,500 to ₦46,000',
    customizationIdeas: [
      'Confirm full title (e.g. Barrister / Dr. / MD) directly on WhatsApp',
      'Pick any office color theme or subtle sparkle style',
      'Add a short congratulatory note or company emblem'
    ]
  },
  {
    id: 'housewarming-kitchen',
    name: 'New House & Kitchen Gifts',
    badge: 'Kitchen & Entertaining',
    icon: '🏡',
    subtitle: 'Wood & resin serving boards, spinning trays, nesting platters, coasters & wine bottle stoppers',
    emotionalHeadline: 'Make serving food and drinks feel warm and memorable whenever guests visit.',
    whyItMatters: 'Nigerian homes come alive around shared meals and laughter. Pick any wood and resin serving piece, and choose the exact river colors and family surname engraving with our team on WhatsApp.',
    recommendedBundleId: 'bundle-pinterest-kitchen-entertainer',
    featuredProductIds: [
      'pinterest-emerald-waterfall-kitchen-board',
      'pinterest-u-shaped-kitchen-nook-lazy-susan',
      'pinterest-galley-kitchen-river-paddle-board',
      'pinterest-breakfast-nook-trio-tapas-platter',
      'festive-coasters-duo-gold',
      'faceted-resin-wine-bottle-stopper'
    ],
    suitableRecipients: ['New Homeowners', 'Couples Moving to a New House', 'Mothers & Cooking Lovers', 'Anyone who loves hosting visitors'],
    priceRangeText: '₦5,500 to ₦42,500',
    customizationIdeas: [
      'Pick any resin color theme to match their kitchen on WhatsApp',
      'Engrave the family surname or housewarming date',
      'Pair with matching coasters or bottle stopper'
    ]
  },
  {
    id: 'retirement-honor',
    name: 'Retirement & Lifetime Honors',
    badge: 'Lifetime Service',
    icon: '🏆',
    subtitle: 'Parlor clocks, lifetime service tribute frames, home valet trays, memoir notebooks & pens, hosting coasters & tailored accessories',
    emotionalHeadline: 'Say a heartfelt thank-you to someone stepping out of decades of hard work into a new chapter at home.',
    whyItMatters: 'A retiring executive does not need another office binder—our farewell gift boxes pair meaningful home parlor clocks, service tribute frames, bedside valet trays, memoir notebooks, and hosting coasters tailored specifically to the retiree.',
    recommendedBundleId: 'bundle-mentor-retirement-honor',
    featuredProductIds: [
      'executive-retirement-farewell-box',
      'distinguished-retirement-milestone-clock-suite',
      'retirement-service-achievement-frame',
      'corporate-desk-award-trophy',
      'executive-cufflinks-tie-clip-set',
      'resin-executive-ballpoint-pen'
    ],
    suitableRecipients: ['Retiring Director or Civil Servant', 'Retiring School Principal or Teacher', 'Long-Serving Church Leader', 'Respected Elder'],
    priceRangeText: 'Farewell Gift Box: Customizable (Request Quote) · Single pieces ₦3,500 – ₦42,000',
    customizationIdeas: [
      'Choose specific items suited to a retiring gentleman or lady executive',
      'Share years of service, portrait & farewell citation on WhatsApp',
      'Add organization crest and personalized tribute card'
    ]
  },
  {
    id: 'pastoral-spiritual',
    name: 'Pastors, Mentors & Teachers Appreciation',
    badge: 'Thank-You Gifts',
    icon: '🕊️',
    subtitle: 'Appreciation plaques, notebooks & matching pens, prayer palm tokens & bookmarks',
    emotionalHeadline: 'Show real gratitude to the people who pray for you, guide you, and teach you.',
    whyItMatters: 'Pastors, teachers, and mentors give so much of themselves. Tell us their name, favorite scripture or message, and preferred colors on WhatsApp so we craft a gift that touches their heart.',
    recommendedBundleId: 'bundle-executive-director-tribute',
    featuredProductIds: [
      'pastor-mentor-appreciation-plaque',
      'teacher-doctor-appreciation-journal-suite',
      'personalized-mini-pocket-prayer-token',
      'bougainvillea-resin-bookmark-tassel',
      'resin-executive-ballpoint-pen'
    ],
    suitableRecipients: ['Pastors, Reverends & Priests', 'School & Sunday School Teachers', 'Mentors & Life Coaches', 'Choir Directors'],
    priceRangeText: '₦3,000 to ₦24,500',
    customizationIdeas: [
      'Add any scripture verse, blessing, or thank-you message on WhatsApp',
      'Choose peaceful, bright, or floral colors to fit their personality',
      'Includes free handwritten appreciation note inside'
    ]
  },
  {
    id: 'owambe-souvenirs',
    name: 'Wedding Souvenirs for Guests (Owambe Favors)',
    badge: 'Min. Order: 25 Pieces',
    icon: '📦',
    subtitle: 'Coasters, resin trays, customized bridesmaids & groomsmen packs, keychains, pens, phone stands & thank-you cards',
    emotionalHeadline: 'Build your exact Owambe souvenir & bridal party mix — starting from 25 pieces minimum.',
    whyItMatters: 'Whether you are hosting 25 intimate family guests or a 300-guest reception, you pick exact items and quantities per category—coasters, small resin trays, bridesmaids & groomsmen packs, keychains, pens, lapel pins, and custom Thank-You Cards—with pricing quoted cleanly for your order.',
    recommendedBundleId: 'bundle-wedding-vip-favors-50',
    featuredProductIds: [
      'wedding-souvenir-pack-25',
      'grand-owambe-souvenir-pack-50',
      'deluxe-owambe-souvenir-pack-100',
      'bridal-party-luxury-gift-package',
      'groomsmen-bespoke-package',
      'traditional-owambe-lapel-pin'
    ],
    suitableRecipients: ['VIP Wedding Guests', 'Family In-Laws', 'Bridesmaids & Groomsmen', 'Owambe Party Guests'],
    priceRangeText: 'Min. Order 25 Pieces · Price Customizable (Request a Quote)',
    customizationIdeas: [
      'Pick your mix of coasters, resin trays, keychains, pens & bridesmaids/groomsmen packs',
      'Send your exact quantity (25+ min.) and party colors on WhatsApp for a tailored quote',
      'Each piece comes bagged individually with a custom printed Thank-You Card'
    ]
  },
  {
    id: 'musician-worship',
    name: 'Musicians, Guitarists & Church Worship Leaders',
    badge: 'Stage Gear & Accessories',
    icon: '🎸',
    subtitle: 'Padded guitar straps, custom guitar picks, desktop phone stands & initial keychains',
    emotionalHeadline: 'A comfortable, personalized stage gift made for musicians you appreciate.',
    whyItMatters: 'Playing guitar for hours takes a toll on their shoulder. A cushioned strap designed in whichever colors, leather width, and stage name you confirm on WhatsApp supports their music both physically and emotionally.',
    recommendedBundleId: 'bundle-musician-stage-edition',
    featuredProductIds: [
      'bespoke-resin-accent-guitar-strap',
      'afrobeat-stage-jacquard-guitar-strap',
      'acrylic-resin-interlocking-phone-stand',
      'resin-alphabet-keychain-gold'
    ],
    suitableRecipients: ['Guitarists & Bass Players', 'Church Worship Leaders', 'Music Ministers', 'Music Students'],
    priceRangeText: '₦3,500 to ₦31,500',
    customizationIdeas: [
      'Pick solid, two-color blend, or shimmer design on WhatsApp',
      'Add stage name, initials, or favorite scripture verse',
      'Pair with a matching set of 3 guitar picks'
    ]
  },
  {
    id: 'everyday-under10k',
    name: 'Small Everyday Gifts (Under ₦10,000)',
    badge: 'Pocket-Friendly Gifts',
    icon: '✨',
    subtitle: 'Customized keychains, bookmarks, writing pens, jotters, phone stands & coasters under ₦10k',
    emotionalHeadline: 'You do not need a huge budget to make someone feel deeply remembered.',
    whyItMatters: 'From ₦3,000 bookmarks and ₦4,000 initial keychains to ₦6,500 phone stands, every piece is personalized in whichever colors and designs you choose when ordering on WhatsApp.',
    recommendedBundleId: 'bundle-starter-thoughtful-keepsake',
    featuredProductIds: [
      'resin-alphabet-keychain-gold',
      'bougainvillea-resin-bookmark-tassel',
      'resin-executive-ballpoint-pen',
      'personalized-mini-pocket-prayer-token',
      'acrylic-resin-interlocking-phone-stand',
      'single-geode-crystal-agate-coaster',
      'faceted-resin-wine-bottle-stopper'
    ],
    suitableRecipients: ['Friends & Colleagues', 'Brothers & Sisters', 'Students', 'Anyone you want to say hello to'],
    priceRangeText: '₦3,000 to ₦9,500',
    customizationIdeas: [
      'Choose any color, flower, shimmer, or clear finish on WhatsApp',
      'Pick their initial letter from A to Z or full first name',
      'Comes packed neatly with ribbon and gift card'
    ]
  },
  {
    id: 'december-holiday',
    name: 'December & Holiday Hampers (Seasonal Catalog)',
    badge: 'Special Seasonal Catalog',
    icon: '🎄',
    subtitle: 'Holiday gift boxes for staff, clients, and family — customized to your colors on WhatsApp (₦3,000 – ₦38,500)',
    emotionalHeadline: 'End the year with a lasting, personal thank-you.',
    whyItMatters: 'While food hampers disappear quickly, personalized keychains, coasters, desk clocks, and holiday ornaments stay on desks and tables all year. Tell us your preferred colors and logos directly on WhatsApp.',
    recommendedBundleId: 'bundle-december-appreciation-classic',
    featuredProductIds: [
      'december-sparkle-starter-hamper',
      'december-appreciation-classic-hamper',
      'december-executive-luxe-hamper',
      'festive-resin-christmas-tree-ornament',
      'festive-coasters-duo-gold',
      'festive-resin-fridge-magnet'
    ],
    suitableRecipients: ['Your Company Clients', 'Office Staff & Workers', 'Family Friends', 'Church Members'],
    priceRangeText: '₦3,000 to ₦38,500 (Bulk discounts when you buy 10 or more)',
    customizationIdeas: [
      'Pick your holiday colors, clear finish, or company branding on WhatsApp',
      'Add staff/client names or company logo',
      'Include a handwritten holiday card inside every box'
    ]
  },
  {
    id: 'baby-family',
    name: 'Baby Showers, Naming Ceremonies & Family Homes',
    badge: 'New Baby & Family',
    icon: '👶',
    subtitle: 'Baby name plaques, footprint/hair-curl & ultrasound blocks, naming favours, family name signs & photo frames',
    emotionalHeadline: 'Turn fleeting newborn milestones and family memories into nursery heirlooms.',
    whyItMatters: 'Baby clothes fit for weeks, and ultrasound scans fade in drawers—our museum-clear nursery plaques, footprint & ultrasound blocks, and family home signs keep your earliest family chapters shining.',
    recommendedBundleId: 'bundle-baby-arrival-box',
    featuredProductIds: [
      'baby-name-plaque',
      'baby-footprint-haircurl-ultrasound-keepsake',
      'baby-christening-first-birthday-keepsake',
      'family-welcome-home-door-sign',
      'photo-resin-frame',
      'photo-fridge-magnet'
    ],
    suitableRecipients: ['Expectant Mothers', 'Newborn Baby & Parents', 'Families Moving Home', 'Godparents & Grandparents'],
    priceRangeText: '₦4,500 to ₦52,000',
    customizationIdeas: [
      'Add baby birth stats (weight, time, date) or family surname',
      'Send crisp hospital scan, footprint, or family portrait via WhatsApp',
      'Order 20–100+ matching naming-ceremony favour charms for guests'
    ]
  },
  {
    id: 'religious-festivals',
    name: 'Ramadan/Eid, Christmas Family, New Year & Ministry',
    badge: 'Faith & Cultural Seasons',
    icon: '🌙',
    subtitle: 'Prayer plaques, dates/hosting trays, Christmas family ornaments, hijab pins, New Year goal plaques & pastor sets',
    emotionalHeadline: 'Honor faith traditions, Ramadan hospitality, Christmas joy, and spiritual leaders with meaning.',
    whyItMatters: 'Whether gifting a Muslim family at Eid, presenting a Christmas keepsake sign, blessing a Pastor, or inscribing a New Year vision verse, every set blends reverence with everyday home usefulness.',
    recommendedBundleId: 'bundle-ramadan-eid-gift-set',
    featuredProductIds: [
      'personalized-hijab-pin-brooch-set',
      'resin-candle-tealight-holder-pair',
      'pastor-mentor-appreciation-plaque',
      'festive-resin-christmas-tree-ornament',
      'photo-resin-coaster-six-set',
      'family-welcome-home-door-sign'
    ],
    suitableRecipients: ['Muslim & Christian Families', 'Pastors & Imams', 'Youth & Choir Fellowships', 'Mentors & Elders'],
    priceRangeText: '₦3,500 to ₦48,500',
    customizationIdeas: [
      'Confirm Bible verse, Arabic/English dua, or Eid/New Year greeting on WhatsApp',
      'Match emerald, ivory gold, ruby, or pastel home tones',
      'Pair prayer plaques with practical serving trays or hijab pins'
    ]
  },
  {
    id: 'graduations-memorials',
    name: 'Graduations, School Leaving & Remembrance Keepsakes',
    badge: 'Milestones & Tributes',
    icon: '🎓',
    subtitle: 'Grad cap charms, school-leaving plaques, graduation frames & respectful memorial photo candle tributes',
    emotionalHeadline: 'Celebrate proud graduation gowns—and honor cherished loved ones with quiet dignity.',
    whyItMatters: 'From university convocation and NYSC passing-out thanksgiving to tasteful memorial remembrance blocks with glowing tealight holders, every keepsake holds the exact name, dates, and portrait close.',
    recommendedBundleId: 'bundle-graduation-thanksgiving',
    featuredProductIds: [
      'graduation-school-leaving-plaque-set',
      'memorial-remembrance-photo-candle-set',
      'photo-resin-frame',
      'resin-candle-tealight-holder-pair',
      'geode-floral-resin-bookends-pair',
      'photo-resin-keychain'
    ],
    suitableRecipients: ['Graduating Students & NYSC Corpers', 'Convocation Families', 'Families Honoring a Loved One'],
    priceRangeText: '₦4,500 to ₦39,500',
    customizationIdeas: [
      'Send degree title, school colors & class year—or sunrise/sunset dates for memorials',
      'Upload high-resolution portrait photo via WhatsApp',
      'Prioritized handling for thanksgiving and remembrance dates'
    ]
  }
]
