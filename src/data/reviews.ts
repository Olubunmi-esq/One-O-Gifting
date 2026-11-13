export interface Review {
  id: string
  productId?: string // Can link directly to a specific product ID
  giftSetName?: string // Human-friendly name of the gift set ordered
  collection?: string // Or fall back to a matching collection
  itemType?: string // Or fall back to item type
  author: string
  location: string
  rating: number // 1 to 5
  date: string
  occasion: string
  title: string
  comment: string
  verifiedBuyer: boolean
  helpfulCount: number
}

export const MOCK_REVIEWS: Review[] = [
  // 1. "With Love" Ready-Made Birthday Gift Box
  {
    id: 'rev-bday-box-1',
    productId: 'birthday-curated-luxury-gift-box',
    giftSetName: 'The "With Love" Ready-Made Birthday Gift Box',
    collection: 'Birthday Celebrations',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Adaora Nwosu',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    date: '3 days ago',
    occasion: 'Best Friend’s 30th Birthday',
    title: 'She cried happy tears the moment she opened the box',
    comment: 'I ordered the "With Love" Birthday Gift Box and shared her favorite blush pink color and dried petals with the representative on WhatsApp. Every piece—the photo frame, the pair of coasters, bookmark, and jewelry dish—matched cleanly. My friend keeps the ring dish right beside her bed and still sends me photos of it.',
    verifiedBuyer: true,
    helpfulCount: 34
  },
  {
    id: 'rev-bday-box-2',
    productId: 'birthday-curated-luxury-gift-box',
    giftSetName: 'The "With Love" Ready-Made Birthday Gift Box',
    collection: 'Birthday Celebrations',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Bolanle Ojo',
    location: 'Bodija, Ibadan',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Mother’s Birthday Surprise',
    title: 'Ready to hand over straight out of the delivery bag',
    comment: 'My mum usually gives away gift items she doesn’t use, so getting her this gift box was the best decision. She put her wedding throwback photo in the frame and uses the coasters every morning for her tea. The handwritten card inside made her smile all week.',
    verifiedBuyer: true,
    helpfulCount: 21
  },
  {
    id: 'rev-bday-box-3',
    productId: 'birthday-curated-luxury-gift-box',
    giftSetName: 'The "With Love" Ready-Made Birthday Gift Box',
    collection: 'Birthday Celebrations',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Seyi Adeyinka',
    location: 'Wuse 2, Abuja',
    rating: 4,
    date: '3 weeks ago',
    occasion: 'Sister’s 25th Birthday',
    title: 'Beautiful custom work and arrived safely in Abuja',
    comment: 'Everything inside the gift box came packed in thick protective wrap with zero scratches. Chose emerald colors on WhatsApp and they showed me finished pictures before sending it out. Would happily order another set soon.',
    verifiedBuyer: true,
    helpfulCount: 14
  },

  // 2. Executive Desk Nameplate
  {
    id: 'rev-corp-1',
    productId: 'executive-sculpted-desk-nameplate',
    giftSetName: 'Executive Sculpted Desk Nameplate Block',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk Nameplates & Signage',
    author: 'Barr. Folashade Adeleke',
    location: 'Ikoyi, Lagos',
    rating: 5,
    date: '3 days ago',
    occasion: 'Promotion to Managing Partner',
    title: 'Solid, weighty desk piece that commands genuine respect',
    comment: 'Ordered this for our principal partner in Victoria Island to celebrate his appointment. It has a reassuring solid weight on the desk and clear lettering inside. Delivered within 48 hours to Ikoyi neatly packed in a presentation box.',
    verifiedBuyer: true,
    helpfulCount: 24
  },
  {
    id: 'rev-corp-2',
    productId: 'executive-sculpted-desk-nameplate',
    giftSetName: 'Executive Sculpted Desk Nameplate Block',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk Nameplates & Signage',
    author: 'Engr. Babatunde Lawal',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: 'Executive Office Dedication',
    title: 'Every client walking into my Abuja office asks who made it',
    comment: 'Sent my name, title, and preferred colors on WhatsApp after ordering. The ONE O team shared a quick preview before crafting. It arrived safely in Abuja inside bubble foam and a ribboned box.',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-corp-3',
    productId: 'executive-sculpted-desk-nameplate',
    giftSetName: 'Executive Sculpted Desk Nameplate Block',
    collection: 'Retirement Sets',
    itemType: 'Desk Nameplates & Signage',
    author: 'Dr. (Mrs.) Ifeoma Nnamdi',
    location: 'GRA, Port Harcourt',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Medical Director Send-Off',
    title: 'Brought happy tears to our retiring Chief Medical Officer',
    comment: 'We paired this nameplate with the standing desk clock. Seeing his full name and medical title displayed proudly made our whole department smile. The handwritten farewell card sealed in the box completed the gift.',
    verifiedBuyer: true,
    helpfulCount: 15
  },

  // 3. Wedding & Anniversary Couple Plaque Set
  {
    id: 'rev-wed-1',
    productId: 'couple-spotify-photo-plaque',
    giftSetName: 'Wedding & Couple Memory Photo Plaque Set',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Photo & Message Plaques',
    author: 'Tolu & Nkechi Balogun',
    location: 'Lekki, Lagos',
    rating: 5,
    date: '4 days ago',
    occasion: '5th Wedding Anniversary',
    title: 'Far more heartfelt than buying regular perfumes or shirts',
    comment: 'My husband surprised me with our traditional wedding photo set inside this clear resin plaque alongside our wedding song title. The matching ring dish holds both our bands every night. Thank you ONE O for making anniversary gifting feel so warm.',
    verifiedBuyer: true,
    helpfulCount: 31
  },
  {
    id: 'rev-wed-2',
    productId: 'couple-spotify-photo-plaque',
    giftSetName: 'Wedding & Couple Memory Photo Plaque Set',
    collection: 'Romance & Love Sets',
    itemType: 'Photo & Message Plaques',
    author: 'Osagie & Kemi Egharevba',
    location: 'Asokoro, Abuja',
    rating: 5,
    date: '10 days ago',
    occasion: '1st Wedding Anniversary',
    title: 'Bright, clear photo finish and clean edges',
    comment: 'The photo under the clear coat stayed vibrant and sharp. Picking our own wedding colors and date wording on WhatsApp was easy and quick. Truly special gift for couples.',
    verifiedBuyer: true,
    helpfulCount: 18
  },

  // 4. Owambe & Event Souvenir Packs (Min. 25 Pieces · Customizable Quote)
  {
    id: 'rev-fav-1',
    productId: 'grand-owambe-souvenir-pack-50',
    giftSetName: 'Owambe VIP Table & In-Law Souvenir Suite (Min. 25 Pieces)',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Ronke & Olumide Shodipo',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Owambe Traditional & White Wedding',
    title: 'Our VIP tables & in-laws loved the resin trays, coasters & thank-you cards',
    comment: 'Instead of disposable plastic bowls, we requested a custom quote for 40 small resin trinket trays, coasters, and initial keychains matched to our Aso-Ebi colors with a printed Thank-You Card in every bag. Guests kept texting us photos!',
    verifiedBuyer: true,
    helpfulCount: 42
  },
  {
    id: 'rev-fav-2',
    productId: 'wedding-souvenir-pack-25',
    giftSetName: 'Owambe & Wedding Guest Souvenir Pack (Min. 25 Pieces)',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Amina & Farouk Bello',
    location: 'Kano & Abuja',
    rating: 5,
    date: '3 weeks ago',
    occasion: 'Family Dinner & Nikkah VIP Favors',
    title: 'Clear quote for our exact 35-guest mix of pens, keychains & coasters',
    comment: 'Loved that we could start from 25 pieces minimum and customize the exact count to 35 for our intimate dinner. Every piece came bagged neatly with a clean Thank-You Card.',
    verifiedBuyer: true,
    helpfulCount: 27
  },
  {
    id: 'rev-fav-3',
    productId: 'deluxe-owambe-souvenir-pack-100',
    giftSetName: 'Complete Wedding, Bridesmaids, Groomsmen & Owambe Suite (Min. 25 Pcs)',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Chief (Mrs.) Bukky Adebayo',
    location: 'Abeokuta, Ogun',
    rating: 4,
    date: '1 month ago',
    occasion: 'Wedding Reception + Bridal & Groomsmen Packs',
    title: 'Bridal party, groomsmen & 120 guest favors coordinated smoothly',
    comment: 'Getting a tailored quote that combined bridesmaids packs, groomsmen packs, and 120 coaster and keychain favors with thank-you cards saved us weeks of stress.',
    verifiedBuyer: true,
    helpfulCount: 19
  },

  // 5. LED Night Lamp & Song Gift
  {
    id: 'rev-lamp-1',
    productId: 'personalized-led-night-lamp-frame',
    giftSetName: 'Illuminated Anniversary & Photo LED Night Lamp',
    collection: 'Romance & Love Sets',
    itemType: 'LED Night Lamps & Frames',
    author: 'Damilola Adeleke',
    location: 'Bodija, Ibadan',
    rating: 5,
    date: '5 days ago',
    occasion: 'Partner’s Birthday Surprise',
    title: 'The warm bedside glow at night melts hearts every evening',
    comment: 'Sent in our favorite photo and love song via WhatsApp. When she plugged it into her bedside power bank and saw the warm light illuminate our names, she was speechless. Simple USB cord works anywhere.',
    verifiedBuyer: true,
    helpfulCount: 22
  },
  {
    id: 'rev-lamp-2',
    productId: 'personalized-led-night-lamp-frame',
    giftSetName: 'Illuminated Anniversary & Photo LED Night Lamp',
    collection: 'Birthday Celebrations',
    itemType: 'LED Night Lamps & Frames',
    author: 'Chidinma Eze',
    location: 'Independence Layout, Enugu',
    rating: 5,
    date: '1 week ago',
    occasion: 'Sister’s 21st Birthday',
    title: 'Arrived safely in Enugu with zero scratches',
    comment: 'Was nervous about courier delivery for a photo lamp, but ONE O wrapped it carefully in thick foam inside a hard gift box. My sister keeps it lit beside her bed every night.',
    verifiedBuyer: true,
    helpfulCount: 16
  },

  // 6. Bridal & Groomsmen Gift Packages
  {
    id: 'rev-bridal-1',
    productId: 'bridal-party-luxury-gift-package',
    giftSetName: 'Bridal Party & Bridesmaid Appreciation Gift Box',
    collection: 'Bridal & Groomsmen Packages',
    itemType: 'Jewelry, Mirrors & Hair Accessories',
    author: 'Toluwalope A. (Maid of Honor)',
    location: 'Magodo, Lagos',
    rating: 5,
    date: '1 week ago',
    occasion: 'Bridal Train Appreciation',
    title: 'All 6 bridesmaids screamed when they opened their boxes!',
    comment: 'Each girl had her own name on her pocket mirror, hair accessories, and initial keychain—matched to our wedding colors we finalized on WhatsApp. Way better than plain disposable gift bags.',
    verifiedBuyer: true,
    helpfulCount: 38
  },
  {
    id: 'rev-groom-1',
    productId: 'groomsmen-bespoke-package',
    giftSetName: 'Groomsmen Gentleman’s Appreciation Gift Box',
    collection: 'Bridal & Groomsmen Packages',
    itemType: 'Cufflinks & Tie Clips',
    author: 'Femi Oladipo',
    location: 'Garki, Abuja',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Wedding Morning Groomsmen Gifts',
    title: 'Sharp accessories the guys wore proudly all day',
    comment: 'My groomsmen wore the custom monogram cufflinks and tie clips with their suits, and they still use the phone stand and pocket jotter at work. Worth every naira.',
    verifiedBuyer: true,
    helpfulCount: 21
  },

  // 7. December Festive Hamper Sets
  {
    id: 'rev-festive-1',
    productId: 'december-sparkle-starter-hamper',
    giftSetName: 'Sparkle Starter Festive Hamper Package',
    collection: 'December Festive & Holiday Hampers',
    itemType: 'Festive Hampers & Holiday Packages',
    author: 'Ngozi Umeh',
    location: 'Yaba, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Office Team End-of-Year Thank You',
    title: 'Way more personal than regular biscuits and wine hampers',
    comment: 'Ordered 15 Sparkle Starter hampers for our office team with each staff member’s name on their keychain and bookmark. Everyone loved getting something personal they still carry daily.',
    verifiedBuyer: true,
    helpfulCount: 25
  },
  {
    id: 'rev-festive-2',
    productId: 'december-appreciation-classic-hamper',
    giftSetName: 'Appreciation Classic Festive Hamper Package',
    collection: 'December Festive & Holiday Hampers',
    itemType: 'Festive Hampers & Holiday Packages',
    author: 'Chukwuma Obi',
    location: 'Wuse, Abuja',
    rating: 5,
    date: '1 month ago',
    occasion: 'Client Holiday Appreciation (20 Boxes)',
    title: 'Our key clients called just to thank us for the coasters and dish',
    comment: 'Usually holiday hampers disappear in two days, so clients never remember who sent them. This Appreciation Classic set sits on their desk every morning with our subtle company wish.',
    verifiedBuyer: true,
    helpfulCount: 28
  },
  {
    id: 'rev-festive-3',
    productId: 'december-executive-luxe-hamper',
    giftSetName: 'Executive Luxe VIP Festive Hamper Package',
    collection: 'December Festive & Holiday Hampers',
    itemType: 'Festive Hampers & Holiday Packages',
    author: 'Yinka Adebiyi',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '1 month ago',
    occasion: 'Managing Director & Board Gifting',
    title: 'Picked the desk clock centerpiece and they loved it',
    comment: 'Sorted out all our board members’ custom colors and names on WhatsApp in ten minutes. Every box arrived tied with ribbon and our appreciation cards handwritten cleanly inside.',
    verifiedBuyer: true,
    helpfulCount: 20
  },

  // 8. Retirement & Clock Suites
  {
    id: 'rev-clock-1',
    productId: 'executive-desk-clock-suite',
    giftSetName: 'Handmade Personalized Desk Clock',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk & Wall Clocks',
    author: 'Pastor Emmanuel E.',
    location: 'Ikeja, Lagos',
    rating: 5,
    date: '3 weeks ago',
    occasion: 'Appreciation Gift for Church Elder',
    title: 'Quiet sweep clock hands with zero ticking sound',
    comment: 'We gave this to an elder in our ministry. The clock runs silently in his quiet study, and choosing his favorite colors with the team on WhatsApp made it feel genuinely tailored.',
    verifiedBuyer: true,
    helpfulCount: 14
  },
  {
    id: 'rev-retire-1',
    productId: 'distinguished-retirement-milestone-clock-suite',
    giftSetName: 'Honorary Retirement Clock & Desk Nameplate Suite',
    collection: 'Retirement Sets',
    itemType: 'Desk & Wall Clocks',
    author: 'Mrs. Funmi Alabi',
    location: 'Akure, Ondo',
    rating: 5,
    date: '2 weeks ago',
    occasion: '35 Years Civil Service Retirement',
    title: 'Honored our retiring principal properly',
    comment: 'Pairing the desk clock with her official nameplate made her whole family emotional at her send-off dinner. It now sits right in the center of her living room shelf.',
    verifiedBuyer: true,
    helpfulCount: 17
  },
  {
    id: 'rev-retire-2',
    productId: 'executive-retirement-farewell-box',
    giftSetName: 'Executive Retirement Celebration & Farewell Dinner Gift Box',
    collection: 'Retirement Sets',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    author: 'Dr. Biodun & Directors Committee',
    location: 'Ikoyi, Lagos',
    rating: 5,
    date: '1 week ago',
    occasion: 'Executive Director Farewell Dinner',
    title: 'Meaningful pieces made for her life at home after retirement',
    comment: 'Instead of generic office pens, we requested a custom quote combining the parlor clock, lifetime service frame, home valet tray, memoir notebook, parlor coasters, and jewelry mirror set for our outgoing female MD. She was deeply touched.',
    verifiedBuyer: true,
    helpfulCount: 24
  },

  // 9. Kitchen Serving Board Suite
  {
    id: 'rev-kitchen-1',
    productId: 'pinterest-emerald-waterfall-kitchen-board',
    giftSetName: 'Waterfall Kitchen Serving / Charcuterie Board',
    collection: 'Pinterest Kitchen & Dining Collections',
    itemType: 'Kitchen Charcuterie Boards & Island Platters',
    author: 'Oluwaseun & Dami Martins',
    location: 'Chevron, Lekki',
    rating: 5,
    date: '1 week ago',
    occasion: 'Housewarming Gift for Newlyweds',
    title: 'Everyone at our Sunday hangout asked about the serving board',
    comment: 'Used it to serve suya skewers and fruit for friends moving into their new home. Having the family surname added cleanly onto the board made it feel made just for their kitchen.',
    verifiedBuyer: true,
    helpfulCount: 23
  },

  // 10. Notebooks & Mentor Appreciation Sets
  {
    id: 'rev-journal-1',
    productId: 'personalized-resin-journal-pen-set',
    giftSetName: 'A5 Hardcover Notebook & Matching Pen Set',
    collection: 'Appreciation Sets',
    itemType: 'Journals & Resin Pens',
    author: 'Titi Ogunleye',
    location: 'Surulere, Lagos',
    rating: 5,
    date: '6 days ago',
    occasion: 'Pastor’s Wife Birthday',
    title: 'Refillable hardcover notebook she carries to every service',
    comment: 'Because the pages refill easily, I know she will keep this cover for years. Picked purple tones and silver sparkles on WhatsApp and it came out neat and bright.',
    verifiedBuyer: true,
    helpfulCount: 18
  },
  {
    id: 'rev-pastor-1',
    productId: 'pastor-mentor-appreciation-plaque',
    giftSetName: 'Mentor & Pastor Appreciation Plaque & Desk Tray',
    collection: 'Appreciation Sets',
    itemType: 'Photo & Message Plaques',
    author: 'Deaconess Chinyere Okafor',
    location: 'New Haven, Enugu',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Pastor Appreciation Sunday',
    title: 'Carried the exact blessing scripture we wanted',
    comment: 'A simple text felt too small for a pastor who prayed with our family all year. Having Numbers 6:24 and his name set inside the plaque truly touched his heart.',
    verifiedBuyer: true,
    helpfulCount: 16
  },

  // 11. Guitar Straps & Music Gifts
  {
    id: 'rev-strap-1',
    productId: 'bespoke-resin-accent-guitar-strap',
    giftSetName: 'Handmade Personalized Resin Accent Guitar Strap',
    collection: 'Birthday Celebrations',
    itemType: 'Personalized Guitar Straps & Music Gifts',
    author: 'Tomiwa D. (Lead Guitarist)',
    location: 'Surulere, Lagos',
    rating: 5,
    date: '4 days ago',
    occasion: '30th Birthday Gift from Bandmates',
    title: 'Soft shoulder padding and stage name sealed cleanly inside',
    comment: 'My band ordered this for my birthday before tour. Seeing my stage name sealed in shiny clear resin with a matching pick inside the slot blew me away—comfortable even during 3-hour church and festival sets.',
    verifiedBuyer: true,
    helpfulCount: 35
  },
  {
    id: 'rev-strap-2',
    productId: 'bespoke-resin-accent-guitar-strap',
    giftSetName: 'Handmade Personalized Resin Accent Guitar Strap',
    collection: 'Appreciation Sets',
    itemType: 'Personalized Guitar Straps & Music Gifts',
    author: 'Minister Joshua Adeleke',
    location: 'Gwarinpa, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: 'Music Director Appreciation',
    title: 'Touched our worship guitarist right after Sunday rehearsal',
    comment: 'We customized it with his initials and chosen colors via WhatsApp. Arrived safely to Abuja with the gift box and handwritten choir card.',
    verifiedBuyer: true,
    helpfulCount: 26
  },

  // 12. Everyday Tokens & General Reviews
  {
    id: 'rev-key-1',
    productId: 'resin-alphabet-keychain-gold',
    giftSetName: 'Custom Initial Letter Keychain (A–Z)',
    collection: 'Under ₦10,000 Everyday Boutique',
    itemType: 'Letter Keychains & Lapel Pins',
    author: 'Zainab Aliyu',
    location: 'Kaduna',
    rating: 5,
    date: '5 days ago',
    occasion: 'Sweet "Thinking of You" Surprise',
    title: 'Affordable little gift that still feels genuinely personal',
    comment: 'Ordered 4 different letters for close friends at ₦4,000 each and let ONE O customize the colors we chose on WhatsApp. Everyone keeps theirs on their car keys daily.',
    verifiedBuyer: true,
    helpfulCount: 29
  },
  {
    id: 'rev-gen-2',
    collection: 'Birthday Celebrations',
    author: 'Khadijah Sani',
    location: 'Wuse 2, Abuja',
    rating: 5,
    date: '3 weeks ago',
    occasion: '30th Birthday Gift Box',
    title: 'Honest Nigerian prices for handmade personalized pieces',
    comment: 'From ₦3,000 bookmarks up to complete gift boxes, everything arrives neatly wrapped with a handwritten card so you can hand it over immediately with confidence.',
    verifiedBuyer: true,
    helpfulCount: 33
  },
  {
    id: 'rev-gen-3',
    collection: 'Romance & Love Sets',
    author: 'Kayode & Simi',
    location: 'Ajah, Lagos',
    rating: 4,
    date: '2 weeks ago',
    occasion: 'Spontaneous "Just Because" Love Gift',
    title: 'Handwritten note card and neat ribbon wrapping won her over',
    comment: 'The presentation was lovely from the satin ribbon to the card message inside. Looks even warmer in person than in photos.',
    verifiedBuyer: true,
    helpfulCount: 17
  }
]

/**
 * Returns reviews matching a specific product/gift set first, then falls back to related collection/itemType/general reviews
 */
export function getProductReviews(
  productId?: string,
  collection?: string,
  itemType?: string
): Review[] {
  if (!productId) return MOCK_REVIEWS.slice(0, 6)

  // 1. Direct match for this exact gift set / item
  const exactMatches = MOCK_REVIEWS.filter((r) => r.productId === productId)

  // 2. Collection or ItemType matches
  const relatedMatches = MOCK_REVIEWS.filter(
    (r) =>
      r.productId !== productId &&
      ((collection && r.collection === collection) ||
        (itemType && r.itemType === itemType))
  )

  // 3. Fallbacks from wider happy customers
  const generalMatches = MOCK_REVIEWS.filter(
    (r) => r.productId !== productId && !exactMatches.some((m) => m.id === r.id)
  )

  const combined = [...exactMatches, ...relatedMatches, ...generalMatches]

  const seen = new Set<string>()
  const result: Review[] = []
  for (const review of combined) {
    if (!seen.has(review.id)) {
      seen.add(review.id)
      result.push(review)
    }
  }

  return result.slice(0, 6)
}

/**
 * Computes real average rating, 5-to-1 star distribution counts, and recommendation rate
 */
export function calculateReviewStats(reviews: Review[]) {
  if (!reviews || reviews.length === 0) {
    return {
      average: 5.0,
      totalCount: 0,
      recommendedPercent: 100,
      starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
    }
  }

  const total = reviews.length
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  const average = Number((sum / total).toFixed(1))

  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  let recommendedCount = 0
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)))
    starCounts[star] = (starCounts[star] || 0) + 1
    if (star >= 4) recommendedCount += 1
  })

  const recommendedPercent = Math.round((recommendedCount / total) * 100)

  return {
    average,
    totalCount: total,
    recommendedPercent,
    starCounts
  }
}
