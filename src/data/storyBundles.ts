export interface StoryBundle {
  id: string
  title: string
  tagline: string
  recipient: string
  occasion: string
  budgetTier: 'starter' | 'popular' | 'executive' | 'luxury'
  bundlePrice: number
  originalTotal: number
  savingsAmount: number
  imageUrl: string
  emotionalStory: string
  whyItTouchesTheHeart: string
  items: Array<{
    name: string
    role: string // e.g. "Main Centerpiece Gift", "Daily Desk Companion", "Free Extra Gift"
    price: number
  }>
  includedExtras: string[]
  recommendedPersonalization: string
  bestSeller?: boolean
  isLaunchOffer?: boolean
  isFestiveHamper?: boolean
  festiveTier?: 'Sparkle Starter' | 'Appreciation Classic' | 'Executive Luxe'
  bulkPrice?: number
  bulkMinQty?: number
  isCustomQuote?: boolean
  minOrderQty?: number
  quoteLabel?: string
}

export const STORY_BUNDLES: StoryBundle[] = [
  // OFFICIAL DECEMBER FESTIVE HAMPER PACKAGES
  {
    id: 'bundle-december-sparkle-starter',
    title: 'December Festive Sparkle Starter Hamper',
    tagline: 'Customized keychain, festive hanging ornament, bookmark, fridge magnet & greeting card in a gift box',
    recipient: 'Office Staff, Workers, Clients, Friends & Family',
    occasion: 'December Christmas, Holiday Parties, Year-End Thank You',
    budgetTier: 'starter',
    bundlePrice: 12500, // Range: ₦12,000 - ₦14,500
    bulkPrice: 11000, // Bulk (10+) range: ₦10,500 - ₦13,000
    bulkMinQty: 10,
    originalTotal: 13500,
    savingsAmount: 1000,
    imageUrl: '/src/assets/images/resin_festive_starter_hamper_1794516583088.jpg',
    isFestiveHamper: true,
    festiveTier: 'Sparkle Starter',
    emotionalStory: 'A sweet, personal holiday gift box for your staff, clients, and loved ones. While food hampers finish in days, this set gives them everyday reminders of your appreciation—crafted in whichever colors and style you choose on WhatsApp.',
    whyItTouchesTheHeart: 'Shows real thoughtfulness at year-end with everyday pieces carrying their name or initial.',
    items: [
      { name: '01. Customized Keychain', role: 'Carries Their Name Every Day', price: 4000 },
      { name: '02. Festive Hanging Ornament OR Fridge Magnet', role: 'Holiday Memory Piece', price: 3500 },
      { name: '03. Customized Bookmark', role: 'For Quiet Reading Moments', price: 3000 },
      { name: '04. Gift Box Sleeve & Greeting Card', role: 'Gift Box & Card', price: 3000 }
    ],
    includedExtras: [
      'Gift box with ribbon tie included',
      'Colors, flowers/glitter design & custom text chosen by you on WhatsApp',
      'Single price: ₦12,500 · Bulk price (10 or more): ₦11,000 each',
      'Free recipient name customization'
    ],
    recommendedPersonalization: 'Share your chosen colors, design style & recipient name on WhatsApp',
    bestSeller: true
  },
  {
    id: 'bundle-december-appreciation-classic',
    title: 'December Festive Appreciation Classic Hamper',
    tagline: 'Set of 2 drink coasters, jewelry dish stand or catch-all stand, customized pen or keychain, ornament & gift box',
    recipient: 'Valued Clients, Department Heads, Business Partners & Friends',
    occasion: 'Year-End Client Gift, Christmas Hamper, Thank-You Gift',
    budgetTier: 'popular',
    bundlePrice: 26000, // Range: ₦25,000 - ₦29,000
    bulkPrice: 23500, // Bulk (10+): ₦22,000 - ₦26,000
    bulkMinQty: 10,
    originalTotal: 28500,
    savingsAmount: 2500,
    imageUrl: '/src/assets/images/resin_festive_classic_hamper_1794516583016.jpg',
    isFestiveHamper: true,
    festiveTier: 'Appreciation Classic',
    emotionalStory: 'Say a warm thank-you to clients and team leads who stood by you this year. Every item in this box stays on their desk or living room table long after the holidays—and you pick the exact colors and finish when chatting with us on WhatsApp.',
    whyItTouchesTheHeart: 'Gives clients and colleagues useful everyday items they display proudly on their desk and table.',
    items: [
      { name: '01. Set of 2 Drink Coasters', role: 'Table Coasters for Drinks', price: 10500 },
      { name: '02. Jewelry Dish Stand / Catch-All Stand', role: 'Desk or Bedside Holder', price: 9500 },
      { name: '03. Customized Keychain OR Pen', role: 'Everyday Keys / Writing', price: 4000 },
      { name: '04. Presentation Gift Box & Greeting Card', role: 'Gift Packaging', price: 4500 }
    ],
    includedExtras: [
      'Hard presentation box with ribbon included',
      'Colors, design style & logos/names chosen by you on WhatsApp',
      'Single price: ₦26,000 · Bulk price (10 or more): ₦23,500 each',
      'Company logo or personal name welcome'
    ],
    recommendedPersonalization: 'Choose your colors, finish & wording with our WhatsApp representative',
    bestSeller: true
  },
  {
    id: 'bundle-december-executive-luxe',
    title: 'December Festive Executive Luxe VIP Hamper',
    tagline: 'Desk clock or 4 coasters, customized keychain, hanging ornament, customized pen, magnet & VIP gift box',
    recipient: 'Company Directors, Managing Directors, VIP Clients & Pastors',
    occasion: 'Executive Holiday Gift, VIP Year-End Recognition, Christmas Gift',
    budgetTier: 'executive',
    bundlePrice: 38500, // Range: ₦38,000 - ₦45,000
    bulkPrice: 35000, // Bulk (10+): ₦34,000 - ₦40,000
    bulkMinQty: 10,
    originalTotal: 42500,
    savingsAmount: 4000,
    imageUrl: '/src/assets/images/resin_festive_luxe_hamper_1794516583158.jpg',
    isFestiveHamper: true,
    festiveTier: 'Executive Luxe',
    emotionalStory: 'Our flagship holiday gift box for directors, mentors, and VIPs. You decide every detail—whether classic colors, clear floral, or shimmer finish—directly with our team on WhatsApp so it feels tailored just for them.',
    whyItTouchesTheHeart: 'Makes leaders feel genuinely honored and deepens valued relationships going into the new year.',
    items: [
      { name: '01. Desk Clock OR Set of 4 Coasters OR Serving Tray', role: 'Main Centerpiece Gift', price: 22500 },
      { name: '02. Customized Keychain', role: 'Car Key Accessory', price: 4000 },
      { name: '03. Festive Hanging Ornament', role: 'Holiday Tree Memory', price: 3500 },
      { name: '04. Customized Pen', role: 'Daily Signing Pen', price: 3500 },
      { name: '05. Fridge Magnet or Pocket Prayer Token', role: 'Daily Encouragement', price: 3500 },
      { name: '06. VIP Gift Box & Handwritten Card', role: 'VIP Gift Packaging', price: 5500 }
    ],
    includedExtras: [
      'VIP presentation box with wax-sealed greeting card',
      'Choice of main centerpiece plus any color & design you want',
      'Single price: ₦38,500 · Bulk price (10 or more): ₦35,000 each',
      'Confirmed step-by-step on WhatsApp before crafting'
    ],
    recommendedPersonalization: 'Select your centerpiece, colors & title directly on WhatsApp',
    bestSeller: true
  },

  // YEAR-ROUND GIFT PACKAGES & STORY SETS
  {
    id: 'bundle-executive-director-tribute',
    title: 'The Executive Director Milestone Tribute Set',
    tagline: 'Customized desk nameplate, standing desk clock & matching pen in a presentation gift box',
    recipient: 'Boss, Managing Director, Pastor, Senior Partner, Mentor',
    occasion: 'Job Promotion, Retirement, 50th/60th Birthday, Company Appreciation',
    budgetTier: 'executive',
    bundlePrice: 46000,
    originalTotal: 50500,
    savingsAmount: 4500,
    imageUrl: '/src/assets/images/nigerian_corporate_suite_1794042273984.jpg',
    emotionalStory: 'Give a gift that honors their hard work and displays their name and official title with pride on their desk. Pick their favorite colors and style on WhatsApp so every visitor who walks into their office feels the respect they earned.',
    whyItTouchesTheHeart: 'Commands pride on their office table and acts as a warm daily reminder of their leadership.',
    items: [
      { name: 'Customized Desk Nameplate Block', role: 'Main Desk Nameplate', price: 20000 },
      { name: 'Standing Desk Clock', role: 'Daily Desk Clock', price: 22500 },
      { name: 'Matching Customized Pen', role: 'Executive Signing Pen', price: 3500 },
      { name: 'Presentation Gift Box & Handwritten Card', role: 'Gift Box Packaging', price: 4500 }
    ],
    includedExtras: [
      'Hard presentation gift box with ribbon & wax-sealed card',
      'Colors, swirls & lettering chosen by you on WhatsApp',
      'Protective pads on the bottom so desks never scratch'
    ],
    recommendedPersonalization: 'Share recipient name, title & preferred colors on WhatsApp',
    bestSeller: true
  },
  {
    id: 'bundle-wedding-anniversary-romance',
    title: 'The Forever Love & Anniversary Memory Gift Box',
    tagline: 'Couple photo plaque (A5), illuminated LED bedside night light & pair of customized keychains',
    recipient: 'Husband, Wife, Newlywed Couple, Anniversary Parents',
    occasion: '1st to 25th Wedding Anniversary, Wedding Day, Valentine',
    budgetTier: 'executive',
    bundlePrice: 0,
    originalTotal: 0,
    savingsAmount: 0,
    isCustomQuote: true,
    quoteLabel: 'Request a Quote',
    imageUrl: '/src/assets/images/nigerian_couple_plaque_1794042243147.jpg',
    emotionalStory: 'Flowers dry up and cakes finish quickly, but a glowing bedside photo light and couple plaque keep your favorite moment shining beside the bed every night. Request a custom quote with your preferred photo, song, and wedding colors.',
    whyItTouchesTheHeart: 'Turns a treasured love memory into a warm bedside light that brings a smile every night.',
    items: [
      { name: 'Customized Couple Photo Plaque (A5)', role: 'Standing Couple Portrait', price: 0 },
      { name: 'Illuminated LED Bedside Night Light', role: 'Glowing Bedside Lamp', price: 0 },
      { name: 'Pair of Customized Keychains (Set of 2)', role: 'For Both Partners', price: 0 },
      { name: 'Presentation Gift Box & Love Card', role: 'Gift Box Packaging', price: 0 }
    ],
    includedExtras: [
      'Wooden USB warm light base + tabletop display stand',
      'Send your photo, song code & favorite colors for a tailored quote',
      'Includes love letter envelope & ribboned gift box'
    ],
    recommendedPersonalization: 'Share couple names, date, photo & design preference for your quote',
    bestSeller: true
  },
  {
    id: 'bundle-musician-stage-edition',
    title: 'The Musician & Stage Worship Gift Set',
    tagline: 'Customized padded guitar strap, set of 3 guitar picks & matching keychain',
    recipient: 'Guitarist, Worship Leader, Bassist, Musician, Choir Singer',
    occasion: 'Birthday, Album Launch, Concert, Church Anniversary',
    budgetTier: 'popular',
    bundlePrice: 32500,
    originalTotal: 35500,
    savingsAmount: 3000,
    imageUrl: '/src/assets/images/resin_guitar_strap_1794044917529.jpg',
    emotionalStory: 'Made for musicians who play long church services or live shows. Takes the weight off their shoulder while showing off their stage name—designed in the exact colors, strap style, and finish you choose together on WhatsApp.',
    whyItTouchesTheHeart: 'Musicians hold their instruments close to their heart; a custom strap shows genuine love for their gift.',
    items: [
      { name: 'Customized Padded Guitar Strap with Resin Centerpiece', role: 'Main Stage Guitar Strap', price: 24500 },
      { name: 'Matching Resin Guitar Picks (Set of 3 with Case)', role: 'Custom Monogram Picks', price: 3500 },
      { name: 'Customized Initial Keychain', role: 'Guitar Bag Accessory', price: 4000 },
      { name: 'Gift Box with Musician Card', role: 'Gift Box Packaging', price: 3500 }
    ],
    includedExtras: [
      'Built-in pick holder on the strap',
      'Strap width, hardware & resin colors chosen by you on WhatsApp',
      'Gift box with ribbon & musician dedication card'
    ],
    recommendedPersonalization: 'Share stage name, scripture or verse & preferred colors on WhatsApp',
    bestSeller: true
  },
  {
    id: 'bundle-birthday-queen-botanical',
    title: 'The Birthday Queen Celebration Gift Box',
    tagline: 'A5 hardcover notebook & matching pen, phone stand, jewelry set, jewelry dish stand, customized mirror & comb/hair accessories',
    recipient: 'Wife, Sister, Mother, Best Friend, Celebrant',
    occasion: '21st, 30th, 40th, 50th Birthday, Mother\'s Day',
    budgetTier: 'luxury',
    bundlePrice: 50500,
    originalTotal: 55000,
    savingsAmount: 5000,
    imageUrl: '/src/assets/images/birthday_queen_box_1794569207477.jpg',
    emotionalStory: 'Packed with thoughtful pieces she will use and smile over every single day. Leave the guesswork behind—you decide how every item should look, from colors to flowers or glitter finish, when speaking with our representative on WhatsApp.',
    whyItTouchesTheHeart: 'Feels deeply personal because every piece inside the box is crafted in her favorite colors, style, and name.',
    items: [
      { name: 'A5 Hardcover Notebook & Matching Pen', role: 'Main Notebook & Pen', price: 14000 },
      { name: 'Desktop Phone Stand', role: 'Desk & Video Call Stand', price: 6000 },
      { name: 'Jewelry Set (Bangles, Earrings, Necklace & Ring)', role: '4-Piece Wearable Set', price: 12000 },
      { name: 'Jewelry Dish Stand / Catch-All Stand', role: 'Dresser & Ring Stand', price: 8000 },
      { name: 'Customized Mirror', role: 'Pocket Vanity Mirror', price: 6000 },
      { name: 'Comb / Hair Accessories', role: 'Vanity Hair Set', price: 5500 },
      { name: 'Presentation Gift Box & Birthday Card', role: 'Box & Handwritten Card', price: 3500 }
    ],
    includedExtras: [
      'Presentation gift box with satin ribbon & free handwritten birthday card',
      'You choose the colors, flower/glitter/clear style & name on WhatsApp',
      'Every piece customized cleanly before delivery'
    ],
    recommendedPersonalization: 'Tell us her name, favorite colors & design choice on WhatsApp',
    bestSeller: true
  },
  {
    id: 'bundle-wedding-vip-favors-50',
    title: 'Owambe & Wedding VIP Souvenir Suite (Min. 25 Pieces)',
    tagline: 'Coasters, small resin trays, customized bridesmaids & groomsmen packs, keychains, pens, lapel pins & thank-you card — custom mix from 25 pieces',
    recipient: 'Wedding Guests, Bridal Party, Groomsmen & Family In-Laws',
    occasion: 'Nigerian Traditional & White Wedding, Owambe, VIP Milestone Celebration',
    budgetTier: 'luxury',
    bundlePrice: 0,
    originalTotal: 0,
    savingsAmount: 0,
    isCustomQuote: true,
    minOrderQty: 25,
    quoteLabel: 'Request a Quote',
    imageUrl: '/src/assets/images/nigerian_wedding_favors_1794042251744.jpg',
    emotionalStory: 'Every wedding or Owambe has its own guest count and taste. Instead of forcing a one-size-fits-all pack, tell us the exact souvenir mix you want—from 25 pieces minimum up to 200+—and choose your Aso-Ebi colors, finish, and couple wording on WhatsApp for a tailored quote.',
    whyItTouchesTheHeart: 'Guests, VIPs, bridesmaids, and groomsmen take home genuinely useful handmade favors instead of disposable plastics.',
    items: [
      { name: 'Resin Drink Coasters (Single or Pair Sets)', role: 'Guest Table Favors · Qty from 25+', price: 0 },
      { name: 'Small Resin Trinket & Jewelry Dish Trays', role: 'VIP Table & In-Law Favors', price: 0 },
      { name: 'Customized Bridesmaids Pack (Mirror, Comb/Hair Accessories & Keychain)', role: 'Bridal Train Option', price: 0 },
      { name: 'Customized Groomsmen Pack (Cufflinks, Tie Clip, Jotter & Pen)', role: 'Groomsmen Option', price: 0 },
      { name: 'Party Souvenirs (Initial Keychains, Writing Pens & Mini Coasters)', role: 'Everyday Guest Favors', price: 0 },
      { name: 'Slot-Together Phone Stands, Bookmarks & Aso-Ebi Lapel Pins', role: 'Extra VIP & Elder Favors', price: 0 },
      { name: 'Personalized Wine Bottle Stoppers', role: 'High-Table & Parents-in-Law Option', price: 0 },
      { name: 'Custom Thank-You Card & Individual Guest Pouch', role: 'Included with Each Piece', price: 0 }
    ],
    includedExtras: [
      'Minimum order quantity: 25 pieces (build any quantity — 25, 50, 100, 200+)',
      'Price is customizable based on the exact items & quantity you select — Request a Quote on WhatsApp',
      'Every piece arrives individually bagged with a printed Thank-You Card & ribbon',
      'Party colors, floral/geode/clear finish & couple names chosen solely by you on WhatsApp'
    ],
    recommendedPersonalization: 'Send your guest count (min. 25), chosen item mix, couple names & colors on WhatsApp for a quote',
    bestSeller: true
  },
  {
    id: 'bundle-mentor-retirement-honor',
    title: 'Executive Retirement Celebration & Farewell Dinner Gift Box',
    tagline: 'Customizable tribute set for retiring leaders — parlor clock, lifetime service plaque, home valet tray, memory journal & pen, parlor coasters & personal accessory',
    recipient: 'Retiring Executive, Director, Principal, Civil Servant or Respected Elder',
    occasion: 'Executive Retirement Celebration, Farewell Dinner, Send-Off Honor',
    budgetTier: 'luxury',
    bundlePrice: 0,
    originalTotal: 0,
    savingsAmount: 0,
    isCustomQuote: true,
    quoteLabel: 'Request a Quote',
    imageUrl: '/src/assets/images/resin_clock_nameplate_1794041297795.jpg',
    emotionalStory: 'When someone steps out of decades of leadership at a farewell dinner, they are transitioning into a richer season at home—not another corporate desk. Choose the exact combination of meaningful, post-retirement pieces that fit their personality and home, and request a tailored quote on WhatsApp.',
    whyItTouchesTheHeart: 'Every item honors their lifetime of service while fitting warmly into their parlor, quiet study, and daily life in retirement.',
    items: [
      { name: 'Silent Standing Parlor / Study Clock', role: 'Honors Their Time & Legacy at Home', price: 0 },
      { name: 'Lifetime Service Tribute Frame / Citation Plaque (A4)', role: 'With Years of Service & Organization Crest', price: 0 },
      { name: 'Home Catch-All & Valet Tray (Keys, Glasses & Watch Stand)', role: 'Everyday Bedside or Study Companion', price: 0 },
      { name: 'A5 Hardcover Memoir & Gratitude Notebook + Matching Pen', role: 'For Reflections, Devotions & Farewell Notes', price: 0 },
      { name: 'Hospitality Parlor Coaster Set (4 Coasters) + Bottle Stopper Option', role: 'For Welcoming Family & Guests at Home', price: 0 },
      { name: 'Personal Accessory (Gentleman’s Cufflinks & Tie Clip OR Lady’s Jewelry & Mirror)', role: 'Tailored to the Retiree’s Gender & Taste', price: 0 },
      { name: 'Executive Gift Chest & Team-Signed Farewell Tribute Card', role: 'Complete Presentation Chest', price: 0 }
    ],
    includedExtras: [
      'Price is customizable based on which items you put together in the box — Request a Quote',
      'Tailored cleanly for a retiring gentleman or retiring lady executive',
      'Organization crest, years of service, portrait & farewell citation confirmed on WhatsApp',
      'Delivered nation-wide in an executive presentation chest ready for the farewell dinner'
    ],
    recommendedPersonalization: 'Tell us about the retiree, which items you want in the box & your tribute wording on WhatsApp',
    bestSeller: false
  },
  {
    id: 'bundle-pinterest-kitchen-entertainer',
    title: 'The Kitchen Island & Dining Entertainer Suite',
    tagline: 'Handcrafted wood & resin serving board plus matching set of 2 drink coasters',
    recipient: 'New Homeowners, Newlyweds, Host / Hostess, Cooking Enthusiasts',
    occasion: 'Housewarming, Kitchen Makeover, Wedding Gift, Hosting Visitors',
    budgetTier: 'executive',
    bundlePrice: 42500,
    originalTotal: 46500,
    savingsAmount: 4000,
    imageUrl: '/src/assets/images/pinterest_kitchen_resin_1794047672822.jpg',
    emotionalStory: 'The kitchen is the heart of every home. Turn weekend meals, small chops, suya nights, and hosting guests into sweet shared moments—with your choice of river colors, wood grain, and family surname confirmed on WhatsApp.',
    whyItTouchesTheHeart: 'Blends everyday kitchen usefulness with a warm centerpiece guests love gathering around.',
    items: [
      { name: 'Wood & Resin Serving / Charcuterie Board', role: 'Food Serving Board', price: 32500 },
      { name: 'Set of 2 Drink Coasters', role: 'Table Coasters for Drinks', price: 10500 },
      { name: 'Presentation Gift Box & Care Card', role: 'Gift Packaging', price: 3500 }
    ],
    includedExtras: [
      'Food-safe natural wood & resin finish',
      'Pick any resin river color & optional family surname on WhatsApp',
      'Gift box with ribbon & care note included'
    ],
    recommendedPersonalization: 'Tell us the family surname & preferred resin river color on WhatsApp',
    bestSeller: true
  },
  {
    id: 'bundle-starter-thoughtful-keepsake',
    title: 'The Sweet Everyday "Thinking of You" Trio',
    tagline: '3 personal gifts under ₦10,000 — customized keychain, customized bookmark & matching pen',
    recipient: 'Friend, Colleague, Sister, Brother, Student, Teacher',
    occasion: 'Birthday, Thank You, Thinking of You, Good Luck, Quick Surprise',
    budgetTier: 'starter',
    bundlePrice: 9500,
    originalTotal: 10500,
    savingsAmount: 1000,
    imageUrl: '/src/assets/images/resin_floral_bookmark_trinket_1794039189444.jpg',
    emotionalStory: 'You never need to spend a fortune to brighten someone’s week. This thoughtful trio gives them three daily reminders of you—made in whatever colors, flowers, or sparkle style you request on WhatsApp.',
    whyItTouchesTheHeart: 'Turns an affordable little surprise into a heartfelt moment they talk about all week.',
    items: [
      { name: 'Customized Keychain (A–Z or Full Name)', role: 'Daily Key Reminder', price: 4000 },
      { name: 'Customized Bookmark', role: 'Quiet Reading Companion', price: 3000 },
      { name: 'Matching Customized Pen', role: 'Smooth Daily Pen', price: 3500 }
    ],
    includedExtras: [
      'Gift packaging with ribbon & handwritten card tag',
      'Your choice of colors, dried flowers, glitter, or clear style on WhatsApp',
      'Any initial A–Z or full name included'
    ],
    recommendedPersonalization: 'Tell us their name/initial & color preference on WhatsApp',
    bestSeller: true
  },

  // ==============================================================
  // LAUNCH OFFER & EXPANDED OCCASION PACKAGES (ZERO REPETITION)
  // ==============================================================
  {
    id: 'bundle-launch-personalized-birthday-box',
    title: 'Launch Offer: The Personalized Birthday Box',
    tagline: 'Custom Name/Photo Frame, Personalized Keychain, Resin Pen & Handwritten Card in Luxury Box',
    recipient: 'Friends, Partners, Family, Colleagues',
    occasion: 'Signature Birthday Launch Offer',
    budgetTier: 'popular',
    bundlePrice: 27500,
    originalTotal: 30500,
    savingsAmount: 3000,
    isLaunchOffer: true,
    bestSeller: true,
    imageUrl: '/src/assets/images/with_love_birthday_box_1794569208169.jpg',
    emotionalStory: 'Our signature launch box crafted to deliver huge emotional impact with high demand and easy personalization. Every birthday box arrives ready to gift with a care card, message card, and reorder tag.',
    whyItTouchesTheHeart: 'Unites four meaningful birthday keepsakes around their name or photo at a transparent launch savings price.',
    items: [
      { name: 'Custom Resin Nameplate / Photo Frame (A5)', role: 'Main Birthday Centerpiece', price: 19500 },
      { name: 'Personalized Resin Keychain', role: 'Everyday Name Keepsake', price: 4000 },
      { name: 'Matching Resin Ballpoint Pen', role: 'Daily Signing Pen', price: 3500 },
      { name: 'Handwritten Card, Care Card & Branded Box', role: 'Complete Gift Presentation', price: 3500 }
    ],
    includedExtras: [
      'Official ONEO Signature Launch Offer (Save ₦3,000 off itemized price)',
      'Branded presentation gift box, satin ribbon, handwritten message card & care card',
      'Free Thank-You & Reorder card inside'
    ],
    recommendedPersonalization: 'Send celebrant name, birthday date & high-resolution photo on WhatsApp'
  },
  {
    id: 'bundle-birthday-mini',
    title: 'Birthday Mini Box (Pocket-Friendly Edition)',
    tagline: '1 personalized name keychain, 1 resin pen, A7 pocket jotter & birthday card in a branded box',
    recipient: 'Classmates, Colleagues, Small Group Celebrations',
    occasion: 'Work & Campus Birthdays',
    budgetTier: 'starter',
    bundlePrice: 13500,
    originalTotal: 15000,
    savingsAmount: 1500,
    imageUrl: '/src/assets/images/resin_letter_keychains_1794039961345.jpg',
    emotionalStory: 'Proof that thoughtful gifts do not need a luxury budget. Gives classmates and office teammates a compact, clearly personalized birthday box they will use right away.',
    whyItTouchesTheHeart: 'Smart everyday pieces bundled cleanly inside a ribboned ONE O mini box.',
    items: [
      { name: 'Personalized Name Resin Keychain', role: 'Key & Bag Keepsake', price: 4500 },
      { name: 'Customized Resin Ballpoint Pen', role: 'Smooth Daily Writer', price: 3500 },
      { name: 'A7 Pocket Jotter & Gift Card', role: 'Quick Notes & Wishes', price: 4500 },
      { name: 'Branded Gift Box & Care Card', role: 'Gift Presentation', price: 2500 }
    ],
    includedExtras: [
      'Includes handwritten card, care guide & satin ribbon wrap',
      'Bulk pricing available when ordering 10+ classmate or team mini boxes'
    ],
    recommendedPersonalization: 'Share recipient first name & favorite color theme on WhatsApp'
  },
  {
    id: 'bundle-birthday-glow',
    title: 'Birthday Glow Box (Friends & Siblings Set)',
    tagline: 'Photo keychain, resin bookmark, mini frame/A5 jotter, resin pen & phone holder in ribboned box',
    recipient: 'Friends, Sisters, Brothers & Close Cousins',
    occasion: 'Fun & Memorable Birthdays',
    budgetTier: 'popular',
    bundlePrice: 31500,
    originalTotal: 35000,
    savingsAmount: 3500,
    imageUrl: '/src/assets/images/resin_floral_bookmark_trinket_1794039189444.jpg',
    emotionalStory: 'Built for the friends and siblings who fill your group chats with laughter. Combines photo memories, study/desk favorites, and a custom phone stand or cover in one cohesive color pour.',
    whyItTouchesTheHeart: 'Five vibrant everyday essentials they keep on their phone, bag, books, and nightstand.',
    items: [
      { name: 'Photo Resin Keychain', role: 'Sealed Memory on Keys', price: 5000 },
      { name: 'Resin Bookmark with Name & Tassel', role: 'For Books & Bibles', price: 3000 },
      { name: 'Mini Photo Frame OR A5 Custom Jotter', role: 'Desk / Reading Pick', price: 12500 },
      { name: 'Personalized Resin Pen', role: 'Matching Writing Pen', price: 3500 },
      { name: 'Resin Phone Holder / Custom Grip Set', role: 'Phone Accessory', price: 7500 },
      { name: 'Ribboned Gift Box, Card & Care Note', role: 'Gift Presentation', price: 3500 }
    ],
    includedExtras: [
      'Choice of mini resin frame or A5 customized jotter',
      'Includes care guide & handwritten greeting card inside'
    ],
    recommendedPersonalization: 'Send 1 clear portrait photo, recipient name & preferred aesthetic on WhatsApp'
  },
  {
    id: 'bundle-kids-party-favour-10',
    title: 'Kids Birthday Party Favour Pack (10–50 Pieces)',
    tagline: '10 mini resin keychains or bag charms with custom name tags & party pouches (Starter Pack of 10)',
    recipient: 'School Friends & Kids Birthday Party Guests',
    occasion: 'Children’s Birthday Parties & Class Favors',
    budgetTier: 'popular',
    bundlePrice: 32000,
    originalTotal: 40000,
    savingsAmount: 8000,
    imageUrl: '/src/assets/images/resin_letter_keychains_1794039961345.jpg',
    emotionalStory: 'Upgrade goodie bags with durable, child-safe initial bag charms and mini keychains kids actually clip onto their school backpacks for months.',
    whyItTouchesTheHeart: 'Includes 10 ready-to-share favor pouches (easily expandable to 25 or 50 kids on WhatsApp).',
    items: [
      { name: '10 Mini Resin Keychains or Backpack Bag Charms', role: 'Starter 10-Kid Favor Batch (₦3,200/pc)', price: 32000 },
      { name: '10 Custom Birthday Name & Thank-You Tags', role: 'Celebrant Name & Age Tag', price: 4500 },
      { name: '10 Color-Matched Organza Party Pouches', role: 'Ready for Goodie Bags', price: 3500 }
    ],
    includedExtras: [
      'Starter pack covers 10 kids; message WhatsApp for 20, 30, or 50-piece volume pricing',
      'Child-safe smooth rounded corners with non-breakable glitter & confetti resin'
    ],
    recommendedPersonalization: 'Share child’s name, age, party theme colors & guest list count'
  },
  {
    id: 'bundle-proposal-reveal',
    title: 'Proposal Reveal Box ("Will You Marry Me?" Suite)',
    tagline: 'Engagement letter or proposal plaque, custom ring box accent, photo frame & "Yes" keepsake card',
    recipient: 'Fiancée-to-Be (Proposal Surprise)',
    occasion: 'Romantic Proposal & Engagement Reveal',
    budgetTier: 'luxury',
    bundlePrice: 0,
    originalTotal: 0,
    savingsAmount: 0,
    isCustomQuote: true,
    quoteLabel: 'Request a Quote',
    imageUrl: '/src/assets/images/nigerian_night_lamp_1794042246895.jpg',
    emotionalStory: 'Set an unforgettable backdrop for the biggest question of your life—crafted discreetly around your engagement colors, favorite flower petals, and hidden "Will You Marry Me?" inscription.',
    whyItTouchesTheHeart: 'Turns her proposal photo and ring reveal into a permanent tabletop treasure.',
    items: [
      { name: 'Resin Engagement Letter / "Will You Marry Me?" Plaque', role: 'Centerpiece Question Plaque', price: 0 },
      { name: 'Custom Engagement Ring-Box Topper / Tray Accent', role: 'Ring Presentation Dish', price: 0 },
      { name: 'Couple Photo Frame', role: 'Favorite Memory Picture', price: 0 },
      { name: 'Discreet Proposal Box & "Yes" Keepsake Card', role: 'Surprise Packaging', price: 0 }
    ],
    includedExtras: [
      'Plain discreet outer shipping wrap so the surprise is never spoiled',
      'Price tailored to plaque size, optional LED glow base & delivery urgency'
    ],
    recommendedPersonalization: 'Share your partner’s name, favorite flowers/colors & proposal date for a quote'
  },
  {
    id: 'bundle-wedding-memory-box',
    title: 'The Post-Wedding Memory Preservation Box',
    tagline: 'Preserved bouquet coaster set, original wedding invitation keepsake, date plaque & couple photo frame',
    recipient: 'Newlyweds Preservation Commission',
    occasion: 'Post-Wedding Bouquet & Invitation Preservation',
    budgetTier: 'luxury',
    bundlePrice: 0,
    originalTotal: 0,
    savingsAmount: 0,
    isCustomQuote: true,
    quoteLabel: 'Request a Quote',
    imageUrl: '/src/assets/images/resin_botanical_preservation_1793922102176.jpg',
    emotionalStory: 'Do not throw away your bridal bouquet or let your printed wedding invitation fade in a drawer. Send us your blooms and card—we preserve them across a coordinated parlor keepsake collection.',
    whyItTouchesTheHeart: 'Turns perishable wedding flowers and paper invites into heirloom art you hold every decade.',
    items: [
      { name: 'Wedding Invitation & Vows Keepsake Block', role: 'Your Original Card Sealed Forever', price: 0 },
      { name: 'Pressed Wedding-Flower Coasters (Set of 4)', role: 'Functional Bouquet Florals', price: 0 },
      { name: 'Wedding-Date Plaque + Couple Photo Frame', role: 'Names & Ceremony Date Display', price: 0 },
      { name: 'Archival Luxury Memory Box & UV Care Card', role: 'Heirloom Protection', price: 0 }
    ],
    includedExtras: [
      'Guided WhatsApp drop-off / dispatch instructions for fresh wedding bouquets within 72 hours',
      'Quoted per preservation block dimensions & coaster count'
    ],
    recommendedPersonalization: 'Tell us your wedding date, courier location & bouquet drop-off plan on WhatsApp'
  },
  {
    id: 'bundle-baby-arrival-box',
    title: 'Baby Arrival & Nursery Welcome Box',
    tagline: 'Baby name plaque, baby photo keychain, mini keepsake frame & welcome card in pastel box',
    recipient: 'Newborn Baby & New Parents',
    occasion: 'New Baby Arrival, Hospital Visit & Nursery Decor',
    budgetTier: 'popular',
    bundlePrice: 34500,
    originalTotal: 38500,
    savingsAmount: 4000,
    imageUrl: '/src/assets/images/resin_birthday_nameplate_1794569209140.jpg',
    emotionalStory: 'Baby clothes are outgrown in three months, but a nursery name plaque and keepsake frame stay on the baby’s shelf from infancy into childhood.',
    whyItTouchesTheHeart: 'Soft pastel keepsakes honoring the baby’s exact birth name, weight, and arrival day.',
    items: [
      { name: 'Baby Name & Birth Stats Plaque', role: 'Nursery Shelf Centerpiece', price: 17500 },
      { name: 'Baby Photo Keychain', role: 'New Parent Daily Keyring', price: 5000 },
      { name: 'Mini Nursery Photo Frame', role: 'Hospital Portrait Frame', price: 12500 },
      { name: 'Pastel Box, Welcome Card & Care Guide', role: 'Soft Nursery Packaging', price: 3500 }
    ],
    includedExtras: [
      'Pastel sky blue, soft blush, buttercream, or sage finish with baby-safe smooth corners',
      'Saves ₦4,000 compared to individual pieces'
    ],
    recommendedPersonalization: 'Send baby name(s), birth date, weight & gender palette on WhatsApp'
  },
  {
    id: 'bundle-baby-shower-christening',
    title: 'Baby Shower, Christening & Dedication Keepsake Box',
    tagline: '"It\'s a Boy/Girl" or christening name/date plaque + ultrasound/footprint block in pastel gift box',
    recipient: 'Expectant Parents, Naming Ceremony & Christening Hosts',
    occasion: 'Baby Shower, Naming Ceremony, Child Dedication & 1st Birthday',
    budgetTier: 'popular',
    bundlePrice: 37500,
    originalTotal: 42000,
    savingsAmount: 4500,
    imageUrl: '/src/assets/images/recognition_plaque_clean_1794569240984.jpg',
    emotionalStory: 'Preserves the fleeting magic of pregnancy ultrasound scans, newborn footprints, and naming-ceremony prayers inside two coordinated crystal-clear nursery keepsakes.',
    whyItTouchesTheHeart: 'Captures the blessing spoken over the child alongside their earliest scan or footprint.',
    items: [
      { name: 'Christening / Naming Ceremony Plaque with Blessing', role: 'Name, Ceremony Date & Scripture', price: 17500 },
      { name: 'Ultrasound / Footprint Keepsake Block', role: 'Sealed Milestone Block', price: 19500 },
      { name: 'Pastel Gift Chest, Keepsake Tag & Care Card', role: 'Ready-to-Present Box', price: 5000 }
    ],
    includedExtras: [
      'Works for pre-birth baby showers (ultrasound scan) or post-naming dedications',
      'Includes parental prayer/scripture card & UV care sheet'
    ],
    recommendedPersonalization: 'Share ceremony wording, baby name & ultrasound scan photo on WhatsApp'
  },
  {
    id: 'bundle-naming-ceremony-favours-20',
    title: 'Naming Ceremony & 1st-Birthday Favour Pack (20–100 Pcs)',
    tagline: '20 mini resin charms with baby name/date tags in individual pastel guest pouches (Starter 20-Pack)',
    recipient: 'Naming Ceremony, Christening & 1st-Birthday Guests',
    occasion: 'Naming Ceremony, Dedication & 1st Birthday Party Favors',
    budgetTier: 'executive',
    bundlePrice: 48000,
    originalTotal: 56000,
    savingsAmount: 8000,
    imageUrl: '/src/assets/images/resin_wedding_souvenirs_1794039960674.jpg',
    emotionalStory: 'Give aunts, uncles, and church well-wishers an adorable mini charm embossed with the baby’s name and naming date—each tucked inside a ready-to-hand-out pastel pouch.',
    whyItTouchesTheHeart: '20 complete favor pouches ready for your guest table (expandable to 50 or 100+ via WhatsApp).',
    items: [
      { name: '20 Mini Resin Keepsake Charms / Keychains', role: 'Baby Initial or Footprint Charm', price: 42000 },
      { name: '20 Printed Baby Name & Date Favor Tags', role: 'Custom Naming / Birthday Tag', price: 7000 },
      { name: '20 Color-Matched Pastel Organza Pouches', role: 'Sorted for Easy Sharing', price: 7000 }
    ],
    includedExtras: [
      '20-piece starter bundle saves ₦8,000; message us for 50 or 100-piece discounts',
      'Matched to Aso-Ebi or dedication service color code'
    ],
    recommendedPersonalization: 'Send baby’s full name, ceremony date & guest quantity on WhatsApp'
  },
  {
    id: 'bundle-family-memory-set',
    title: 'Family Memory & Home Welcome Set',
    tagline: 'Family photo frame, custom family name sign & 3 individual member name keychains in gift box',
    recipient: 'Parents, Families & New Homeowners',
    occasion: 'Housewarming, Family Reunion & Parents’ Anniversary',
    budgetTier: 'luxury',
    bundlePrice: 52000,
    originalTotal: 58000,
    savingsAmount: 6000,
    imageUrl: '/src/assets/images/nigerian_couple_plaque_1794042243147.jpg',
    emotionalStory: 'Unites everyone under one roof—pairing a statement "Welcome to Our Home" family sign and living-room family photo frame with personal name keychains for mum, dad, or kids.',
    whyItTouchesTheHeart: 'Every household member receives their own named keychain alongside a shared parlor centerpiece.',
    items: [
      { name: 'Family Photo Resin Frame (A5)', role: 'Living Room Portrait Display', price: 19500 },
      { name: 'Family Surname & "Welcome to Our Home" Sign', role: 'Entryway / Parlor Sign', price: 21500 },
      { name: '3 Individual Family-Member Name Keychains', role: 'Matching Keys for the Family', price: 13500 },
      { name: 'Large Family Presentation Box & Card', role: 'Gift Presentation', price: 3500 }
    ],
    includedExtras: [
      'Need extra keychains for 4, 5, or 6 family members? Add easily for ₦4,000 each',
      'Saves ₦6,000 on the 5-piece family set'
    ],
    recommendedPersonalization: 'Send family surname, member first names & favorite family photo on WhatsApp'
  },
  {
    id: 'bundle-ramadan-eid-gift-set',
    title: 'Ramadan / Eid Mubarak Celebration Gift Set',
    tagline: 'Resin serving tray, custom dates dish, prayer-time / dua plaque & festive Eid card in gift box',
    recipient: 'Muslim Families, Elders, Friends & Corporate Partners',
    occasion: 'Ramadan Kareem, Eid-el-Fitr & Eid-el-Kabir Gifting',
    budgetTier: 'luxury',
    bundlePrice: 48500,
    originalTotal: 54000,
    savingsAmount: 5500,
    imageUrl: '/src/assets/images/resin_rose_quartz_tray_1793922101988.jpg',
    emotionalStory: 'Thoughtfully curated around Iftar hospitality and peaceful prayer spaces—combining an elegant serving tray, dedicated dates bowl, and bespoke Eid/prayer plaque.',
    whyItTouchesTheHeart: 'Respects cultural tradition with heirloom home pieces that grace Iftar tables for years.',
    items: [
      { name: 'Emerald / Gold Accent Serving Tray', role: 'Tea, Juice & Visitor Hospitality', price: 22000 },
      { name: 'Resin Dates & Sweets Dish Holder', role: 'Dedicated Iftar Treat Dish', price: 9500 },
      { name: 'Prayer-Time / "Eid Mubarak" Calligraphy Plaque', role: 'Blessing & Dua Display', price: 18500 },
      { name: 'Eid Greeting Card, Care Card & Festive Box', role: 'Ribboned Gift Presentation', price: 4000 }
    ],
    includedExtras: [
      'Crescent gold, emerald pearl, or ivory calligraphic palette options',
      'Saves ₦5,500 off separate items'
    ],
    recommendedPersonalization: 'Share recipient family name, preferred Arabic/English blessing & colors on WhatsApp'
  },
  {
    id: 'bundle-christmas-family-set',
    title: 'Christmas Family Keepsake Box',
    tagline: 'Family name home sign, photo Christmas tree ornament & set of 2 coasters in festive red/gold box',
    recipient: 'Families, Hosts & Loved Ones',
    occasion: 'Christmas Family Gifting & Tree Traditions',
    budgetTier: 'executive',
    bundlePrice: 36000,
    originalTotal: 40000,
    savingsAmount: 4000,
    imageUrl: '/src/assets/images/resin_christmas_tree_ornament_1794310557281.jpg',
    emotionalStory: 'Made for family parlors gathered under fairy lights—a permanent family surname wall sign paired with a dated photo tree ornament and two holiday coasters.',
    whyItTouchesTheHeart: 'Becomes a yearly December tradition as families unpack the dated ornament every Christmas.',
    items: [
      { name: 'Custom Family Surname Resin Home Sign', role: 'Parlor & Door Centerpiece', price: 21500 },
      { name: 'Photo Resin Christmas Tree Ornament (Dated)', role: 'Family Tree Tradition', price: 4500 },
      { name: 'Festive Drink Coasters (Set of 2)', role: 'Coffee Table Coasters', price: 10500 },
      { name: 'Red & Gold Festive Gift Box & Card', role: 'Holiday Presentation', price: 3500 }
    ],
    includedExtras: [
      'Finished in rich Christmas emerald, cranberry red & champagne gold palettes',
      'Saves ₦4,000 off individual pricing'
    ],
    recommendedPersonalization: 'Send family name, year, portrait photo & holiday wish on WhatsApp'
  },
  {
    id: 'bundle-new-year-wish-box',
    title: 'New Year Goal & Vision Wish Box',
    tagline: 'Custom resolution/goal plaque, name keychain, mini photo frame & motivational card',
    recipient: 'Ambition-Driven Friends, Mentees, Graduates & Teams',
    occasion: 'New Year, Vision Board & Fresh Start Gifting',
    budgetTier: 'popular',
    bundlePrice: 35000,
    originalTotal: 39000,
    savingsAmount: 4000,
    imageUrl: '/src/assets/images/resin_clock_nameplate_1794041297795.jpg',
    emotionalStory: 'Turn their New Year theme word, scripture, or milestone goal into a gleaming desk vision plaque paired with everyday reminders they carry everywhere.',
    whyItTouchesTheHeart: 'Keeps their defining annual word and encouragement visible through December.',
    items: [
      { name: 'New Year Vision / Scripture Goal Plaque', role: 'Daily Desk Motivation', price: 18500 },
      { name: 'Personalized Name Resin Keychain', role: 'Daily Bag & Key Reminder', price: 4500 },
      { name: 'Mini Resin Photo Frame', role: 'Loved Ones Desk Anchor', price: 12500 },
      { name: 'Motivational Card & Presentation Box', role: 'Gift Box Finish', price: 3500 }
    ],
    includedExtras: [
      'Includes custom Word-of-the-Year or scripture inscription',
      'Saves ₦4,000 off single-item pricing'
    ],
    recommendedPersonalization: 'Tell us their theme word, scripture/quote & favorite colors on WhatsApp'
  },
  {
    id: 'bundle-church-ministry-appreciation',
    title: 'Church, Pastor & Ministry Appreciation Box',
    tagline: 'Leader name plaque, scripture stand, personalized coaster & smooth signing pen in presentation box',
    recipient: 'Pastors, Overseers, Ministers, Choir Directors & Elders',
    occasion: 'Pastor Appreciation, Church Anniversary & Ordination',
    budgetTier: 'luxury',
    bundlePrice: 46000,
    originalTotal: 51500,
    savingsAmount: 5500,
    imageUrl: '/src/assets/images/recognition_plaque_clean_1794569240984.jpg',
    emotionalStory: 'Honor spiritual leaders with dignity—a pastor desk nameplate and favorite Bible verse plaque alongside a matching Bible-study coaster and signing pen.',
    whyItTouchesTheHeart: 'Every sermon note and study hour brings a reminder of your congregation’s gratitude.',
    items: [
      { name: 'Pastoral Desk Nameplate (e.g. Pastor / Apostle)', role: 'Study & Church Office Display', price: 20000 },
      { name: 'Freestanding Scripture Tribute Plaque', role: 'Ordination / Ministry Verse', price: 18500 },
      { name: 'Monogrammed Study Drink Coaster', role: 'For Tea & Study Desk', price: 5500 },
      { name: 'Matching Resin Signing Pen', role: 'Notes & Marriage Certificates', price: 3500 },
      { name: 'Presentation Box & Appreciation Card', role: 'Congregation Note Box', price: 4000 }
    ],
    includedExtras: [
      'Includes free scripture calligraphy layout check via WhatsApp before pouring',
      'Saves ₦5,500 on the 4-piece ministry suite'
    ],
    recommendedPersonalization: 'Share minister’s title, church logo/name & chosen verse on WhatsApp'
  },
  {
    id: 'bundle-graduation-thanksgiving',
    title: 'Graduation Thanksgiving Celebration Box',
    tagline: 'Graduation-year keychain, school-leaving plaque & graduation photo frame in ribboned gift box',
    recipient: 'University Graduates, NYSC Passing-Out, Law School & High-School Leavers',
    occasion: 'Convocation, Thanksgiving Service & Call to Bar',
    budgetTier: 'executive',
    bundlePrice: 39500,
    originalTotal: 44000,
    savingsAmount: 4500,
    imageUrl: '/src/assets/images/recognition_plaque_clean_1794569240984.jpg',
    emotionalStory: 'After late nights and tough exams, mark their degree milestone with a custom graduation portrait frame, degree/school plaque, and "Class Of" keepsake keychain.',
    whyItTouchesTheHeart: 'Celebrates every degree title, honours grade, and graduation gown portrait proudly.',
    items: [
      { name: 'School-Leaving / Degree Plaque', role: 'University, Faculty & Class Year', price: 16500 },
      { name: 'Graduation Portrait Photo Frame (A5)', role: 'Convocation Gown Memory', price: 19500 },
      { name: 'Graduation Cap & Year Keychain', role: 'Everyday Class Pride', price: 4500 },
      { name: 'Gift Box, Tassel Ribbon & Wishes Card', role: 'Tribute Presentation', price: 3500 }
    ],
    includedExtras: [
      'Matched to school colors (emerald, royal navy, maroon, or champagne gold)',
      'Saves ₦4,500 off separate pieces'
    ],
    recommendedPersonalization: 'Send graduate’s full name, degree, school, year & gown photo on WhatsApp'
  },
  {
    id: 'bundle-corporate-onboarding-kit',
    title: 'Corporate Staff Onboarding & Client Welcome Kit',
    tagline: 'Badge reel / name tag, company-logo keychain, branded pen, desk coaster & welcome card',
    recipient: 'New Hires, Seminar Speakers & B2B Clients',
    occasion: 'Staff Onboarding, Retreat Welcome & Corporate Rebranding',
    budgetTier: 'popular',
    bundlePrice: 19500,
    bulkPrice: 16800,
    bulkMinQty: 10,
    originalTotal: 22500,
    savingsAmount: 3000,
    imageUrl: '/src/assets/images/nigerian_corporate_suite_1794042273984.jpg',
    emotionalStory: 'Make Day One unforgettable. Every new team member or client receives a cohesive, brand-colored desk kit featuring their own name badge reel, logo keychain, branded pen, and desk coaster.',
    whyItTouchesTheHeart: 'High-utility daily office items carrying both your brand pride and their personal name.',
    items: [
      { name: 'Retractable Name Badge Reel / ID Charm', role: 'Daily Office Wear', price: 5000 },
      { name: 'Company-Logo Resin Keychain', role: 'Brand Pride on Keys', price: 4000 },
      { name: 'Branded Resin Ballpoint Pen', role: 'Meeting & Signing Essential', price: 3500 },
      { name: 'Company-Logo Desk Coaster', role: 'Workstation Coaster', price: 5500 },
      { name: 'Branded Welcome Card, Care Card & Box', role: 'Turnkey HR Onboarding Box', price: 4500 }
    ],
    includedExtras: [
      'Single kit: ₦19,500 · 10+ bulk corporate rate: ₦16,800 per kit',
      'Pantone/HEX brand color matching confirmed on WhatsApp'
    ],
    recommendedPersonalization: 'Send company logo file, brand colors & staff name roster on WhatsApp'
  }
]
