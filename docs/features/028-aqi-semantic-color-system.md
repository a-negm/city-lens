# Feature: AQI Semantic Color System

## Summary
Align the air-quality layer wording and colors with standard AQI mental models by replacing red-only intensity colors with semantic Good / Moderate / Poor states.

## Goal
Make air-quality interpretation immediate and intuitive by matching labels and map colors to the way people already understand air quality.

## User value
Users should instantly understand that green means better air quality and red means worse air quality without needing to interpret abstract “Lower / Medium / Higher AQI” language.

## In scope
- change air-quality legend labels from Lower / Medium / Higher AQI to Good / Moderate / Poor
- update air-quality panel wording to match
- replace the red-only air-quality palette with semantic green / amber / red colors
- keep AQI thresholds unchanged

## Out of scope
- changing green space colors
- changing density colors
- changing urban pressure logic
- changing WAQI thresholds
- new data sources

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/LayerExplanation.tsx
- components/layout/SidePanel.tsx

## Constraints
- keep implementation minimal
- no new dependencies
- no map interaction changes
- preserve current WAQI district synthesis logic
- only UI wording + palette changes

## Acceptance criteria
- air-quality legend shows Good / Moderate / Poor
- air-quality map colors use green / amber / red
- side panel wording uses Good / Moderate / Poor
- existing live AQI data flow remains unchanged
- no regression in map behavior