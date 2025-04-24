/***************************************************************************************************
 * Initialize the Angular testing environment.
 */
import 'zone.js/testing'; // Zone.js is required for Angular testing
import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
	context(path: string, deep?: boolean, filter?: RegExp): {
		keys(): string[];
		<T>(id: string): T;
	};
};

// Init Angular testing environment
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);
