export interface Review {
  id: string
  productId?: string
  giftSetName?: string
  collection?: string
  itemType?: string
  tags?: string[]
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

export interface ReviewStats {
  average: number
  totalCount: number
  recommendedPercent: number
  starCounts: Record<number, number>
}

export const MOCK_REVIEWS: Review[] = [
  // Birthday Boxes & Packages
  {
    id: 'rev-bday-box-1',
    productId: 'birthday-curated-luxury-gift-box',
    giftSetName: 'The "With Love" Ready-Made Birthday Gift Box',
    collection: 'Birthday Celebrations',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    tags: ['birthday', 'gift box', 'frame', 'coasters', 'dish'],
    author: 'Adaora Nwosu',
    location: 'Lekki, Lagos',
    rating: 5,
    date: '3 days ago',
    occasion: '30th Birthday',
    title: 'She loved every matching piece',
    comment: 'Picked blush pink with dried petals on WhatsApp—the frame, coasters, and ring dish matched neatly and arrived ready to hand over.',
    verifiedBuyer: true,
    helpfulCount: 34
  },
  {
    id: 'rev-bday-box-2',
    productId: 'birthday-curated-luxury-gift-box',
    giftSetName: 'The "With Love" Ready-Made Birthday Gift Box',
    collection: 'Birthday Celebrations',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    tags: ['birthday', 'mum', 'gift box'],
    author: 'Bolanle Ojo',
    location: 'Bodija, Ibadan',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Mum’s Birthday',
    title: 'Ready to gift straight from the bag',
    comment: 'My mum uses the coasters every morning and keeps her photo in the frame. The handwritten note card inside was a lovely touch.',
    verifiedBuyer: true,
    helpfulCount: 21
  },
  {
    id: 'rev-bday-pkg-1',
    productId: 'pkg-birthday-luxe',
    giftSetName: 'Birthday Luxe Package',
    collection: 'Birthday Celebrations',
    itemType: 'Occasion Gift Packages',
    tags: ['birthday', 'package', 'luxe', 'crown', 'glow', 'mini', 'box'],
    author: 'Seyi Adeyinka',
    location: 'Wuse 2, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: '25th Birthday',
    title: 'Fast quote and zero delivery damage',
    comment: 'Got a clear quote on WhatsApp in minutes, approved finished photos before dispatch, and the luxury box reached Abuja spotless.',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-bday-kids-1',
    productId: 'pkg-kids-party-favour',
    giftSetName: 'Kids Party Favour Pack',
    collection: 'Birthday Celebrations',
    itemType: 'Occasion Gift Packages',
    tags: ['kids', 'party', 'favour', 'keychain', 'bag charm'],
    author: 'Nneka Okafor',
    location: 'Ikeja, Lagos',
    rating: 5,
    date: '10 days ago',
    occasion: '7th Birthday Party',
    title: 'Parents asked where we got the bag charms',
    comment: 'Ordered 30 themed bag charms with each child’s initial and party tag. Bright colors, smooth edges, and delivered two days early.',
    verifiedBuyer: true,
    helpfulCount: 16
  },

  // Executive & Corporate Nameplates, Awards & Packages
  {
    id: 'rev-corp-1',
    productId: 'executive-sculpted-desk-nameplate',
    giftSetName: 'Executive Sculpted Desk Nameplate Block',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk Nameplates & Signage',
    tags: ['nameplate', 'desk', 'executive', 'office', 'award', 'plaque'],
    author: 'Barr. Folashade A.',
    location: 'Ikoyi, Lagos',
    rating: 5,
    date: '3 days ago',
    occasion: 'Partner Promotion',
    title: 'Solid weight and crisp gold lettering',
    comment: 'Sits firmly on the desk with sharp, clear lettering sealed inside. Delivered to Ikoyi within 48 hours in a neat presentation box.',
    verifiedBuyer: true,
    helpfulCount: 24
  },
  {
    id: 'rev-corp-2',
    productId: 'executive-sculpted-desk-nameplate',
    giftSetName: 'Executive Sculpted Desk Nameplate Block',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk Nameplates & Signage',
    tags: ['nameplate', 'office', 'corporate', 'sign'],
    author: 'Engr. Babatunde L.',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: 'Office Dedication',
    title: 'Clients always ask who made it',
    comment: 'Shared my title and brand colors on WhatsApp and received a preview before casting. Arrived safely in Abuja with zero scratches.',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-corp-pkg-1',
    productId: 'pkg-conference-souvenir',
    giftSetName: 'Conference Souvenir Pack',
    collection: 'Corporate & Office Collections',
    itemType: 'Occasion Gift Packages',
    tags: ['corporate', 'conference', 'logo', 'staff', 'client', 'souvenir', 'bulk'],
    author: 'Chinedu Eze',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Annual Summit (150 Guests)',
    title: 'Brand logo came out razor sharp',
    comment: 'Ordered 150 logo keychains and branded pens in our company colors. Every pack was neatly tagged and delivered ahead of setup.',
    verifiedBuyer: true,
    helpfulCount: 28
  },
  {
    id: 'rev-corp-pkg-2',
    productId: 'pkg-client-gift-box',
    giftSetName: 'Client Gift Box',
    collection: 'Corporate & Office Collections',
    itemType: 'Occasion Gift Packages',
    tags: ['corporate', 'client', 'staff', 'appreciation', 'box', 'logo'],
    author: 'Aisha Mohammed',
    location: 'Garki, Abuja',
    rating: 4,
    date: '3 weeks ago',
    occasion: 'VIP Client Gifting',
    title: 'Polished corporate sets clients actually keep',
    comment: 'Our clients keep the logo coasters and resin pens right on their desks. Smooth communication from quote to delivery.',
    verifiedBuyer: true,
    helpfulCount: 15
  },

  // Wedding, Proposal, Anniversary & Owambe Souvenirs
  {
    id: 'rev-wed-1',
    productId: 'couple-spotify-photo-plaque',
    giftSetName: 'Wedding & Couple Memory Photo Plaque Set',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Photo & Message Plaques',
    tags: ['wedding', 'anniversary', 'couple', 'photo', 'plaque', 'spotify', 'proposal'],
    author: 'Tolu & Nkechi B.',
    location: 'Lekki, Lagos',
    rating: 5,
    date: '4 days ago',
    occasion: '5th Anniversary',
    title: 'Sharp photo clarity and clean edges',
    comment: 'Our traditional wedding photo and song title look crisp under the clear resin coat. Far more meaningful than regular store gifts.',
    verifiedBuyer: true,
    helpfulCount: 31
  },
  {
    id: 'rev-wed-2',
    productId: 'pkg-proposal-reveal',
    giftSetName: 'Proposal Reveal Package',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Occasion Gift Packages',
    tags: ['proposal', 'engagement', 'marry', 'wedding', 'couple', 'vow'],
    author: 'Osagie E.',
    location: 'Asokoro, Abuja',
    rating: 5,
    date: '10 days ago',
    occasion: 'Engagement Proposal',
    title: 'Made the proposal unforgettable',
    comment: 'The engagement letter and photo plaque were crystal clear with zero bubbles. She immediately framed it on our shelf.',
    verifiedBuyer: true,
    helpfulCount: 22
  },
  {
    id: 'rev-fav-1',
    productId: 'grand-owambe-souvenir-pack-50',
    giftSetName: 'Owambe VIP Table & In-Law Souvenir Suite',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Ready-Made Gift Boxes & Party Favors',
    tags: ['owambe', 'souvenir', 'wedding', 'favour', 'bulk', 'vip'],
    author: 'Ronke & Olumide S.',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Traditional & White Wedding',
    title: 'VIP guests kept texting photos of their favors',
    comment: 'Requested a custom quote for 40 trinket trays and coasters matched to our Aso-Ebi colors with thank-you cards. Every bag looked luxe.',
    verifiedBuyer: true,
    helpfulCount: 42
  },
  {
    id: 'rev-fav-2',
    productId: 'wedding-souvenir-pack-25',
    giftSetName: 'Owambe & Wedding Guest Souvenir Pack',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Occasion Gift Packages',
    tags: ['wedding', 'favour', 'souvenir', 'nikkah', 'guest'],
    author: 'Amina & Farouk B.',
    location: 'Kano & Abuja',
    rating: 5,
    date: '3 weeks ago',
    occasion: 'Nikkah Dinner Favors',
    title: 'Easy custom quote for 35 pieces',
    comment: 'Loved the flexible 25-piece minimum—we customized 35 keychains and coasters with our names and date, all neatly bagged.',
    verifiedBuyer: true,
    helpfulCount: 27
  },

  // Bridal & Groomsmen
  {
    id: 'rev-bridal-1',
    productId: 'bridal-party-luxury-gift-package',
    giftSetName: 'Bridal Party Appreciation Gift Box',
    collection: 'Bridal & Groomsmen Packages',
    itemType: 'Jewelry, Mirrors & Hair Accessories',
    tags: ['bridal', 'bridesmaid', 'mirror', 'hair', 'jewelry', 'brooch', 'earring', 'bracelet', 'ring'],
    author: 'Toluwalope A.',
    location: 'Magodo, Lagos',
    rating: 5,
    date: '1 week ago',
    occasion: 'Bridal Train',
    title: 'All 6 bridesmaids screamed opening their boxes',
    comment: 'Each girl’s name was set neatly on her pocket mirror, hair clip, and keychain in our wedding colors. Worth every naira.',
    verifiedBuyer: true,
    helpfulCount: 38
  },
  {
    id: 'rev-groom-1',
    productId: 'groomsmen-bespoke-package',
    giftSetName: 'Groomsmen Gentleman’s Gift Box',
    collection: 'Bridal & Groomsmen Packages',
    itemType: 'Cufflinks & Tie Clips',
    tags: ['groomsmen', 'cufflink', 'tie clip', 'lapel', 'men'],
    author: 'Femi Oladipo',
    location: 'Garki, Abuja',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Wedding Morning',
    title: 'Sharp monogram finish for the whole squad',
    comment: 'My groomsmen wore the custom cufflinks and tie clips proudly all day and still use the pocket jotter at work.',
    verifiedBuyer: true,
    helpfulCount: 21
  },

  // Baby, Naming & Family
  {
    id: 'rev-baby-1',
    productId: 'pkg-baby-arrival-box',
    giftSetName: 'Baby Arrival Box',
    collection: 'Baby, Naming & Family',
    itemType: 'Occasion Gift Packages',
    tags: ['baby', 'naming', 'shower', 'christening', 'newborn', 'pastel'],
    author: 'Oluwafunke D.',
    location: 'Ikeja GRA, Lagos',
    rating: 5,
    date: '5 days ago',
    occasion: 'Baby Dedication',
    title: 'Soft pastel colors and delicate gold lettering',
    comment: 'Gifted this to new parents and they placed the baby name plaque straight in the nursery. Packaging was immaculate.',
    verifiedBuyer: true,
    helpfulCount: 23
  },
  {
    id: 'rev-baby-2',
    productId: 'pkg-naming-ceremony-favour',
    giftSetName: 'Naming Ceremony Favour Pack',
    collection: 'Baby, Naming & Family',
    itemType: 'Occasion Gift Packages',
    tags: ['naming', 'baby', 'favour', 'charm', 'christening'],
    author: 'Yusuf & Halima K.',
    location: 'Kaduna',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Naming Ceremony',
    title: 'Guests adored the personalized baby charms',
    comment: 'Ordered 50 pastel charms with our baby’s name and date tag. Fast turnaround and safe waybill delivery to Kaduna.',
    verifiedBuyer: true,
    helpfulCount: 18
  },
  {
    id: 'rev-baby-3',
    collection: 'Baby, Naming & Family',
    itemType: 'Baby, Graduation & Memorial Keepsakes',
    tags: ['baby', 'ultrasound', 'footprint', 'hair', 'keepsake', 'family', 'photo'],
    author: 'Ibukun & Tayo M.',
    location: 'Gbagada, Lagos',
    rating: 5,
    date: '1 week ago',
    occasion: 'First Birthday Keepsake',
    title: 'Preserved our baby milestone crystal clear',
    comment: 'No bubbles, no yellowing, and super careful handling of the ultrasound scan photo. A keepsake we will treasure forever.',
    verifiedBuyer: true,
    helpfulCount: 20
  },

  // Graduations, Religious & Memorial Keepsakes
  {
    id: 'rev-grad-1',
    collection: 'Graduations & Religious Celebrations',
    itemType: 'Baby, Graduation & Memorial Keepsakes',
    tags: ['graduation', 'graduate', 'school', 'cap', 'memorial', 'remembrance', 'candle'],
    author: 'Chiamaka N.',
    location: 'Enugu',
    rating: 5,
    date: '6 days ago',
    occasion: 'University Convocation',
    title: 'Classy keepsake with graduation year & name',
    comment: 'Matched our faculty colors and added her degree title inside cleanly. Small, thoughtful, and arrived well before convocation day.',
    verifiedBuyer: true,
    helpfulCount: 15
  },
  {
    id: 'rev-pastor-1',
    productId: 'pastor-mentor-appreciation-plaque',
    giftSetName: 'Mentor & Pastor Appreciation Plaque',
    collection: 'Appreciation Sets',
    itemType: 'Photo & Message Plaques',
    tags: ['pastor', 'mentor', 'scripture', 'appreciation', 'religious', 'church', 'blessing'],
    author: 'Deaconess Chinyere O.',
    location: 'New Haven, Enugu',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Pastor Appreciation',
    title: 'Carried the exact blessing scripture cleanly',
    comment: 'Having Numbers 6:24 and our pastor’s name sealed inside the plaque genuinely moved him. Neat edges and sturdy display stand.',
    verifiedBuyer: true,
    helpfulCount: 16
  },

  // LED Night Lamps & Frames
  {
    id: 'rev-lamp-1',
    productId: 'personalized-led-night-lamp-frame',
    giftSetName: 'Illuminated Anniversary & Photo LED Night Lamp',
    collection: 'Romance & Love Sets',
    itemType: 'LED Night Lamps & Frames',
    tags: ['led', 'lamp', 'night', 'light', 'photo', 'frame', 'romance'],
    author: 'Damilola Adeleke',
    location: 'Bodija, Ibadan',
    rating: 5,
    date: '5 days ago',
    occasion: 'Partner’s Birthday',
    title: 'Warm bedside glow works on any power bank',
    comment: 'Sent our photo and song title on WhatsApp. Plugs right into a USB power bank and lights up our names softly every evening.',
    verifiedBuyer: true,
    helpfulCount: 22
  },
  {
    id: 'rev-lamp-2',
    productId: 'personalized-led-night-lamp-frame',
    giftSetName: 'Illuminated Anniversary & Photo LED Night Lamp',
    collection: 'Birthday Celebrations',
    itemType: 'LED Night Lamps & Frames',
    tags: ['led', 'lamp', 'frame', 'photo'],
    author: 'Chidinma Eze',
    location: 'Enugu',
    rating: 5,
    date: '1 week ago',
    occasion: '21st Birthday',
    title: 'Packed safely for interstate delivery',
    comment: 'Arrived in Enugu wrapped in thick foam inside a rigid gift box with zero scratches. My sister keeps it lit every night.',
    verifiedBuyer: true,
    helpfulCount: 16
  },

  // Clocks & Retirement Suites
  {
    id: 'rev-clock-1',
    productId: 'executive-desk-clock-suite',
    giftSetName: 'Handmade Personalized Desk Clock',
    collection: 'Corporate & Office Collections',
    itemType: 'Desk & Wall Clocks',
    tags: ['clock', 'desk', 'wall', 'retirement', 'silent'],
    author: 'Pastor Emmanuel E.',
    location: 'Ikeja, Lagos',
    rating: 5,
    date: '3 weeks ago',
    occasion: 'Elder Appreciation',
    title: 'Silent sweep movement with glossy marble pour',
    comment: 'Zero ticking noise in his study and the gold numerals are easy to read. Customizing the swirl color on WhatsApp took two minutes.',
    verifiedBuyer: true,
    helpfulCount: 14
  },
  {
    id: 'rev-retire-1',
    productId: 'distinguished-retirement-milestone-clock-suite',
    giftSetName: 'Honorary Retirement Clock & Nameplate Suite',
    collection: 'Retirement Sets',
    itemType: 'Desk & Wall Clocks',
    tags: ['retirement', 'clock', 'farewell', 'principal', 'director'],
    author: 'Mrs. Funmi Alabi',
    location: 'Akure, Ondo',
    rating: 5,
    date: '2 weeks ago',
    occasion: '35-Year Retirement',
    title: 'Honored our retiring principal beautifully',
    comment: 'Pairing the clock with her official nameplate made her whole family emotional at her send-off dinner. Now sits in her parlor.',
    verifiedBuyer: true,
    helpfulCount: 17
  },

  // Kitchen Boards, Trays, Coasters, Home Décor & Flower Preservation
  {
    id: 'rev-kitchen-1',
    productId: 'pinterest-emerald-waterfall-kitchen-board',
    giftSetName: 'Waterfall Kitchen Serving Board',
    collection: 'Pinterest Kitchen & Dining Collections',
    itemType: 'Kitchen Charcuterie Boards & Island Platters',
    tags: ['kitchen', 'charcuterie', 'serving', 'board', 'platter', 'housewarming', 'wood'],
    author: 'Oluwaseun & Dami M.',
    location: 'Chevron, Lekki',
    rating: 5,
    date: '1 week ago',
    occasion: 'Housewarming Gift',
    title: 'Showstopper serving board for Sunday hosting',
    comment: 'Food-safe glossy finish with the couple’s surname cleanly added. Everyone at their housewarming asked where we ordered it.',
    verifiedBuyer: true,
    helpfulCount: 23
  },
  {
    id: 'rev-tray-1',
    collection: 'Pinterest Kitchen & Dining Collections',
    itemType: 'Ring Dishes & Catch-All Trays',
    tags: ['tray', 'vanity', 'jewellery', 'jewelry', 'perfume', 'dish', 'catch all', 'key dish'],
    author: 'Moyo Balogun',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '4 days ago',
    occasion: 'New Apartment Gift',
    title: 'Heavy, glossy finish that elevates my dresser',
    comment: 'Holds my daily perfumes and rings neatly without scratching. The gold-trimmed rim looks far more expensive than the price.',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-coaster-1',
    collection: 'Pinterest Kitchen & Dining Collections',
    itemType: 'Coaster Sets & Bottle Stoppers',
    tags: ['coaster', 'bottle stopper', 'drink', 'table', 'home'],
    author: 'Kelechi O.',
    location: 'GRA, Port Harcourt',
    rating: 5,
    date: '9 days ago',
    occasion: 'Housewarming',
    title: 'Handles hot tea mugs with zero marks',
    comment: 'Ordered a set of 6 in emerald and gold flakes with our family initials. Solid thickness and wipes clean in seconds.',
    verifiedBuyer: true,
    helpfulCount: 17
  },
  {
    id: 'rev-home-1',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Home Signs, Vases & Wall Art',
    tags: ['home', 'sign', 'door', 'house number', 'vase', 'wall art', 'candle', 'room sign'],
    author: 'Dapo & Lola A.',
    location: 'Abuja',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'New Home Move-In',
    title: 'Sharp door sign that stands out immediately',
    comment: 'Our family surname and house number look crisp from the gate. Solid finish and arrived with clean mounting backing.',
    verifiedBuyer: true,
    helpfulCount: 14
  },
  {
    id: 'rev-flower-1',
    collection: 'Wedding & Anniversary Sets',
    itemType: 'Flower Preservation & Pyramids',
    tags: ['flower', 'bouquet', 'pyramid', 'dried', 'pressed', 'preservation', 'block'],
    author: 'Temi O.',
    location: 'Ikoyi, Lagos',
    rating: 5,
    date: '3 weeks ago',
    occasion: 'Bridal Bouquet Preservation',
    title: 'My wedding petals look frozen in glass',
    comment: 'Sent my wedding roses in and got back a crystal-clear block with zero yellowing. Best post-wedding keepsake I own.',
    verifiedBuyer: true,
    helpfulCount: 25
  },

  // Stationery, Journals, Pens, Bookmarks, Phone Stands & Ornaments
  {
    id: 'rev-journal-1',
    productId: 'personalized-resin-journal-pen-set',
    giftSetName: 'A5 Hardcover Notebook & Matching Pen Set',
    collection: 'Appreciation Sets',
    itemType: 'Journals & Resin Pens',
    tags: ['journal', 'notebook', 'jotter', 'pen', 'stationery'],
    author: 'Titi Ogunleye',
    location: 'Surulere, Lagos',
    rating: 5,
    date: '6 days ago',
    occasion: 'Mentor Birthday',
    title: 'Refillable cover and smooth-writing pen',
    comment: 'She carries this notebook to every meeting and loves that the pages refill easily. Purple and silver sparkles came out neat.',
    verifiedBuyer: true,
    helpfulCount: 18
  },
  {
    id: 'rev-desk-token-1',
    collection: 'Under ₦10,000 Everyday Boutique',
    itemType: 'Bookmarks, Pens & Desk Tokens',
    tags: ['bookmark', 'pen', 'paperweight', 'card holder', 'page holder', 'bookend', 'organizer'],
    author: 'Khadijah Sani',
    location: 'Wuse 2, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: 'Colleague Thank-You',
    title: 'Affordable gift that still feels luxury',
    comment: 'Ordered custom name bookmarks and pens under ₦10,000—arrived neatly ribboned with zero rough edges.',
    verifiedBuyer: true,
    helpfulCount: 24
  },
  {
    id: 'rev-stand-1',
    collection: 'Corporate & Office Collections',
    itemType: 'Phone Stands & Holders',
    tags: ['phone', 'stand', 'holder', 'grip', 'remote', 'desk'],
    author: 'Segun Adewale',
    location: 'Yaba, Lagos',
    rating: 5,
    date: '8 days ago',
    occasion: 'Work Desk Upgrade',
    title: 'Sturdy angle for video calls and charging',
    comment: 'Holds my phone steadily during Zoom calls without slipping, and my initials inside the emerald swirl look sharp.',
    verifiedBuyer: true,
    helpfulCount: 13
  },
  {
    id: 'rev-magnet-1',
    collection: 'Under ₦10,000 Everyday Boutique',
    itemType: 'Christmas Ornaments & Fridge Magnets',
    tags: ['magnet', 'fridge', 'ornament', 'christmas', 'tag', 'luggage'],
    author: 'Amaka U.',
    location: 'Festac, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Family Keepsake',
    title: 'Strong magnet hold and vibrant photo print',
    comment: 'Ordered photo fridge magnets for our family reunion. Colors stayed vivid and they grip the fridge door tightly.',
    verifiedBuyer: true,
    helpfulCount: 12
  },

  // Wearables, Keychains, Jewelry & Guitar Straps
  {
    id: 'rev-key-1',
    productId: 'resin-alphabet-keychain-gold',
    giftSetName: 'Custom Initial Letter Keychain (A–Z)',
    collection: 'Under ₦10,000 Everyday Boutique',
    itemType: 'Letter Keychains & Lapel Pins',
    tags: ['keychain', 'initial', 'letter', 'charm', 'lanyard', 'badge', 'pin', 'hijab', 'brooch'],
    author: 'Zainab Aliyu',
    location: 'Kaduna',
    rating: 5,
    date: '5 days ago',
    occasion: 'Friend Surprise',
    title: 'Daily-use gift that feels genuinely personal',
    comment: 'Ordered 4 different letters with gold flakes for close friends. Thick glossy cast and strong keyring clasp.',
    verifiedBuyer: true,
    helpfulCount: 29
  },
  {
    id: 'rev-wear-1',
    collection: 'Under ₦10,000 Everyday Boutique',
    itemType: 'Jewelry, Mirrors & Hair Accessories',
    tags: ['necklace', 'pendant', 'earring', 'bracelet', 'ring', 'hair clip', 'scrunchie', 'hijab', 'watch'],
    author: 'Halima Bello',
    location: 'Wuse, Abuja',
    rating: 4,
    date: '12 days ago',
    occasion: 'Self-Treat & Sister Gift',
    title: 'Lightweight to wear and super shiny',
    comment: 'The resin pendant and matching studs are light on the ears with a glass-like shine. Came in a cute pouch ready for gifting.',
    verifiedBuyer: true,
    helpfulCount: 15
  },
  {
    id: 'rev-strap-1',
    productId: 'bespoke-resin-accent-guitar-strap',
    giftSetName: 'Handmade Personalized Resin Accent Guitar Strap',
    collection: 'Birthday Celebrations',
    itemType: 'Personalized Guitar Straps & Music Gifts',
    tags: ['guitar', 'strap', 'music', 'musician', 'pick'],
    author: 'Tomiwa D.',
    location: 'Surulere, Lagos',
    rating: 5,
    date: '4 days ago',
    occasion: '30th Birthday',
    title: 'Comfy padding and crisp stage-name crest',
    comment: 'My stage name is sealed clearly in glossy resin with a matching pick in the slot—comfortable even through 3-hour live sets.',
    verifiedBuyer: true,
    helpfulCount: 35
  },
  {
    id: 'rev-strap-2',
    productId: 'bespoke-resin-accent-guitar-strap',
    giftSetName: 'Handmade Personalized Resin Accent Guitar Strap',
    collection: 'Appreciation Sets',
    itemType: 'Personalized Guitar Straps & Music Gifts',
    tags: ['guitar', 'strap', 'music'],
    author: 'Min. Joshua A.',
    location: 'Gwarinpa, Abuja',
    rating: 5,
    date: '1 week ago',
    occasion: 'Music Director Gift',
    title: 'Touched our guitarist right after rehearsal',
    comment: 'Customized his initials and colors on WhatsApp—arrived safely in Abuja boxed with our choir thank-you note.',
    verifiedBuyer: true,
    helpfulCount: 26
  },

  // Festive Hampers
  {
    id: 'rev-festive-1',
    productId: 'december-sparkle-starter-hamper',
    giftSetName: 'Sparkle Starter Festive Hamper Package',
    collection: 'December Festive & Holiday Hampers',
    itemType: 'Festive Hampers & Holiday Packages',
    tags: ['hamper', 'festive', 'december', 'holiday', 'christmas', 'office'],
    author: 'Ngozi Umeh',
    location: 'Yaba, Lagos',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Team End-of-Year Gift',
    title: 'More personal than regular food hampers',
    comment: 'Ordered 15 boxes with each staff member’s name on their keychain and bookmark. Everyone still carries theirs daily.',
    verifiedBuyer: true,
    helpfulCount: 25
  },
  {
    id: 'rev-festive-2',
    productId: 'december-appreciation-classic-hamper',
    giftSetName: 'Appreciation Classic Festive Hamper Package',
    collection: 'December Festive & Holiday Hampers',
    itemType: 'Festive Hampers & Holiday Packages',
    tags: ['hamper', 'festive', 'client', 'executive'],
    author: 'Chukwuma Obi',
    location: 'Wuse, Abuja',
    rating: 5,
    date: '1 month ago',
    occasion: 'Client Holiday Gifting',
    title: 'Clients called specifically to say thank you',
    comment: 'Unlike consumables that vanish in two days, these personalized coasters and trays stay on our clients’ desks year-round.',
    verifiedBuyer: true,
    helpfulCount: 28
  },

  // General High-Trust Feedback
  {
    id: 'rev-gen-3',
    collection: 'Romance & Love Sets',
    tags: ['gift', 'ribbon', 'card', 'love'],
    author: 'Kayode & Simi',
    location: 'Ajah, Lagos',
    rating: 4,
    date: '2 weeks ago',
    occasion: 'Just Because Gift',
    title: 'Looks even warmer in person than in photos',
    comment: 'Clean satin ribbon wrapping, neat card handwriting, and friendly updates on WhatsApp before dispatch.',
    verifiedBuyer: true,
    helpfulCount: 17
  }
]

function hashProductSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

/**
 * Returns the most relevant reviews for a specific product by matching
 * productId, itemType, collection, and title keywords so every catalogue item
 * displays context-appropriate ratings and short buyer feedback.
 */
export function getProductReviews(
  productId?: string,
  collection?: string,
  itemType?: string,
  productTitle?: string
): Review[] {
  if (!productId) return MOCK_REVIEWS.slice(0, 5)

  const titleWords = (productTitle || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3)

  const seed = hashProductSeed(productId)

  const scored = MOCK_REVIEWS.map((review, index) => {
    let score = 0
    if (review.productId === productId) score += 100
    if (itemType && review.itemType === itemType) score += 35
    if (collection && review.collection === collection) score += 20

    if (titleWords.length > 0 && review.tags?.length) {
      const tagMatches = review.tags.filter((tag) =>
        titleWords.some((w) => tag.includes(w) || w.includes(tag))
      ).length
      score += Math.min(tagMatches * 10, 30)
    }

    // Deterministic tie-breaker so distinct items surface varied top feedback
    const tieBreaker = ((index + seed) % MOCK_REVIEWS.length) / 1000
    return { review, score: score + tieBreaker }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 5).map((entry) => entry.review)
}

/**
 * Computes average rating, 5-to-1 star distribution counts, and recommendation rate
 */
export function calculateReviewStats(reviews: Review[]): ReviewStats {
  if (!reviews || reviews.length === 0) {
    return {
      average: 5.0,
      totalCount: 0,
      recommendedPercent: 100,
      starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
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
