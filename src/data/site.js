// ─────────────────────────────────────────────────────────────
//  EDIT ME FIRST.
//  Everything the site says about YECEF lives in this one file.
//  Anything marked TODO is a fact I could not verify — fill it in
//  and the site updates everywhere it appears.
// ─────────────────────────────────────────────────────────────

export const org = {
  name: 'Youths Emerge for Christ Empowerment Foundation',
  short: 'YECEF Global',
  convener: 'Morenike Alayerogun',
  // Confirmed by the team. Any of these set to null simply won't render
  // in the footer, so there's never a dead link on the site.
  instagram: 'https://www.instagram.com/yecefglobal/',
  facebook: 'https://www.facebook.com/yecefglobal/',
  youtube: 'https://www.youtube.com/@yecefglobal',
  tiktok: null,
  x: null,
  linkedin: null,
  handle: '@yecefglobal',
  // TODO: confirm this inbox actually receives mail. If it doesn't,
  // set it to null and the site will route contact through Instagram DM.
  email: null,
  // TODO: add the foundation's WhatsApp number in full international
  // format, digits only, e.g. '2348012345678'. Leave null to hide.
  whatsapp: null,
  // TODO: CAC registration number, once you have it. A registration
  // number in the footer is the single cheapest trust signal an NGO has.
  cacNumber: null,
}

export const event = {
  theme: 'Fresh Fire',
  year: 2026,
  series: 'Youth Explosion for Christ',
  edition: 'Third edition',
  // 12 September 2026, 09:00 West Africa Time
  startsAt: '2026-09-12T09:00:00+01:00',
  endsAt: '2026-09-12T15:00:00+01:00',
  doors: '8:30am',
  starts: '9:00am prompt',
  dateLabel: 'Saturday 12 September 2026',
  venue: 'Trinity House, Zion Centre',
  address:
    'Trinity Avenue, along Coastal Road by Rainoil filling station, Oniru, Victoria Island, Lagos',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Trinity+House+Zion+Centre+Oniru+Lagos',
  scripture: {
    ref: 'Joel 2:28',
    text:
      'And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy.',
    also: 'Acts 2:1–4',
  },
  // ── Registration: Luma is the single source of truth. ──────────
  // Every "Reserve your seat" button on the site points here.
  //
  // ⚠️ ONE THING TO FIX ON LUMA: the old Google Form asked which pickup
  // axis a person was coming from, and that answer is what tells each
  // coordinator how many coaches to hire. Luma does not ask it. Add a
  // required registration question — "Which pickup point will you use?"
  // with the 13 axes as options — or the axis headcounts stop arriving.
  registerUrl: 'https://luma.com/rbjuhbfo',
  lumaUrl: 'https://luma.com/rbjuhbfo',

  // Internal, for axis coordinators only — a different audience and a
  // different job, so this one stays a Google Form feeding your sheet.
  coordinatorUrl: 'https://forms.gle/ai88R9KYKuRwaZo98',

  // The retired attendee form. Kept here only so the link isn't lost.
  legacyAttendeeFormUrl: 'https://forms.gle/P5H6K5Qinzy9ij5GA',

  registeredCount: 413, // update from the Luma dashboard

  // ── The free-bus WhatsApp community ────────────────────────────
  // Where riders get their pickup point and departure time from their
  // coordinator. Surfaced next to the bus finder and on the event page.
  busWhatsapp: 'https://chat.whatsapp.com/C37UmqgzGDx5T0okCjDPjZ',

  // ── Artwork ────────────────────────────────────────────────────
  // heroImage: a wide crop of a real 2025 hall shot rather than the flyer.
  //   A flyer behind a headline fights it — two sets of type competing —
  //   whereas faces under a scrim make the headline land. The flyer gets
  //   its own proper slot on /fresh-fire below.
  heroImage: '/images/hero-2025.jpg',
  heroImageAlt: 'Young people worshipping with hands raised at YECEF 2025',
  flyer: '/images/fresh-fire-2026-flyer.jpg',
  flyerAlt:
    'Fresh Fire 2026 flyer — Saturday 12 September, 9am, Trinity House, Zion Centre, Oniru, Victoria Island, Lagos. Ministering: Afolabi Oke, Racheal Oseni, Alabba, Reverend David S. Johnson, Pst. Mike Albert, Ayodeji Moboluwaji, Pst. Bright Micah. Convener: Morenike Alayerogun.',
}

// True once Fresh Fire has finished. The homepage uses this to lead with
// the foundation instead of the countdown — no edit needed on the day.
export const eventIsPast = () => Date.now() > new Date(event.endsAt).getTime()

export const ministers = [
  { name: 'Rev. David S. Johnson', returning: true },
  { name: 'Pst. Mike Albert', returning: true },
  { name: 'Afolabi Oke' },
  { name: 'Racheal Oseni' },
  { name: 'Alabba' },
  { name: 'Ayodeji Moboluwaji' },
  { name: 'Pst. Bright Micah' },
]

// ── The 13 pickup axes ────────────────────────────────────────
// `keywords` is what the finder searches on — add every neighbourhood
// name people actually use, including misspellings they type.
// `departs` and `landmark` are TODO: get them from each coordinator.
// Until they're filled in the card says so honestly rather than guessing.
export const axes = [
  {
    id: 1,
    name: 'Agric',
    keywords: ['agric', 'ikorodu', 'agric bus stop'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 2,
    name: 'Igbogbo',
    keywords: ['igbogbo', 'bayeku', 'ipakodo'],
    landmark: null,
    departs: null,
    coordinators: ['Mrs Ajakaiye', 'Mrs Okoi Kasi'],
    confirmedSeats: 40,
  },
  {
    id: 3,
    name: 'Ota-Ona',
    keywords: ['ota-ona', 'ota ona', 'otaona'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 4,
    name: 'Maya / Adamo / Lucky Fibre / Itamaga',
    keywords: ['maya', 'adamo', 'lucky fibre', 'itamaga', 'imota'],
    landmark: null,
    departs: null,
    coordinators: ['Sis Oyegbemi', 'Sis Olayinka'],
    confirmedSeats: 40,
  },
  {
    id: 5,
    name: 'Odogunyan',
    keywords: ['odogunyan', 'ogolonto', 'ijede road'],
    landmark: null,
    departs: null,
    coordinators: ['Sis Nweke'],
    confirmedSeats: 31,
  },
  {
    id: 6,
    name: 'Ita-Oluwo / Ogijo / Sabo / Laspotech',
    keywords: ['ita-oluwo', 'ita oluwo', 'ogijo', 'sabo', 'laspotech', 'lasupotech'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 7,
    name: 'Sagamu / Redemption City / Mowe / Ibafo',
    keywords: ['sagamu', 'shagamu', 'redemption city', 'redemption camp', 'mowe', 'ibafo'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 8,
    name: 'Sango Ota / Toll-Gate',
    keywords: ['sango', 'sango ota', 'toll gate', 'toll-gate', 'ota'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 9,
    name: 'Ikotun / Ijegun / Ijedodo – Ejigbo / Lawanson',
    keywords: ['ikotun', 'ijegun', 'ijedodo', 'ejigbo', 'lawanson', 'itire'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 10,
    name: 'Stadium / Surulere / Jibowu / Mushin',
    keywords: ['stadium', 'surulere', 'jibowu', 'mushin', 'yaba', 'ojuelegba'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 11,
    name: 'Berger / 7Up',
    keywords: ['berger', '7up', 'seven up', 'ojodu', 'ojota'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 12,
    name: 'Gbagada / Oworonshoki',
    keywords: ['gbagada', 'oworonshoki', 'oworo', 'anthony'],
    landmark: null,
    departs: null,
    coordinators: [],
  },
  {
    id: 13,
    name: 'Bariga',
    keywords: ['bariga', 'shomolu', 'somolu', 'akoka'],
    landmark: null,
    departs: null,
    coordinators: ['Sis Oyinda'],
    confirmedSeats: 25,
  },
]

// ── What the foundation actually does, all year ───────────────
// The conference is the loudest thing YECEF does, not the only thing.
// Add or reorder freely — the homepage and /about both read this list.
//
// TODO on each: a real number. "Free JAMB forms" is a nice sentence;
// "JAMB forms for 40 students since 2024" is a reason to partner.
// Get the counts from whoever ran each one and put them in `stat`.
export const programmes = [
  {
    id: 'yec',
    name: 'Youth Explosion for Christ',
    short: 'YEC',
    stat: 'Every September since 2024',
    body:
      'The annual gathering. One free day of ministry, and free coaches from thirteen pickup points across Lagos and Ogun so that transport cost is never the reason a young person misses it.',
    link: '/fresh-fire',
    linkLabel: 'Fresh Fire 2026',
  },
  {
    id: 'jamb',
    name: 'Free JAMB forms',
    short: 'JAMB',
    stat: null, // TODO: how many students, over how many years
    body:
      'JAMB registration is the first bill that stops a bright student from sitting the exam at all. YECEF buys the form outright for students who cannot cover it, so the cost never decides who gets to try.',
    link: null,
  },
  {
    id: 'mentoring',
    name: 'Mentoring sessions',
    short: 'Mentoring',
    stat: 'Every quarter, from 2026',
    body:
      'Four times a year, young people sit with people a few steps ahead of them — on work, faith, money and the decisions that are hard to make alone. Small rooms, real questions, no stage.',
    link: null,
    // TODO: first date, venue and how to sign up. Add a link here once
    // there's a page or form for it and the button appears automatically.
  },
  {
    id: 'skills',
    name: 'Skills acquisition',
    short: 'Skills',
    stat: null, // TODO: which trades, how many trained so far
    body:
      'Hands-on training in a trade a young person can earn from. The conference lasts a day; a skill lasts. Runs alongside the mentoring track.',
    link: null,
  },
  {
    id: 'widows',
    name: 'Widow support',
    short: 'Widows',
    stat: null, // TODO: how many households, how often
    body:
      'Direct provision for widows in the communities the foundation works in — practical, regular, and given without a queue or a form to fill.',
    link: null,
  },
]

// ── The archive: three years of receipts ──────────────────────
// Drop photos in /public/images/ and reference them here.
// A missing photo renders a typographic plate instead — the page
// never shows a broken image.
export const editions = [
  {
    year: 2026,
    theme: 'Fresh Fire',
    date: 'Saturday 12 September 2026',
    venue: 'Trinity House, Zion Centre, Oniru',
    scripture: 'Acts 2:1–4 · Joel 2:28',
    ministers: ministers.map((m) => m.name),
    photo: null, // add a 2026 photo here after Saturday
    note: 'Free buses from 13 pickup points across Lagos and Ogun.',
    upcoming: true,
  },
  {
    year: 2025,
    theme: 'Holy Spirit My Ally',
    date: 'Saturday 6 September 2025',
    venue: 'Darlington Hall',
    ministers: ['Rev. David S. Johnson', 'Pst. Mike Albert'],
    photo: '/images/2025-main.jpg',
    photos: [
      { src: '/images/2025-a.jpg', alt: 'Prayer and ministry on the floor at YECEF 2025' },
      { src: '/images/2025-b.jpg', alt: 'Two attendees at the YECEF 2025 backdrop' },
      { src: '/images/2025-c.jpg', alt: 'Attendees embracing in a full hall at YECEF 2025' },
      { src: '/images/2025-d.jpg', alt: 'Young men worshipping at YECEF 2025' },
    ],
    note: null, // TODO: headcount, if you have it
  },
  {
    year: 2024,
    theme: null, // TODO: the 2024 theme
    date: 'Saturday 14 September 2024',
    venue: null, // TODO
    ministers: ['Min. Peterson Okopi'],
    photo: null, // TODO: add your 2024 photos
    note: 'The first edition.',
  },
]

// ── Giving ────────────────────────────────────────────────────
// TODO: create a Paystack payment page and paste the URL here.
// Until you do, the Give page shows the bank-transfer route instead
// of a dead button.
export const giving = {
  paystackUrl: null,
  // TODO: the real cost of hiring one coach for one axis, and how many
  // it seats. The ask is only persuasive when the number is true.
  coachCostNaira: null,
  seatsPerCoach: 40,
  bank: {
    name: null,   // TODO
    account: null, // TODO
    number: null,  // TODO
  },
}
