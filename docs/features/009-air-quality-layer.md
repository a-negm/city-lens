# Feature: Air Quality Layer

## Summary
Add a real environmental layer showing relative air quality (NO₂ levels) across Berlin districts.

## Goal
Introduce the first health-relevant environmental signal into the map, moving from structural context to meaningful urban health context.

## User value
Users can see which districts have relatively higher or lower pollution exposure.

## In scope
- add a new "Air quality" layer to the layer controls
- use local JSON data for NO₂ values
- color districts based on relative NO₂ levels
- show a simple qualitative label in the side panel

## Out of scope
- APIs
- real-time data
- PM2.5 or multiple pollutants
- scientific interpretation
- health claims

## Inputs
- selected district ID
- local air quality data (NO₂)

## Outputs
- map coloring based on NO₂ levels
- qualitative label in side panel

## UI behavior
- selecting "Air quality" updates map coloring
- selection still works
- side panel shows air quality context when active

## Data requirements
- local JSON file keyed by district ID
- values represent relative NO₂ levels

## Files allowed to modify
- public/data/air-quality.json (new)
- components/layout/CityLensShell.tsx
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no async logic
- keep implementation minimal
- avoid strong health claims

## Technical notes
- reuse existing layer system
- use simple bucket thresholds
- integrate into existing color mapping logic

## Acceptance criteria
- air quality layer appears in controls
- map updates correctly
- panel shows air quality context
- no console errors