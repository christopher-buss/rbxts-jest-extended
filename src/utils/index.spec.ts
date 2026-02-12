import { describe, expect, it, jest } from "@rbxts/jest-globals";

import { contains, determinePropertyMessage, isJestMockOrSpy } from ".";

describe("utils", () => {
	describe(contains, () => {
		it("should return true when array contains given value", () => {
			expect.assertions(5);

			const equals = (a: unknown, b: unknown) => a === b;
			const array: Array<defined> = [1, "", "hello", false, true];

			expect(contains(equals, array, 1)).toBe(true);
			expect(contains(equals, array, "")).toBe(true);
			expect(contains(equals, array, "hello")).toBe(true);
			expect(contains(equals, array, false)).toBe(true);
			expect(contains(equals, array, true)).toBe(true);
		});

		it("should return false when array does not contain given value", () => {
			expect.assertions(3);

			const equals = (a: unknown, b: unknown) => a === b;

			expect(contains(equals, [], 1)).toBe(false);
			expect(contains(equals, [1, 2], 3)).toBe(false);
			expect(contains(equals, ["a"], "b")).toBe(false);
		});
	});

	describe(determinePropertyMessage, () => {
		it("should return 'Not Accessible' if the value is undefined", () => {
			expect.assertions(1);
			expect(determinePropertyMessage(undefined, "length")).toBe("Not Accessible");
		});

		it("should return property value when it has one", () => {
			expect.assertions(1);

			const object = { length: 5 };

			expect(determinePropertyMessage(object, "length")).toBe("5");
		});

		it("should return custom error message when passed one", () => {
			expect.assertions(1);

			const errorMessage = "bob";

			expect(determinePropertyMessage(undefined, "length", errorMessage)).toBe(errorMessage);
		});
	});

	describe(isJestMockOrSpy, () => {
		it("should return true if value is a jest mock", () => {
			expect.assertions(1);

			const [mock] = jest.fn();

			expect(isJestMockOrSpy(mock)).toBe(true);
		});

		it("should return false if value is not a jest mock", () => {
			expect.assertions(1);

			const func = () => {};

			expect(isJestMockOrSpy(func)).toBe(false);
		});
	});
});
