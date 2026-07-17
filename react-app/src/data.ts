/* =====================================================================
   G&G VITAMINS — Regime Builder data
   Real catalog data (handles, variant IDs, prices, images) referenced
   from gandgvitamins.com so "Shop bundle" builds a genuine Shopify cart.

   Copy is goal-led: we describe what someone wants to achieve and how a
   nutrient contributes to a normal physiological role (EFSA-style claim
   language, in line with gandgvitamins.com). No medical-condition claims.
   ===================================================================== */

export const STORE = 'https://gandgvitamins.com'

/* Bundle offer + age slider config */
export const BUNDLE_DISCOUNT = 0.15
export const DISCOUNT_CODE = 'BUNDLE15'
export const AGE_MIN = 18
export const AGE_MAX = 80
export const AGE_DEFAULT = 35

export type Scores = Record<string, number>

interface AgeBand {
  max: number
  scores: Scores
}
export const AGE_BANDS: AgeBand[] = [
  { max: 29, scores: { energy: 2, skin: 1, muscle: 1, general: 1 } },
  { max: 44, scores: { energy: 2, stress: 1, immunity: 1, beauty: 1, general: 1 } },
  { max: 59, scores: { joints: 2, bone: 1, heart: 1, hormones: 1, antioxidant: 1, energy: 1 } },
  { max: Infinity, scores: { bone: 2, joints: 2, heart: 1, cognitive: 1, immunity: 1, general: 1 } },
]
export const bandFor = (age: number) => AGE_BANDS.find((b) => age <= b.max)

export const ICONS: Record<string, string> = {
  sunrise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  plate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="2" x2="7" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  sunset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/></svg>',
  capsule: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
  ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C4 11.1 3 13 3 15a7 7 0 0 0 7 7Z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
}

export const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'

export const UNION_JACK = '<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-label="Union Jack"><clipPath id="ujclip"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="ujcc"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#ujclip)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ujcc)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>'

export const WA_GLYPH = '<svg class="wa-glyph" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.02 3.2c-7.1 0-12.86 5.76-12.86 12.86 0 2.27.6 4.48 1.73 6.44L3.05 28.8l6.47-1.7a12.8 12.8 0 0 0 6.5 1.77h.01c7.1 0 12.86-5.76 12.86-12.86S23.12 3.2 16.02 3.2zm0 23.5h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.84 1.01 1.03-3.74-.25-.4a10.63 10.63 0 0 1-1.63-5.66c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.12a10.6 10.6 0 0 1 3.12 7.54c0 5.88-4.78 10.66-10.65 10.66zm5.85-7.98c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"/></svg>'

const IMG = 'https://cdn.shopify.com/s/files/1/1045/6871/7650/files/'

export type SlotKey =
  | 'before-breakfast'
  | 'morning'
  | 'main-meal'
  | 'midday'
  | 'workout'
  | 'evening'
  | 'bedtime'

export interface SlotDef {
  rank: number
  label: string
  icon: string
}

export const SLOTS: Record<SlotKey, SlotDef> = {
  'before-breakfast': { rank: 1, label: 'First thing', icon: 'sunrise' },
  morning: { rank: 2, label: 'Morning', icon: 'sun' },
  'main-meal': { rank: 3, label: 'Main meal', icon: 'plate' },
  midday: { rank: 4, label: 'Midday', icon: 'sun' },
  workout: { rank: 5, label: 'Around exercise', icon: 'dumbbell' },
  evening: { rank: 6, label: 'Evening', icon: 'sunset' },
  bedtime: { rank: 7, label: 'Before bed', icon: 'moon' },
}

export interface Product {
  slug: string
  variant: number
  name: string
  size: string
  cat: string
  price: number
  img: string
  exclude?: string[]
  sex?: 'male' | 'female'
  tags: string[]
  slot: SlotKey
  food: string
  dose: string
  tip: string
  blurb: string
}

/* Real G&G products — handle + variant are live values from gandgvitamins.com.
   Blurbs use EFSA-style "contributes to the normal function of…" claims. */
export const PRODUCTS: Product[] = [
  { slug: 'magnesium-bisglycinate-200mg-90-vegan-capsules', variant: 52646917144914, name: 'Magnesium Bisglycinate 200mg', size: '90 vegan capsules', cat: 'Minerals', price: 15, img: IMG + 'GAK01-magnesium-bisglycinate-MAIN.jpg',
    tags: ['sleep', 'stress', 'muscle', 'recovery', 'energy'], slot: 'evening', food: 'With or without food', dose: '2 capsules',
    tip: 'Take in the evening to help you unwind before bed.',
    blurb: 'A gentle, highly absorbable magnesium. Magnesium contributes to normal muscle function, the normal function of the nervous system and to a reduction of tiredness and fatigue.' },
  { slug: 'omega-3-fish-oil', variant: 52646913114450, name: 'Omega 3 Fish Oil 3000mg', size: '90 softgels', cat: 'Omega & Oils', price: 15, img: IMG + 'GA303-omega-3-fish-oil-MAIN_0191bcad-72c5-4da8-ad14-b1b1b0f22fa6.jpg', exclude: ['vegetarian', 'vegan'],
    tags: ['heart', 'brain', 'cognitive', 'joints', 'general'], slot: 'morning', food: 'With a meal', dose: '3 softgels',
    tip: 'Take with breakfast, when the fats in your meal support absorption.',
    blurb: 'High-strength EPA & DHA. EPA and DHA contribute to the normal function of the heart, and DHA contributes to the maintenance of normal brain function and normal vision.' },
  { slug: 'vitamin-d-plus', variant: 52646912393554, name: 'Vitamin D3 Plus (with K2)', size: '60 capsules', cat: 'Vitamins', price: 19, img: IMG + 'GA151-vitamin-d3-plus-MAIN_35b2d51c-b76e-4679-bbd1-68101084c04c.jpg',
    tags: ['immunity', 'bone', 'general'], slot: 'morning', food: 'With a meal', dose: '1 capsule',
    tip: 'Take with your largest meal; it absorbs best alongside fats.',
    blurb: 'The UK sunshine vitamin with K2. Vitamin D contributes to the normal function of the immune system and to the maintenance of normal bones.' },
  { slug: 'vitamin-c-1000mg', variant: 52646908559698, name: 'Vitamin C Complex 1000mg', size: '120 vegan capsules', cat: 'Vitamins', price: 12, img: IMG + 'GA058-vitamin-c-MAIN_c601a0db-bb2b-4be6-b318-e126f1794e17.jpg',
    tags: ['immunity', 'beauty', 'skin', 'antioxidant', 'energy'], slot: 'morning', food: 'With or without food', dose: '1 capsule',
    tip: 'Take in the morning for everyday immune support.',
    blurb: 'High-strength vitamin C with acerola & rosehip. Vitamin C contributes to normal collagen formation, the normal function of the immune system and a reduction of tiredness and fatigue.' },
  { slug: 'vitamin-b-complex-50mg-niacin', variant: 52646914752850, name: 'Vitamin B Complex with Niacin', size: '120 vegan capsules', cat: 'Vitamins', price: 16, img: IMG + 'GA625-vitamin-b-MAIN.jpg',
    tags: ['energy', 'stress', 'cognitive', 'brain'], slot: 'morning', food: 'With breakfast', dose: '1 capsule',
    tip: 'Take early in the day, when B vitamins support your energy.',
    blurb: 'The full B-vitamin spectrum. B vitamins contribute to normal energy-yielding metabolism and the normal function of the nervous system.' },
  { slug: 'advanced-pro-veflora', variant: 52646908625234, name: 'Advanced Pro-VeFlora 50 Billion', size: '60 vegan capsules', cat: 'Probiotics', price: 40, img: IMG + 'GA059-advanced-pro-veflora-MAIN_c5c23603-371a-4ed8-a988-d460816036c9.jpg',
    tags: ['gut', 'digestion', 'immunity'], slot: 'before-breakfast', food: 'Before food, keep refrigerated', dose: '1 capsule',
    tip: 'Take before breakfast on an empty stomach; store in the fridge.',
    blurb: '50 billion live cultures across 14 strains, a considered choice for your everyday gut wellbeing.' },
  { slug: 'zinc-picolinate-22mg', variant: 52646915244370, name: 'Zinc Picolinate 22mg', size: '120 vegan capsules', cat: 'Minerals', price: 10, img: IMG + 'GA711-zinc-MAIN.jpg',
    tags: ['immunity', 'mens', 'skin', 'hair'], slot: 'midday', food: 'With food', dose: '1 capsule',
    tip: 'Take with a meal so it sits comfortably.',
    blurb: 'A highly absorbable zinc. Zinc contributes to the normal function of the immune system and the maintenance of normal skin, hair and nails.' },
  { slug: 'collagen-extra-supplement-capsules', variant: 52646915080530, name: 'Collagen Extra', size: '60 capsules', cat: 'Collagen & Beauty', price: 13, img: IMG + 'GA704-collagen-extra-MAIN_c0efa740-fed3-4992-ba8d-6e876bc09878.jpg', exclude: ['vegetarian', 'vegan'],
    tags: ['joints', 'recovery', 'beauty', 'skin'], slot: 'morning', food: 'With or without food', dose: '2 capsules',
    tip: 'Take daily; the added vitamin C supports normal collagen formation.',
    blurb: 'Hydrolysed collagen with glucosamine, MSM and vitamin C. Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.' },
  { slug: 'beauty-collagen-60-capsules', variant: 52646908526930, name: 'Beauty Collagen', size: '60 capsules', cat: 'Collagen & Beauty', price: 12, img: IMG + 'GA057-beauty-collagen-MAIN_95971a26-ed66-421c-a921-df8451570ff6.jpg', exclude: ['vegetarian', 'vegan'],
    tags: ['beauty', 'skin', 'hair'], slot: 'morning', food: 'With or without food', dose: '2 capsules',
    tip: 'Take daily as part of your beauty routine.',
    blurb: 'Marine collagen with hyaluronic acid and vitamin C. Vitamin C contributes to normal collagen formation for the normal function of the skin.' },
  { slug: 'turmeric-curcumin-supplement', variant: 52646911279442, name: 'Turmeric & Curcumin', size: '60 vegan capsules', cat: 'Botanicals', price: 12, img: IMG + 'GA114-turmeric-curcumin-MAIN_011bc989-3f3e-4477-8001-cf990d8f6e62.jpg',
    tags: ['joints', 'antioxidant', 'recovery', 'gut'], slot: 'main-meal', food: 'With a meal containing fat', dose: '1 capsule',
    tip: 'Take with a meal containing fat to support absorption.',
    blurb: '95% curcuminoids with ginger and black pepper for absorption. A much-loved botanical to enjoy as part of your daily routine.' },
  { slug: 'total-amino-full-spectrum-amino-acids-120-capsules', variant: 52646916161874, name: 'Total Amino (Full Spectrum)', size: '120 capsules', cat: 'Amino & Sport', price: 17, img: IMG + 'GA804-total-amino-MAIN.jpg',
    tags: ['muscle', 'recovery', 'energy'], slot: 'workout', food: 'With or without food', dose: '4 capsules',
    tip: 'Take around training to support your recovery.',
    blurb: 'All the amino acids in free-form, a favourite of active people to complement training and recovery.' },
  { slug: 'cal-m-250mg', variant: 52646915014994, name: 'Cal-M', size: '120 vegan capsules', cat: 'Minerals', price: 12, img: IMG + 'GA701-cal-m-MAIN.jpg',
    tags: ['recovery', 'sleep', 'bone', 'muscle'], slot: 'evening', food: 'With or without food', dose: '2 capsules',
    tip: 'Take in the evening to help you relax and unwind.',
    blurb: 'A calcium-magnesium blend loved by active people. Calcium and magnesium contribute to normal muscle function.' },
  { slug: 'night-aid-30-vegan-capsules', variant: 52646906954066, name: 'Night Aid', size: '30 vegan capsules', cat: 'Sleep', price: 9, img: IMG + 'GA004-night-aid-MAIN_25d6c2e4-61c0-4936-8b97-9be083bb5590.jpg',
    tags: ['sleep', 'stress'], slot: 'bedtime', food: 'Away from food', dose: '1 capsule',
    tip: 'Take 30 to 60 minutes before bed as part of your wind-down.',
    blurb: 'L-tryptophan, magnesium and B6 with calming botanicals. Magnesium contributes to the normal function of the nervous system.' },
  { slug: 'organic-ashwagandha-supplement', variant: 52646912917842, name: 'Organic Ashwagandha', size: '60 vegan capsules', cat: 'Botanicals', price: 16, img: IMG + 'GA198-organic-ashwagandha-MAIN_9ff0b922-8bb3-479a-8b4e-11682ea6e880.jpg',
    tags: ['stress', 'sleep', 'energy', 'hormones'], slot: 'evening', food: 'With food', dose: '1 capsule',
    tip: 'Take with your evening meal as part of your wind-down (mornings work too).',
    blurb: 'An organic adaptogen botanical, traditionally enjoyed to help you feel calm and balanced.' },
  { slug: 'iron-bisglycinate-20mg', variant: 52646909575506, name: 'Iron Bisglycinate 20mg', size: '60 vegan capsules', cat: 'Minerals', price: 7, img: IMG + 'GA065-iron-MAIN_6c6a7866-301d-4b8b-997b-33a6da4a92a2.jpg',
    tags: ['energy', 'womens', 'iron'], slot: 'morning', food: 'Away from tea, coffee & calcium', dose: '1 capsule',
    tip: 'Take in the morning, away from tea, coffee or calcium for best absorption.',
    blurb: 'A gentle, well-absorbed iron. Iron contributes to a reduction of tiredness and fatigue and to normal energy-yielding metabolism.' },
  { slug: 'mega-multi-multivitamin', variant: 52646916686162, name: 'Mega Multi', size: '90 vegan capsules', cat: 'Multivitamins', price: 19, img: IMG + 'GA998-mega-multi-MAIN.jpg',
    tags: ['general', 'energy', 'immunity'], slot: 'morning', food: 'With breakfast', dose: '3 capsules',
    tip: 'Take with breakfast as your daily foundation.',
    blurb: 'A comprehensive daily multivitamin with vitamins, minerals and amino acids — a broad everyday foundation for your goals.' },
  { slug: 'vegan-multivitamin-supplement', variant: 52646907707730, name: 'Vegan Multi', size: '90 capsules', cat: 'Multivitamins', price: 29, img: IMG + 'GA029-vegan-multi-MAIN_d95ce98c-b5a3-4efb-a16b-c289dcc82f30.jpg',
    tags: ['general', 'energy', 'immunity', 'vegan'], slot: 'morning', food: 'With breakfast', dose: '3 capsules',
    tip: 'Take with breakfast as your plant-based daily foundation.',
    blurb: 'A complete plant-based multivitamin with B12, D, iron, iodine and zinc — the vegan everyday foundation.' },
  { slug: 'fertility-women-90-vegan-capsules', variant: 52646908395858, name: 'Fertility Women', size: '90 vegan capsules', cat: 'Women & Men', price: 26, img: IMG + 'GA052-fertility-women-MAIN.jpg',
    tags: ['womens', 'hormones', 'fertility'], slot: 'morning', food: 'With food', dose: '3 capsules', sex: 'female',
    tip: 'Take daily with a meal.',
    blurb: 'Zinc, selenium and folate. Zinc contributes to normal fertility and reproduction, and folate supports maternal tissue growth in pregnancy.' },
  { slug: 'fertility-men-90-vegan-capsules', variant: 52646910067026, name: 'Fertility Men', size: '90 vegan capsules', cat: 'Women & Men', price: 29, img: IMG + 'GA074-fertility-men-MAIN.jpg',
    tags: ['mens', 'fertility'], slot: 'morning', food: 'With food', dose: '3 capsules', sex: 'male',
    tip: 'Take daily with a meal.',
    blurb: 'Zinc and selenium. Zinc contributes to normal fertility and reproduction and normal testosterone levels in the blood.' },
  { slug: 'saw-palmetto-and-zinc', variant: 52646913868114, name: 'Saw Palmetto & Zinc', size: '120 vegan capsules', cat: 'Botanicals', price: 18, img: IMG + 'GA455-saw-palmetto-zinc-MAIN.jpg',
    tags: ['mens', 'hair', 'hormones'], slot: 'midday', food: 'With food', dose: '2 capsules', sex: 'male',
    tip: 'Take with a meal.',
    blurb: 'Saw palmetto botanical with zinc. Zinc contributes to the maintenance of normal testosterone levels in the blood and normal hair.' },
  { slug: 'evening-primrose-oil', variant: 52646913311058, name: 'Evening Primrose Oil 1000mg', size: '60 softgels', cat: 'Omega & Oils', price: 16, img: IMG + 'GA340-evening-primrose-oil-MAIN.jpg',
    tags: ['womens', 'hormones', 'skin'], slot: 'main-meal', food: 'With food', dose: '2 softgels', sex: 'female',
    tip: 'Take with a meal as part of your daily routine.',
    blurb: 'A natural source of GLA from cold-pressed evening primrose oil — a long-time women’s favourite.' },
  { slug: 'organic-mushroom-blend-supplement', variant: 52646910427474, name: 'Organic Mushroom Blend', size: '90 vegan capsules', cat: 'Botanicals', price: 22, img: IMG + 'GA080-organic-mushroom-MAIN_af9384d7-e69d-431e-b490-12ca726c5a1b.jpg',
    tags: ['immunity', 'energy', 'cognitive', 'antioxidant'], slot: 'morning', food: 'With or without food', dose: '3 capsules',
    tip: 'Take in the morning as part of your daily routine.',
    blurb: 'Six organic mushroom botanicals including lion’s mane and reishi, a considered daily blend.' },
  { slug: 'selenium-200mcg', variant: 52646910787922, name: 'Selenium', size: '120 vegan capsules', cat: 'Minerals', price: 12, img: IMG + 'GA097-selenium-MAIN_44e311ba-f1b7-4008-80fd-ea3bb0181855.jpg',
    tags: ['immunity', 'antioxidant', 'thyroid', 'fertility'], slot: 'midday', food: 'With food', dose: '1 capsule',
    tip: 'Take with a meal.',
    blurb: 'Highly bioavailable selenium. Selenium contributes to the normal function of the immune system, normal thyroid function and the protection of cells from oxidative stress.' },
  { slug: 'astaxanthin-supplement-4mg', variant: 52646912622930, name: 'Astaxanthin', size: '30 vegan softgels', cat: 'Antioxidants', price: 17, img: IMG + 'GA158-astaxanthin-MAIN_a2a08281-2ea1-4219-91c4-42df525de2d7.jpg',
    tags: ['antioxidant', 'skin', 'recovery', 'joints'], slot: 'main-meal', food: 'With a meal containing fat', dose: '1 softgel',
    tip: 'Take with a fat-containing meal for absorption.',
    blurb: 'A plant-based carotenoid from microalgae, a naturally rich source enjoyed daily.' },
  { slug: 'biotin-5000mcg', variant: 52646914687314, name: 'Biotin 500µg', size: '120 vegan capsules', cat: 'Vitamins', price: 9, img: IMG + 'GA623-biotin-MAIN_ce69e370-a873-4358-8ad0-a6147d15dec3.jpg',
    tags: ['hair', 'skin', 'beauty'], slot: 'morning', food: 'With or without food', dose: '1 capsule',
    tip: 'Take daily as part of your hair, skin and nails routine.',
    blurb: 'Biotin contributes to the maintenance of normal hair and normal skin.' },
  { slug: 'glucosamine-chondroitin-vitamin-c', variant: 52646916096338, name: 'Glucosamine, Chondroitin & Vitamin C', size: '120 capsules', cat: 'Joint Support', price: 17, img: IMG + 'GA778-glucosamine-chondroitin-MAIN.jpg', exclude: ['vegetarian', 'vegan'],
    tags: ['joints', 'recovery', 'bone'], slot: 'main-meal', food: 'With a meal', dose: '2 capsules',
    tip: 'Take with a meal; steady daily use is what counts over time.',
    blurb: 'Glucosamine and chondroitin with vitamin C. Vitamin C contributes to normal collagen formation for the normal function of cartilage.' },
  { slug: 'ginkgo-biloba', variant: 52646916194642, name: 'Ginkgo Biloba', size: '120 vegan capsules', cat: 'Botanicals', price: 18, img: IMG + 'GA805-ginkgo-biloba-MAIN.jpg',
    tags: ['cognitive', 'brain', 'heart'], slot: 'morning', food: 'With or without food', dose: '1 capsule',
    tip: 'Take in the morning as part of your daily routine.',
    blurb: 'Standardised ginkgo leaf with naturally occurring flavonoids, a classic botanical enjoyed daily.' },
  { slug: 'organic-spirulina-500mg', variant: 52646915965266, name: 'Organic Spirulina 500mg', size: '120 vegan capsules', cat: 'Greens & Superfoods', price: 12, img: IMG + 'GA773-organic-spirulina-MAIN.jpg',
    tags: ['energy', 'general', 'antioxidant', 'vegan'], slot: 'morning', food: 'With or without food', dose: '3 capsules',
    tip: 'Take in the morning as a nutrient-dense green boost.',
    blurb: 'A nutrient-dense organic blue-green algae, naturally rich in protein and iron for a plant-based lift.' },
  { slug: 'siberian-ginseng-400mg', variant: 52646916522322, name: 'Siberian Ginseng 400mg', size: '120 capsules', cat: 'Adaptogens', price: 16, img: IMG + 'GA992-siberian-ginseng-MAIN.jpg',
    tags: ['energy', 'stress', 'general'], slot: 'morning', food: 'With food', dose: '1 capsule',
    tip: 'Take earlier in the day as part of your routine.',
    blurb: 'A traditional adaptogen botanical, long enjoyed to support everyday vitality.' },
  { slug: 'protecta-immune-formula', variant: 52646915440978, name: 'Protecta Immune Formula', size: '60 capsules', cat: 'Immune Support', price: 18, img: IMG + 'GA747-protecta-MAIN.jpg',
    tags: ['immunity', 'antioxidant'], slot: 'morning', food: 'With food', dose: '1 capsule',
    tip: 'Take daily for year-round immune support.',
    blurb: 'A targeted blend with vitamin C and zinc, which contribute to the normal function of the immune system.' },
  { slug: 'msm-with-vitamin-c', variant: 52646916358482, name: 'MSM with Vitamin C', size: '120 capsules', cat: 'Joint Support', price: 12, img: IMG + 'GA854-MSM-vitamin-C-MAIN.jpg',
    tags: ['joints', 'skin', 'hair', 'beauty'], slot: 'main-meal', food: 'With a meal', dose: '2 capsules',
    tip: 'Take with a meal as part of your daily routine.',
    blurb: 'Organic sulphur (MSM) with vitamin C. Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.' },
  { slug: 'colostrum-plus-60-capsules', variant: 52646916227410, name: 'Colostrum Plus', size: '60 capsules', cat: 'Gut Health', price: 17, img: IMG + 'GA809-colostrum-plus-MAIN.jpg', exclude: ['vegan'],
    tags: ['gut', 'digestion', 'immunity'], slot: 'before-breakfast', food: 'Before food', dose: '2 capsules',
    tip: 'Take before breakfast as part of your gut routine.',
    blurb: 'Bovine colostrum, naturally rich in immunoglobulins, chosen for everyday gut and immune wellbeing.' },
  { slug: 'vitamin-a-vitamin-d3', variant: 52646916391250, name: 'Vitamin A & D3', size: '120 vegan capsules', cat: 'Vitamins', price: 12, img: IMG + 'GA876-vitamin-a-and-d-MAIN.jpg',
    tags: ['immunity', 'skin', 'beauty', 'eye', 'general'], slot: 'morning', food: 'With a meal', dose: '1 capsule',
    tip: 'Take with your largest meal for best absorption.',
    blurb: 'Vitamins A and D. Both contribute to the normal function of the immune system, and vitamin A supports the maintenance of normal skin and vision.' },
  { slug: 'co-q10-capsule-supplement', variant: 52646908264786, name: 'CoQ10 100mg', size: '60 vegan capsules', cat: 'Antioxidants', price: 17, img: IMG + 'GA044-coq10-MAIN_8fefafd7-460d-4a43-936a-dbb41b68e68a.jpg',
    tags: ['heart', 'energy', 'antioxidant'], slot: 'main-meal', food: 'With a meal containing fat', dose: '1 capsule',
    tip: 'Take with a fat-containing meal; a popular choice as you get older.',
    blurb: 'Coenzyme Q10, a nutrient the body naturally produces, chosen to support your cellular energy routine.' },
  { slug: 'vitamin-k2-capsules', variant: 52646907674962, name: 'Vitamin K2 200µg', size: '90 vegan capsules', cat: 'Vitamins', price: 25, img: IMG + 'GA026-vitamin-k2-MAIN_8892fff9-0281-4fea-a04d-3cfabe317ca8.jpg',
    tags: ['bone', 'heart'], slot: 'main-meal', food: 'With a meal containing fat', dose: '1 capsule',
    tip: 'Pair with vitamin D and take with fats for absorption.',
    blurb: 'High-strength vitamin K2 (MK-7). Vitamin K contributes to the maintenance of normal bones.' },
  { slug: 'vitamin-b12-methylcobalamin-1000mcg', variant: 52646914621778, name: 'Vitamin B12 1000mcg', size: '120 vegan capsules', cat: 'Vitamins', price: 12, img: IMG + 'GA617-vitamin-b12-MAIN.jpg',
    tags: ['energy', 'cognitive', 'vegan'], slot: 'morning', food: 'With or without food', dose: '1 capsule',
    tip: 'Take in the morning; a plant-based favourite.',
    blurb: 'Active methylcobalamin B12. Vitamin B12 contributes to a reduction of tiredness and fatigue and the normal function of the nervous system.' },
  { slug: 'hair-skin-nails-supplement', variant: 52646913540434, name: 'Hair, Skin & Nails', size: '120 vegan capsules', cat: 'Collagen & Beauty', price: 16, img: IMG + 'GA391-hair-skin-nails-MAIN.jpg',
    tags: ['hair', 'skin', 'beauty'], slot: 'morning', food: 'With food', dose: '2 capsules',
    tip: 'Take daily; results build over a few months of steady use.',
    blurb: 'Biotin, zinc and selenium. These nutrients contribute to the maintenance of normal hair, skin and nails.' },
  { slug: 'digestazymes-digestive-enzymes', variant: 52646913474898, name: 'Digesta Zymes', size: '120 capsules', cat: 'Gut Health', price: 20, img: IMG + 'GA365-digesta-zymes-MAIN.jpg',
    tags: ['digestion', 'gut'], slot: 'main-meal', food: 'Just before meals', dose: '1 capsule',
    tip: 'Take just before larger meals as part of your routine.',
    blurb: 'A broad blend of digestive enzymes, a considered choice for your everyday digestive comfort.' },
  { slug: 'boswellia-turmeric-90-vegan-capsules', variant: 52646910165330, name: 'Boswellia & Turmeric', size: '90 vegan capsules', cat: 'Joint Support', price: 22, img: IMG + 'GA075-boswellia-turmeric-MAIN_ae29d463-1bec-4623-b2d1-1aa9b4cffc99.jpg',
    tags: ['joints', 'recovery', 'antioxidant'], slot: 'main-meal', food: 'With a meal', dose: '1 capsule',
    tip: 'Take with a meal; steady daily use is what counts over time.',
    blurb: 'Boswellia and turmeric botanicals with vitamin D, which contributes to the maintenance of normal bones.' },
  { slug: 'total-creatine-500g-powder', variant: 52646912721234, name: 'Total Creatine', size: '500g powder', cat: 'Amino & Sport', price: 25, img: IMG + 'GA176-total-creatine-MAIN.jpg',
    tags: ['muscle', 'recovery', 'energy'], slot: 'workout', food: 'Mixed with water', dose: '1 scoop',
    tip: 'Take daily, around training.',
    blurb: 'Pure creatine monohydrate. Creatine increases physical performance in successive bursts of short-term, high-intensity exercise.' },
  { slug: 'liver-health-formula', variant: 52646914490706, name: 'Liver Health Formula', size: '60 vegan capsules', cat: 'Liver & Detox', price: 25, img: IMG + 'GA554-liver-health-formula-MAIN.jpg',
    tags: ['antioxidant', 'gut', 'general'], slot: 'main-meal', food: 'With food', dose: '1 capsule',
    tip: 'A supportive daily formula, handy if you enjoy a drink now and then.',
    blurb: 'Milk thistle and artichoke botanicals with choline, which contributes to normal fat metabolism.' },
  { slug: 'n-acetyl-l-cysteine-supplement', variant: 52646909477202, name: 'NAC (N-Acetyl-L-Cysteine)', size: '30 vegan capsules', cat: 'Antioxidants', price: 8, img: IMG + 'GA062-nac-MAIN_4cfa1817-07de-4c7b-a4ec-1c4f204c1613.jpg',
    tags: ['antioxidant', 'immunity', 'general'], slot: 'morning', food: 'With or without food', dose: '1 capsule',
    tip: 'A useful daily antioxidant to take with your morning routine.',
    blurb: 'N-Acetyl-L-Cysteine, a precursor to glutathione, chosen by many as a daily antioxidant.' },
  { slug: 'choline-inositol-supplement', variant: 52646914785618, name: 'Choline & Inositol', size: '120 vegan capsules', cat: 'Brain & Focus', price: 18, img: IMG + 'GA627-choline-inositol-MAIN.jpg',
    tags: ['cognitive', 'brain', 'general'], slot: 'morning', food: 'With food', dose: '1 capsule',
    tip: 'Take in the morning as part of your daily routine.',
    blurb: 'Choline and inositol. Choline contributes to normal lipid metabolism and normal homocysteine metabolism.' },
  { slug: 'meno-menopause-multivitamin-60-vegan-capsules', variant: 52646912852306, name: 'Meno Menopause Multi', size: '60 vegan capsules', cat: 'Women & Men', price: 15, img: IMG + 'Meno_WHITEBACKGROUND.jpg', sex: 'female',
    tags: ['womens', 'hormones', 'general', 'bone'], slot: 'morning', food: 'With breakfast', dose: '1 capsule',
    tip: 'Take daily with breakfast as your everyday foundation.',
    blurb: 'A complete multivitamin tailored for the menopause life stage, with nutrients that contribute to normal energy-yielding metabolism and normal bones.' },
  { slug: 'organic-kelp-supplement', variant: 52646912786770, name: 'Organic Kelp 500mg', size: '120 vegan capsules', cat: 'Minerals', price: 12, img: IMG + 'GA177-organic-kelp-MAIN_d78e1e82-b7c9-4954-bcbc-4a255c793104.jpg',
    tags: ['thyroid', 'energy', 'general'], slot: 'morning', food: 'With food', dose: '1 capsule',
    tip: 'Take in the morning as part of your routine.',
    blurb: 'Organic kelp, a natural source of iodine. Iodine contributes to normal thyroid function and normal energy-yielding metabolism.' },
  { slug: 'eyebright-plus-supplement', variant: 52646906986834, name: 'Eyebright Plus', size: '60 vegan capsules', cat: 'Eye Health', price: 20, img: IMG + 'GA005-eyebright-plus-MAIN_21a0bd76-d07d-4081-a4cc-5b9bb4a5bb21.jpg',
    tags: ['eye', 'antioxidant', 'general'], slot: 'main-meal', food: 'With a meal', dose: '1 capsule',
    tip: 'Take with a meal, a handy choice for screen-heavy days.',
    blurb: 'Eyebright and bilberry botanicals with lutein, a considered daily blend.' },
  { slug: 'resveratrol-complex-supplement', variant: 52646906069330, name: 'Resveratrol Complex', size: '60 vegan capsules', cat: 'Antioxidants', price: 24, img: IMG + 'GA003-resveratrol-complex-MAIN_b2103afe-4055-49da-b3ea-9364929f6520.jpg',
    tags: ['antioxidant', 'heart', 'skin', 'beauty'], slot: 'main-meal', food: 'With a meal', dose: '1 capsule',
    tip: 'Take with a meal as part of your daily routine.',
    blurb: 'Resveratrol with grape seed and green tea botanicals, a considered antioxidant blend.' },
  { slug: 'organic-ginger-root', variant: 52646908658002, name: 'Organic Ginger Root', size: '60 vegan capsules', cat: 'Botanicals', price: 6, img: IMG + 'GA061-ginger-root-MAIN_56a57f5e-8ed3-4a88-a35a-c7d43fc1f57d.jpg',
    tags: ['digestion', 'gut', 'general'], slot: 'main-meal', food: 'With or after food', dose: '1 capsule',
    tip: 'Take with food as part of your routine.',
    blurb: 'Organic ginger, a botanical traditionally enjoyed for everyday digestive comfort.' },
  { slug: 'quercetin-nutrition', variant: 52646907019602, name: 'Quercetin Complex', size: '60 vegan capsules', cat: 'Immune Support', price: 12, img: IMG + 'GA006-quercetin-complex-MAIN_76c41df3-0c87-415b-8082-89daddf0dee6.jpg',
    tags: ['immunity', 'antioxidant'], slot: 'morning', food: 'With food', dose: '1 capsule',
    tip: 'Take daily for everyday immune support.',
    blurb: 'Quercetin with vitamin C, which contributes to the normal function of the immune system.' },
  { slug: 'total-whey-organic-protein', variant: 52646912033106, name: 'Total Whey Protein', size: '500g powder · chocolate', cat: 'Amino & Sport', price: 31, img: IMG + 'GA131-total-whey-MAIN.jpg', exclude: ['vegan'],
    tags: ['muscle', 'recovery'], slot: 'workout', food: 'Mixed with water or milk', dose: '1 scoop',
    tip: 'Have a scoop around training to help hit your daily protein.',
    blurb: 'Organic whey protein. Protein contributes to a growth in and the maintenance of muscle mass.' },
]

export interface Addon {
  slug: string
  variant: number
  name: string
  size: string
  cat: string
  price: number
  img: string
  slot: SlotKey
  food: string
  dose: string
  tip: string
  blurb: string
}

/* Best-seller add-ons — always offered on top of the recommended three */
export const ADDONS: Addon[] = [
  { slug: 'mega-multi-multivitamin', variant: 52646916686162, name: 'Mega Multi', size: '90 vegan capsules', cat: 'Multivitamins', price: 19, img: IMG + 'GA998-mega-multi-MAIN.jpg',
    slot: 'morning', food: 'With breakfast', dose: '1 capsule',
    tip: 'A one-a-day foundation that covers the everyday basics.',
    blurb: 'Our best-selling all-round multivitamin — a broad daily base of vitamins and minerals in one capsule.' },
  { slug: 'organic-ashwagandha-supplement', variant: 52646912917842, name: 'Organic Ashwagandha', size: '60 vegan capsules', cat: 'Botanicals', price: 16, img: IMG + 'GA198-organic-ashwagandha-MAIN_9ff0b922-8bb3-479a-8b4e-11682ea6e880.jpg',
    slot: 'evening', food: 'With food', dose: '1 capsule',
    tip: 'Take in the evening as part of your wind-down.',
    blurb: 'A calming adaptogen botanical, traditionally enjoyed to help you feel balanced before rest.' },
  { slug: 'total-hydrate-lemon-electrolyte-drink-mix-150g-powder', variant: 52646912688466, name: 'Total Hydrate Electrolytes', size: 'Lemon · 150g powder', cat: 'Amino & Sport', price: 17, img: IMG + 'GA173-total-hydrate-MAIN.jpg',
    slot: 'workout', food: 'Mixed with water', dose: '1 scoop',
    tip: 'Stir into water during or after exercise to top up electrolytes.',
    blurb: 'Clean daily hydration to top up the electrolytes you lose through sweat.' },
  { slug: 'vitamin-d-plus', variant: 52646912393554, name: 'Vitamin D3 Plus (with K2)', size: '60 capsules', cat: 'Vitamins', price: 19, img: IMG + 'GA151-vitamin-d3-plus-MAIN_35b2d51c-b76e-4679-bbd1-68101084c04c.jpg',
    slot: 'morning', food: 'With breakfast', dose: '1 capsule',
    tip: 'A daily top-up, especially through the darker months.',
    blurb: 'Vitamin D with K2. Vitamin D contributes to the normal function of the immune system and normal bones.' },
  { slug: 'collagen-extra-supplement-capsules', variant: 52646915080530, name: 'Collagen Extra', size: '60 capsules', cat: 'Collagen & Beauty', price: 13, img: IMG + 'GA704-collagen-extra-MAIN_c0efa740-fed3-4992-ba8d-6e876bc09878.jpg',
    slot: 'morning', food: 'With food', dose: '2 capsules',
    tip: 'Take daily as part of your skin and joints routine.',
    blurb: 'Marine collagen with vitamin C, which contributes to normal collagen formation for skin and cartilage.' },
  { slug: 'magnesium-bisglycinate-200mg-90-vegan-capsules', variant: 52646917144914, name: 'Magnesium Bisglycinate 200mg', size: '90 vegan capsules', cat: 'Minerals', price: 15, img: IMG + 'GAK01-magnesium-bisglycinate-MAIN.jpg',
    slot: 'evening', food: 'With food', dose: '1 capsule',
    tip: 'Take in the evening to help you unwind.',
    blurb: 'A gentle, highly absorbable magnesium, which contributes to normal muscle function and a reduction of tiredness and fatigue.' },
  { slug: 'total-amino-full-spectrum-amino-acids-120-capsules', variant: 52646916161874, name: 'Total Amino Full Spectrum', size: '120 capsules', cat: 'Amino & Sport', price: 17, img: IMG + 'GA804-total-amino-MAIN.jpg',
    slot: 'workout', food: 'With or without food', dose: '4 capsules',
    tip: 'Take around exercise to complement your recovery.',
    blurb: 'All the amino acids in free-form, a favourite of active people around training.' },
  { slug: 'cal-m-100g', variant: 52646910918994, name: 'Cal-M Powder', size: '100g powder', cat: 'Minerals', price: 11, img: IMG + 'GA101-cal-m-MAIN.jpg',
    slot: 'evening', food: 'Mixed with water or juice', dose: '1 tsp',
    tip: 'Mix into water in the evening to help you unwind.',
    blurb: 'A soothing calcium & magnesium powder. Both minerals contribute to normal muscle function.' },
]

export interface InfoCard {
  icon: string
  title: string
  desc: string
}

/* Rotating "capsules, not tablets" messaging shown during the quiz */
export const DIFFERENCE: InfoCard[] = [
  { icon: 'capsule', title: 'Capsules, never tablets', desc: 'Every G&G formula is encapsulated, so there are no binders, fillers or compression agents just to hold a tablet together.' },
  { icon: 'ban', title: 'Nothing you don’t need', desc: 'You get the active nutrients and little else, not the bulking agents and additives typical of high-street supplements.' },
  { icon: 'leaf', title: 'Pure, high-quality ingredients', desc: 'Cleaner capsules mean what’s on the label is what’s inside: pure ingredients your body can readily absorb.' },
  { icon: 'award', title: '60+ years of British craft', desc: 'Family-run and made in Britain since the 1960s, with the same care and quality in every single capsule.' },
]

/* Reassurance points on the results page */
export const WHY: InfoCard[] = [
  { icon: 'capsule', title: 'Capsules, not tablets', desc: 'Encapsulated formulas that break down cleanly and are readily absorbed.' },
  { icon: 'ban', title: 'No fillers or binders', desc: 'None of the compression agents and coatings tablets rely on.' },
  { icon: 'leaf', title: 'Pure active ingredients', desc: 'What’s on the label is what’s inside, and little else.' },
  { icon: 'award', title: 'British-made since the ’60s', desc: 'Family-run quality you won’t find on the average high street.' },
]

export interface Option {
  label: string
  value: string
  hint?: string
  scores?: Scores
}

/* Goals are framed as outcomes people want to achieve */
export const SHARED_GOALS: Option[] = [
  { label: 'More everyday energy', value: 'energy', scores: { energy: 10 } },
  { label: 'Immune support', value: 'immunity', scores: { immunity: 10 } },
  { label: 'Sleep & relaxation', value: 'sleep', scores: { sleep: 10, stress: 6 } },
  { label: 'Joint & muscle support', value: 'joints', scores: { joints: 10, recovery: 5, muscle: 4 } },
  { label: 'Skin, hair & nails', value: 'beauty', scores: { beauty: 10, skin: 5, hair: 5 } },
  { label: 'Digestive wellbeing', value: 'gut', scores: { gut: 10, digestion: 6 } },
  { label: 'Heart & mind', value: 'heart', scores: { heart: 10, brain: 6, cognitive: 5 } },
  { label: 'Bone health', value: 'bone', scores: { bone: 10 } },
  { label: 'Everyday wellness', value: 'general', scores: { general: 10 } },
]
export const WOMENS_GOALS: Option[] = [
  { label: 'Menopause support', value: 'menopause', scores: { womens: 10, hormones: 9 } },
  { label: 'Cycle & hormonal balance', value: 'cycle', scores: { womens: 9, hormones: 8, skin: 2 } },
  { label: 'Fertility & preconception', value: 'fertility-w', scores: { womens: 8, fertility: 10, hormones: 4 } },
]
export const MENS_GOALS: Option[] = [
  { label: 'Testosterone & vitality', value: 'prostate', scores: { mens: 10, hormones: 6 } },
  { label: 'Hair & scalp', value: 'hair-m', scores: { mens: 6, hair: 10, skin: 2 } },
  { label: 'Fertility & vitality', value: 'fertility-m', scores: { mens: 8, fertility: 10 } },
]

/* Maps an "already taking" answer to the G&G slugs we then leave out of the three */
export const TAKING_MAP: Record<string, string[]> = {
  'vitamin-c': ['vitamin-c-1000mg'],
  'vitamin-d': ['vitamin-d-plus'],
  magnesium: ['magnesium-bisglycinate-200mg-90-vegan-capsules'],
  omega3: ['omega-3-fish-oil'],
  multivitamin: ['mega-multi-multivitamin', 'vegan-multivitamin-supplement'],
  probiotic: ['advanced-pro-veflora'],
  zinc: ['zinc-picolinate-22mg'],
  iron: ['iron-bisglycinate-20mg'],
  'b-complex': ['vitamin-b-complex-50mg-niacin'],
  collagen: ['collagen-extra-supplement-capsules', 'beauty-collagen-60-capsules'],
  turmeric: ['turmeric-curcumin-supplement'],
  ashwagandha: ['organic-ashwagandha-supplement'],
  biotin: ['biotin-5000mcg'],
  selenium: ['selenium-200mcg'],
  glucosamine: ['glucosamine-chondroitin-vitamin-c'],
  'evening-primrose': ['evening-primrose-oil'],
  ginkgo: ['ginkgo-biloba'],
  spirulina: ['organic-spirulina-500mg'],
}

export type Answers = Record<string, string | string[] | number | undefined>

export interface Step {
  id: string
  type: 'name' | 'single' | 'slider' | 'multi'
  title: string
  sub: string
  pt?: string
  sex?: boolean
  diet?: boolean
  optional?: boolean
  max?: number
  when?: (a: Answers) => boolean
  options?: Option[] | ((a: Answers) => Option[])
}

/* Quiz configuration — layered (name, experience, age+sex, activity, day,
   diet, diet & lifestyle extras, how balanced, rhythm, [experienced-only], goals) */
export const STEPS: Step[] = [
  { id: 'name', type: 'name', title: 'First, what shall we call you?', sub: 'We’ll use your name to make the next few questions feel like they’re just for you.' },
  { id: 'experience', type: 'single', title: 'How would you describe yourself?', pt: 'Nice to meet you, {name}. How would you describe yourself?', sub: 'This lets us pitch your regime at exactly the right level.',
    options: [
      { label: 'New to supplements', value: 'beginner', hint: 'Just getting started — keep it simple', scores: { general: 2 } },
      { label: 'Already taking supplements', value: 'experienced', hint: 'I have a routine and want to refine it', scores: {} },
    ] },
  { id: 'age', type: 'slider', sex: true, title: 'How old are you?', pt: 'How old are you, {name}?', sub: 'Slide to your age and choose female or male — we’ll tailor your foundation to your life stage.' },
  { id: 'activity', type: 'single', title: 'How active are you?', pt: 'How active are you day to day, {name}?', sub: 'Movement changes what your body draws on to recover.',
    options: [
      { label: 'Rarely, mostly sedentary', value: 'sedentary', scores: { general: 2, energy: 1, immunity: 1, heart: 1 } },
      { label: 'A few times a week', value: 'moderate', scores: { energy: 2, recovery: 1, muscle: 1, general: 1 } },
      { label: 'Most days, I train hard', value: 'active', scores: { muscle: 2, recovery: 2, joints: 1, energy: 1, heart: 1 } },
      { label: 'Endurance / competitive athlete', value: 'athlete', scores: { recovery: 2, muscle: 2, joints: 1, energy: 1, iron: 1, heart: 1 } },
    ] },
  { id: 'life', type: 'multi', max: 2, title: 'What does a typical day look like?', pt: 'What does a typical day look like for you, {name}?', sub: 'Pick up to 2 — most of us wear more than one hat.',
    options: [
      { label: 'Desk & screen based', value: 'desk', scores: { cognitive: 2, brain: 1, energy: 1, stress: 1, skin: 1 } },
      { label: 'On my feet / physical work', value: 'physical', scores: { joints: 2, muscle: 1, recovery: 1, energy: 1, bone: 1 } },
      { label: 'Shift work / irregular hours', value: 'shift', scores: { sleep: 2, stress: 1, immunity: 1, energy: 1 } },
      { label: 'Busy & high-tempo', value: 'stress', scores: { stress: 2, sleep: 1, energy: 1, immunity: 1 } },
      { label: 'Lots of travel', value: 'travel', scores: { immunity: 2, gut: 1, energy: 1, sleep: 1 } },
      { label: 'Busy parent / carer', value: 'parent', scores: { energy: 2, immunity: 1, stress: 1, general: 1 } },
    ] },
  { id: 'diet', type: 'multi', max: 4, optional: true,
    title: 'How do you usually eat?', pt: 'How do you usually eat, {name}?',
    sub: 'Pick any that sound like you. Food-first is always best — this just shows us where a little support goes furthest.',
    options: [
      { label: 'I rarely eat oily fish', value: 'low-fish', scores: { heart: 4, brain: 3, cognitive: 2, joints: 2 } },
      { label: 'Not many fruit & veg', value: 'low-produce', scores: { general: 4, antioxidant: 3, immunity: 2, energy: 1 } },
      { label: 'Little or no red meat', value: 'low-meat', scores: { iron: 4, energy: 2 } },
      { label: 'Not much dairy', value: 'low-dairy', scores: { bone: 4 } },
      { label: 'I often eat on the go', value: 'skip-meals', scores: { energy: 3, general: 2 } },
      { label: 'Plenty of processed or sugary food', value: 'processed', scores: { antioxidant: 2, gut: 2, general: 1 } },
    ] },
  { id: 'indulgences', type: 'multi', max: 6, optional: true,
    title: 'A few things about your diet & lifestyle', pt: '{name}, a few things about your diet & lifestyle',
    sub: 'Pick any that sound like you — it helps us spot where a little extra support goes furthest.',
    options: [
      { label: 'I enjoy a drink regularly', value: 'alcohol', scores: { antioxidant: 2, general: 1, gut: 1 } },
      { label: 'Lots of fried or greasy food', value: 'fried', scores: { antioxidant: 2, heart: 1, general: 1 } },
      { label: 'I have a sweet tooth', value: 'sugar', scores: { antioxidant: 2, gut: 1, general: 1 } },
      { label: 'Plenty of coffee or caffeine', value: 'caffeine', scores: { sleep: 2, stress: 1 } },
      { label: 'I smoke or vape', value: 'smoke', scores: { antioxidant: 4, immunity: 1 } },
      { label: 'I don’t drink much water', value: 'low-water', scores: { skin: 2, general: 1 } },
    ] },
  { id: 'balance', type: 'single',
    title: 'And how balanced is a typical week?', pt: 'And how balanced is a typical week for you, {name}?',
    sub: 'A rough sense of how often those little extras show up.',
    options: [
      { label: 'Very balanced', value: 'balanced', scores: {} },
      { label: 'Mostly balanced', value: 'mostly', scores: { antioxidant: 1, general: 1 } },
      { label: 'A few indulgences', value: 'some', scores: { antioxidant: 2, general: 1 } },
      { label: 'Plenty of indulgences', value: 'lots', scores: { antioxidant: 3, general: 2, gut: 1 } },
    ] },
  { id: 'lifestyle', type: 'multi', max: 4, optional: true,
    title: 'A few lifestyle habits', pt: '{name}, a few lifestyle habits',
    sub: 'These change what your body draws on day to day. Pick any that apply.',
    options: [
      { label: 'Little daily sunlight / mostly indoors', value: 'low-sun', scores: { immunity: 4, bone: 3, general: 1 } },
      { label: 'My sleep could be better', value: 'poor-sleep', scores: { sleep: 4, stress: 2 } },
      { label: 'Often busy or under pressure', value: 'high-stress', scores: { stress: 4, sleep: 2 } },
      { label: 'I’d like more digestive comfort', value: 'digestion', scores: { gut: 4, digestion: 3 } },
      { label: 'I’d like to feel more focused', value: 'focus', scores: { cognitive: 3, brain: 2, energy: 1 } },
    ] },
  { id: 'alreadyTaking', type: 'multi', max: 20, optional: true, when: (s) => s.experience === 'experienced',
    title: 'What are you already taking?', pt: 'What are you already taking, {name}?',
    sub: 'We’ll leave these out of your three. We can’t vouch for the strength or purity of other brands, so where G&G quality really differs we may still suggest our own.',
    options: [
      { label: 'Vitamin C', value: 'vitamin-c' },
      { label: 'Vitamin D', value: 'vitamin-d' },
      { label: 'Vitamin E', value: 'vitamin-e' },
      { label: 'Magnesium', value: 'magnesium' },
      { label: 'Omega-3', value: 'omega3' },
      { label: 'Multivitamin', value: 'multivitamin' },
      { label: 'Probiotic', value: 'probiotic' },
      { label: 'Zinc', value: 'zinc' },
      { label: 'Iron', value: 'iron' },
      { label: 'B-complex', value: 'b-complex' },
      { label: 'Collagen', value: 'collagen' },
      { label: 'Turmeric / Curcumin', value: 'turmeric' },
      { label: 'Ashwagandha', value: 'ashwagandha' },
      { label: 'Biotin', value: 'biotin' },
      { label: 'Selenium', value: 'selenium' },
      { label: 'Glucosamine', value: 'glucosamine' },
      { label: 'Evening Primrose Oil', value: 'evening-primrose' },
      { label: 'Ginkgo Biloba', value: 'ginkgo' },
      { label: 'CoQ10', value: 'coq10' },
      { label: 'Spirulina / Greens', value: 'spirulina' },
    ] },
  { id: 'concerns', type: 'multi', max: 4, optional: true, when: (s) => s.experience === 'experienced',
    title: 'Anything you’d like to focus on?', pt: 'Anything you’d like to focus on, {name}?', sub: 'Pick up to 4 goals and we’ll steer your three toward them.',
    options: [
      { label: 'Clear, healthy skin', value: 'acne', scores: { skin: 8, beauty: 5, gut: 2 } },
      { label: 'Digestive comfort', value: 'ibs', scores: { gut: 9, digestion: 7 } },
      { label: 'Restful sleep', value: 'sleep-c', scores: { sleep: 9, stress: 4 } },
      { label: 'Energy & vitality', value: 'energy-c', scores: { energy: 9, iron: 3 } },
      { label: 'Vitamin D & sunlight', value: 'sunlight', scores: { immunity: 7, bone: 5, general: 2 } },
      { label: 'Calm & relaxation', value: 'stress-c', scores: { stress: 9, sleep: 4 } },
      { label: 'Joint & muscle comfort', value: 'joints-c', scores: { joints: 9, recovery: 4 } },
      { label: 'Hair, skin & nails', value: 'hair-c', scores: { hair: 8, beauty: 6, skin: 4 } },
      { label: 'Focus & clarity', value: 'focus-c', scores: { cognitive: 8, brain: 7 } },
      { label: 'Everyday immune support', value: 'immunity-c', scores: { immunity: 9 } },
      { label: 'Hormonal balance', value: 'hormones-c', scores: { hormones: 9 } },
      { label: 'Muscle & movement', value: 'muscle-c', scores: { muscle: 8, joints: 6, recovery: 5 } },
      { label: 'Heart health', value: 'cardio-c', scores: { heart: 9, antioxidant: 3, general: 2 } },
    ] },
  { id: 'goals', type: 'multi', max: 3, diet: true, title: 'What are you trying to achieve?', pt: 'What matters most to you right now, {name}?', sub: 'Pick up to 3. This drives your bundle.',
    options: (s) => [...SHARED_GOALS, ...(s.sex === 'female' ? WOMENS_GOALS : s.sex === 'male' ? MENS_GOALS : [])] },
]

export interface HeroChip {
  icon: string
  label: string
}
export const HERO_CHIPS: HeroChip[] = [
  { icon: 'spark', label: 'More energy' },
  { icon: 'shield', label: 'Immune support' },
  { icon: 'moon', label: 'Sleep & relaxation' },
  { icon: 'leaf', label: 'Digestive wellbeing' },
  { icon: 'heart', label: 'Heart & mind' },
  { icon: 'droplet', label: 'Skin, hair & nails' },
]

/* ---------- Small helpers ---------- */
export function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export function listPhrase(a: string[]) {
  if (a.length <= 1) return a[0] || ''
  if (a.length === 2) return a[0] + ' and ' + a[1]
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]
}

/* Representative rating + review count, stable per product (illustrative;
   the star row links out to that product's real reviews on gandgvitamins.com) */
export function ratingFor(key: string) {
  let h = 0
  const s = String(key)
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return { rating: (43 + (h % 7)) / 10, reviews: 58 + (h % 786) }
}
