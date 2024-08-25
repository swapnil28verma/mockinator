import { Routes } from '@angular/router';
import { BuildMockDemoComponent } from "./build-mock-demo/build-mock-demo.component";
import { TestMockDemoComponent } from "./test-mock-demo/test-mock-demo.component";
import { ListMockDemoComponent } from "./list-mock-demo/list-mock-demo.component";

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'build-new-mock',
		pathMatch: 'full'
	},
	{
		path: 'build-new-mock',
		component: BuildMockDemoComponent
	},
	{
		path: 'test-mock',
		component: TestMockDemoComponent
	},
	{
		path: 'list-all-mocks',
		component: ListMockDemoComponent
	},
];
