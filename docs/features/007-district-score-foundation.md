# Feature: District Score Foundation

## Summary
Introduce a simple, deterministic district context score in the side panel using the existing local district data.

## Goal
Create the first scoring layer in the product so the interface begins to move from raw information toward lightweight interpretation.

## User value
Users can see a simple summarized indicator in addition to raw district metrics, making the product feel more structured and easier to scan.

## In scope
- define a basic local score calculation
- compute the score from existing local district data
- display the score in the side panel
- add a short explanatory label for what the score means

## Out of scope
- AI explanations
- external APIs
- environmental data
- health data
- scientific or policy-grade scoring
- comparisons between districts
- advanced visualization

## Inputs
- selected district ID
- existing local district data:
  - population
  - area_km2
  - density

## Outputs
- a simple numeric score shown in the side panel
- a short descriptive label

## UI behavior
- when no district is selected:
  - keep the existing empty state
- when a district is selected and data exists:
  - show the score above or near the district metrics
  - show a short explanation that this is an early context score based on currently available local data
- if data is missing:
  - keep the fallback message

## Data requirements
- use only the existing local JSON data
- do not introduce new data sources

## Files allowed to modify
- components/layout/CityLensShell.tsx

## Constraints
- no new dependencies
- no async logic
- no global state
- no utility files yet unless absolutely necessary
- keep the logic minimal and readable
- scoring must be deterministic and transparent

## Technical notes
- calculate the score directly inside CityLensShell for now
- keep the formula simple and easy to explain
- include a short UI note that this score is preliminary and based only on currently loaded district context data

## Acceptance criteria
- selecting a district shows a score
- score updates when selection changes
- no district selected keeps the current empty state
- no console errors
- only allowed files are changed

## Notes
This feature creates a product scoring scaffold only. It is not intended to represent a validated health score yet.