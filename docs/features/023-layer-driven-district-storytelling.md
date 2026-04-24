# Feature: Layer-Driven District Storytelling

## Summary
Add a short contextual insight block to the district detail card based on the active map layer and the selected district’s qualitative signal.

## Goal
Help users understand why the currently selected layer matters for the selected district.

## User value
Users get a short interpretation of the active signal instead of only seeing labels and map colors.

## In scope
- show an insight block when a district is selected and a layer is active
- tailor the insight copy to:
  - active layer
  - selected district’s qualitative value
- support:
  - density
  - area
  - air quality
  - green space
- animate the insight block so it expands smoothly when a layer is selected after a district is already open

## Out of scope
- AI-generated text
- APIs
- new data
- map logic changes
- scoring changes
- panel redesign

## UI behavior
- no layer selected + district selected:
  - no insight block
- layer selected + district selected:
  - show an insight block
- district selected first, then layer selected:
  - insight block appears smoothly like a drawer opening
- layer selected first, then district selected:
  - panel opens with the insight already included
- switching layers updates the insight text

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/SidePanel.tsx

## Constraints
- no new dependencies
- no map logic changes
- no layer control changes
- avoid predictive, medical, causal, or diagnostic language
- keep copy short and grounded
- keep implementation minimal

## Technical notes
- use rule-based template text
- derive insight from existing activeLayer and qualitative signal labels
- keep insight copy deterministic
- use lightweight CSS/Tailwind transition for the reveal

## Acceptance criteria
- insight appears only when a layer is active
- insight copy matches the active layer
- insight copy changes when layer changes
- insight appears smoothly when added to an already-open panel
- no console errors