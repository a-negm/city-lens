# Feature: Selected Area Panel

## Summary
Show the currently selected Berlin district in the side panel using properties from the selected map feature.

## Goal
Connect map selection to the side panel so the interface reflects the user’s current focus.

## User value
Users can immediately see which district they selected, making the map interaction feel meaningful and grounded.

## In scope
- pass selected district data from the map view to the page shell
- show the selected district name in the side panel
- show a simple empty state when no district is selected
- keep the displayed content minimal and static

## Out of scope
- scoring logic
- comparison mode
- AI explanations
- multiple metrics
- hover behavior
- search
- advanced panel design changes

## Inputs
- selected district feature from the map

## Outputs
- selected district name shown in the side panel
- empty state when nothing is selected

## UI behavior
- when no district is selected, the side panel shows its default empty/placeholder state
- when a district is selected, the side panel updates to show the district name
- changing selection updates the panel accordingly
- panel remains simple and calm

## Data requirements
- use the existing district feature properties from the GeoJSON
- use `Gemeinde_name` for display
- use `Schluessel_gesamt` only as internal identifier if needed

## Files allowed to modify
- components/map/MapView.tsx
- app/page.tsx

## Constraints
- no new dependencies
- no global state
- no unrelated refactors
- keep the implementation minimal and readable
- do not introduce scoring or derived metrics yet

## Technical notes
- lift selected district data to the nearest practical level
- pass a callback into MapView so page state can reflect the current selection
- keep the selected payload minimal

## Acceptance criteria
- selecting a district updates the side panel with the correct district name
- no selection shows the default empty state
- changing selection updates the panel correctly
- no console errors
- only allowed files are changed

## Notes
This feature is about connecting the map and panel only. It should not introduce interpretation, scoring, or analysis yet.