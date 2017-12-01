import 'zone.js/dist/zone.js';

import 'zone.js/dist/long-stack-trace-zone.js';

import 'zone.js/dist/async-test.js';

import 'zone.js/dist/fake-async-test.js';

import 'zone.js/dist/sync-test.js';

import 'zone.js/dist/proxy.js';

import 'zone.js/dist/jasmine-patch.js';

import { getTestBed } from '@angular/core/testing';

import {

  BrowserDynamicTestingModule,

  platformBrowserDynamicTesting

} from '@angular/platform-browser-dynamic/testing';

// List vendors here to increase test rebuild performance.

import '@angular/animations';

import '@angular/common';

import '@angular/common/testing';

import '@angular/common/http';

import '@angular/common/http/testing';

import '@angular/core/';

import '@angular/core/testing';

import '@angular/platform-browser';

import '@angular/platform-browser/testing';

import '@angular/platform-browser/animations';

import '@angular/platform-browser-dynamic';

import '@angular/platform-browser-dynamic/testing';

import 'rxjs'; // tslint:disable-line

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.

declare var __karma__: any;

declare const require: any;

// Prevent Karma from running prematurely.

__karma__.loaded = function () {};

// First, initialize the Angular testing environment.

getTestBed().initTestEnvironment(

  BrowserDynamicTestingModule,

  platformBrowserDynamicTesting()

);

// Then we find all the tests.

const context = require.context('./', true, /\.spec\.ts$/);

// And load the modules.

context.keys().map(context);

// Finally, start Karma to run the tests.

__karma__.start();