# Feature: Panel Information Hierarchy

## Summary
Reorganize the side panel content so the selected district detail reads more clearly and prioritizes health-relevant signals.

## Goal
Make the panel easier to scan by showing the most meaningful information first.

## User value
Users can quickly understand the selected district’s environmental context before reading supporting structural metrics.

## In scope
- keep the selected district name at the top
- move environmental signals higher in the panel:
  - air quality
  - green space
- place context summary after the environmental signals
- keep raw metrics as supporting information at the bottom
- preserve all existing content and behavior

## Out of scope
- new data
- new scoring
- animation
- map behavior changes
- visual redesign beyond hierarchy adjustments

## UI behavior
- when a district is selected, the panel should read in this order:
  1. district name
  2. environmental signals
  3. context summary
  4. supporting metrics
- active layer emphasis should still work
- panel reveal/dismiss behavior should remain unchanged

## Files allowed to modify
- components/layout/SidePanel.tsx

## Constraints
- no new dependencies
- no unrelated refactors
- do not change data logic
- do not change map logic
- preserve current content
- keep implementation minimal

## Acceptance criteria
- panel content order is improved
- district name remains prominent
- air quality and green space appear before structural context
- metrics remain visible at the bottom
- active-layer emphasis still works
- no console errors