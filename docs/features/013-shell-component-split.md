# Feature: Shell Component Split

## Summary
Refactor the current CityLensShell into smaller layout components without changing product behavior.

## Goal
Improve maintainability and prepare for future UI redesign by splitting the shell into a few focused components while preserving the current experience exactly.

## User value
There is no direct user-facing behavior change. This refactor makes future UI improvements safer and easier.

## In scope
- extract the layer controls into a dedicated component
- extract the layer explanation (micro-legend) into a dedicated component
- extract the side panel into a dedicated component
- keep CityLensShell as the orchestration layer
- preserve current behavior and visual output

## Out of scope
- UI redesign
- layout changes
- data changes
- logic changes
- new features
- new datasets
- styling changes beyond what is necessary to preserve the current UI

## Inputs
- existing activeLayer state
- existing selectedDistrict state
- existing derived district, air quality, and green space data

## Outputs
- same UI and behavior, but split across smaller components

## Files allowed to modify or create
- components/layout/CityLensShell.tsx
- components/layout/LayerControls.tsx (new)
- components/layout/LayerExplanation.tsx (new)
- components/layout/SidePanel.tsx (new)

## Constraints
- no new dependencies
- no unrelated refactors
- no behavior changes
- keep implementation minimal and readable
- do not move business logic into MapView
- preserve the current product experience exactly

## Technical notes
- CityLensShell should remain the owner of state and data imports
- new child components should receive props only
- do not introduce global state or context
- do not extract tiny presentational helpers unless clearly necessary

## Acceptance criteria
- UI looks the same as before
- behavior is unchanged
- layer controls still work
- micro-legend still works
- side panel still works
- district selection still works
- no console errors
- only allowed files are changed

## Notes
This is a structural refactor only. It should make the next UI redesign easier without changing the product itself.