# Feature: Green Space Layer

## Summary
Add a real environmental layer showing relative green space availability across Berlin districts.

## Goal
Introduce a second health-relevant environmental signal into the map, complementing air quality with a more protective urban factor.

## User value
Users can see which districts have relatively higher or lower green space availability.

## In scope
- add a new "Green space" layer to the layer controls
- use local JSON data for district-level green space values
- color districts based on relative green space levels
- show a simple qualitative label in the side panel
- keep green space visible in the panel whenever selected district data exists

## Out of scope
- APIs
- real-time data
- park-level mapping
- walkability analysis
- scientific interpretation
- health claims
- legends beyond the existing micro-legend pattern

## Inputs
- selected district ID
- local green space data

## Outputs
- map coloring based on green space levels
- qualitative green space label in the side panel

## UI behavior
- selecting "Green space" updates map coloring
- district selection still works
- side panel shows green space context when data exists
- active layer may subtly emphasize the green space section

## Data requirements
- local JSON file keyed by district ID
- values represent relative green space availability or access

## Files allowed to modify
- public/data/green-space.json (new)
- components/layout/CityLensShell.tsx
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no async logic
- keep implementation minimal
- avoid strong health claims
- preserve current district selection behavior
- preserve current side panel behavior

## Technical notes
- reuse the existing layer system
- use simple bucket thresholds
- integrate into the existing color mapping logic
- keep data interpretation in CityLensShell, not MapView

## Acceptance criteria
- green space layer appears in controls
- map updates correctly
- panel shows green space context
- no console errors
- only allowed files are changed