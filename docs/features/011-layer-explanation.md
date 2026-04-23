# Feature: Layer Explanation

## Summary
Add a small explanatory text block near the layer controls so users can quickly understand what the active map layer represents.

## Goal
Make the current map lens easier to understand without adding a full legend or extra UI complexity.

## User value
Users can immediately understand what the current layer means and how to interpret the map coloring.

## In scope
- add a small text explanation for the active layer
- update the explanation when the active layer changes
- support the current layers:
  - districts
  - density
  - area
  - air quality

## Out of scope
- visual legend scales
- color ramps
- interactive help
- tooltips
- new datasets
- panel redesign

## Inputs
- active layer

## Outputs
- a short explanatory text block tied to the active layer

## UI behavior
- a small explanation appears near the layer controls
- only the currently active layer explanation is shown
- the explanation updates instantly when the active layer changes
- the explanation remains short and readable

## Content requirements

### Districts
Explain that this view shows district boundaries and supports place-based exploration.

### Density
Explain that higher values indicate more people living per square kilometer.

### Area
Explain that larger districts cover more physical area.

### Air quality
Explain that this view shows relative NO₂ levels and that higher values indicate higher exposure to traffic-related air