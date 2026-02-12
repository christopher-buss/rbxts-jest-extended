import { jest } from "@rbxts/jest-globals";

export function contains(
	equals: (a: unknown, b: unknown) => boolean,
	list: ReadonlyArray<defined>,
	value: unknown,
): boolean {
	return list.findIndex((item) => equals(item, value)) > -1;
}

export function containsEntry(
	equals: (a: unknown, b: unknown) => boolean,
	object: Record<string, unknown>,
	entry: [string, unknown],
): boolean {
	const [key, value] = entry;

	return key in object && equals(object[key], value);
}

export function determinePropertyMessage(
	actual: unknown,
	property: string,
	message = "Not Accessible",
): string {
	if (typeIs(actual, "table")) {
		const result = (actual as Record<string, unknown>)[property];
		if (result !== undefined) {
			return tostring(result);
		}
	}

	return message;
}

export function isJestMockOrSpy(value: unknown): boolean {
	return jest.isMockFunction(value);
}
