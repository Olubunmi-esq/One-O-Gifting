export interface StrapColorOption {
  id: string
  name: string
  category: 'solid' | 'gradient' | 'champagne'
  hex: string
  gradientCss?: string
  accent?: string
  description: string
}

export interface StrapThemeOption {
  id: string
  name: string
  tagline: string
  description: string
  icon: string // emoji or identifier
}

export interface StrapStyleOption {
  id: string
  name: string
  width: string
  material: string
  description: string
  bestFor: string
}

export interface StrapHardwareOption {
  id: string
  name: string
  color: string
}

// 1. Color Choices: Solid Colors, Design Gradients, Champagne
export const GUITAR_STRAP_COLORS: {
  category: 'Solid Colors' | 'Design Gradients' | 'Champagne'
  type: 'solid' | 'gradient' | 'champagne'
  options: StrapColorOption[]
}[] = [
  {
    category: 'Solid Colors',
    type: 'solid',
    options: [
      {
        id: 'solid-obsidian-noir',
        name: 'Midnight Obsidian Noir',
        category: 'solid',
        hex: '#161514',
        accent: '#D4AF37',
        description: 'Classic deep matte black with gold edge lining'
      },
      {
        id: 'solid-royal-emerald',
        name: 'Royal Emerald Forest',
        category: 'solid',
        hex: '#1B3326',
        accent: '#C2A264',
        description: 'Regal deep forest green inspired by Nigerian rainforests'
      },
      {
        id: 'solid-navy-azure',
        name: 'Midnight Navy Azure',
        category: 'solid',
        hex: '#172B4D',
        accent: '#E0DDD7',
        description: 'Deep nautical midnight blue with silver or brass trim'
      },
      {
        id: 'solid-burgundy-wine',
        name: 'Crimson Burgundy Wine',
        category: 'solid',
        hex: '#6B1D2F',
        accent: '#D4AF37',
        description: 'Rich vintage mahogany burgundy with velvet backing'
      },
      {
        id: 'solid-sunset-ochre',
        name: 'Warm Sunset Honey',
        category: 'solid',
        hex: '#C88A2C',
        accent: '#1B3326',
        description: 'Warm golden honey glowing like late afternoon sunlight'
      },
      {
        id: 'solid-ivory-cream',
        name: 'Pure Bone Ivory',
        category: 'solid',
        hex: '#F5EFE6',
        accent: '#161514',
        description: 'Sophisticated off-white ivory with dark contrast stitching'
      }
    ]
  },
  {
    category: 'Design Gradients',
    type: 'gradient',
    options: [
      {
        id: 'grad-emerald-gold',
        name: 'Emerald to 24k Gold Foil Fade',
        category: 'gradient',
        hex: '#1B3326',
        gradientCss: 'linear-gradient(135deg, #1B3326 0%, #2A5A3D 45%, #C2A264 100%)',
        accent: '#D4AF37',
        description: 'Lush Nigerian emerald green fading into genuine gold leaf shimmer'
      },
      {
        id: 'grad-sunset-amber',
        name: 'Sunset Amber to Royal Indigo',
        category: 'gradient',
        hex: '#E65C00',
        gradientCss: 'linear-gradient(135deg, #E65C00 0%, #F9D423 40%, #3B2667 100%)',
        accent: '#F9D423',
        description: 'Dynamic warm sunset glow dissolving into deep nocturnal indigo'
      },
      {
        id: 'grad-ocean-wave',
        name: 'Atlantic Turquoise to Deep Marine',
        category: 'gradient',
        hex: '#134E5E',
        gradientCss: 'linear-gradient(135deg, #134E5E 0%, #20B2AA 50%, #71B280 100%)',
        accent: '#20B2AA',
        description: 'Lagos coastal wave flow with translucent pearlescent swirls'
      },
      {
        id: 'grad-nebula-violet',
        name: 'Cosmic Nebula Violet Glow',
        category: 'gradient',
        hex: '#4A00E0',
        gradientCss: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #C33764 100%)',
        accent: '#E0DDD7',
        description: 'Vibrant stage-ready ultraviolet shimmer with starlight mica'
      },
      {
        id: 'grad-rose-quartz',
        name: 'Rose Blush Quartz Ombré',
        category: 'gradient',
        hex: '#EAA29A',
        gradientCss: 'linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 50%, #C2A264 100%)',
        accent: '#D4AF37',
        description: 'Delicate mineral blush melting into warm champagne gold veins'
      }
    ]
  },
  {
    category: 'Champagne',
    type: 'champagne',
    options: [
      {
        id: 'champ-gold-shimmer',
        name: 'Champagne Gold Shimmer',
        category: 'champagne',
        hex: '#D4AF37',
        gradientCss: 'linear-gradient(135deg, #E5C07B 0%, #D4AF37 50%, #AA771C 100%)',
        accent: '#FFF',
        description: 'Ultra-luxe sparkling champagne gold with floating micro-flakes'
      },
      {
        id: 'champ-rose-blush',
        name: 'Champagne Rosé Gilded',
        category: 'champagne',
        hex: '#E8B4B8',
        gradientCss: 'linear-gradient(135deg, #F3D5D7 0%, #E8B4B8 50%, #D4AF37 100%)',
        accent: '#D4AF37',
        description: 'Warm sparkling rosé champagne flecked with fine copper leaf'
      },
      {
        id: 'champ-pearl-ivory',
        name: 'Champagne Pearlescent Cream',
        category: 'champagne',
        hex: '#F9F6EE',
        gradientCss: 'linear-gradient(135deg, #FFFFFF 0%, #F4EFE6 50%, #E5C07B 100%)',
        accent: '#AA771C',
        description: 'Opalescent mother-of-pearl sheen with subtle champagne highlights'
      },
      {
        id: 'champ-bronze-brut',
        name: 'Vintage Brut Champagne Bronze',
        category: 'champagne',
        hex: '#A38053',
        gradientCss: 'linear-gradient(135deg, #BA9B6B 0%, #997950 60%, #5E4627 100%)',
        accent: '#E5C07B',
        description: 'Aged metallic bronze champagne with rich antique warm patina'
      }
    ]
  }
]

// 2. Different Themes and Designs Available for Personalization
export const GUITAR_STRAP_THEMES: StrapThemeOption[] = [
  {
    id: 'theme-monogram-gold',
    name: '24k Gold Monogram Luxe',
    tagline: 'Classic Executive Lettering',
    description: 'Musician initials or stage name laser-cut in 24k metallic gold and permanently sealed under diamond-polished resin',
    icon: '✨'
  },
  {
    id: 'theme-afrobeat-rhythm',
    name: 'Afrobeat Rhythm & Soundwaves',
    tagline: 'West African Groove Heritage',
    description: 'Dynamic acoustic soundwaves inspired by Fela, Burna & Afrobeat basslines intertwined with gold leaf',
    icon: '🎵'
  },
  {
    id: 'theme-gospel-worship',
    name: 'Gospel & Worship Cross',
    tagline: 'Sanctuary & Praise Stage',
    description: 'Radiant handcrafted Christian cross emblem with halo gold dust, perfect for worship ministers and guitarists',
    icon: '✝️'
  },
  {
    id: 'theme-celestial-stars',
    name: 'Celestial Galaxy & Starlight',
    tagline: 'Night Sky & Constellations',
    description: 'Deep cosmic resin with holographic star dust, moon phases, and personalized birth constellation',
    icon: '🌌'
  },
  {
    id: 'theme-ankara-tribal',
    name: 'Ankara Geometric Chevron',
    tagline: 'Indigenous Handcrafted Art',
    description: 'Bold geometric African chevron and Adire motifs hand-cast with metallic bronze and emerald pigments',
    icon: '👑'
  },
  {
    id: 'theme-vintage-botanical',
    name: 'Pressed Real Flower Petals',
    tagline: 'Preserved Nature & Petals',
    description: 'Real dried Bougainvillea and jasmine petals preserved in crystal resin for acoustic & folk guitarists',
    icon: '🌸'
  }
]

// 3. Strap Styles and Widths
export const GUITAR_STRAP_STYLES: StrapStyleOption[] = [
  {
    id: 'style-padded-leather',
    name: '2.5" Soft Padded Leather Strap',
    width: 'Wide & Cushioned (2.5 inches)',
    material: 'Soft Genuine Leather + Extra-Soft Shoulder Cushion',
    description: 'Stops shoulder ache during long church services, rehearsals, and late-night concerts. Includes a shiny resin badge on the front plus a handy pick pocket.',
    bestFor: 'Live Concerts, Long Church Worship Sets'
  },
  {
    id: 'style-stage-jacquard',
    name: '2" Cool Woven Stage Strap',
    width: 'Classic Width (2 inches)',
    material: 'Strong Breathable Woven Cloth + Soft Leather Ends',
    description: 'Light on your shoulders and cool under hot stage lights, featuring a custom round resin badge with your stage name.',
    bestFor: 'Acoustic Guitar, Rhythm Playing, Studio Days'
  },
  {
    id: 'style-bass-heavy',
    name: '3" Extra-Wide Bass Comfort Strap',
    width: 'Extra Wide (3 inches)',
    material: 'Double-Padded Wide Leather with Two Matching Resin Badges',
    description: 'Takes the heavy weight off your shoulder and stops heavy 5-string & 6-string bass guitars from tilting forward while you play.',
    bestFor: 'Bass Guitars & Heavy Electric Guitars'
  },
  {
    id: 'style-luxe-velvet',
    name: '2.5" Soft Velvet Stage Edition',
    width: 'Wide & Plush (2.5 inches)',
    material: 'Soft Velvet Front + Gentle Non-Slip Underside',
    description: 'Feels amazingly soft in your hands and stays neatly in place on suit jackets and native wear without slipping.',
    bestFor: 'Weddings, Special Concerts & Stage Honors'
  }
]

// 4. Hardware Finishes
export const GUITAR_STRAP_HARDWARE: StrapHardwareOption[] = [
  { id: 'hw-gold', name: 'Mirror 24k Polished Gold', color: '#D4AF37' },
  { id: 'hw-brass', name: 'Vintage Antique Brass', color: '#B5944A' },
  { id: 'hw-noir', name: 'Matte Obsidian Noir', color: '#1E1E1E' },
  { id: 'hw-silver', name: 'Brushed Nickel Silver', color: '#C0C0C0' }
]
