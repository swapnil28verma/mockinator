/***************************************************************************************************
 * Initialize the Angular testing environment.
 */
import 'zone.js/testing'; // Zone.js is required for Angular testing
import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Init Angular testing environment
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);
