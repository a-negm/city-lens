# Feature: App Shell

## Summary
Create the base Next.js application shell for CityLens.

## Goal
Set up the project so it runs locally and provides a clean starting layout for future map and panel features.

## User value
This feature has no direct user value yet. It creates the technical foundation for the product.

## In scope
- initialize Next.js app with TypeScript
- basic app layout
- homepage with placeholder content
- global styles working
- folders aligned with architecture

## Out of scope
- map
- data loading
- scoring
- AI
- real UI components beyond a simple shell

## Inputs
- none

## Outputs
- running local app
- visible homepage shell

## UI behavior
The homepage should render a minimal placeholder for the future CityLens interface.

## Data requirements
- none

## Files allowed to modify
- app/layout.tsx
- app/page.tsx
- package.json
- tsconfig.json
- next.config.*
- app/globals.css

## Constraints
- no unnecessary dependencies
- TypeScript only
- keep implementation minimal
- no unrelated refactors

## Acceptance criteria
- app runs locally
- homepage renders
- layout is clean and minimal
- codebase stays lean