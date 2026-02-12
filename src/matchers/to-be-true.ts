import type { jest } from "@rbxts/jest-globals";

export function toBeTrue(this: jest.MatcherContext, actual: unknown): jest.CustomMatcherResult {
	const { matcherHint, printExpected, printReceived } = this.utils;

	const pass = actual === true;

	return {
		message: () => {
			return pass
				? `${matcherHint(".never.toBeTrue", "received", "")}\n\n` +
						"Expected value to not be true received:\n" +
						`  ${printReceived(actual)}`
				: `${matcherHint(".toBeTrue", "received", "")}\n\n` +
						"Expected value to be true:\n" +
						`  ${printExpected(true)}\n` +
						"Received:\n" +
						`  ${printReceived(actual)}`;
		},
		pass,
	};
}
