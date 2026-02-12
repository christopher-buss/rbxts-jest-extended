# Porting Rules

Rules for porting each jest-extended matcher to roblox-ts.

## File conventions

- Kebab-case filenames: `to-be-true.ts`, `to-be-true.spec.ts`
- Impl + spec co-located in `src/matchers/`
- Add export to `src/matchers/index.ts`
- Add signature to `CustomMatchers<R>` in `src/matchers/types.d.ts`

## Implementation

- `import type { jest } from "@rbxts/jest-globals"` for MatcherContext
- `this: jest.MatcherContext` first param, return `jest.CustomMatcherResult`
- `.not.` → `.never.` in all `matcherHint` strings
- `Number.isFinite(x)` →
  `typeIs(x, "number") && x === x && x !== math.huge && x !== -math.huge`
- `Number.isInteger(x)` → `typeIs(x, "number") && x === x && x % 1 === 0`
- `Object.isFrozen(x)` → `table.isfrozen(x as object)`
- No `hasOwnProperty` → `key in obj` (Luau table keys are all "own")
- No `RegExp` → use `string.match` with Luau patterns
- `isJestMockOrSpy` → `jest.isMockFunction()` from `src/utils`
- `Date` → `DateTime`, comparisons via `UnixTimestampMillis`

## Tests

- `import { describe, expect, it } from "@rbxts/jest-globals"`
- `import * as matcher from "./matcher-name"`
- `expect.extend(matcher)` at top
- `expect.assertions(N)` in every test (number, not `hasAssertions()`)
- `expect.assertions(2)` for tests with `toThrow` (inner expect + toThrow both
  count)
- Test titles start with "should"
- `.not.` → `.never.` in describe blocks and test descriptions
- `toThrowErrorMatchingSnapshot()` → `toThrow("matcherName")`
- Remove JS-only test values: Symbol, BigInt, generators, Set/Map iterables,
  `new Boolean()`
- `0` is truthy in Luau — remove from falsy-value test lists
- `jest.fn()` returns `[mock, fn]` — destructure both values

## Skipped matchers (7)

| Matcher          | Reason                   |
| ---------------- | ------------------------ |
| `toBeBigInt`     | No BigInt in Luau        |
| `toBeSymbol`     | No Symbol in Luau        |
| `toBeSealed`     | No `Object.isSealed`     |
| `toBeExtensible` | No `Object.isExtensible` |
| `toBeNil`        | Already in base jest     |
| `toBeNaN`        | Already in base jest     |
| `toBeDateString` | No string→date parsing   |

## Matchers to port (69)

- [x] toBeTrue
- [ ] pass
- [ ] fail
- [ ] toBeFalse
- [ ] toBeBoolean
- [ ] toBeNumber
- [ ] toBeString
- [ ] toBeFunction
- [ ] toBeObject
- [ ] toBeArray
- [ ] toBeEven
- [ ] toBeOdd
- [ ] toBePositive
- [ ] toBeNegative
- [ ] toBeInteger
- [ ] toBeFinite
- [ ] toBeBetween
- [ ] toBeWithin
- [ ] toBeInRange
- [ ] toBeEmpty
- [ ] toBeEmptyObject
- [ ] toBeFrozen
- [ ] toBeOneOf
- [ ] toBeHexadecimal
- [ ] toBeArrayOfSize
- [ ] toStartWith
- [ ] toEndWith
- [ ] toInclude
- [ ] toIncludeMultiple
- [ ] toIncludeRepeated
- [ ] toEqualCaseInsensitive
- [ ] toEqualIgnoringWhitespace
- [ ] toSatisfy
- [ ] toSatisfyAll
- [ ] toSatisfyAny
- [ ] toChange
- [ ] toChangeBy
- [ ] toChangeTo
- [ ] toContainKey
- [ ] toContainKeys
- [ ] toContainAllKeys
- [ ] toContainAnyKeys
- [ ] toContainValue
- [ ] toContainValues
- [ ] toContainAllValues
- [ ] toContainAnyValues
- [ ] toContainEntry
- [ ] toContainEntries
- [ ] toContainAllEntries
- [ ] toContainAnyEntries
- [ ] toIncludeAllMembers
- [ ] toIncludeAnyMembers
- [ ] toIncludeSameMembers
- [ ] toPartiallyContain
- [ ] toIncludeAllPartialMembers
- [ ] toIncludeSamePartialMembers
- [ ] toHaveBeenCalledOnce
- [ ] toHaveBeenCalledExactlyOnceWith
- [ ] toHaveBeenCalledBefore
- [ ] toHaveBeenCalledAfter
- [ ] toResolve
- [ ] toReject
- [ ] toThrowWithMessage
- [ ] toBeDate
- [ ] toBeValidDate
- [ ] toBeAfter
- [ ] toBeBefore
- [ ] toBeAfterOrEqualTo
- [ ] toBeBeforeOrEqualTo
