export type CaseStudyBlock = {
  title: string
  body?: string[]
  cards?: { title: string; body: string }[]
  list?: { title: string; body: string }[]
}

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  lede: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  facts: { label: string; value: string }[]
  blocks: CaseStudyBlock[]
  links?: { label: string; href: string }[]
}

/**
 * Case study content lives here so new pages can be written without touching
 * layout code. Add a new entry, then a thin route file that renders it.
 */
export const caseStudies: Record<string, CaseStudy> = {
  'the-bright-side': {
    slug: 'the-bright-side',
    title: 'The Bright Side',
    kicker: 'Case study · Product design',
    lede: 'A weekly newsletter that trades doomscrolling for a small, positive dose of local news, designed to feel like a magazine you actually want to open.',
    image:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/699/546/datas/gallery.jpg',
    imageAlt: 'Prototype screens for The Bright Side newsletter concept',
    imageCaption: 'Prototype design · mobile reading flow',
    facts: [
      { label: 'Role', value: 'Design and user research' },
      { label: 'Timeline', value: 'Hackathon project' },
      { label: 'Tools', value: 'Figma · ibisPaint X · Photoshop' },
      { label: 'Type', value: 'Newsletter concept' },
    ],
    blocks: [
      {
        title: 'The short version',
        body: [
          'The Bright Side started as a reaction to the way social feeds and headlines make a day feel heavier. Instead of another endless feed, the idea was a weekly dose of positive local news, plus a place for people to share their own stories.',
          'The visual direction borrowed from magazines and newspapers: strong typography, generous white space, and a brand that feels printed even though the product is digital.',
        ],
      },
      {
        title: 'The problem',
        body: [
          'Social media rewards volume and negativity. Local good news exists, but it rarely reaches the people who would care about it, and it is scattered across group chats and local pages.',
          'Our first instinct was a physical magazine. User research pushed back on that: the target audience liked the idea of print but would not commit to reading it, so the concept had to move to a format people already open every week.',
        ],
      },
      {
        title: 'Approach',
        cards: [
          {
            title: '01 · Research first',
            body: 'Interviews and testing told us what people actually wanted to read, and more importantly what they would not. That research is what turned a magazine into a newsletter.',
          },
          {
            title: '02 · Build the brand',
            body: 'A warm, optimistic identity carried the idea before the product existed: type, colour, and illustration were iterated alongside the wireframes rather than after them.',
          },
          {
            title: '03 · Prototype the read',
            body: 'The prototype focuses on the reading flow: how a weekly issue opens, how stories are shared, and how little friction stands between a reader and the next issue.',
          },
        ],
      },
      {
        title: 'Design decisions',
        list: [
          {
            title: 'Weekly, not endless',
            body: 'One issue a week gives the product a beginning and an end. That alone changes how the reader feels about opening it.',
          },
          {
            title: 'Local before general',
            body: 'Stories are anchored to a place, so the newsletter feels personal instead of like another general-interest feed.',
          },
          {
            title: 'Printed feel, digital format',
            body: 'The magazine language stayed, the paper did not. Typography and layout carry the warmth without the distribution problem.',
          },
        ],
      },
      {
        title: 'The build',
        body: [
          'Wireframes, user flows, and the interactive prototype were built in Figma. Illustration and mockups were made in ibisPaint X and Photoshop, then folded back into the prototype as the brand settled.',
        ],
      },
      {
        title: 'What I learned',
        body: [
          'Scope discipline is a design skill. The first version of this idea was far too broad, and narrowing it took more work than adding to it.',
          'User research can move a concept somewhere you did not plan. Following the evidence, even when it kills your favourite idea, is what made the product make sense.',
        ],
      },
    ],
    links: [{ label: 'View on Devpost', href: 'https://devpost.com/software/the-bright-side' }],
  },
  'closeknit': {
    slug: 'closeknit',
    title: 'CloseKnit',
    kicker: 'Case study · App design',
    lede: 'A low-commitment app that keeps families and friend groups close through daily questions, status updates, and small games.',
    image:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/898/805/datas/gallery.jpg',
    imageAlt: 'CloseKnit app mockup with cozy yarn branding',
    imageCaption: 'Mockup · home screen and brand identity',
    facts: [
      { label: 'Role', value: 'Design' },
      { label: 'Timeline', value: 'SLAM hackathon' },
      { label: 'Tools', value: 'Figma · ibisPaint X' },
      { label: 'Type', value: 'Mobile app' },
    ],
    blocks: [
      {
        title: 'The short version',
        body: [
          'CloseKnit is an app for people who want to stay in touch but do not want another obligation. Daily questions, status updates, and small games give a group something to talk about without asking anyone to schedule a call.',
          'The whole product is built around warmth: a home screen shaped like a house, a ball of yarn for a logo, and a name that sounds like a knitted blanket.',
        ],
      },
      {
        title: 'The problem',
        body: [
          'People grow apart through physical and emotional distance, and most social apps make that worse by asking for performance rather than presence.',
          'The design brief was to lower the cost of contact. One tap should be enough to feel connected, and nothing in the app should feel like homework.',
        ],
      },
      {
        title: 'Approach',
        cards: [
          {
            title: '01 · Sketch the loop',
            body: 'Sketches explored how a daily question, a status, and a game fit together without competing for attention.',
          },
          {
            title: '02 · Design for comfort',
            body: 'The house-shaped home screen and yarn identity set the tone: soft, familiar, and closer to a living room than a feed.',
          },
          {
            title: '03 · Theme it per person',
            body: 'Prototype themes let each user colour the app to their taste, so the space feels personal rather than shared and generic.',
          },
        ],
      },
      {
        title: 'Design decisions',
        list: [
          {
            title: 'Familiar navigation',
            body: 'A hamburger menu on most screens, plus the home screen itself, gives every age group a way in that they already know.',
          },
          {
            title: 'Minimal by default',
            body: 'Simple layouts and clear hierarchy keep the app usable for people who are not power users.',
          },
          {
            title: 'Custom colour themes',
            body: 'Themes are the personal touch: the same product, but each person picks the mood they want to return to.',
          },
        ],
      },
      {
        title: 'The build',
        body: [
          'Sketches, mockups, and theme explorations were made in Figma, with illustration and identity work in ibisPaint X.',
        ],
      },
      {
        title: 'What I learned',
        body: [
          'Warmth is a system, not a filter. Name, logo, colour, and layout all had to point the same direction for the app to feel cozy.',
          'Designing for all ages means removing cleverness. The navigation had to be obvious before it could be charming.',
        ],
      },
    ],
    links: [{ label: 'View on Devpost', href: 'https://devpost.com/software/slam-ngdaf3' }],
  },
  'hope-haven': {
    slug: 'hope-haven',
    title: 'Hope Haven',
    kicker: 'Case study · HackAI25',
    lede: 'A mobile app that helps someone in a difficult or abusive situation understand their risk and reach the right support, without giving up their privacy.',
    image:
      'https://assets.macaly-user-data.dev/q8pdrfquonyabtw5uci2jfka/ernrlnsqhqmm4vc8ldtgunkm/kFCHLGWKpXAPgaHXnMK96/hopehaven-zrRL8Jcn.png',
    imageAlt: 'Screenshot of the Hope Haven hackathon app',
    imageCaption: 'HackAI25 build · guided risk check',
    facts: [
      { label: 'Role', value: 'Interface design and front end' },
      { label: 'Timeline', value: 'HackAI25 hackathon' },
      { label: 'Tools', value: 'React Native · Gemini · n8n' },
      { label: 'Type', value: 'Mobile app' },
    ],
    blocks: [
      {
        title: 'The short version',
        body: [
          'Hope Haven is built for the worst moment to be searching for help. Instead of a directory of resources, it walks someone through a short guided check, understands how urgent the situation is, and connects them to a support organisation that fits.',
          'The constraint that shaped everything: no account, no stored personal details, and no loss of anonymity while still getting a person to real help.',
        ],
      },
      {
        title: 'The problem',
        body: [
          'In a crisis, navigating available resources can feel impossible. Information is scattered, terminology is unclear, and every form asking for personal details is a reason to stop.',
          'The app had to ask enough to understand risk, and as little as possible to protect the person answering.',
        ],
      },
      {
        title: 'Approach',
        cards: [
          {
            title: '01 · Question before directory',
            body: 'A short, intuitive question sequence establishes risk level before any resource is shown, so the next screen is relevant instead of overwhelming.',
          },
          {
            title: '02 · Privacy as architecture',
            body: 'No login, no stored identity. The sequence determines urgency without logging who asked.',
          },
          {
            title: '03 · Route to a real place',
            body: 'Answers feed a multi-agent flow that matches the situation to a support organisation that can actually help.',
          },
        ],
      },
      {
        title: 'Design decisions',
        list: [
          {
            title: 'Calm, not clinical',
            body: 'Screens stay plain and quiet. The interface never dramatises the situation or asks for more than the next step.',
          },
          {
            title: 'One question at a time',
            body: 'A single question per screen keeps the cognitive load low for someone under stress.',
          },
          {
            title: 'Anonymity by default',
            body: 'Nothing about the flow requires an identity, so help stays available to people who cannot safely share one.',
          },
        ],
      },
      {
        title: 'The build',
        body: [
          'React Native carried the mobile experience across devices. API calls and n8n automation moved information through the flow, and Gemini analysed free-text answers to route people to an appropriate resource through a multi-agent architecture.',
        ],
      },
      {
        title: 'What I learned',
        body: [
          'Designing for crisis means designing for someone with no patience and no trust to spare. Every field you remove is a feature.',
          'The team had little prior experience with React Native, n8n, or AI integration. Shipping the flow end to end taught more than any isolated piece would have.',
        ],
      },
    ],
    links: [
      { label: 'View on Devpost', href: 'https://devpost.com/software/hope-haven' },
      { label: 'View on GitHub', href: 'https://github.com/ShayaanZari/hackai25' },
    ],
  },
}
