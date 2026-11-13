import { Product } from './products'

export interface ProductCareProfile {
  materialKey:
    | 'wood-resin'
    | 'led-wood-resin'
    | 'leather-resin'
    | 'botanical-photo-resin'
    | 'wearable-metal-resin'
    | 'stationery-resin'
    | 'brass-decor-resin'
    | 'solid-cast-resin'
  materialType: string
  summary: string
  cleaningStep: string
  heatAndSun: string
  storageAndMaintenance: string
  avoidTip: string
  isCustomMaterialApplied: boolean
}

export function getProductCareProfile(
  product: Product,
  selectedBaseMaterialId?: string,
  hasPickedCustomStyle?: boolean
): ProductCareProfile {
  const titleAndType = `${product.title} ${product.subtitle} ${product.itemType}`.toLowerCase()
  const haystack = [
    product.id,
    titleAndType,
    product.resinPalette,
    product.description,
    ...product.itemsIncluded,
    ...product.resinDetails,
    ...product.tags
  ]
    .join(' ')
    .toLowerCase()

  const customMaterial = hasPickedCustomStyle ? selectedBaseMaterialId : undefined

  // 1. Food-Safe Hardwood & Epoxy River Serving Pieces (or user picked acacia/teak base)
  if (
    customMaterial === 'live-edge-acacia' ||
    customMaterial === 'reclaimed-teak' ||
    product.isFoodSafe ||
    product.itemType === 'Kitchen Charcuterie Boards & Island Platters' ||
    titleAndType.includes('charcuterie') ||
    titleAndType.includes('serving board') ||
    titleAndType.includes('lazy susan') ||
    titleAndType.includes('paddle board')
  ) {
    const woodName =
      customMaterial === 'reclaimed-teak' || haystack.includes('teak')
        ? 'Nigerian Teak Hardwood'
        : 'Natural Acacia / Hardwood'

    return {
      materialKey: 'wood-resin',
      materialType: `Food-Safe Epoxy & ${woodName}`,
      summary:
        'Combined timber-and-resin serving pieces stay food-safe and glossy when hand-washed lightly and oiled periodically.',
      cleaningStep:
        'Wipe with lukewarm water and mild dish soap using a soft sponge, then dry immediately with a clean cotton towel.',
      heatAndSun:
        'Safe for chilled platters and warm bites up to 50°C—use a trivet under hot pots, cast-iron pans, or boiling kettles.',
      storageAndMaintenance:
        'Rub a thin coat of food-grade mineral oil or beeswax onto the bare wood portion every 4–6 weeks to prevent drying.',
      avoidTip:
        'Never soak in water, run through a dishwasher, microwave, or cut with sharp serrated knives directly across the glossy resin river.',
      isCustomMaterialApplied: Boolean(
        customMaterial === 'live-edge-acacia' || customMaterial === 'reclaimed-teak'
      )
    }
  }

  // 2. Leather & Sealed Resin Guitar Straps
  if (
    product.isGuitarStrap ||
    product.itemType === 'Personalized Guitar Straps & Music Gifts' ||
    titleAndType.includes('guitar strap')
  ) {
    return {
      materialKey: 'leather-resin',
      materialType: 'Full-Grain Padded Leather, Metal Buckles & Sealed Resin Badge',
      summary:
        'Supple leather straps with embedded resin name badges balance moisture-wiping on the leather with gentle polishing on the crest.',
      cleaningStep:
        'Blot rehearsal perspiration off the leather with a dry cloth; buff the glossy resin medallion cleanly with a microfiber cloth.',
      heatAndSun:
        'Store away from hot car trunks, damp gig bags, and direct stage spotlights between sets.',
      storageAndMaintenance:
        'Roll loosely for transport rather than folding sharply over the resin emblem, and apply neutral leather balm twice yearly to leather only.',
      avoidTip:
        'Keep leather conditioner, alcohol sprays, and wet wipes off the metal hardware and crystal resin badge.',
      isCustomMaterialApplied: false
    }
  }

  // 3. Illuminated LED & Solid Beechwood Stand Pieces
  if (
    customMaterial === 'warm-led-wood' ||
    /\bled\b/.test(titleAndType) ||
    titleAndType.includes('night lamp') ||
    titleAndType.includes('night light')
  ) {
    return {
      materialKey: 'led-wood-resin',
      materialType: 'Crystal-Clear Epoxy Panel & Beechwood LED Base',
      summary:
        'Optical resin light panels require dry dusting and moisture protection around the USB-powered wooden base.',
      cleaningStep:
        'Unplug the USB cable first, then wipe fingerprints off the clear resin panel using a dry or lightly water-misted microfiber cloth.',
      heatAndSun:
        'Keep out of direct harsh afternoon window sun to preserve internal portrait brilliance and prevent wood base warping.',
      storageAndMaintenance:
        'Use a gentle 5V USB adapter or power bank and rest the beechwood stand on dry bedside surfaces away from spilled drinks.',
      avoidTip:
        'Never spray window cleaner, ammonia, or alcohol onto clear resin—harsh cleaners cause clouding and micro-cracks.',
      isCustomMaterialApplied: Boolean(customMaterial === 'warm-led-wood')
    }
  }

  // 4. Pressed Flowers, Bouquet Preservation & Sealed Photo / Ultrasound / Hair Keepsakes
  if (
    product.itemType === 'Flower Preservation & Pyramids' ||
    titleAndType.includes('bouquet') ||
    titleAndType.includes('preservation') ||
    titleAndType.includes('ultrasound') ||
    titleAndType.includes('hair curl') ||
    titleAndType.includes('hair-curl') ||
    titleAndType.includes('dried flower') ||
    titleAndType.includes('pressed') ||
    titleAndType.includes('photo frame') ||
    titleAndType.includes('photo plaque') ||
    titleAndType.includes('photo clock') ||
    titleAndType.includes('spotify')
  ) {
    return {
      materialKey: 'botanical-photo-resin',
      materialType: 'UV-Stabilized Resin with Preserved Botanicals / Photos',
      summary:
        'Real pressed petals, keepsake paper, and portraits are sealed against humidity and require UV-mindful indoor placement.',
      cleaningStep:
        'Dust weekly with a dry lint-free microfiber cloth or soft brush; use a lightly damp cloth only for stubborn fingerprints.',
      heatAndSun:
        'Display indoors away from direct window sunlight, humid bathrooms, and AC heat vents to keep petals and photo inks vivid for decades.',
      storageAndMaintenance:
        'Place heavier preservation blocks and pyramids on flat, padded tabletops away from sharp furniture edges.',
      avoidTip:
        'Avoid acetone, glass cleaners, damp outdoor balconies, and prolonged direct UV light which gradually mellows natural botanicals.',
      isCustomMaterialApplied: false
    }
  }

  // 5. Brass-Handled Trays, Coasters, Stoppers, Candle Holders & Clocks
  if (
    customMaterial === 'brass-hardware' ||
    product.itemType === 'Desk & Wall Clocks' ||
    product.itemType === 'Ring Dishes & Catch-All Trays' ||
    product.itemType === 'Coaster Sets & Bottle Stoppers' ||
    titleAndType.includes('coaster') ||
    titleAndType.includes('clock') ||
    titleAndType.includes('tray') ||
    titleAndType.includes('dish') ||
    titleAndType.includes('bottle stopper') ||
    titleAndType.includes('candle holder') ||
    titleAndType.includes('tealight')
  ) {
    return {
      materialKey: 'brass-decor-resin',
      materialType: 'Heat-Tolerant Epoxy Resin & Brushed Brass / Metal Fittings',
      summary:
        'Everyday trays, coasters, clocks, candle holders, and dishes handle warm drinks and daily dusting while keeping metal fittings gleaming.',
      cleaningStep:
        'Wipe spills off coasters and trays with mild soapy water and a soft cloth; dust clock faces, candle inserts, and brass handles dry only.',
      heatAndSun:
        'Coasters handle warm mugs up to ~55°C; keep candle holders fitted strictly with metal-cup tealights and trim wicks before lighting.',
      storageAndMaintenance:
        'Use a fresh leak-proof AA battery in silent desk clocks and buff brushed brass tray handles gently with a dry flannel cloth.',
      avoidTip:
        'Never place hot baking pots onto resin trays, scrub metallic rims with steel wool, or load resin dishes in a dishwasher.',
      isCustomMaterialApplied: Boolean(customMaterial === 'brass-hardware')
    }
  }

  // 6. Hardcover Resin-Embellished Stationery (Notebooks, Jotters, Bookmarks & Pens)
  if (
    product.itemType === 'Journals & Resin Pens' ||
    titleAndType.includes('notebook') ||
    titleAndType.includes('jotter') ||
    titleAndType.includes('journal') ||
    titleAndType.includes('bookmark') ||
    titleAndType.includes('ballpoint pen') ||
    titleAndType.includes('writing pen') ||
    titleAndType.includes('resin pen')
  ) {
    return {
      materialKey: 'stationery-resin',
      materialType: 'Gloss Epoxy Cover / Barrel & Refillable Stationery',
      summary:
        'Refillable resin-coated notebooks, bookmarks, and pens blend durable wipeable surfaces with everyday paper and ink mechanics.',
      cleaningStep:
        'Wipe ink marks or dust off resin covers, bookmarks, and pen barrels with a dry or barely damp microfiber cloth—keep inner paper dry.',
      heatAndSun:
        'Keep pens and resin-bound notebooks out of hot car dashboards so ink cartridges do not leak and covers stay flat.',
      storageAndMaintenance:
        'Replace standard binder paper inserts or ballpoint ink refills anytime while keeping your custom resin cover or barrel indefinitely.',
      avoidTip:
        'Do not bend resin-coated hardcover spines past 180° flat, submerge covers in water, or drop pen tips onto tiled floors.',
      isCustomMaterialApplied: false
    }
  }

  // 7. Wearable Jewelry, Hair Clips, Lapel Pins, Cufflinks & Keychains
  if (
    product.itemType === 'Jewelry, Mirrors & Hair Accessories' ||
    product.itemType === 'Cufflinks & Tie Clips' ||
    product.itemType === 'Letter Keychains & Lapel Pins' ||
    titleAndType.includes('keychain') ||
    titleAndType.includes('jewelry') ||
    titleAndType.includes('pendant') ||
    titleAndType.includes('bracelet') ||
    titleAndType.includes('earring') ||
    titleAndType.includes('cufflink') ||
    titleAndType.includes('hijab pin') ||
    titleAndType.includes('lapel pin') ||
    titleAndType.includes('hair clip') ||
    titleAndType.includes('brooch')
  ) {
    return {
      materialKey: 'wearable-metal-resin',
      materialType: 'Lightweight Cast Epoxy & Gold/Silver-Tone Metal Findings',
      summary:
        'Wearable resin pieces, mirrors, keychains, and plated clasps stay bright and scratch-free when kept clear of cosmetics and sharp keys.',
      cleaningStep:
        'Wash lightly with cool water and mild soap if needed, rinse briefly, and dry both resin and metal rings immediately with a soft cloth.',
      heatAndSun:
        'Put necklaces, cufflinks, earrings, and pins on after applying perfume or lotion—remove before showering, swimming, or sleeping.',
      storageAndMaintenance:
        'Store each wearable piece separately inside its velvet pouch or lined gift box so metal clasps and house keys do not scuff the gloss.',
      avoidTip:
        'Avoid perfume alcohol sprays directly on metal findings, abrasive polishing pastes, and tossing loose pieces inside pockets with sharp coins.',
      isCustomMaterialApplied: false
    }
  }

  // 8. Default Solid Crystal-Clear Cast Resin (Nameplates, Plaques, Trophies, Phone Stands, Magnets, Ornaments, Custom Boxes)
  return {
    materialKey: 'solid-cast-resin',
    materialType: 'Solid UV-Resistant Cast Epoxy Resin',
    summary:
      'Hand-poured solid resin blocks, plaques, stands, and assorted gift boxes stay glass-clear with simple microfiber care and cool indoor display.',
    cleaningStep:
      'Wipe smudges gently using lukewarm water, a drop of mild dish soap, and a soft microfiber cloth; pat dry to prevent water spots.',
    heatAndSun:
      'Display away from open flames, hot stoves (>50°C), and harsh direct sunlight to maintain non-yellowing optical clarity.',
    storageAndMaintenance:
      'Rest freestanding plaques, nameplates, and phone stands on flat surfaces with their protective felt pads or display easel intact.',
    avoidTip:
      'Never use acetone, bleach, nail polish remover, rough scouring pads, or dry paper towels that can micro-scratch high-gloss resin.',
    isCustomMaterialApplied: Boolean(customMaterial === 'solid-epoxy')
  }
}
