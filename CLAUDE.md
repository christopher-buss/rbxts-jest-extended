# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

roblox-ts port of
[jest-extended](https://github.com/jest-community/jest-extended). TypeScript
compiled to Luau via `rbxtsc`. Reference implementation at
`reference/jest-extended/`.

## Commands

| Task             | Command          |
| ---------------- | ---------------- |
| Build (lib)      | `pnpm build`     |
| Build (dev/test) | `pnpm dev:build` |
| Watch            | `pnpm watch`     |
| Lint             | `pnpm lint`      |
| Typecheck        | `pnpm typecheck` |
| Test             | `pnpm test`      |
| Rojo serve       | `pnpm serve`     |

Tests require Roblox Open Cloud env vars (`ROBLOX_OPEN_CLOUD_API_KEY`,
`ROBLOX_UNIVERSE_ID`, `ROBLOX_PLACE_ID`) and run via Studio backend with
`@isentinel/jest-roblox`.

## Architecture

- `src/matchers/` — matcher implementations (each matcher = separate file)
- `src/index.ts` — re-exports all matchers
- `test/` — Luau test config and setup files for jest-roblox
- `include/` — roblox-ts runtime (Promise.lua, RuntimeLib.lua)
- `reference/jest-extended/` — upstream jest-extended submodule for reference

**Build pipeline:** TypeScript → `rbxtsc` → Luau (`dist/` for lib, `out/` for
dev) → Rojo syncs to Roblox

**Two Rojo projects:**

- `default.project.json` — library build (serves `dist/`)
- `test.project.json` — test build (serves `out/` into ReplicatedStorage)

## Testing

Tests use `@rbxts/jest-globals` (`describe`, `expect`, `it`). Test files are
`*.spec.ts` in `src/`. The test runner auto-rebuilds if source is newer than
build output.

## Tooling

- **pnpm** — package manager
- **ESLint** — linting + formatting (no Prettier), auto-fixes on save and
  pre-commit
- **simple-git-hooks + lint-staged** — pre-commit runs eslint fix + typecheck
- **mise** — manages Node.js and Rojo versions
