# Kedar Chashtve — Growth Marketing Strategist Portfolio

## Original Problem Statement
Build a modern, interactive single-page portfolio for Kedar Chashtve (Growth Marketing Strategist).
Recruiters must understand in <10s: what he does, results delivered, how he thinks, why he's different.
Dark-theme premium product feel inspired by Linear / Raycast / Vercel / Aceternity UI / Magic UI.

## Stack
- Backend: FastAPI + MongoDB (Motor) — case studies served via REST API.
- Frontend: React 19 + Tailwind CSS + Framer Motion 11 + Lucide icons + Shadcn Dialog.
- Hosting: Emergent preview deployment (supervisor-managed).

## Architecture
- `/app/backend/server.py` — API + idempotent case-study seeding on startup.
- `/app/frontend/src/pages/Portfolio.jsx` — composes sections.
- `/app/frontend/src/components/portfolio/*` — Navigation, Hero, AnimatedDashboard, CaseStudies, GrowthFramework, Experience, Skills, Exploring, Contact, Footer, MagneticButton, SectionHeader.
- `/app/frontend/src/data/portfolio.js` — profile + framework + skills + experience content.

## User Personas
- **Recruiter / Hiring Manager** — wants quick proof of growth impact.
- **Founder looking for growth lead** — wants strategy depth + AI fluency.
- **Agency / Consulting prospect** — wants signal on scale (20+ brands handled).

## Core Requirements (static)
- Dark theme with Background `#050816`, Surface `#0F172A`, Accent `#7C3AED`, Secondary `#06B6D4`.
- Hero with animated metric counters, mouse-responsive grid glow, word-by-word headline reveal, magnetic CTAs, animated growth dashboard (chart + funnel + AI workflow nodes).
- 3 Case Studies max with Problem/Strategy/Actions/Results/Tools modal.
- Interactive Growth Framework (Research → Strategy → Content → Distribution → Optimization).
- Experience timeline with collapsible earlier roles.
- 4 Skill clusters (Growth & Performance, Content & Social, Analytics, AI Workflows) with hover-reveal examples.
- Currently Exploring cards (5).
- Contact (email + LinkedIn + Resume download). **NO GitHub link.**

## Implemented (2026-06-16)
- [x] FastAPI backend with `/api/case-studies`, `/api/case-studies/{slug}`, `/api/status` endpoints.
- [x] Idempotent MongoDB seeding of 3 case studies on app startup.
- [x] Portfolio React app with Navigation + 7 content sections + Footer.
- [x] Framer Motion: word-by-word headline reveal, count-up metric cards, magnetic buttons, animated SVG dashboard, dashed flowing connectors, hover-expand framework nodes.
- [x] Real contact info wired: email `kedarchashtve7@gmail.com`, LinkedIn URL, uploaded resume PDF URL.
- [x] Tested end-to-end via testing_agent_v3 — 100% pass (5 backend + 41 frontend assertions).
- [x] A11y fix: DialogDescription added to Case Study modal.

## Personas → What they get
| Persona | Section | Outcome |
|--------|---------|---------|
| Recruiter | Hero + Case Studies | Instant proof in <10s |
| Founder | Growth Framework | Sees structured thinking |
| Agency | Experience + Skills | Sees scale + range |

## Backlog (P0 → P2)
- **P1** — Optionally add /api/contact endpoint + email forwarding (Resend) if Kedar wants persistent leads instead of mailto-only flow.
- **P2** — Add a small "Press / Articles" rail if Kedar publishes growth content.
- **P2** — Open Graph meta + social preview image generation.
- **P2** — Replace destructive case-study seeding with seed-if-empty + admin edit flow.
- **P3** — Light theme toggle (currently dark-only by design).
- **P3** — Migrate `@app.on_event('startup')` to FastAPI lifespan handlers.

## Next Tasks
- Confirm content accuracy for case study tooling (Klaviyo-style placeholder).
- Decide on contact persistence (mailto-only vs backend lead capture).
