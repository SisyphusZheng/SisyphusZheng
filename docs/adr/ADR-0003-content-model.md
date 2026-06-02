# ADR-0003: Content Model

## Status

Accepted

## Decision

Writing lives in `content/blog`; project dossiers live in `content/projects`.

## Rationale

Blog posts capture decisions and failures. Projects provide implementation evidence. Keeping both as
content files makes the site easy to maintain and easy to review.

## Consequences

`scripts/generate-data.ts` must run before build so dynamic blog and project routes are discoverable.
