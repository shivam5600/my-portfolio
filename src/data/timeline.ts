export type Milestone = {
  year: string
  org: string
  role: string
  blurb: string
  /** Optional logo URL (Clearbit logo CDN — free, no key). Falls back to text-only node if missing or 404. */
  logo?: string
}

export const timeline: Milestone[] = [
  {
    year: '2019',
    org: 'IIT BHU',
    role: 'BTech — Engineering',
    blurb: 'Started undergrad at IIT Varanasi. Graduated 2023, CPI 8.36.',
    logo: 'https://logo.clearbit.com/iitbhu.ac.in',
  },
  {
    year: 'Aug 2021',
    org: 'Apna',
    role: 'Product Intern',
    blurb: "First brush with product analytics at India's largest jobs platform (unicorn).",
    logo: 'https://logo.clearbit.com/apna.co',
  },
  {
    year: 'Jan 2022',
    org: 'MPL',
    role: 'Product Analyst',
    blurb: 'Owned user-behaviour & nudge experimentation across tens-of-millions of gamers.',
    logo: 'https://logo.clearbit.com/mpl.live',
  },
  {
    year: 'Nov 2023',
    org: 'media.net',
    role: 'Senior Product Analyst',
    blurb: 'Joined media.net contextual-ads team — billion-row bid-level analytics, RCA, experimentation.',
    logo: 'https://logo.clearbit.com/media.net',
  },
  {
    year: 'Jan 2025',
    org: 'media.net',
    role: 'Lead Product Analyst',
    blurb: 'Promoted to Lead in ~1.2 yrs — fastest at media.net. Driving $1.5M+/yr revenue work.',
    logo: 'https://logo.clearbit.com/media.net',
  },
  {
    year: '2026',
    org: 'media.net',
    role: 'Lead Product Analyst — still building',
    blurb: 'Shipped Hermes + Prog Data Discovery into prod for internal teams. Scaling AI-assisted analytics.',
    logo: 'https://logo.clearbit.com/media.net',
  },
]
