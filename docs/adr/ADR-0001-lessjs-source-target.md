# ADR-0001: LessJS Source Target

## Status

Accepted

## Decision

This site builds against the local framework source at `C:\Users\Administrator\WorkBuddy\Claw\src-tmp`
instead of treating LessJS as an opaque published dependency.

## Rationale

The goal is to validate the current framework shape through a real consumer: routes, DSD rendering,
generated blog data, islands, and SSG output.

## Consequences

Import maps in `deno.json` point to `../src-tmp/packages/*/src`. Framework upgrades must be validated
with a real build and screenshots.
