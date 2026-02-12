import { describe, expect, it } from "@rbxts/jest-globals";

import * as matcher from "./to-be-true";

expect.extend(matcher);

describe(".toBeTrue", () => {
	it("should pass when given true", () => {
		expect.assertions(1);

		expect(true).toBeTrue();
	});

	it("should fail when not given true", () => {
		expect.assertions(2);

		expect(() => {
			expect(false).toBeTrue();
		}).toThrow("toBeTrue");
	});
});

describe(".never.toBeTrue", () => {
	it.each([[false], [""], [{}], [[]], [undefined]])(
		"should pass when not given true: %s",
		(given) => {
			expect.assertions(1);

			expect(given).never.toBeTrue();
		},
	);

	it("should fail when given true", () => {
		expect.assertions(2);

		expect(() => {
			expect(true).never.toBeTrue();
		}).toThrow("toBeTrue");
	});
});
