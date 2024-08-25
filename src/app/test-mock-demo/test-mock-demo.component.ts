import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMockConfigComponent, ApiMockTestComponent } from "mock-builder";

@Component({
	selector: 'app-test-mock-demo',
	standalone: true,
	imports: [CommonModule, ApiMockConfigComponent, ApiMockTestComponent],
	templateUrl: './test-mock-demo.component.html',
	styleUrl: './test-mock-demo.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-test-mock-demo'}
})
export class TestMockDemoComponent {
}
