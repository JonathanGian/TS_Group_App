/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
	packageManager: "npm",
	reporters: ["html", "clear-text", "progress"],
	testRunner: "jest",
	coverageAnalysis: "perTest",
	jest: {
		projectType: "custom",
		configFile: "jest.config.js",
	},
	mutate: [
		"frontend/src/**/*.ts",
		"frontend/src/**/*.tsx",
		"!frontend/src/**/*.test.ts",
		"!frontend/src/**/*.test.tsx",
		"!frontend/src/**/*.spec.ts",
		"!frontend/src/**/*.spec.tsx",
	],
	thresholds: {
		high: 80,
		low: 60,
		break: 50,
	},
};
