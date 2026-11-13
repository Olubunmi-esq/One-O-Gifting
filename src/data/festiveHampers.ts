// Official December Festive & Holiday Hamper Packages
// Prepared by ONE O Personalised Gifts

export interface FestiveHamperPackage {
  id: string
  name: string
  tagline: string
  targetAudience: string
  retailRange: string
  retailPrice: number
  bulkRange: string
  bulkPrice: number // 10+ units
  bulkMinQty: number
  badge: string
  highlightColor: string
  imageUrl: string
  items: Array<{
    number: string
    title: string
    description: string
    choice?: string[]
  }>
  packagingDetails: string
  recommendedFor: string[]
}

export const FESTIVE_HAMPERS: FestiveHamperPackage[] = [
  {
    id: 'december-sparkle-starter',
    name: 'Sparkle Starter Package',
    tagline: 'Affordable · Personal · Made to Your Colors',
    targetAudience: 'Staff · Customers · Small Tokens · Team Appreciation',
    retailRange: '₦12,000 – ₦14,500',
    retailPrice: 12500,
    bulkRange: '₦10,500 – ₦13,000',
    bulkPrice: 11000,
    bulkMinQty: 10,
    badge: 'Affordable Starter',
    highlightColor: '#C24132', // Deep Festive Crimson
    imageUrl: '/src/assets/images/resin_festive_starter_hamper_1794516583088.jpg',
    items: [
      {
        number: '01',
        title: 'Personalised Keychain',
        description: 'Custom keychain made in whichever colors, flowers, or glitter style you choose on WhatsApp.'
      },
      {
        number: '02',
        title: 'Festive Hanging Ornament or Fridge Magnet',
        description: 'Pick which item you prefer—your design and colors will be arranged directly with us on WhatsApp.',
        choice: ['Holiday Hanging Ornament', 'Decorative Fridge Magnet']
      },
      {
        number: '03',
        title: 'Customized Bookmark',
        description: 'Personalized bookmark crafted in your chosen colors and wording.'
      },
      {
        number: '04',
        title: 'Gift Box Sleeve + Custom Card',
        description: 'Personal greeting card included inside the gift box.'
      }
    ],
    packagingDetails: 'Gift sleeve with ribbon & custom card (colors & design chosen on WhatsApp)',
    recommendedFor: ['Office Staff End-of-Year Gifts', 'Loyal Customers & Clients', 'Church & Community Groups']
  },
  {
    id: 'december-appreciation-classic',
    name: 'Appreciation Classic Package',
    tagline: 'Balanced Value · Custom Colors & Design on WhatsApp',
    targetAudience: 'Clients · Business Partners · Team Leads · Department Heads',
    retailRange: '₦25,000 – ₦29,000',
    retailPrice: 26000,
    bulkRange: '₦22,000 – ₦26,000',
    bulkPrice: 23500,
    bulkMinQty: 10,
    badge: 'Most Popular',
    highlightColor: '#1B3326', // Royal Emerald
    imageUrl: '/src/assets/images/resin_festive_classic_hamper_1794516583016.jpg',
    items: [
      {
        number: '01',
        title: 'Set of 2 Drink Coasters',
        description: 'Two custom resin coasters—crafted in whatever color, sparkle, or wording you pick on WhatsApp.'
      },
      {
        number: '02',
        title: 'Personalised Keychain or Pen',
        description: 'Choose which item you want inside; color and design are completely up to you.',
        choice: ['Personalised Initial Keychain', 'Customized Resin Pen']
      },
      {
        number: '03',
        title: 'Jewelry Dish Stand / Catch-All Stand or Pocket Jotter',
        description: 'Choose either piece and share your preferred look with our WhatsApp team.',
        choice: ['Jewelry Dish Stand / Catch-All Stand', 'Customized Pocket Jotter']
      },
      {
        number: '04',
        title: 'Gift Box + Custom Card',
        description: 'Presentation gift box with ribbon and personal handwritten note.'
      }
    ],
    packagingDetails: 'Strong presentation gift box with ribbon and card (your choice of colors & style)',
    recommendedFor: ['Key Business Clients', 'Company Partners', 'Hardworking Team Leads']
  },
  {
    id: 'december-executive-luxe',
    name: 'Executive Luxe Package',
    tagline: 'Standout VIP Box · Full Design Freedom on WhatsApp',
    targetAudience: 'Executives · Board Members · VIP Investors · Directors',
    retailRange: '₦38,000 – ₦45,000',
    retailPrice: 38500,
    bulkRange: '₦34,000 – ₦40,000',
    bulkPrice: 35000,
    bulkMinQty: 10,
    badge: 'VIP Gift Set',
    highlightColor: '#C2A264', // Warm Champagne Gold
    imageUrl: '/src/assets/images/resin_festive_luxe_hamper_1794516583158.jpg',
    items: [
      {
        number: '01',
        title: 'Main Centerpiece Item (Pick One)',
        description: 'Select the centerpiece item you want—colors, inlay, and lettering are chosen by you on WhatsApp.',
        choice: [
          'Set of 4 Drink Coasters',
          'Large Serving Tray (30cm)',
          'Table Clock / Desk Organiser'
        ]
      },
      {
        number: '02',
        title: 'Personalised Keychain',
        description: 'Custom initial or name keychain crafted in your selected colors.'
      },
      {
        number: '03',
        title: 'Festive Hanging Ornament & Fridge Magnet',
        description: 'Custom holiday hanging piece & magnet made to match your chosen theme.'
      },
      {
        number: '04',
        title: 'Customized Pen + VIP Box & Message Card',
        description: 'Matching resin pen packed inside the presentation gift box.'
      }
    ],
    packagingDetails: 'VIP presentation box with ribbon & greeting card (custom designed via WhatsApp)',
    recommendedFor: ['Managing Directors & Board Members', 'VIP Investors', 'Important Partners']
  }
]

// Single Items Standard Pricing
export const FESTIVE_A_LA_CARTE = [
  { item: 'Personalised Keychain', retail: 4000, bulk: 3200, note: 'Any letter, name & color style chosen on WhatsApp' },
  { item: 'Festive Hanging Ornament', retail: 3500, bulk: 2800, note: 'Colors & finish tailored to your choice' },
  { item: 'Decorative Fridge Magnet', retail: 3500, bulk: 2800, note: 'Custom message & design chosen on WhatsApp' },
  { item: 'Customized Bookmark', retail: 3000, bulk: 2400, note: 'Any colors, flowers or clear finish' },
  { item: 'Single Drink Coaster', retail: 5500, bulk: 4500, note: 'Custom color, rim & name/initial' },
  { item: 'Set of 2 Drink Coasters', retail: 10500, bulk: 8800, note: 'Matching pair in your chosen colors' },
  { item: 'Set of 4 Drink Coasters', retail: 22500, bulk: 19000, note: '4-piece set + holder in your preferred design' },
  { item: 'Customized Pen', retail: 3500, bulk: 2800, note: 'Smooth twist pen made to your look' },
  { item: 'Jewelry Dish Stand / Catch-All Stand', retail: 9500, bulk: 8000, note: 'Bedside or desk dish in your style' },
  { item: 'Large Serving Tray (30cm)', retail: 22000, bulk: 18500, note: 'Custom colors & wording via WhatsApp' },
  { item: 'Table Clock / Desk Organiser', retail: 22500, bulk: 19500, note: 'Quiet desk clock in your chosen design' }
]
