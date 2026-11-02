export const profile = {
  name: 'Sai Thiruveedula',
  firstName: 'Sai',
  tagline: 'Computer Science · UX Design · Games',
  location: 'Richardson, TX',
  email: 'thirusai05@gmail.com',
  phone: '+1 925 557 8495',
  smsHref: 'sms:+19255578495',
  linkedin: 'https://www.linkedin.com/in/sai-thiruveedula/',
  linkedinHandle: '@sai-thiruveedula',
  github: 'https://github.com/Soy-Sauce-M8z',
  devpost: 'https://devpost.com/thirusai05',
  portrait:
    'https://assets.macaly-user-data.dev/q8pdrfquonyabtw5uci2jfka/ernrlnsqhqmm4vc8ldtgunkm/3Nt_Z7VjReQd545SnSIa2/perfil-TwUh0-eD.png',
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
]

export const projectFilters = [
  { id: 'all', label: 'All work' },
  { id: 'game', label: 'Video games' },
  { id: 'app', label: 'Apps' },
  { id: 'bot', label: 'Bots' },
] as const

export const stats = [
  { value: '03+', label: 'Years experience' },
  { value: '03', label: 'Certifications' },
  { value: '07', label: 'Hackathons' },
]

export const marqueeWords = [
  'Interface design',
  'Front-end build',
  'Design systems',
  'Game dev',
  'Prototyping',
  'User research',
]

type Project = {
  id: string
  index: string
  title: string
  category: string
  year: string
  blurb: string
  image: string
  alt: string
  filter: 'game' | 'app' | 'bot'
  tags: string[]
  caseStudy?: string
  hideSecondaryAction?: boolean
  action: { kind: 'external' | 'notice'; label: string; href?: string; notice?: string }
}

export const projects: Project[] = [
  {
    id: 'the-bright-side',
    index: '01',
    title: 'The Bright Side',
    category: 'Product Design',
    year: 'Hackathon',
    blurb:
      'A weekly newsletter that trades doomscrolling for a small, positive dose of local news, styled like a magazine you actually want to open.',
    image:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/699/546/datas/gallery.jpg',
    alt: 'Prototype screens for The Bright Side newsletter concept',
    filter: 'app',
    tags: ['Figma', 'ibispaintx'],
    caseStudy: '/work/the-bright-side',
    action: {
      kind: 'external',
      label: 'View',
      href: 'https://devpost.com/software/the-bright-side',
    },
  },
  {
    id: 'cookiepop',
    index: '02',
    title: 'CookiePop!',
    category: 'Game Design',
    year: 'Cookie Jam',
    blurb:
      'A cozy match-3 about collecting cookies with company: three hamster companions hand you special treats that clear the board when you match them.',
    image: 'https://img.itch.zone/aW1nLzI2NjI0MjI0LnBuZw==/original/hHXTwg.png',
    alt: 'Cover art for CookiePop! with cookies, sweets, and hamster companions',
    filter: 'game',
    tags: ['Unity'],
    action: {
      kind: 'external',
      label: 'Play on demo',
      href: 'https://soysaucem8z.itch.io/cookiepop',
    },
  },
  {
    id: 'closeknit',
    index: '03',
    title: 'CloseKnit',
    category: 'App Design',
    year: 'SLAM hackathon',
    blurb:
      'A low-commitment app that keeps family and friends close through daily questions, status updates, and small games.',
    image:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/898/805/datas/gallery.jpg',
    alt: 'CloseKnit app mockup with cozy yarn branding',
    filter: 'app',
    tags: ['Figma'],
    caseStudy: '/work/closeknit',
    action: {
      kind: 'external',
      label: 'View',
      href: 'https://devpost.com/software/slam-ngdaf3',
    },
  },
  {
    id: 'stars-stereo',
    index: '04',
    title: "Star's Stereo",
    category: 'Discord Bot',
    year: 'In progress',
    blurb:
      'A music bot for Discord with a soft, sticker-book personality: queue control, lyrics, and a listening room that feels like a bedroom stereo.',
    image:
      'https://assets.macaly-user-data.dev/q8pdrfquonyabtw5uci2jfka/ernrlnsqhqmm4vc8ldtgunkm/B3ZHSKJmZA8cdLj8RoZZ8/starsstereo-ePcoSPii.png',
    alt: "Pixel-art pink title card for Star's Stereo, a Discord music bot",
    filter: 'bot',
    tags: ['Javascript', 'Discord API'],
    caseStudy: '/work/stars-stereo',
    hideSecondaryAction: true,
    action: {
      kind: 'external',
      label: 'View',
      href: profile.github,
    },
  },
  {
    id: 'brewed-comfort',
    index: '05',
    title: 'Brewed Comfort',
    category: 'Video Game',
    year: 'Unity',
    blurb:
      'A cozy pixel-art coffee shop sim where the loop is brewing, serving, and slowing down. Built in Unity with a small team.',
    image:
      'https://assets.macaly-user-data.dev/q8pdrfquonyabtw5uci2jfka/ernrlnsqhqmm4vc8ldtgunkm/-c9fcu3wdNxp2g2Efz1xB/brewedcomfort-dK0Y0yLP.png',
    alt: 'Pixel-art coffee shop interior from the game Brewed Comfort',
    filter: 'game',
    tags: ['Unity'],
    action: {
      kind: 'external',
      label: 'Play the demo',
      href: 'https://soysaucem8z.itch.io/brewed-comfort',
    },
  },
  {
    id: 'hope-haven',
    index: '06',
    title: 'Hope Haven',
    category: 'App · HackAI25',
    year: 'Hackathon',
    blurb:
      'A hackathon app that connects people to nearby support resources. I handled the interface design and front-end build.',
    image:
      'https://assets.macaly-user-data.dev/q8pdrfquonyabtw5uci2jfka/ernrlnsqhqmm4vc8ldtgunkm/kFCHLGWKpXAPgaHXnMK96/hopehaven-zrRL8Jcn.png',
    alt: 'Screenshot of the Hope Haven hackathon app',
    filter: 'app',
    tags: ['React Native', 'Gemini API', 'n8n'],
    caseStudy: '/work/hope-haven',
    action: {
      kind: 'external',
      label: 'View',
      href: 'https://github.com/ShayaanZari/hackai25',
    },
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    note: 'Comfortable reading, writing, and shipping',
    items: [
      { name: 'HTML', years: 6, max: 6 },
      { name: 'CSS', years: 6, max: 6 },
      { name: 'Python', years: 6, max: 6 },
      { name: 'Java', years: 4, max: 6 },
      { name: 'C++', years: 3, max: 6 },
      { name: 'JavaScript', years: 2, max: 6 },
    ],
  },
  {
    title: 'Tools & Software',
    note: 'The workshop behind the work',
    items: [
      { name: 'GitHub', years: 6, max: 6 },
      { name: 'Unreal Engine 4', years: 2, max: 6 },
      { name: 'MATLAB', years: 2, max: 6 },
      { name: 'Unity', years: 1, max: 6 },
      { name: 'Figma', years: 1, max: 6 },
    ],
  },
]

export const education = [
  {
    title: 'B.Sc. Computer Science',
    place: 'University of Texas at Dallas',
    date: 'Expected May 2027',
    detail: 'Coursework across algorithms, systems, HCI, and software engineering.',
  },
  {
    title: 'Google UX Design Certificate',
    place: 'Coursera',
    date: 'April 2025',
    detail: 'End-to-end UX process: research, wireframes, prototypes, usability testing.',
  },
  {
    title: 'Figma Certification',
    place: 'UX Club',
    date: 'November 2024',
    detail: 'Component libraries, auto layout, and design handoff.',
  },
]

export const services = [
  {
    title: 'UI/UX Design',
    icon: '/icons/uiux.svg',
    body: 'Research, wireframes, and polished interfaces in Figma. I design for the person who has to use it, not just the screenshot.',
    deliverables: ['User flows', 'Wireframes', 'Interactive prototypes'],
  },
  {
    title: 'Website Design',
    icon: '/icons/web.svg',
    body: 'Responsive marketing sites and portfolios built with clean, accessible front-end code that holds up on a phone.',
    deliverables: ['Responsive build', 'Design systems', 'Accessibility pass'],
  },
  {
    title: 'App & Game Development',
    icon: '/icons/game.svg',
    body: 'Small, finished products: web apps, tools, and games. Unity and Unreal for play, TypeScript and Python for everything else.',
    deliverables: ['Unity / UE4', 'Web apps', 'Rapid prototypes'],
  },
]
