# Feature: Green Space Geometry Layer

## Summary
Replace the green-space district fill visualization with real green-space geometry shown as map polygons.

## Goal
Make green space more intuitive by showing actual parks and public green areas on the map instead of coloring entire districts.

## User value
Users can visually understand where green spaces are located and how they cluster around the city.

## In scope
- add a local GeoJSON file for Berlin green spaces
- render green-space polygons only when the Green space layer is active
- stop using green-space district fill colors for the map
- keep district selection working
- keep side panel green-space summary unchanged for now

## Out of scope
- live WFS fetching in the browser
- district-level green-space aggregation
- replacing green-space.json
- source notes
- new scoring logic
- UI redesign

## Files allowed to modify or create
- public/data/berlin-green-spaces.geojson
- components/map/MapView.tsx
- components/layout/CityLensShell.tsx

## Data approach
Use Berlin’s public green-space WFS data as the source, but store a simplified local GeoJSON copy in public/data for the MVP.

## UI behavior
- no active layer:
  - green-space polygons are hidden
- Green space layer active:
  - show green-space polygons
  - keep district boundaries visible
  - keep selected district highlight working
- other layers active:
  - hide green-space polygons
  - use the existing district-fill styling

## Constraints
- no new dependencies
- do not fetch WFS directly from the client
- keep implementation minimal
- preserve existing map interactions
- preserve current side panel behavior

## Acceptance criteria
- Green space layer shows actual green-space polygons
- Green space no longer colors whole districts
- selecting districts still works
- other layers still work
- no console errors