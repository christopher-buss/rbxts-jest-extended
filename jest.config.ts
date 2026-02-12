import type { Config } from "@isentinel/jest-roblox";

export default {
	backend: "open-cloud",
	compact: false,
	placeFile: "test.rbxl",
	projects: ["ReplicatedStorage"],
	rojoProject: "test.project.json",
	setupFiles: ["TestService/setup"],
} satisfies Config;
