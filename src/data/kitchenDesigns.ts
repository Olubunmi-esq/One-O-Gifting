export interface KitchenDesignTemplate {
  id: string
  name: string
  layoutType: 'Island Kitchen' | 'Galley Kitchen' | 'U-Shaped Kitchen' | 'Peninsula Nook' | 'Parallel Kitchen' | 'Outdoor Lanai'
  pinterestAesthetic: string
  tagline: string
  description: string
  includedResinPieces: string[]
  resinPalette: string
  price: number // in NGN
  originalPrice: number
  imageUrl: string
  bestFor: string
  pinterestKeywords: string[]
}

export const KITCHEN_DESIGN_TEMPLATES: KitchenDesignTemplate[] = [
  {
    id: 'kitchen-waterfall-island',
    name: 'The Waterfall Island Gourmet Suite',
    layoutType: 'Island Kitchen',
    pinterestAesthetic: 'Modern Luxe White Quartz Island with Warm Oak Accents',
    tagline: 'Big real acacia wood serving board with green emerald resin river for kitchen islands',
    description: 'Made to be the centerpiece when family and friends gather around your kitchen island. Warm natural acacia wood meets a shiny green resin river with floating gold flakes—turning weekend small chops, roasted meats, and drinks into a moment everyone smiles and talks about.',
    includedResinPieces: [
      'Large Real Wood & Emerald Green Resin Serving Board (55cm × 25cm)',
      '6 Matching Gold-Edged Resin Drink Coasters',
      'Brass Serving Knife with Matching Resin Handle',
      'Protected with a Food-Safe Wax Seal for Serving Snacks & Food'
    ],
    resinPalette: 'Regal Emerald Green & 24k Gold Leaf River',
    price: 61500,
    originalPrice: 67500,
    imageUrl: '/src/assets/images/pinterest_kitchen_resin_1794047672822.jpg',
    bestFor: 'Open-concept luxury homes, housewarming gifts, wedding presents',
    pinterestKeywords: ['Waterfall Island', 'Emerald River Board', 'Pinterest Kitchen Decor', 'Acacia Charcuterie']
  },
  {
    id: 'kitchen-scandinavian-galley',
    name: 'The Nordic Galley & Linear Kitchen Suite',
    layoutType: 'Galley Kitchen',
    pinterestAesthetic: 'Scandinavian Minimalist Oak, Clean White Tile & Brass Faucets',
    tagline: 'Slim ocean wave paddle board and matching spoon rest made for cozy city kitchens',
    description: 'A thoughtful fit for apartments and neat home kitchens where counter space matters. Features gentle ocean-blue waves hand-poured with white sea-foam and a matching spoon rest that keeps cooking counters clean and cheerful.',
    includedResinPieces: [
      'Ocean Wave Paddle Serving Board with Handle (48cm × 18cm)',
      'Matching Handmade Resin Cooking Spoon Rest',
      'Airtight Bottle Stopper Topped with Shiny Gold-Leaf Resin',
      'Leather Hanging Strap so You Can Display It on Your Wall'
    ],
    resinPalette: 'Atlantic Turquoise to Deep Marine Sea-Foam',
    price: 33500,
    originalPrice: 37000,
    imageUrl: '/src/assets/images/resin_ocean_wave_board_1794039189782.jpg',
    bestFor: 'City apartments, clean minimalist kitchens, everyday tapas & fruit prep',
    pinterestKeywords: ['Galley Kitchen Design', 'Ocean Wave Board', 'Scandinavian Kitchen Decor', 'Minimalist Kitchen']
  },
  {
    id: 'kitchen-u-shaped-gourmet',
    name: 'The U-Shaped Wrap-Around Chef\'s Suite',
    layoutType: 'U-Shaped Kitchen',
    pinterestAesthetic: 'French Country Modern with Fluted Cabinets & Marble Backsplash',
    tagline: 'Complete family serving set for cooking, brunch, and welcoming guests',
    description: 'Made for anyone who loves cooking and welcoming people into their home. Includes a strong wood-and-resin serving board, four shiny crystal drink coasters for morning tea or guests, and a matching wine bottle stopper.',
    includedResinPieces: [
      'Strong Natural Wood & Resin Bread & Snack Platter (45cm × 22cm)',
      'Set of 4 Handcrafted Crystal Drink Coasters with Gold Rims',
      'Shiny Resin Bottle Stopper inside a Soft Velvet Pouch',
      'Soft Protective Base Pads so It Never Scratches Your Counter'
    ],
    resinPalette: 'Geode Amethyst & 24k Gold Shimmer',
    price: 48000,
    originalPrice: 53000,
    imageUrl: '/src/assets/images/resin_geode_board_set_1793922101432.jpg',
    bestFor: 'Family kitchens, weekend baking, holiday hosting',
    pinterestKeywords: ['U-Shaped Kitchen Inspiration', 'Geode Resin Set', 'Gourmet Kitchen Accessories', 'Cheese Platter']
  },
  {
    id: 'kitchen-peninsula-nook',
    name: 'The Peninsula & Breakfast Nook Morning Suite',
    layoutType: 'Peninsula Nook',
    pinterestAesthetic: 'Sunny Boho Kitchen Peninsula with Fluted Barstools & Terracotta',
    tagline: 'Soft rose blush quartz and gilded handles for cozy breakfast bars & coffee nooks',
    description: 'Made to brighten quiet morning tea, coffee, and weekend breakfasts. Soft pink rose-quartz resin with warm gold handles turns an everyday tray of pastries and cups into a sweet moment that feels like a cozy vacation.',
    includedResinPieces: [
      'Rose Pink & Gold Flake Serving Tray with Brass Handles (38cm × 24cm)',
      'Set of 4 Hexagon Flower Coasters with Real Dried Petals',
      'Matching Small Resin Sugar & Treat Dish',
      'Smooth, Easy-to-Wipe Top Finish'
    ],
    resinPalette: 'Rose Quartz Blush & Champagne Gold Leaf',
    price: 47500,
    originalPrice: 52000,
    imageUrl: '/src/assets/images/resin_rose_quartz_tray_1793922101988.jpg',
    bestFor: 'Breakfast bar counters, birthday gifts for wives and mothers, tea lovers',
    pinterestKeywords: ['Breakfast Nook Ideas', 'Rose Quartz Tray', 'Peninsula Counter Decor', 'Brunch Board']
  },
  {
    id: 'kitchen-parallel-double-counter',
    name: 'The Parallel Double-Counter Executive Suite',
    layoutType: 'Parallel Kitchen',
    pinterestAesthetic: 'Industrial Loft with Matte Black Steel, Smoked Oak & Live Edge Wood',
    tagline: 'Smoky obsidian and champagne bronze board suite for double-sided chef kitchens',
    description: 'A bold, clean style made for modern double-counter kitchens. Dark walnut wood paired with black resin and warm bronze flakes makes suya, grilled meats, snacks, and drinks look amazing when you serve guests.',
    includedResinPieces: [
      'Dark Walnut & Obsidian Noir River Carving Platter (50cm × 24cm)',
      'Pair of Heavy Resin Wine & Balsamic Pouring Stoppers',
      'Square Obsidian Noir & Champagne Coasters (Set of 4)',
      'Presentation Gift Casket with Black Velvet Ribbon'
    ],
    resinPalette: 'Obsidian Noir & Vintage Brut Champagne Bronze',
    price: 64000,
    originalPrice: 70500,
    imageUrl: '/src/assets/images/pinterest_kitchen_resin_1794047672822.jpg',
    bestFor: 'Executive home kitchens, steak lovers, Father\'s day, housewarmings',
    pinterestKeywords: ['Parallel Kitchen Layout', 'Obsidian Charcuterie', 'Industrial Kitchen Aesthetic', 'Black Walnut Board']
  },
  {
    id: 'kitchen-alfresco-outdoor-patio',
    name: 'The Al-Fresco Outdoor Lanai & Barbecue Suite',
    layoutType: 'Outdoor Lanai',
    pinterestAesthetic: 'Tropical Resort Veranda, Travertine Countertops & Covered Pergola',
    tagline: 'UV-resistant outdoor patio serving board and heavy coaster set for weekend cookouts',
    description: 'Built for sunny weekend barbecues, veranda hangouts, and outdoor family dinners. Keeps its clear, bright shine outdoors without fading in the sun—perfect for bringing everyone together over grilled food and cold drinks.',
    includedResinPieces: [
      'Ocean Wave Resin & Wood Outdoor Serving Platter (46cm × 22cm)',
      'Set of 6 Sturdy Drink Coasters for Outdoor Tables',
      'Stainless Steel Bottle Opener with Matching Resin Handle',
      'Free Handwritten Host Greeting Card with Wax Seal'
    ],
    resinPalette: 'Pacific Wave Surf & Turquoise Pearl',
    price: 62000,
    originalPrice: 68000,
    imageUrl: '/src/assets/images/resin_ocean_wave_board_1794039189782.jpg',
    bestFor: 'Outdoor patio kitchens, barbecue hosts, holiday homes, Sunday gatherings',
    pinterestKeywords: ['Outdoor Kitchen Ideas', 'Lanai Entertaining', 'Coastal Serving Board', 'Barbecue Accessories']
  }
]
