# Feature: Layer Color Legend

## Summary
Replace the current layer explanation text with a compact color legend that shows what each active layer’s colors mean.

## Goal
Help users interpret map colors directly and understand the qualitative scale behind each active layer.

## User value
Users can quickly decode the active layer without guessing what the colors represent.

## In scope
- show a 3-step color legend for the active layer
- support:
  - density
  - air quality
  - green space
- use the same colors as the map layer styling
- use qualitative labels only
- animate the legend reveal like a drawer
- keep a small neutral helper state when no layer is selected

## Out of scope
- numeric ranges
- data source notes
- map logic changes
- layer control changes
- new data
- scoring changes

## UI behavior
- no active layer:
  - show neutral helper text
- active layer:
  - show layer title
  - show three color chips with labels
- selecting a layer:
  - legend appears smoothly
- clearing the layer:
  - legend closes smoothly
- switching layers:
  - legend updates without changing map behavior

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/LayerExplanation.tsx

## Constraints
- no new dependencies
- no data changes
- no map logic changes
- no layer control behavior changes
- keep implementation minimal
- use lightweight CSS/Tailwind transitions
- keep labels qualitative and non-medical

## Acceptance criteria
- active layer shows a color legend
- legend colors match the map palette
- legend appears smoothly
- neutral state remains when no layer is active
- no console errors