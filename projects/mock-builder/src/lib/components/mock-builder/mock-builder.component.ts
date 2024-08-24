import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MockBuilderService } from '../../services';
import { ApiMockConfigComponent } from "../api-mock-generator/api-mock-config.component";
import { ApiMockListComponent } from "../api-mock-list/api-mock-list.component";

@Component({
	selector: 'mock-builder',
	providers: [MockBuilderService],
	standalone: true,
	imports: [
		CommonModule,
		MatTabsModule,
		ApiMockConfigComponent,
		ApiMockListComponent,
	],
	templateUrl: './mock-builder.component.html',
	styleUrl: './mock-builder.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class MockBuilderComponent {
}
