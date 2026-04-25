# Feature: WAQI District Synthesis

## Summary
Replace the placeholder district air-quality layer with real district-level qualitative values derived from WAQI station data.

## Goal
Make the air-quality map layer and district storytelling reflect real live data instead of static placeholder JSON.

## User value
Users can trust that the air-quality colors and district insights are based on actual live environmental conditions in Berlin.

## In scope
- fetch multiple Berlin WAQI stations
- derive district-level qualitative air-quality values
- replace placeholder air-quality.json usage for the air-quality layer
- keep existing UI structure unchanged
- keep qualitative labels only (Lower / Medium / Higher NO2)

## Out of scope
- perfect geospatial interpolation
- precise district boundary matching
- PM2.5 / PM10 synthesis
- historical averages
- new scoring systems
- new UI components

## Simplest synthesis model
- use a small set of reliable Berlin stations
- map each station to the nearest relevant district manually for MVP
- derive qualitative district values from AQI / NO2 values
- keep deterministic thresholds
- preserve existing “Higher / Medium / Lower NO2” UX

## Files allowed to modify
- app/api/air-quality/route.ts
- components/layout/CityLensShell.tsx
- public/data/air-quality.json

## Constraints
- keep token server-side only
- no new dependencies
- no unrelated refactors
- keep implementation minimal
- preserve existing map interactions
- preserve existing panel behavior

## Acceptance criteria
- air-quality layer no longer depends on placeholder-only values
- district coloring updates from real WAQI-derived values
- district storytelling reflects the new real values
- fallback behavior remains safe if live data is unavailable
- no console errors