import { loadConfig } from "@isentinel/jest-roblox";

import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import { glob } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

const ROOT = ".";
const OUT_DIR = join(ROOT, "out");
const SRC_DIR = join(ROOT, "src");
const args = process.argv.slice(2);

async function getNewestMtime(directory: string, pattern = "**/*.ts"): Promise<number> {
	let newest = 0;

	for await (const path of glob(pattern, { cwd: directory })) {
		const stat = statSync(join(directory, path));
		newest = Math.max(newest, stat.mtimeMs);
	}

	return newest;
}

async function needsCompile(): Promise<boolean> {
	const newestOutput = await getNewestMtime(OUT_DIR, "**/*.luau");

	if (newestOutput === 0) {
		return true;
	}

	const newestSource = await getNewestMtime(SRC_DIR);

	return newestSource > newestOutput;
}

if (await needsCompile()) {
	console.log("Source newer than build, compiling...");
	execSync("pnpm run dev:build", { cwd: ROOT, stdio: "inherit" });
}

async function usesStudioBackend(): Promise<boolean> {
	const backendIndex = args.indexOf("--backend");
	if (backendIndex !== -1) {
		return args[backendIndex + 1] === "studio";
	}

	const config = await loadConfig();
	return config.backend === "studio";
}

if (!(await usesStudioBackend())) {
	console.log("Building test place...");
	execSync("rojo build test.project.json -o test.rbxl", { cwd: ROOT, stdio: "inherit" });
}

try {
	console.log("Running tests...");
	execSync(`pnpm exec jest-roblox ${args.join(" ")}`, { cwd: ROOT, stdio: "inherit" });
} catch {
	process.exit(1);
}
