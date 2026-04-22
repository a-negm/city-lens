# Architecture

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- MapLibre GL JS
- Static JSON / GeoJSON data for MVP
- Optional OpenAI integration later for structured insight summaries

## Architecture goals
- lean
- readable
- secure
- easy for a designer-led workflow
- easy for Codex to understand
- minimal dependencies
- deterministic where it matters

## High-level structure
app/
components/
lib/
types/
public/data/
scripts/
docs/

## Folder responsibilities

### app/
Application routes, page layout, server components, and API routes if needed later.

### components/
UI and feature components only.

Suggested subfolders:
- components/ui
- components/map
- components/panels
- components/controls
- components/layout

### lib/
Non-UI logic only.

Suggested subfolders:
- lib/data
- lib/scoring
- lib/ai
- lib/utils

### types/
Shared TypeScript types.

### public/data/
Static datasets used by the MVP.
Examples:
- berlin-boundaries.geojson
- areas.json
- metrics.json

### scripts/
Data transformation and preprocessing scripts.
These scripts should prepare public data for app use.

### docs/
Project instructions, specs, and Codex guidance.

## Data flow
1. Prepared static data is stored in public/data.
2. Map components render geometry and layer styling.
3. Selection state determines the currently inspected area.
4. Deterministic utilities compute score and factor contributions.
5. UI panels render metrics and explanation.
6. AI summaries, if added later, receive structured computed inputs and return structured text outputs.

## Component boundaries

### Map components
Responsible for:
- rendering the map
- rendering selected boundaries
- handling user selection
- showing legends and layer changes

Map components should not contain business scoring logic.

### Panel components
Responsible for:
- showing selected area details
- presenting score and factors
- rendering explanation content

Panel components should not fetch secrets or calculate complex scores inline.

### Scoring utilities
Responsible for:
- normalization
- score computation
- factor weighting
- comparisons

These must be deterministic and testable.

### AI utilities
Responsible for:
- prompt creation
- schema definition
- output parsing

AI utilities must never become the core source of truth.

## Client vs server rules
- Prefer server components by default.
- Use client components only when needed for interactivity or map rendering.
- Never expose secrets in client code.
- If AI is added later, AI requests must happen server-side.

## Dependency policy
- Add as few dependencies as possible.
- No new dependency should be added without a clear reason.
- Prefer native platform features and plain TypeScript utilities where possible.

## Styling approach
- Tailwind for layout and utility styling
- shadcn/ui for base UI primitives
- minimal custom design tokens only when needed

## State approach
For MVP:
- local React state only
- no global state library unless a real need appears

## Testing approach
Prioritize testing for:
- scoring logic
- schema validation
- parsing
- utility functions

Do not overinvest early in component testing.

## File size guidance
- Prefer small focused files
- Avoid large multi-purpose files
- Keep logic isolated and named clearly

## Architecture constraints
- no premature abstraction
- no unnecessary services layer
- no generic wrappers without repeat use
- no database in MVP unless clearly required
- no backend-heavy architecture before product need is proven