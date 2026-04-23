# Feature: Smooth Panel Reveal

## Summary
Add a subtle entrance and exit transition to the side panel when a district is selected or deselected.

## Goal
Improve perceived quality and make the panel feel like an intentional contextual detail view rather than a UI element that abruptly appears and disappears.

## User value
Users experience smoother, more polished interactions when entering and leaving district detail mode.

## In scope
- animate the side panel when it appears
- animate the side panel when it disappears
- keep the existing panel content unchanged
- keep the existing selection and deselection behavior unchanged

## Out of scope
- panel redesign
- map logic changes
- new data
- keyboard/focus polish
- animation libraries

## Inputs
- selected district state

## Outputs
- smoother panel reveal and hide behavior

## UI behavior
- on district selection: panel enters smoothly
- on deselection: panel exits smoothly
- active layer remains unchanged
- panel content remains unchanged

## Files allowed to modify
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- keep implementation minimal
- do not change SidePanel content
- do not change MapView logic
- use only lightweight CSS/Tailwind transitions

## Technical notes
- selectedDistrict should remain the source of truth
- keep the panel mounted long enough for exit animation if needed
- prefer a small fade/slide transition over dramatic motion

## Acceptance criteria
- panel no longer pops in abruptly
- panel no longer disappears abruptly
- panel content remains unchanged
- no console errors
- only allowed files are changed