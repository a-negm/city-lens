# Feature: Full-Bleed Map Layout

## Summary
Refactor the current page layout so the map becomes the full-screen background canvas and the UI appears as anchored overlay cards on top of it.

## Goal
Make CityLens feel truly map-first by elevating the map to the primary visual surface while preserving all current product behavior.

## User value
Users experience the product as a spatial interface rather than a page with a map embedded inside it.

## In scope
- make the map fill the viewport
- move the title/subtitle into a floating overlay card in the top-left
- keep the layer controls and micro-legend in a floating overlay card beneath the title
- move the side panel into a floating overlay card on the right
- preserve current map, selection, panel, and layer behavior
- keep current content and logic unchanged

## Out of scope
- visual redesign of panel content
- new data
- layer logic changes
- panel logic changes
- animation
- responsive redesign beyond what is necessary to preserve usability
- dark/light theme redesign
- additional map controls

## Inputs
- existing layout components
- existing map and panel state

## Outputs
- full-bleed map layout with anchored overlay cards

## UI behavior
- the map fills the full viewport behind the UI
- title/subtitle remain visible in a top-left overlay card
- layer controls and micro-legend remain visible in a second top-left overlay card
- side panel remains visible in a right-side overlay card
- map remains interactive behind and between overlay cards
- current product behavior is unchanged

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/LayerControls.tsx
- components/layout/LayerExplanation.tsx
- components/layout/SidePanel.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- no product behavior changes
- keep implementation minimal and readable
- preserve current content and hierarchy
- keep overlays as contained surfaces, not raw text directly on the map

## Technical notes
- use the map as the base layer of the viewport
- use absolute positioning for overlay cards
- keep overlay zones anchored and consistent
- preserve current component responsibilities
- use subtle surface styling such as translucent backgrounds and soft borders only if needed to maintain readability

## Acceptance criteria
- map fills the viewport
- overlay cards are positioned correctly
- map remains interactive
- side panel still works
- controls still work
- micro-legend still works
- district selection still works
- no console errors
- only allowed files are changed

## Notes
This feature is a layout refactor only. It should make the app feel map-first without changing the product logic.