// @ts-nocheck
module.exports = {
	testEnvironment: "jsdom",
	roots: ["<rootDir>/frontend/src"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"babel-jest",
			{
				presets: [
					"@babel/preset-env",
					["@babel/preset-react", { runtime: "automatic" }],
					"@babel/preset-typescript",
				],
			},
		],
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/frontend/jest.setup.js"],
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	transformIgnorePatterns: ["/node_modules/(?!@testing-library)"],
};
