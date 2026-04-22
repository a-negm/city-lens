# Feature: District Info (Minimal)

## Summary
Display basic, static information about the selected Berlin district in the side panel using a local data file.

## Goal
Enhance the side panel with real, structured data tied to the selected district, without introducing complexity such as APIs or scoring.

## User value
Users can see meaningful information about a selected district, making the product feel more real and informative.

## In scope
- create a local district data file
- map selected district ID to local data
- display basic district information in the side panel:
  - name
  - population
  - area (km²)
  - density (people/km²)

## Out of scope
- API calls
- database
- scoring logic
- comparisons
- AI explanations
- advanced UI design changes

## Inputs
- selected district ID (`Schluessel_gesamt`)

## Outputs
- district data displayed in the side panel

## UI behavior
- when no district is selected:
  - show existing empty state
- when a district is selected:
  - show district name
  - show basic metrics in a simple layout
- changing selection updates panel instantly

## Data requirements
- use a local JSON file in `public/data/`
- key data by `Schluessel_gesamt`
- keep structure flat and simple

## Files allowed to modify
- public/data/district-info.json (new file)
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no async fetching required (static import or simple fetch)
- no global state
- no refactoring unrelated code
- keep implementation minimal and readable

## Technical notes
- map selected district ID → local data object
- handle missing data gracefully (fallback or empty state)
- keep rendering simple (no complex components)

## Acceptance criteria
- selecting a district shows its data in the panel
- no selection shows empty state
- switching districts updates data correctly
- no console errors
- only allowed files are changed

## Notes
This feature introduces real data but keeps everything local and deterministic. It prepares the foundation for future scoring and insights.