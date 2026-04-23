# Feature: Map Foundation

## Summary
Introduce a real interactive map into the main content area of the app, replacing the placeholder map section from the app shell.

## Goal
Render a working 2D map centered on Berlin inside the existing layout, without adding any data layers or business logic yet.

## User value
This establishes the core interaction surface of the product. Users can see and move around a real map, forming the basis for all future spatial features.

## In scope
- integrate MapLibre GL JS
- render a map inside the main map area
- center the map on Berlin
- set a reasonable default zoom level
- allow basic interaction (pan, zoom)
- ensure the map fills the intended layout area

## Out of scope
- data layers (no polygons, no choropleths)
- area selection
- hover states
- scoring logic
- side panel integration
- search
- AI features
- custom map styling beyond a basic style URL

## Inputs
- none (no dynamic data yet)

## Outputs
- visible interactive map in the main content area

## UI behavior
- the map replaces the placeholder "future map area"
- user can pan and zoom freely
- no tooltips, no overlays, no selection
- side panel remains static and unchanged

## Data requirements
- use a public MapLibre-compatible style (no API key required)
- do not introduce any external data sources yet

## Files allowed to modify
- components/map/MapView.tsx (new file)
- app/page.tsx

## Constraints
- no new dependencies except MapLibre GL JS
- do not introduce wrappers or abstractions beyond a simple map component
- keep the map implementation minimal
- no global state
- no side effects outside the map component
- use a client component only where required
- do not refactor unrelated files

## Technical notes
- MapLibre requires a client component ("use client")
- initialize the map inside a useEffect
- clean up the map instance on unmount
- use a simple container div with a ref
- keep the implementation readable and compact

## Acceptance criteria
- map renders correctly inside the layout
- map is centered on Berlin
- user can pan and zoom
- no console errors
- only the allowed files are changed
- no unnecessary dependencies added

## Notes
This feature is strictly about introducing the map surface. All data, overlays, and interactions will be added in later featu