# Feature: Composite Health Signal

## Summary
Add a simple derived district-level health-context signal based on existing local air quality, green space, and density readings.

## Goal
Help users quickly understand the overall urban health context of a selected district without making predictions or medical claims.

## User value
Users can see a concise summary of whether a district has lower, mixed, or higher environmental pressure based on the currently available signals.

## In scope
- derive a qualitative composite signal from:
  - air quality
  - green space
  - population density
- show the composite signal prominently in the selected district card
- keep the individual signal rows visible
- keep the method simple, deterministic, and local

## Out of scope
- medical claims
- health predictions
- AI explanations
- new datasets
- scoring models
- APIs
- map logic changes

## UI behavior
- when a district is selected, show a top-level signal such as:
  - Lower pressure
  - Mixed context
  - Higher exposure
- individual rows still show:
  - Air quality
  - Green space
  - Population density

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/SidePanel.tsx

## Constraints
- no new dependencies
- no new data
- no map logic changes
- no layer control changes
- avoid predictive or medical language
- keep implementation minimal

## Technical notes
- use the existing qualitative labels already derived for air quality, green space, and density
- derive the composite signal with simple local rules
- prefer language like “pressure,” “exposure,” and “context”
- avoid language like “healthy,” “unhealthy,” “safe,” or “dangerous”

## Acceptance criteria
- selected district card shows a composite health-context signal
- individual signal rows remain visible
- no raw metrics are reintroduced
- no console errors