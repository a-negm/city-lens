# Feature: Area Selection

## Summary
Allow users to click on a Berlin district and visually highlight the selected area on the map.

## Goal
Introduce basic interaction by enabling users to select a district and see which area is currently active.

## User value
Users can interact with the map and focus on a specific area, forming the foundation for future insights and comparisons.

## In scope
- detect click on a district
- store selected district state
- visually highlight selected district
- ensure only one district is selected at a time

## Out of scope
- side panel updates
- displaying district data
- hover effects
- comparison between districts
- scoring logic
- AI features

## Inputs
- click event on a district feature

## Outputs
- selected district identifier (stored in component state)
- visual highlight of the selected district

## UI behavior
- clicking a district highlights it
- previously selected district is un-highlighted
- clicking the same district again keeps it selected (no toggle off)
- side panel remains unchanged

## Data requirements
- use the existing berlin-districts.geojson
- use a stable property (e.g. name or id) as the identifier

## Files allowed to modify
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no global state
- no refactoring unrelated code
- keep logic inside MapView
- keep implementation minimal and readable

## Technical notes
- use map.on("click", layerId, handler)
- use setFeatureState or a filter-based approach for highlighting
- ensure highlight styling is visually clear but minimal
- clean up event listeners on unmount

## Acceptance criteria
- user can click a district
- selected district is visually highlighted
- only one district is highlighted at a time
- no console errors
- map performance remains smooth
- only allowed files are changed

## Notes
This feature introduces interaction only. No data or panel updates should be implemented yet.