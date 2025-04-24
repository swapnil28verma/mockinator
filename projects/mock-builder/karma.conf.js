// Karma configuration
// Generated on Wed Aug 28 2024 13:45:05 GMT+0530 (India Standard Time)

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-firefox-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		exclude: ['src/mockServiceWorker.js'],
		client: {
			clearContext: false
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: [
			"Firefox"
		],
		singleRun: false,
		concurrency: Infinity,
		karmaTypescriptConfig: {
			tsconfig: 'projects/mock-builder/tsconfig.spec.json', // Make sure this points to your tsconfig.spec.json
			sourceMap: true                    // Ensure source maps are enabled here too
		}
	})
}
