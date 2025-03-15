// @ts-nocheck
// Mock TextEncoder/TextDecoder for Jest
if (typeof TextEncoder === "undefined") {
	global.TextEncoder = require("util").TextEncoder;
	global.TextDecoder = require("util").TextDecoder;
}

// Add any other required polyfills here
if (typeof AbortController === "undefined") {
	global.AbortController = class AbortController {
		signal = { aborted: false };
		abort() {
			this.signal.aborted = true;
		}
	};
}
