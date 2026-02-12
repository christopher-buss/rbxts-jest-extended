/* eslint-disable shopify/prefer-module-scope-constants -- Matches the upstream type definitions. */
declare module "@rbxts-js/jest-diff" {
	import type { CompareKeys } from "@rbxts/pretty-format";

	export const DIFF_DELETE: number;
	export const DIFF_EQUAL: number;
	export const DIFF_INSERT: number;

	export type Diff = [number, string];
	export const Diff: new (op: number, text: string) => Diff;

	export type DiffOptionsColor = (argument: string) => string;
	export interface DiffOptions {
		aAnnotation?: string;
		aColor?: DiffOptionsColor;
		aIndicator?: string;
		bAnnotation?: string;
		bColor?: DiffOptionsColor;
		bIndicator?: string;
		changeColor?: DiffOptionsColor;
		changeLineTrailingSpaceColor?: DiffOptionsColor;
		commonColor?: DiffOptionsColor;
		commonIndicator?: string;
		commonLineTrailingSpaceColor?: DiffOptionsColor;
		compareKeys?: CompareKeys;
		contextLines?: number;
		emptyFirstOrLastLinePlaceholder?: string;
		expand?: boolean;
		includeChangeCounts?: boolean;
		omitAnnotationLines?: boolean;
		patchColor?: DiffOptionsColor;
	}

	export function diff(a: unknown, b: unknown, options?: DiffOptions): string | undefined;
	export function diffLinesRaw(aLines: Array<string>, bLines: Array<string>): Array<Diff>;
	export function diffLinesUnified(
		aLines: Array<string>,
		bLines: Array<string>,
		options?: DiffOptions,
	): string;
	export function diffLinesUnified2(
		aDisplay: Array<string>,
		bDisplay: Array<string>,
		aCompare: Array<string>,
		bCompare: Array<string>,
		options?: DiffOptions,
	): string;
	export function diffStringsRaw(a: string, b: string, cleanup: boolean): Array<Diff>;
	export function diffStringsUnified(a: string, b: string, options?: DiffOptions): string;
}
