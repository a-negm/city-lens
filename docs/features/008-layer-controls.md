# Feature: Layer Controls

## Summary
Add a simple layer control so users can switch the map’s current visual emphasis between a small set of local district-based views.

## Goal
Introduce one clear control that changes how districts are visually encoded on the map, preparing the product for future environmental and health layers.

## User value
Users can explore the city through different lenses instead of seeing only one static district fill.

## In scope
- add a small layer control UI
- allow switching between 3 map views:
  - districts
  - population density
  - area size
- update district fill styling based on the selected layer
- keep the existing district selection behavior working

## Out of scope
- external APIs
- environmental data
- health data
- AI explanations
- legends
- multiple simultaneous layers
- hover behavior
- comparisons

## Inputs
- current selected layer
- existing local district data:
  - density
  - area_km2

## Outputs
- updated map fill styling based on the selected layer

## UI behavior
- a simple control appears above or near the map
- one layer is active at a time
- switching layers updates district fill styling
- district selection still works
- side panel behavior remains unchanged

## Data requirements
- use only the existing local district data and district GeoJSON
- do not introduce new data sources

## Files allowed to modify
- components/layout/CityLensShell.tsx
- components/map/MapView.tsx

## Constraints
- no new dependencies
- no async logic
- no global state
- keep implementation minimal and readable
- preserve current selection behavior

## Technical notes
- keep selected layer state in CityLensShell
- pass the active layer to MapView as a prop
- derive fill styling from the active layer using existing district IDs and local data
- keep the control simple, such as a small segmented row or button group

## Acceptance criteria
- user can switch between the available layers
- map fill changes when the selected layer changes
- district selection still works
- side panel still works
- no console errors
- only allowed files are changed

## Notes
This feature introduces the pattern for multiple map views without adding new datasets yet.