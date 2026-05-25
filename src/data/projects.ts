export type Project = {
  number: string
  category: string
  name: string
  blurb: string
  highlights: string[]
  /** Three CSS-gradient signatures — used when no screenshot is supplied. */
  art: { primary: string; secondary: string; tall: string }
}

export const projects: Project[] = [
  {
    number: '01',
    category: 'Internal Tool · media.net',
    name: 'Prog Data Discovery Tool',
    blurb:
      'One-click field coverage + cross-entity comparison across EBDA / ADX / Prebid / TAM. Replaces hours of manual Kibana digging.',
    highlights: [
      'Live in production for internal Data Science + Product teams',
      'UI + core analytics logic built via LLM-assisted development',
      'Owned production deployment end-to-end',
    ],
    art: {
      primary: 'linear-gradient(135deg, #1a0b2e 0%, #4a154b 60%, #7621b0 100%)',
      secondary: 'linear-gradient(220deg, #0f1535 0%, #1a3a8a 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #b600a8 50%, #be4c00 100%)',
    },
  },
  {
    number: '02',
    category: 'Product Analytics · media.net',
    name: 'Tier-1 User Journey Analysis',
    blurb:
      'WebMD health cohort, 100K+ users, 30-day windows. Built a 7-segment behavioural classification across Pre / D0 / Post windows.',
    highlights: [
      '$4.91 per-1000-impression revenue gap quantified (T1 search RPM vs NT1 external-bidder RPM)',
      'Search-bidder share collapsed 21% (D0) → 6% (NT1 post-D0)',
      'Surfaced ~$3M/yr cross-bidder revenue opportunity; informed search-side product + bidder-coverage roadmap',
    ],
    art: {
      primary: 'linear-gradient(135deg, #0a2540 0%, #1d4ed8 100%)',
      secondary: 'linear-gradient(220deg, #001a33 0%, #0ea5e9 100%)',
      tall: 'linear-gradient(180deg, #0a2540 0%, #1e3a8a 50%, #06b6d4 100%)',
    },
  },
  {
    number: '03',
    category: 'Internal Tool · media.net',
    name: 'Hermes — VM + Notebook Scheduler',
    blurb:
      'Hosted internal platform: notebook-driven scheduler + VM file manager with Google SSO, per-user folder isolation, file sharing, self-redeploy.',
    highlights: [
      'Live for internal teams at media.net since May 2026',
      'DAG pipelines + Drawflow visual editor + papermill execution',
      'End-to-end LLM-assisted build · self-redeploy pipeline · audit-checklist hardened',
    ],
    art: {
      primary: 'linear-gradient(135deg, #1a0f2e 0%, #6b21a8 100%)',
      secondary: 'linear-gradient(220deg, #1e1b4b 0%, #7c3aed 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #6b21a8 50%, #db2777 100%)',
    },
  },
  {
    number: '04',
    category: 'Impact · media.net',
    name: 'Bid-Level Overbidding Mitigation',
    blurb:
      'RCA surfaced ~$300K/mo opportunity in bidding anomalies. Partnered with DS on a mitigation model.',
    highlights: [
      'Cut overbidding by ~35%',
      '+$125K / month ($1.5M / year) net revenue · compounding each iteration',
      'Plus: 99% non-valuable-traffic filter on targeted domains → ~15% infra cost cut (~$0.6M / yr)',
    ],
    art: {
      primary: 'linear-gradient(135deg, #1a0500 0%, #be4c00 100%)',
      secondary: 'linear-gradient(220deg, #2d0a00 0%, #f97316 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #be4c00 50%, #facc15 100%)',
    },
  },
  {
    number: '05',
    category: 'Product Analytics · MPL',
    name: 'Losing-Streak Churn Nudge',
    blurb:
      'Hypothesised losing-streak → churn correlation. Validated via cohort + survival analysis on in-game event logs. Shipped a real-time nudge experiment (pop-ups + bonus-coin incentive after 4th consecutive loss).',
    highlights: [
      'A/B-tested across multiple game cohorts with guardrail-metric significance checks',
      '~10% incremental platform-level CM1 after multi-game rollout',
      'Lifted D7 / D30 retention; reduced churn',
    ],
    art: {
      primary: 'linear-gradient(135deg, #0a1a2e 0%, #134e4a 100%)',
      secondary: 'linear-gradient(220deg, #042f2e 0%, #10b981 100%)',
      tall: 'linear-gradient(180deg, #0a1a2e 0%, #134e4a 50%, #10b981 100%)',
    },
  },
  {
    number: '06',
    category: 'Impact · MPL',
    name: 'Infra Cost Optimisation',
    blurb:
      'Dynamic infra-cost optimisation on AWS / Databricks — cluster policies, job configurations, orchestration patterns.',
    highlights: [
      'Reduced infrastructure spend by 61% (~$135K / month)',
      'CEO-recognized Best Project Award 2022-23',
      'Patterns reused across product teams',
    ],
    art: {
      primary: 'linear-gradient(135deg, #1a0a2e 0%, #581c87 100%)',
      secondary: 'linear-gradient(220deg, #1e1b4b 0%, #a21caf 100%)',
      tall: 'linear-gradient(180deg, #1a0a2e 0%, #6b21a8 50%, #f472b6 100%)',
    },
  },
  {
    number: '07',
    category: 'Conversion · MPL',
    name: 'USA First-Deposit Transformation',
    blurb:
      'Funnel + cohort decomposition on acquisition → first-deposit (~3% baseline). Identified friction points, shipped a 24-hour time-bound deposit-incentive feature.',
    highlights: [
      'A/B-tested across US sign-up cohorts',
      'Lifted first-deposit conversion ~3% → ~8%',
      'Reduced early-stage churn; became the standard US onboarding offering',
    ],
    art: {
      primary: 'linear-gradient(135deg, #0a1a1e 0%, #064e3b 100%)',
      secondary: 'linear-gradient(220deg, #042f2e 0%, #059669 100%)',
      tall: 'linear-gradient(180deg, #0a1a1e 0%, #065f46 50%, #34d399 100%)',
    },
  },
]
