# Feature: Layer UX Correction

## Summary
Align the map interaction model so layers control map coloring and selection only reveals detail.

## Goal
Make the map behavior intuitive by separating layer activation from district selection.

## User value
Users understand that:
- layers define what is visualized
- selecting a district reveals information without changing the map mode

## In scope
- remove the “Districts” layer option
- introduce a default state with no active layer
- ensure map remains neutral until a layer is selected
- ensure selection highlight works independently of active layer

## Out of scope
- visual redesign
- panel content changes
- new data
- animation

## Behavior
- on load: map shows neutral base styling
- selecting a layer: applies thematic coloring
- selecting a district: highlights district and updates panel
- switching layers: updates map coloring only

## Files to modify
- components/layout/CityLensShell.tsx
- components/map/MapView.tsx
- components/layout/LayerControls.tsx

## Constraints
- keep implementation minimal
- do not add dependencies
- do not refactor unrelated code
- preserve existing selection behavior
- preserve panel behavior

## Acceptance criteria
- no “Districts” button
- default map is neutral
- layer buttons control coloring
- selection works regardless of active layer
- no console errors