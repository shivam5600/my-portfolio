export type Service = {
  number: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    number: '01',
    title: 'AI Builder · Vibe Coding · LLM-Assisted Development',
    description:
      'Ship production tools end-to-end with LLM-assisted development (spec → plan → implement → deploy). Two internal platforms live in prod at media.net — Hermes and Prog Data Discovery — built UI + analytics logic this way. Not prototypes.',
  },
  {
    number: '02',
    title: 'Experimentation & A/B Testing',
    description:
      'Hypothesis design → guardrailed rollout → statistical-significance readout. Make product calls on causal evidence, not noise. A/B-tested at multi-million-user scale on MPL; bid-level experiments at billion-row/day scale on media.net.',
  },
  {
    number: '03',
    title: 'Product Analytics & User Discovery',
    description:
      'Cohort, funnel, retention, behavioural-segmentation work that turns event logs into roadmap inputs. Tier-1 user-journey studies (incl. WebMD 100K-user 30-day cohort) at production scale.',
  },
  {
    number: '04',
    title: 'Root Cause Analysis & Opportunity Sizing',
    description:
      'Decompose metric movement to the line it breaks; surface multi-million-dollar opportunities buried in distributions. RCA → testable hypothesis → shipped fix.',
  },
  {
    number: '05',
    title: 'Roadmapping & Stakeholder Storytelling',
    description:
      'Translate analysis into KPI dashboards, exec-ready narratives, and roadmap recommendations cross-functional teams (PM, DS, Eng) can act on. Data storytelling end-to-end.',
  },
]
