# Feature: Boundaries Layer

## Summary
Render Berlin district boundaries on the map as a visible geographic layer.

## Goal
Display real Berlin areas on the map to give the product spatial meaning.

## User value
Users can see how the city is divided into areas, forming the basis for future interaction, comparison, and data interpretation.

## In scope
- load Berlin district GeoJSON
- add a map layer for boundaries
- render polygons on top of the base map
- apply simple styling (fill + outline)
- ensure boundaries align correctly with the map

## Out of scope
- click interaction
- hover interaction
- selection state
- side panel updates
- scoring logic
- legends
- multiple layers
- AI

## Inputs
- static GeoJSON file (Berlin districts)

## Outputs
- visible district polygons on the map

## UI behavior
- polygons are visible at default zoom
- user can still pan and zoom freely
- no interactivity yet
- side panel remains unchanged

## Data requirements
- use a static GeoJSON file stored locally
- place file in public/data/

## Files allowed to modify
- public/data/berlin-districts.geojson (new file)
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no abstraction layers
- keep implementation inside MapView
- no global state
- no side effects outside map logic
- no refactoring unrelated code

## Technical notes
- load GeoJSON as a source in MapLibre
- add a fill layer
- add a line layer for borders
- keep styling simple and neutral

## Acceptance criteria
- boundaries render correctly on the map
- polygons match Berlin geography
- no console errors
- map still performs smoothly
- only allowed files are changed

## Notes
This feature introduces spatial meaning only. Interaction and selection will be added in later features.