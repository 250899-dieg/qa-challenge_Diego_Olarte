# Skyline Skyways – Flight Management QA Challenge

Skyline Skyways is a deliberately imperfect flight search MVP used for mid-level QA interviews. The app is built with Next.js App Router, TypeScript, Tailwind CSS, and Playwright. Candidates must explore, document, and automate the seeded bugs.

## Getting Started

```bash
npm install
npx playwright install --with-deps
npm run dev
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server at `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint quality gate |
| `npm run typecheck` | TypeScript project check |
| `npm run test:e2e` | Playwright headless suite |
| `npm run test:ui` | Playwright headed mode with UI runner |
| `npm run test:api` | Playwright-focused API suite placeholder |

## Mission Statement (Share with Candidates)

> You just joined Skyline Skyways as a QA Automation Engineer. Your first assignment is to explore this MVP, document every defect you find, and start building automated regression coverage. **Use the Page Object Model (POM)** pattern under `tests/pom/` and log findings inside a new `BUGS.md` file at the project root.

## Entrega del Repositorio

- Haz un **fork** del proyecto.
- Sube tu trabajo a un **repositorio privado**.
- Invita a **@hruiz13** como colaborador para la revisión.

## Entregable Teórico

- Revisa las preguntas en [theory-questions.md](theory-questions.md) y entrega tus respuestas como parte del repo (puede ser en el mismo archivo o en un documento claramente referenciado aquí).
- Asegúrate de cubrir casos funcionales, validaciones de frontend y la estrategia manual vs. automatizada siguiendo la guía del archivo.
- Mantén la estructura sugerida en el documento para que el equipo de revisión pueda evaluar rápidamente tu razonamiento.

## BUGS Template

- Start from the pre-populated [BUGS.md](BUGS.md) table to capture defect title, steps, expected vs. actual results, severity, and evidence links.
- Attach screenshots, console captures, traces, or HAR files per entry so recruiters can validate reproductions quickly.
- Keep the file in sync with automation by referencing relevant Playwright specs or Page Objects in the evidence column.

## Architecture Overview

- **Framework**: Next.js App Router + React Server Components.
- **Styling**: Tailwind CSS with Skyline tokens defined in `tailwind.config.ts`.
- **APIs**: `/api/airports` serves mock airport data; `/api/flights` filters mock itineraries and includes intentional failure modes.
- **Testing**: Playwright multi-browser config (`playwright.config.ts`) with Desktop Chrome & Mobile Safari projects plus trace-on-first-retry.

See `docs/architecture.md` for extended diagrams and data flows.

## Playwright Boilerplate

- Base URL is preconfigured to `http://localhost:3000`.
- `tests/e2e/smoke.spec.ts` verifies the homepage renders (sanity guard).
- `tests/e2e/search-form.spec.ts` and `tests/e2e/results-list.spec.ts` showcase form + listing flows.
- `tests/e2e/results-mobile.spec.ts` highlights the mobile overlap issue.
- `tests/pom/README.md` explains how to organize future Page Objects.
- `tests/api/api-v1.spec.ts` contains a commented `fetch` example for API exploration.

## Intentional Defects (Do NOT Fix)

1. **Accessibility**: The search button is icon-only and lacks an accessible name (`// QA-DEFECT-001`).
2. **Logic**: Return dates are allowed to precede departure dates once QA enables the defect toggle (`// QA-DEFECT-003`).
3. **API**: `/api/flights` returns `500 Internal Server Error` whenever `origin` is lowercase (`// QA-DEFECT-004`).
4. **UI**: On screens `< 640px`, a floating overlay blocks the “Book Flight” CTA (`// QA-DEFECT-002`).
5. **Data**: One itinerary reports a negative fare (`// QA-DEFECT-005`).

Recruiters can reference `INSTRUCTIONS.md` for the full grading rubric.

## Performance Expectations

- Initial render ≤ 1.2s on standard laptops.
- Search submission to results ≤ 1.5s using mock data.
- API routes respond within 200ms p95 under light load.
- Capture Lighthouse score ≥ 90 and include evidence in the “Performance Evidence” section below when handing off.

### Instrumentation Checklist

1. Client marks: `markClient('search-submit', 'start' | 'end')` and `markClient('results-fetch', 'start' | 'end')` wrap search + results flows.
2. Server timings: wrap API handlers with `withTiming('api-<name>', fn)` to log durations in devtools.
3. Run `npm run test:e2e` (traces saved `on-first-retry`) and link resulting artifacts from `playwright-report/`.
4. Collect a Lighthouse report (`npx lighthouse http://localhost:3000 --output=json`) and store it under `reports/` for audit trails.

| Check | Evidence |
| --- | --- |
| Lighthouse ≥ 90 | 0.57 score captured via [reports/lighthouse-home.json](reports/lighthouse-home.json) on 2026-01-20 (dev build; rerun against production for ≥90 target). |
| Playwright trace attached | `npm run test:e2e` on 2026-01-20 (see [playwright-report/](playwright-report/) for artifacts and traces). |

## Troubleshooting

- Run `npm run lint && npm run typecheck` before pushing.
- Delete `.next/` if Next.js gets stuck rebuilding.
- Use `npm run test:ui` for interactive debugging with the Playwright app.

Happy testing ✈️
