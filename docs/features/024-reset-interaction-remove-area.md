# Feature: Reset Interaction and Remove Area Layer

## Summary
Remove the Area layer and make empty-map clicks reset the map to its neutral state.

## Goal
Simplify the layer model and make map interaction feel more intuitive.

## User value
Users can return to a clean neutral map state by clicking empty map space, and the layer set focuses only on meaningful urban health signals.

## In scope
- remove the Area layer from layer controls
- remove Area from layer explanations
- remove Area from layer color mappings
- remove Area from layer-driven storytelling
- clicking empty map space clears:
  - selected district
  - active layer
- keep district selection and deselection behavior working

## Out of scope
- new data
- visual redesign
- panel content redesign
- animation changes
- scoring changes

## UI behavior
- initial state: no active layer, no selected district
- clicking a layer activates that layer
- clicking a district selects it
- clicking the selected district again clears only the selection
- clicking empty map space clears selection and active layer
- Area is no longer shown as a layer option

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/layout/LayerControls.tsx
- components/layout/SidePanel.tsx
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- keep implementation minimal
- preserve existing district selection behavior
- preserve current panel reveal behavior
- do not change data files

## Acceptance criteria
- Area button is removed
- no Area explanation remains
- no Area storytelling remains
- empty-map click resets selection and active layer
- clicking selected district still only deselects district
- no console errors