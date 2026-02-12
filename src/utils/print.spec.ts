import { describe, expect, it } from "@rbxts/jest-globals";

import { tokenize } from "./print";

describe("print-util module", () => {
	it("should tokenize given string", () => {
		expect.assertions(1);

		const tokens = tokenize("This function \n creates tokens \t keeping white-space intact.");

		expect(tokens).toStrictEqual([
			{ isWhitespace: false, value: "This" },
			{ isWhitespace: true, value: " " },
			{ isWhitespace: false, value: "function" },
			{ isWhitespace: true, value: " \n " },
			{ isWhitespace: false, value: "creates" },
			{ isWhitespace: true, value: " " },
			{ isWhitespace: false, value: "tokens" },
			{ isWhitespace: true, value: " \t " },
			{ isWhitespace: false, value: "keeping" },
			{ isWhitespace: true, value: " " },
			{ isWhitespace: false, value: "white-space" },
			{ isWhitespace: true, value: " " },
			{ isWhitespace: false, value: "intact." },
		]);
	});
});
