// @ts-nocheck
module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx)$": "babel-jest",
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["./jest.setup.js"],
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	scripts: {
		test: "jest",
		"test:watch": "jest --watch",
		stryker: "stryker run",
	},
};
