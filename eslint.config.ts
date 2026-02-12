import { isentinel } from "@isentinel/eslint-config";

export default isentinel({
	name: "project/root",
	namedConfigs: true,
	pnpm: true,
	roblox: {
		files: ["src/**/*.ts", "src/**/*.tsx"],
		filesTypeAware: ["src/**/*.ts", "src/**/*.tsx"],
	},
	test: true,
	type: "package",
	typescript: {
		outOfProjectFiles: ["*.js", "*.ts", ".*.js", ".*.ts", "scripts/*.ts"],
		tsconfigPath: "tsconfig.node.json",
	},
});
