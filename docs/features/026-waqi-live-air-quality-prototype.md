# Feature: WAQI Live Air Quality Prototype

## Summary
Add a small server-side WAQI integration to confirm live air quality data can be fetched safely without exposing the API token.

## Goal
Validate real-time air quality data access before replacing the existing district-level placeholder air quality layer.

## User value
Users can see that CityLens is beginning to use live environmental data from a real source.

## In scope
- add `WAQI_API_TOKEN` to `.env.example`
- create a server-side API route for WAQI data
- fetch the Berlin WAQI feed server-side
- normalize a small response shape
- show a small live data status in the UI

## Out of scope
- district-level synthesis
- replacing current air-quality layer values
- station-to-district mapping
- interpolation
- new scoring logic
- map logic changes

## Files allowed to modify or create
- .env.example
- app/api/air-quality/route.ts
- components/layout/CityLensShell.tsx

## Constraints
- do not expose the WAQI token to client code
- no new dependencies
- keep implementation minimal
- handle missing token gracefully
- handle API errors gracefully
- do not change existing map layer behavior

## Acceptance criteria
- server route fetches WAQI data using `WAQI_API_TOKEN`
- token is not exposed to the browser
- UI shows a small live-data status if data is available
- UI shows a calm fallback if live data is unavailable
- existing map and panel behavior still works