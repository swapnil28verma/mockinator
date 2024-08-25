import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMockConfigComponent } from "mock-builder";

@Component({
	selector: 'app-build-mock-demo',
	standalone: true,
	imports: [CommonModule, ApiMockConfigComponent],
	templateUrl: './build-mock-demo.component.html',
	styleUrl: './build-mock-demo.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-build-mock-demo'}
})
export class BuildMockDemoComponent {
}
