# Feature: District Context Summary

## Summary
Introduce a simple, qualitative context summary for each selected district based on existing local data, instead of a numeric score.

## Goal
Move from raw data toward lightweight interpretation while avoiding misleading or arbitrary scoring.

## User value
Users can quickly understand the general characteristics of a district (e.g. density, size, population scale) without needing to interpret raw numbers.

## In scope
- derive simple qualitative labels from existing district data
- display those labels in the side panel
- keep interpretation minimal and transparent

## Out of scope
- numeric scoring
- AI explanations
- external APIs
- environmental or health data
- comparisons between districts
- advanced visualization

## Inputs
- selected district ID
- existing local district data:
  - population
  - area_km2
  - density

## Outputs
- a small set of qualitative labels displayed in the side panel

## UI behavior
- when no district is selected:
  - keep the existing empty state
- when a district is selected and data exists:
  - show 2–3 context labels above or near the metrics
  - keep the existing numeric metrics visible
- if data is missing:
  - keep the fallback message

## Data interpretation rules

Use simple, transparent thresholds based on the dataset:

### Density
- Low
- Medium
- High

### Population size
- Smaller district
- Mid-sized district
- Large district

### Area size
- Compact
- Medium
- Expansive

Thresholds should be derived from the local dataset (e.g. min/max or simple splits), but kept simple and readable.

## Files allowed to modify
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no async logic
- no global state
- no utility files yet unless absolutely necessary
- keep logic minimal and readable
- keep interpretation clearly non-authoritative

## Technical notes
- derive labels directly inside CityLensShell
- avoid complex normalization logic
- use simple conditional thresholds
- keep calculations easy to understand

## Acceptance criteria
- selecting a district shows context labels
- labels update when selection changes
- no selection keeps the empty state
- no console errors
- only allowed files are changed

## Notes
This feature introduces interpretation without implying a “score.” It prepares the product for future, more meaningful scoring based on environmental and health data.