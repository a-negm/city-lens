# Feature: UI Simplification

## Summary
Reduce visual noise by removing redundant containers and placeholder text while preserving structure.

## Goal
Make the interface feel lighter, calmer, and more focused on the map.

## User value
Users can focus on spatial information without unnecessary UI clutter.

## In scope
- remove redundant nested card wrappers
- simplify panel structure (fewer boxed sections)
- remove placeholder texts:
  - “No district selected…”
  - “Static shell only…”
- preserve content hierarchy using spacing and subtle separators

## Out of scope
- layout changes
- typography redesign
- interaction changes
- new data

## Files to modify
- components/layout/SidePanel.tsx
- components/layout/LayerControls.tsx
- components/layout/LayerExplanation.tsx

## Constraints
- preserve current content
- keep readability
- do not flatten hierarchy completely
- do not add dependencies

## Acceptance criteria
- fewer nested boxes
- cleaner visual hierarchy
- no placeholder copy visible
- panel remains readable
- no behavior changes