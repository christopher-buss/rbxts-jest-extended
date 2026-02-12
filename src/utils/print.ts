import type { Diff } from "@rbxts-js/jest-diff";
import { DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from "@rbxts-js/jest-diff";

type ColorFunc = (value: string) => string;

// TODO: replace with typeof import("@rbxts/jest-matcher-utils") when upstream
// fixes EXPECTED_COLOR/RECEIVED_COLOR/INVERTED_COLOR types (string → function)
interface PrintUtils {
	EXPECTED_COLOR: ColorFunc;
	INVERTED_COLOR: ColorFunc;
	RECEIVED_COLOR: ColorFunc;
}

interface Token {
	isWhitespace: boolean;
	value: string;
}

export function printExpected(utils: PrintUtils, diffs: Array<Diff>): string {
	return diffs.reduce((accumulator: string, [operation, value]: Diff) => {
		if (operation === DIFF_EQUAL) {
			return accumulator + colorTokens(value, utils.EXPECTED_COLOR);
		}

		if (operation === DIFF_DELETE) {
			return (
				accumulator +
				colorTokens(value, (str: string) => utils.INVERTED_COLOR(utils.EXPECTED_COLOR(str)))
			);
		}

		return accumulator;
	}, "");
}

export function printReceived(utils: PrintUtils, diffs: Array<Diff>): string {
	return diffs.reduce((accumulator: string, [operation, value]: Diff) => {
		if (operation === DIFF_EQUAL) {
			return accumulator + colorTokens(value, utils.RECEIVED_COLOR);
		}

		if (operation === DIFF_INSERT) {
			return (
				accumulator +
				colorTokens(value, (str: string) => utils.INVERTED_COLOR(utils.RECEIVED_COLOR(str)))
			);
		}

		return accumulator;
	}, "");
}

export function tokenize(str: string): Array<Token> {
	const isWhitespace = (char: string): boolean => string.match(char, "%s")[0] !== undefined;
	const tokens: Array<Token> = [];
	let index = 0;
	let token: Token | undefined;

	while (index < str.size()) {
		const char = str.sub(index + 1, index + 1);
		const isCurrentCharWhitespace = isWhitespace(char);

		if (token) {
			if (token.isWhitespace === isCurrentCharWhitespace) {
				token.value += char;
			} else {
				tokens.push(token);
				token = undefined;
				continue;
			}
		} else {
			token = {
				isWhitespace: isCurrentCharWhitespace,
				value: char,
			};
		}

		index += 1;
	}

	if (token) {
		tokens.push(token);
	}

	return tokens;
}

function colorTokens(str: string, color: ColorFunc): string {
	const tokens = tokenize(str);

	return tokens.reduce((accumulator: string, { isWhitespace, value }: Token) => {
		return accumulator + (isWhitespace ? value : color(value));
	}, "");
}
