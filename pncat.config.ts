import { defineConfig } from "pncat";

export default defineConfig({
	catalogRules: [
		{
			name: "types",
			match: [/@types/],
			priority: 10,
		},
		{
			name: "lint",
			match: [/lint/, /git-hooks/],
			priority: 20,
		},
		{
			name: "cli",
			match: [/bump/, /pncat/],
			priority: 20,
		},
		{
			name: "test",
			match: [/jest/],
			priority: 30,
		},
		{
			name: "script",
			match: [/jiti/],
			priority: 40,
		},
		{
			name: "tsc",
			match: [/tsc/, /tsconfig/, /typescript/],
			priority: 50,
		},
		{
			name: "utils",
			match: [/hooks/],
			priority: 60,
		},
		{
			name: "node",
			match: [/glob/],
			priority: 60,
		},
	],
	postRun: 'eslint --fix "**/package.json" "**/pnpm-workspace.yaml"',
});
