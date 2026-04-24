# Feature: District Detail Card Simplification

## Summary
Simplify and restyle the selected district detail card so it prioritizes health-relevant qualitative signals.

## Goal
Make the side panel easier to scan by removing redundant labels, raw structural metrics, and nested sections.

## User value
Users can quickly understand the selected district’s key environmental and structural context without being distracted by raw numbers.

## In scope
- switch the district detail card to a dark slate visual style
- keep the card integrated with the dark map aesthetic
- show district name as the main title
- show three simplified signal rows:
  - Air quality — qualitative reading
  - Green space — qualitative reading
  - Population density — qualitative reading
- remove repeated labels such as “Air quality: Higher NO2”
- remove the “Context summary” heading
- remove raw population, area, and density metrics from the default view

## Optional
- keep raw metrics only in a collapsed “Details” section if the implementation can stay minimal

## Out of scope
- map logic changes
- layer control changes
- data changes
- new signals
- scoring
- animations

## Files allowed to modify
- components/layout/SidePanel.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- do not change data logic
- do not change map logic
- do not change layer controls
- keep implementation minimal
- preserve panel reveal behavior

## Acceptance criteria
- detail card uses a dark slate style
- district name is prominent
- card shows only qualitative signal rows by default
- no raw metrics appear in the default view
- no repeated category names inside values
- no console errors