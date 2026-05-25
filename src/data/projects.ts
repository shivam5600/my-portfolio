export type Project = {
  number: string
  slug: string
  category: string
  name: string
  shortBlurb: string
  problem: string
  whatIDid: string
  impact: string
  /** Relative path under /public — falls back to gradient art if file is missing. */
  image?: string
  art: { primary: string; secondary: string; tall: string }
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'prog-data-discovery',
    category: 'Internal Tool · media.net',
    name: 'Prog Data Discovery Tool',
    shortBlurb:
      'One-click field coverage + cross-entity comparison across EBDA / ADX / Prebid / TAM. Replaces hours of Kibana digging.',
    problem:
      'Product + Data Science teams were burning hours on every bid-request debugging session: manual Kibana queries, copy-paste field coverage checks across 4 ad-exchange integrations (EBDA, ADX, Prebid, TAM), and no canonical way to compare entities side-by-side.',
    whatIDid:
      'Designed and shipped a self-serve analytics platform end-to-end via LLM-assisted development: UI, core analytics logic, deployment, ownership. One click = field coverage, distribution, cross-entity comparison. Iterated with the actual debugging users in the loop.',
    impact:
      'Live in production for internal Data Science + Product teams at media.net. Replaced what used to be ~30 min of manual digging with seconds of UI-driven analysis. Now the canonical bid-request debugging surface across teams.',
    image: '/projects/prog-data-discovery.png',
    art: {
      primary: 'linear-gradient(135deg, #1a0b2e 0%, #4a154b 60%, #7621b0 100%)',
      secondary: 'linear-gradient(220deg, #0f1535 0%, #1a3a8a 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #b600a8 50%, #be4c00 100%)',
    },
  },
  {
    number: '02',
    slug: 'user-journey',
    category: 'Product Analytics · media.net',
    name: 'Tier-1 User Journey Analysis',
    shortBlurb:
      'WebMD health cohort, 100K+ users, 30-day windows. Behavioural classification across Pre / D0 / Post windows.',
    problem:
      "T1 search RPM and NT1 external-bidder RPM weren't being compared apples-to-apples, and no one had segmented WebMD's health-traffic users by Pre/D0/Post behaviour. The team was leaving a multi-million-dollar revenue gap unquantified and unaddressed.",
    whatIDid:
      'Built a 7-segment behavioural classification across Pre/D0/Post windows on a 100K+ user, 30-day cohort. Quantified the search-side RPM gap, traced the bidder-share collapse from D0 (21%) to NT1 post-D0 (6%), and translated findings into a search-side product strategy recommendation.',
    impact:
      'Surfaced ~$3M/yr cross-bidder revenue opportunity. Quantified $4.91 per-1000-impression RPM gap between T1 search and NT1 external bidders. Informed the search-side product roadmap and bidder-coverage strategy.',
    image: '/projects/user-journey.png',
    art: {
      primary: 'linear-gradient(135deg, #0a2540 0%, #1d4ed8 100%)',
      secondary: 'linear-gradient(220deg, #001a33 0%, #0ea5e9 100%)',
      tall: 'linear-gradient(180deg, #0a2540 0%, #1e3a8a 50%, #06b6d4 100%)',
    },
  },
  {
    number: '03',
    slug: 'hermes',
    category: 'Internal Tool · media.net',
    name: 'Hermes: VM + Notebook Scheduler',
    shortBlurb:
      'Hosted internal platform: scheduler + VM file manager with Google SSO, file sharing, self-redeploy.',
    problem:
      'Analytics + DS teams had no shared place to schedule notebook pipelines, manage VM files, or share work. Each team rolled its own cron + papermill stack; nothing was reusable; debugging meant SSHing into individual VMs.',
    whatIDid:
      'Designed and shipped Hermes, a hosted platform with Google SSO, per-user folder isolation, DAG-based pipelines with a Drawflow visual editor, papermill execution, file-sharing, and a self-redeploy pipeline that updates the platform from inside itself. End-to-end LLM-assisted build.',
    impact:
      'Live for internal teams at media.net since May 2026. Run history per pipeline as the audit log. Tier-1 ops teams are migrating their hourly cost-projection workloads onto it. ~v7.15 in production, audit-checklist hardened.',
    image: '/projects/hermes.png',
    art: {
      primary: 'linear-gradient(135deg, #1a0f2e 0%, #6b21a8 100%)',
      secondary: 'linear-gradient(220deg, #1e1b4b 0%, #7c3aed 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #6b21a8 50%, #db2777 100%)',
    },
  },
  {
    number: '04',
    slug: 'overbidding',
    category: 'Impact · media.net',
    name: 'Bid-Level Overbidding Mitigation',
    shortBlurb:
      'RCA on billions of bid-level rows/day surfaced ~$300K/mo opportunity in bidding anomalies.',
    problem:
      'Bid-level overbidding/underbidding patterns were leaking ~$300K/month in missed revenue across billions of rows per day. Root cause was buried under multiple exchange integrations; no one had decomposed the metric movement to the actionable line.',
    whatIDid:
      'Turned the ambiguous revenue question into testable hypotheses on bid-level data. Partnered with Data Science to design a mitigation model. Designed and read out a guardrailed A/B experiment with statistical-significance checks on the rollout.',
    impact:
      'Cut overbidding by ~35% → +$125K / month ($1.5M / year) net revenue, compounding each iteration. Plus a 99%-non-valuable-traffic filter on targeted domains cut ~15% infra cost (~$0.6M/year), now scaled company-wide.',
    image: '/projects/overbidding.png',
    art: {
      primary: 'linear-gradient(135deg, #1a0500 0%, #be4c00 100%)',
      secondary: 'linear-gradient(220deg, #2d0a00 0%, #f97316 100%)',
      tall: 'linear-gradient(180deg, #18011f 0%, #be4c00 50%, #facc15 100%)',
    },
  },
  {
    number: '05',
    slug: 'mpl-churn',
    category: 'Product Analytics · MPL',
    name: 'Losing-Streak Churn Nudge',
    shortBlurb:
      'Losing-streak → churn experiment across tens of millions of MPL gamers.',
    problem:
      'Player churn after consecutive losses was hurting MPL retention, but the causal link between losing-streak length and churn probability had never been validated, and no real-time intervention existed.',
    whatIDid:
      'Hypothesised the losing-streak → churn correlation. Validated via cohort + survival analysis on in-game event logs. Designed and shipped a real-time nudge experiment (targeted pop-ups + bonus-coin incentive after the 4th consecutive loss). A/B-tested across multiple game cohorts with guardrail-metric significance checks.',
    impact:
      '~10% incremental platform-level CM1 after multi-game rollout. Lifted D7 / D30 retention. The nudge became a permanent feature; the experiment framework became reusable for adjacent churn interventions.',
    image: '/projects/mpl-churn.png',
    art: {
      primary: 'linear-gradient(135deg, #0a1a2e 0%, #134e4a 100%)',
      secondary: 'linear-gradient(220deg, #042f2e 0%, #10b981 100%)',
      tall: 'linear-gradient(180deg, #0a1a2e 0%, #134e4a 50%, #10b981 100%)',
    },
  },
  {
    number: '06',
    slug: 'mpl-cost',
    category: 'Impact · MPL',
    name: 'Infra Cost Optimisation',
    shortBlurb:
      'Dynamic AWS / Databricks cost optimisation across MPL data infrastructure.',
    problem:
      'MPL’s AWS + Databricks spend was growing faster than usage justified. Cluster policies, job configurations, and orchestration patterns had been set up ad-hoc across teams; nobody was looking at infra-cost holistically.',
    whatIDid:
      'Audited cluster utilisation patterns, redesigned cluster policies (size, idle-shutdown, spot preference), restructured job configurations, and shifted orchestration patterns toward burst-friendly scheduling. Worked cross-functionally with DE + DevOps.',
    impact:
      'Reduced infrastructure spend by 61% (~$135K / month, ~$1.6M/year). CEO-recognized Best Project Award 2022-23. Patterns reused across product teams as the standard.',
    image: '/projects/mpl-cost.png',
    art: {
      primary: 'linear-gradient(135deg, #1a0a2e 0%, #581c87 100%)',
      secondary: 'linear-gradient(220deg, #1e1b4b 0%, #a21caf 100%)',
      tall: 'linear-gradient(180deg, #1a0a2e 0%, #6b21a8 50%, #f472b6 100%)',
    },
  },
  {
    number: '07',
    slug: 'mpl-deposit',
    category: 'Conversion · MPL',
    name: 'USA First-Deposit Transformation',
    shortBlurb:
      'Funnel + cohort decomposition on USA acquisition → first-deposit (~3% baseline).',
    problem:
      'MPL USA first-deposit conversion sat at ~3%, well below benchmark. Friction points along the funnel were ungrouped, and the team did not have a playbook for time-bound deposit incentives.',
    whatIDid:
      'Ran funnel + cohort decomposition on the acquisition → first-deposit journey across US sign-up cohorts. Pinpointed the highest-leverage friction step. Designed and shipped a 24-hour time-bound deposit-incentive feature; A/B-tested it with statistical guardrails.',
    impact:
      'Lifted first-deposit conversion ~3% → ~8% (≈2.5× lift). Reduced early-stage churn. The feature became the standard US onboarding offering for new users.',
    image: '/projects/mpl-deposit.png',
    art: {
      primary: 'linear-gradient(135deg, #0a1a1e 0%, #064e3b 100%)',
      secondary: 'linear-gradient(220deg, #042f2e 0%, #059669 100%)',
      tall: 'linear-gradient(180deg, #0a1a1e 0%, #065f46 50%, #34d399 100%)',
    },
  },
]
