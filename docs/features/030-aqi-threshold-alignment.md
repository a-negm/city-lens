# Feature: AQI Threshold Alignment

## Summary
Align CityLens air-quality categories with common AQI bands so map colors and labels better match public AQI expectations.

## Goal
Reduce confusion between CityLens AQI labels and external AQI references such as AQICN.

## User value
Users can more easily trust and understand the air-quality layer because Good, Moderate, and Poor follow familiar AQI ranges.

## In scope
- update AQI thresholds from Berlin-calibrated bands to common AQI bands:
  - 0–50: Good
  - 51–100: Moderate
  - 101+: Poor
- keep existing Good / Moderate / Poor wording
- keep existing green / orange / red palette
- preserve station-proxy WAQI synthesis
- preserve live AQI status

## Out of scope
- AQICN widget embedding
- new AQI provider
- new station mapping
- district synthesis redesign
- visual redesign

## Files allowed to modify
- app/api/air-quality/route.ts

## Constraints
- no new dependencies
- no map interaction changes
- no UI layout changes
- keep implementation minimal
- keep token server-side only

## Acceptance criteria
- AQI <= 50 maps to Good
- AQI 51–100 maps to Moderate
- AQI > 100 maps to Poor
- existing air-quality map still works
- no console errors