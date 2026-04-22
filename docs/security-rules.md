# Security Rules

## Core policy
Security and simplicity take priority over convenience.

## Secrets
- Never expose secrets in client-side code.
- Never place API keys in public environment variables unless they are explicitly intended to be public.
- AI requests must run server-side if added.

## Input handling
- Validate all external inputs.
- Validate query params and request bodies.
- Use schema validation for structured external data.

## Rendering safety
- Do not use dangerouslySetInnerHTML unless explicitly approved and sanitized.
- Do not render untrusted HTML.
- Do not evaluate dynamic code.

## Network and API behavior
- Keep external calls minimal.
- Prefer static or preprocessed data for MVP.
- If external APIs are added, isolate them clearly and validate responses.

## Access boundaries
- Use least privilege for environment variables and server routes.
- Do not create unnecessary write-capable endpoints.
- Avoid building authentication until truly needed.

## Logging
- Avoid logging secrets or sensitive payloads.
- Keep logs simple and safe.

## Dependency caution
- Do not add packages that introduce security risk without approval.
- Favor mature, widely-used libraries only when necessary.

## AI safety
- AI should not provide diagnosis or unsupported health claims.
- AI should not invent certainty where none exists.
- AI must work from provided structured inputs.

## Safe defaults
- If unsure, choose the more restrictive and simpler implementation.