export type Service = {
  number: string
  title: string
  description: string
}

/** Skills + offerings — framed for APM / Product Manager / DS-PA hiring screens. */
export const services: Service[] = [
  {
    number: '01',
    title: 'AI Product Builder · LLM-Assisted Development',
    description:
      'Ship production tools end-to-end via LLM-assisted development (spec → plan → implement → deploy). Two internal platforms live in prod at media.net: Hermes and Prog Data Discovery, both built UI + analytics logic this way. The differentiator most analyst-track candidates do not have.',
  },
  {
    number: '02',
    title: 'Experimentation, A/B Testing & Causal Inference',
    description:
      'Hypothesis design → guardrailed rollout → statistical-significance readout. Decisions on causal evidence, not noise. A/B-tested at multi-million-user scale on MPL; bid-level experiments at billion-row/day scale on media.net. Comfortable with Bayesian + frequentist trade-offs.',
  },
  {
    number: '03',
    title: 'Product Analytics & User Discovery',
    description:
      'Cohort, funnel, retention, behavioural-segmentation work that turns event logs into roadmap inputs. Tier-1 user-journey studies (incl. WebMD 100K-user 30-day cohort) at production scale. SQL · Python · Tableau · MixPanel · CleverTap.',
  },
  {
    number: '04',
    title: 'Forecasting, RCA & Anomaly Detection',
    description:
      'Hybrid ML projection models in prod (LightGBM + XGBoost + Prophet) running hourly, surfacing $300K/mo anomalies in bid-level data. The DS-leaning skill set that fits PM-Analytics tracks at Uber, Doordash, Swiggy, Razorpay: pricing, demand-signal, marketplace dynamics.',
  },
  {
    number: '05',
    title: 'Roadmapping & Stakeholder Storytelling',
    description:
      'Translate analysis into KPI dashboards, exec-ready narratives, and roadmap recommendations cross-functional teams (PM, DS, Eng) can act on. Co-owned roadmap shifts on bidder-coverage strategy at media.net based on cohort findings.',
  },
]
