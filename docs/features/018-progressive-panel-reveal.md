# Feature: Progressive Panel Reveal

## Summary
Show the side panel only when a district is selected, and hide it when selection is cleared.

## Goal
Make the panel feel like a contextual detail view rather than a permanent empty container.

## User value
Users stay focused on the map by default and only see the panel when there is relevant district detail to show.

## In scope
- render the side panel only when a district is selected
- hide the side panel when selection is cleared
- preserve current panel content and behavior when visible
- preserve current map and layer behavior

## Out of scope
- animation
- panel redesign
- new data
- map logic changes
- keyboard/focus polish

## Inputs
- selected district state

## Outputs
- side panel is conditionally rendered based on selection

## UI behavior
- on initial load: no side panel is shown
- selecting a district: side panel appears
- deselecting a district: side panel disappears
- active layer remains unchanged

## Files allowed to modify
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- keep implementation minimal
- do not change SidePanel content
- do not change MapView logic

## Technical notes
- use selectedDistrict in CityLensShell as the single source of truth
- parent-level conditional rendering is preferred
- no animation in this feature

## Acceptance criteria
- no panel on initial load
- panel appears when a district is selected
- panel disappears when selection is cleared
- no console errors
- only allowed files are changed