# Feature: District Deselection

## Summary
Allow users to clear the selected district by clicking the selected district again or by clicking empty map space.

## Goal
Make the map interaction feel exploratory and reversible by giving users a clear way to leave the selected state.

## User value
Users can freely enter and exit district detail mode without getting stuck in a selected state.

## In scope
- clicking the currently selected district clears selection
- clicking empty map space clears selection
- clearing selection removes the district highlight
- clearing selection clears the side panel content state
- active layer remains unchanged when selection is cleared

## Out of scope
- panel animation
- panel layout redesign
- new data
- hover behavior
- keyboard interactions

## Inputs
- current selected district
- click on district fill layer
- click on empty map space

## Outputs
- selected district becomes null when deselected
- map highlight clears
- panel content state clears

## UI behavior
- click unselected district → select it
- click different district → switch selection
- click selected district again → deselect
- click empty map space → deselect
- active thematic layer stays active throughout

## Files allowed to modify
- components/map/MapView.tsx
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- keep implementation minimal
- preserve current layer behavior
- preserve current panel structure

## Technical notes
- MapView should own map click handling
- deselection should propagate upward through the existing callback flow
- empty-map click handling should not interfere with district click handling
- selected-district highlight should clear when selected district becomes null

## Acceptance criteria
- selected district can be cleared by clicking it again
- selected district can be cleared by clicking empty map space
- panel content clears when selection is cleared
- active layer remains active
- no console errors
- only allowed files are changed