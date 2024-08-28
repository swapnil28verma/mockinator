// Karma configuration
// Generated on Wed Aug 28 2024 13:45:05 GMT+0530 (India Standard Time)

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
		frameworks: ['jasmine', 'karma-typescript'],


		// list of files / patterns to load in the browser
		files: [
			'projects/**/*.ts',
			'src/**/*.ts'
		],


		// list of files / patterns to exclude
		exclude: ['mockServiceWorker.js'],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
		preprocessors: {
			'**/*.ts': 'karma-typescript'
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
		reporters: ['progress', 'karma-typescript'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
		browsers: [
			"Firefox"
		],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser instances should be started simultaneously
		concurrency: Infinity,

		karmaTypescriptConfig: {
			tsconfig: "./tsconfig.json"  // Ensure this points to your tsconfig.json
		}
	})
}
