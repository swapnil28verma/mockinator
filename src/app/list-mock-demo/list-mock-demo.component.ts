import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMockListComponent, ApiMockTestComponent } from "mock-builder";

@Component({
	selector: 'app-list-mock-demo',
	standalone: true,
	imports: [CommonModule, ApiMockTestComponent, ApiMockListComponent],
	templateUrl: './list-mock-demo.component.html',
	styleUrl: './list-mock-demo.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-list-mock-demo'}
})
export class ListMockDemoComponent {
}
