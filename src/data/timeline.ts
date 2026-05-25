export type Milestone = {
  year: string
  org: string
  role: string
  blurb: string
}

export const timeline: Milestone[] = [
  {
    year: '2019',
    org: 'IIT BHU',
    role: 'BTech — Engineering',
    blurb: 'Started undergrad at IIT Varanasi. Graduated 2023, CPI 8.36.',
  },
  {
    year: 'Aug 2021',
    org: 'Apna',
    role: 'Product Intern',
    blurb: "First brush with product analytics at India's largest jobs platform (unicorn).",
  },
  {
    year: 'Jan 2022',
    org: 'MPL',
    role: 'Product Analyst',
    blurb: 'Owned user-behaviour & nudge experimentation across tens-of-millions of gamers.',
  },
  {
    year: 'Nov 2023',
    org: 'media.net',
    role: 'Lead Product Analyst',
    blurb: 'Promoted to Lead in ~1.2 yrs — fastest at media.net. Bid-level data → $1.5M+/yr revenue.',
  },
]
