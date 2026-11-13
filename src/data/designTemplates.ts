export interface FontTemplate {
  id: string
  name: string
  category: 'Serif' | 'Calligraphy' | 'Modern Sans' | 'Executive Gothic'
  fontFamilyClass: string
  sampleText: string
  description: string
  bestFor: string
}

export interface MetallicLeafTemplate {
  id: string
  name: string
  color: string
  previewGradient: string
  description: string
  vibe: string
}

export interface GradientTemplate {
  id: string
  name: string
  category: 'Emerald & Gold' | 'Sunset & Warm' | 'Cosmic & Cool' | 'Champagne & Mineral'
  gradientCss: string
  description: string
}

export interface LayoutTemplate {
  id: string
  name: string
  shape: string
  description: string
  icon: string
  bestFor: string
}

export interface AestheticPreset {
  id: string
  title: string
  themeTag: string
  font: string
  metallicLeaf: string
  gradient: string
  layout: string
  description: string
  samplePreview: {
    bgGradient: string
    fontStyle: string
    leafEffect: string
  }
}

// 1. Font Templates
export const FONT_TEMPLATES: FontTemplate[] = [
  {
    id: 'font-imperial-serif',
    name: 'Imperial Roman Serif',
    category: 'Serif',
    fontFamilyClass: 'font-serif tracking-normal',
    sampleText: 'Dr. Chidi Okonkwo · Managing Director',
    description: 'Timeless, authoritative Roman proportions with crisp serifs. Perfectly suited for executive titles, corporate awards, and formal anniversary dates.',
    bestFor: 'Corporate Desk Nameplates, Doctor / Barrister Suites, Retirement Gifts'
  },
  {
    id: 'font-royal-script',
    name: 'Royal Monogram Calligraphy',
    category: 'Calligraphy',
    fontFamilyClass: 'italic font-serif tracking-wide',
    sampleText: 'Tade & Ronke · Forever in Love',
    description: 'Flowing romantic script evoking handwritten Nigerian wedding vow notes and wax-sealed love letters.',
    bestFor: 'Wedding Memory Plaques, Anniversary LED Lamps, Bridal Shower Mirrors'
  },
  {
    id: 'font-modern-sans',
    name: 'Minimalist Architectural Sans',
    category: 'Modern Sans',
    fontFamilyClass: 'font-sans uppercase tracking-[0.2em] font-semibold',
    sampleText: 'ELIAS HENSHAW · EST. 2024',
    description: 'Clean, contemporary, geometric letterforms inspired by modern art galleries and luxury fashion houses.',
    bestFor: 'Personalized Guitar Straps, Desk Clocks, Modern Charcuterie Boards'
  },
  {
    id: 'font-executive-gothic',
    name: 'Executive Bold Header',
    category: 'Executive Gothic',
    fontFamilyClass: 'font-serif font-black tracking-tight uppercase',
    sampleText: 'CHIEF MEDICAL DIRECTOR',
    description: 'High-impact, weighty letter carving sealed with liquid gold flakes beneath glass-clear resin.',
    bestFor: 'Corporate Awards, Boardroom Nameplates, Trophy Plaques'
  }
]

// 2. Metallic Leaf & Foil Styles
export const METALLIC_LEAF_TEMPLATES: MetallicLeafTemplate[] = [
  {
    id: 'leaf-24k-gold',
    name: '24k Metallic Gold Leaf Flakes',
    color: '#D4AF37',
    previewGradient: 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #AA771C 100%)',
    description: 'Genuine floating 24k gold leaf flakes hand-scattered through clear resin layers to catch ambient room lighting.',
    vibe: 'Rich, Classy & Eye-Catching'
  },
  {
    id: 'leaf-champagne-shimmer',
    name: 'Sparkling Champagne Dust & Flecks',
    color: '#E5C07B',
    previewGradient: 'linear-gradient(135deg, #FFF1D0 0%, #E5C07B 50%, #C2A264 100%)',
    description: 'Fine champagne shimmer mica intertwined with larger metallic copper flecks for a warm glowing champagne celebration.',
    vibe: 'Modern Festive, Celebratory, Warm'
  },
  {
    id: 'leaf-rose-copper',
    name: 'Gilded Rose Gold & Copper Foil',
    color: '#E8B4B8',
    previewGradient: 'linear-gradient(135deg, #FAD0C4 0%, #E8B4B8 50%, #B76E79 100%)',
    description: 'Warm pink-copper leaf with soft metallic luster, gorgeous when paired with white preserved petals or rose quartz.',
    vibe: 'Romantic, Delicate, Intimate'
  },
  {
    id: 'leaf-silver-holographic',
    name: 'Pearlescent Silver & Starlight Foil',
    color: '#E0DDD7',
    previewGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E0DDD7 50%, #999999 100%)',
    description: 'Crisp sterling silver leaf paired with subtle holographic micro-dust that glints blue and violet under direct lamp light.',
    vibe: 'Crisp, Futuristic, Celestial'
  }
]

// 3. Color Gradients & Resin Inlay Flow
export const GRADIENT_TEMPLATES: GradientTemplate[] = [
  {
    id: 'grad-emerald-gold',
    name: 'Emerald Malachite to 24k Gold Fade',
    category: 'Emerald & Gold',
    gradientCss: 'linear-gradient(135deg, #1B3326 0%, #2A5A3D 45%, #C2A264 100%)',
    description: 'Lush Nigerian rainforest emerald swirling softly into dense clusters of metallic 24k gold leaf.'
  },
  {
    id: 'grad-sunset-amber',
    name: 'Sahel Sunset Amber to Royal Indigo',
    category: 'Sunset & Warm',
    gradientCss: 'linear-gradient(135deg, #E65C00 0%, #F9D423 40%, #3B2667 100%)',
    description: 'Rich golden hour amber fading into deep nocturnal indigo soundwaves.'
  },
  {
    id: 'grad-rose-mineral',
    name: 'Rose Quartz Blush to Champagne Gilded',
    category: 'Champagne & Mineral',
    gradientCss: 'linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 50%, #C2A264 100%)',
    description: 'Translucent mineral blush with suspended white dried floral blossoms and champagne veins.'
  },
  {
    id: 'grad-obsidian-luxe',
    name: 'Obsidian Noir to Starlight Gold',
    category: 'Cosmic & Cool',
    gradientCss: 'linear-gradient(135deg, #161514 0%, #2E2A27 50%, #D4AF37 100%)',
    description: 'Deep smoky volcanic black contrasted with brilliant gold leaf veins for executive presence.'
  },
  {
    id: 'grad-atlantic-wave',
    name: 'Atlantic Turquoise to White Sea-Foam',
    category: 'Cosmic & Cool',
    gradientCss: 'linear-gradient(135deg, #134E5E 0%, #20B2AA 50%, #E8F3EB 100%)',
    description: 'Lagos coastal wave flow with realistic 3D cell lacing and translucent marine turquoise.'
  }
]

// 4. Layout & Gift Shapes
export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'layout-beveled-block',
    name: 'Diamond-Beveled Executive Block',
    shape: 'Rectangular Prism',
    description: 'Smooth hand-polished slanted edges with a solid heavy feel. Sits proudly on any office desk.',
    icon: '🏛️',
    bestFor: 'Desk Nameplates, Paperweights, Clocks'
  },
  {
    id: 'layout-circular-medallion',
    name: 'Circular Coin Medallion with Gold Rim',
    shape: 'Circular Disk',
    description: 'Domed crystal cabochon encircled by a knurled gold metal bezel with center monogram.',
    icon: '⭕',
    bestFor: 'Guitar Straps, Coasters, Wine Stoppers'
  },
  {
    id: 'layout-river-waterfall',
    name: 'Live-Edge River Waterfall Flow',
    shape: 'Wood & Resin Fusion',
    description: 'Solid organic acacia or walnut wood bisected by a translucent colored resin river.',
    icon: '🌊',
    bestFor: 'Kitchen Charcuterie Boards, Clocks, Serving Trays'
  },
  {
    id: 'layout-kitchen-island-waterfall',
    name: 'Pinterest Waterfall Island Counter Edge',
    shape: 'Continuous Cascading Edge Board',
    description: 'Dramatic dual-slab Nigerian teak or acacia where emerald or black obsidian resin cascades continuously over the beveled serving edge.',
    icon: '🏝️',
    bestFor: 'Kitchen Island Centerpieces, Grand Charcuterie Boards, Tapas Displays'
  },
  {
    id: 'layout-kitchen-galley-paddle',
    name: 'Galley Kitchen Long Paddle Board',
    shape: 'Slim Extended Serving Paddle with Brass Inlay',
    description: 'Made for narrow kitchen counters and open shelves, featuring a glowing colored resin river and a brass hanging ring.',
    icon: '🥖',
    bestFor: 'Narrow Kitchens, Bread & Snack Platters, Coffee Bars'
  },
  {
    id: 'layout-kitchen-nook-lazy-susan',
    name: 'U-Shaped Kitchen & Breakfast Spinning Platter',
    shape: 'Smooth 360° Spinning Centerpiece',
    description: 'Round spinning platter trimmed in crystal quartz resin so family and guests can easily reach snacks and drinks around the table.',
    icon: '🔄',
    bestFor: 'Round Dining Tables, Family Breakfasts, Sharing Snacks'
  },
  {
    id: 'layout-floating-botanical',
    name: 'Floating Real-Flower Acrylic Frame',
    shape: 'Warm Glowing Display Frame',
    description: 'Crystal-clear display with real pressed flowers resting on a warm-glowing wooden lamp base.',
    icon: '✨',
    bestFor: 'Anniversary LED Lamps, Photo Plaques'
  }
]

// 5. Complete Aesthetic Presets (1-Click Decision Solutions)
export const AESTHETIC_PRESETS: AestheticPreset[] = [
  {
    id: 'preset-executive-gold',
    title: 'The Presidential Gold Suite',
    themeTag: 'Proud & Respectful',
    font: 'Classic Lettering',
    metallicLeaf: '24k Gold Leaf Flakes',
    gradient: 'Deep Emerald to 24k Gold Fade',
    layout: 'Diamond-Edged Executive Block',
    description: 'Makes any leader or boss feel deeply respected, with crisp lettering sealed over deep green swirls and golden borders.',
    samplePreview: {
      bgGradient: 'linear-gradient(135deg, #1B3326 0%, #244B34 50%, #C2A264 100%)',
      fontStyle: 'font-serif tracking-normal font-bold',
      leafEffect: '24k Gold Leaf Rim'
    }
  },
  {
    id: 'preset-afrobeat-stage',
    title: 'The Afrobeat Groove & Soundwave',
    themeTag: 'Joyful Stage Energy',
    font: 'Clean Modern Letters',
    metallicLeaf: 'Sparkling Champagne Gold Flecks',
    gradient: 'Warm Sunset Amber to Deep Indigo',
    layout: 'Round Gold-Rim Medallion',
    description: 'Full of warm stage joy and celebration. Glowing sunset amber fades into rich indigo with sparkling gold flakes and their initials.',
    samplePreview: {
      bgGradient: 'linear-gradient(135deg, #E65C00 0%, #F9D423 40%, #3B2667 100%)',
      fontStyle: 'font-sans uppercase tracking-[0.2em] font-black',
      leafEffect: 'Champagne Shimmer Inlay'
    }
  },
  {
    id: 'preset-forever-vows',
    title: 'The Forever Vows & Romantic Script',
    themeTag: 'Tender & Full of Love',
    font: 'Flowing Love Script',
    metallicLeaf: 'Soft Rose Gold & Copper Foil',
    gradient: 'Soft Rose Blush to Champagne Gold',
    layout: 'Floating Real-Flower Frame',
    description: 'Soft, heartfelt romance with flowing love-letter script, warm blush tones, and real preserved flowers sealed inside.',
    samplePreview: {
      bgGradient: 'linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 50%, #C2A264 100%)',
      fontStyle: 'italic font-serif tracking-wide font-semibold',
      leafEffect: 'Rose Gold & Floral Flakes'
    }
  },
  {
    id: 'preset-ocean-minimalist',
    title: 'The Atlantic Coastal Calm',
    themeTag: 'Calm, Fresh & Welcoming',
    font: 'Clean Modern Letters',
    metallicLeaf: 'Soft Silver & Starlight Foil',
    gradient: 'Ocean Turquoise to Creamy White Foam',
    layout: 'Natural Wood River Flow',
    description: 'Warm natural wood flowing with soft ocean blue waves, shimmering silver flecks, and clean custom lettering for peaceful gatherings.',
    samplePreview: {
      bgGradient: 'linear-gradient(135deg, #134E5E 0%, #20B2AA 50%, #E8F3EB 100%)',
      fontStyle: 'font-sans uppercase tracking-[0.16em] font-medium',
      leafEffect: 'Seafoam Lacing & Silver'
    }
  },
  {
    id: 'preset-pinterest-kitchen-island',
    title: 'The Waterfall Kitchen Table',
    themeTag: 'Warm Family Hosting',
    font: 'Clean Modern Letters',
    metallicLeaf: '24k Gold Leaf Flakes',
    gradient: 'Deep Emerald to 24k Gold Fade',
    layout: 'Natural Waterfall Edge',
    description: 'Combines rich warm wood with a deep green resin river, gentle gold veins, and a smooth food-safe finish ready for family meals.',
    samplePreview: {
      bgGradient: 'linear-gradient(135deg, #163625 0%, #24583B 55%, #C2A264 100%)',
      fontStyle: 'font-sans uppercase tracking-[0.2em] font-semibold',
      leafEffect: '24k Gold River Veins'
    }
  }
]
