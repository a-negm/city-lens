# Implementation Plan

## Goal
Build a lean MVP of the Berlin Urban Health Map with a 2D map, a small number of reliable data layers, and a structured designer-led workflow.

## Build strategy
- build one feature at a time
- use one branch per feature
- create a feature spec before implementation
- ask Codex for a plan before code
- review diffs before merge

## Phase 0: repository setup
Purpose:
Create a clean foundation so Codex can work efficiently.

Tasks:
- initialize repo
- create folder structure
- add docs
- add README
- decide naming conventions
- commit baseline

Deliverable:
A clean empty repo with project instructions in place.

## Phase 1: app foundation
Purpose:
Create the minimum app structure and visual shell.

Features:
1. app shell
2. base layout
3. global styles
4. placeholder homepage structure

Deliverable:
App runs locally and shows a clean frame for future map content.

## Phase 2: map foundation
Purpose:
Get a working Berlin map on screen.

Features:
5. map container
6. Berlin initial center and zoom
7. base map rendering
8. selected area placeholder state

Deliverable:
A 2D map view with a controlled app layout.

## Phase 3: first spatial layer
Purpose:
Render a real geographic layer.

Features:
9. load Berlin area boundaries
10. render clickable polygons
11. hover and selection behavior

Deliverable:
Users can click an area and see that the app reacts.

## Phase 4: detail panel
Purpose:
Turn selection into meaningful product feedback.

Features:
12. district/area side panel
13. empty state and selected state
14. display core static metrics

Deliverable:
Selected areas show a readable details panel.

## Phase 5: layer controls
Purpose:
Let the user inspect one dimension at a time.

Features:
15. layer toggle
16. legend
17. active layer styling

Deliverable:
User can switch between one active layer at a time.

## Phase 6: scoring logic
Purpose:
Add deterministic interpretation.

Features:
18. score utility
19. factor contribution utility
20. Berlin average comparison

Deliverable:
Panel shows structured insight beyond raw values.

## Phase 7: compare mode
Purpose:
Support meaningful comparison.

Features:
21. compare state
22. compare panel
23. simple side-by-side metrics

Deliverable:
User can compare two areas clearly.

## Phase 8: input and search
Purpose:
Make the tool feel more personal.

Features:
24. postal code input
25. area lookup behavior
26. map focus on matched area

Deliverable:
User can enter a postal code and inspect a relevant area.

## Phase 9: AI explanation layer
Purpose:
Use AI carefully and only where it adds value.

Features:
27. structured insight schema
28. server-side AI route
29. optional explanation card

Deliverable:
AI adds explanation, not logic.

## Phase 10: refinement
Purpose:
Improve quality without bloating scope.

Features:
30. better empty states
31. loading states
32. error states
33. design polish
34. cleanup and dead-code removal

Deliverable:
A cleaner and more portfolio-ready MVP.

## Rules for every feature
- write a feature spec first
- create a separate branch
- ask Codex for a plan first
- confirm touched files
- then implement
- review diff before merge

## Merge criteria
Do not merge a feature unless:
- it matches the feature spec
- it does not introduce unrelated changes
- it does not add unnecessary dependencies
- it keeps the app understandable
- it preserves the architecture rules