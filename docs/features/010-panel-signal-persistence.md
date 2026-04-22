# Feature: Panel Signal Persistence

## Summary
Update the side panel so known district signals remain visible when a district is selected, regardless of which map layer is currently active.

## Goal
Make the panel behave as a place-based summary instead of a layer-dependent summary, while still allowing the active layer to influence emphasis.

## User value
Users can click a district and consistently see what is known about that district without losing information when switching map layers.

## In scope
- always show district info when a district is selected
- always show context summary when district data exists
- always show air quality information when air-quality data exists
- optionally emphasize the section that matches the currently active layer
- keep the implementation minimal

## Out of scope
- new datasets
- legends
- scoring
- AI explanations
- comparisons
- major panel redesign

## Inputs
- selected district
- district info data
- air quality data
- active layer

## Outputs
- a persistent selected-district panel
- optional emphasis for the active layer’s related section

## UI behavior
- no district selected:
  - keep the current empty state
- district selected:
  - show district name
  - show context summary
  - show district metrics
  - show air quality information if available
- if the active layer is Air quality:
  - the air quality section may be visually emphasized
- switching layers should not hide known signals

## Data requirements
- use the existing local district-info.json
- use the existing local air-quality.json
- no new data sources

## Files allowed to modify
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no async logic
- no refactoring unrelated code
- keep the panel calm and readable
- keep implementation minimal

## Technical notes
- panel content should follow selected district data, not active layer visibility
- active layer may change wording emphasis or ordering, but should not remove known signal sections
- avoid adding too many visual treatments

## Acceptance criteria
- selecting a district shows all known district signals
- switching between layers does not hide those signals
- air quality remains visible when available
- active layer may subtly emphasize its related section
- no console errors
- only allowed files are changed

## Notes
This feature aligns the panel with the product’s core mental model: selection determines place, and layers determine lens.