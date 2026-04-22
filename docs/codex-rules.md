# Codex Rules

## Purpose
These rules keep the codebase lean, understandable, and safe for a designer-led workflow.

## General behavior
- Prefer the simplest working solution.
- Keep changes minimal and focused.
- Do not refactor unrelated files.
- Do not restructure folders unless explicitly asked.
- Do not rename files unless necessary.
- Explain the plan briefly when requested before writing code.

## Scope control
- Only work on the requested feature.
- Only modify the listed files unless there is a strong reason.
- If a requested feature seems too broad, propose a smaller implementation first.

## Dependency rules
- Do not add dependencies unless explicitly approved.
- If a dependency seems useful, explain why and suggest an alternative without it.
- Prefer built-in platform features and plain TypeScript utilities.

## Code style
- Use TypeScript.
- Prefer clear, readable code over clever abstractions.
- Keep files small and focused.
- Use descriptive names.
- Avoid generic utility dumping grounds.
- Do not create abstractions unless there are at least 3 real use cases.

## React / Next rules
- Prefer server components by default.
- Add "use client" only when necessary.
- Keep client-side state simple.
- Avoid unnecessary hooks.
- Avoid premature optimization.

## Architecture rules
- UI components should not contain business logic.
- Deterministic scoring and comparisons belong in lib/scoring.
- AI-related logic belongs in lib/ai.
- Shared types belong in types/.
- Static app data belongs in public/data or is imported from prepared files.

## AI rules
- AI must not determine core score logic.
- AI may explain, summarize, or compare structured results.
- AI outputs must be schema-based when used in UI.
- Never rely on AI for source-of-truth calculations.

## Output expectations
When asked to implement:
- keep diffs minimal
- do not change unrelated formatting
- do not add placeholder complexity
- do not add code "for future use" unless requested

## When uncertain
- state uncertainty clearly
- ask for the smallest needed clarification only if absolutely necessary
- otherwise propose the safest minimal implementation