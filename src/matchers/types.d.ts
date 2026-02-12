import "@rbxts/jest-globals";

interface CustomMatchers<R> {
	toBeTrue(): R;
}

declare module "@rbxts/jest-globals" {
	namespace jest {
		interface Expect extends CustomMatchers<unknown> {}
		interface InverseAsymmetricMatchers extends Expect {}

		// eslint-disable-next-line ts/no-empty-object-type -- must match upstream Matchers signature
		interface Matchers<R, T = {}> extends CustomMatchers<R> {}
	}
}
