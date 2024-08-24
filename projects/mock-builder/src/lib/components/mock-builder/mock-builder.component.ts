import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockBuilderService } from '../../services';
import { RequestMock } from '../../models/request.mock';
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

	readonly mockBuilderService: MockBuilderService = inject(MockBuilderService);
	readonly snackbarService: MatSnackBar = inject(MatSnackBar);

	onMockSubmit(newMock: RequestMock) {
		this.mockBuilderService.addMock(newMock);
		this.snackbarService.open('New mock added successfully', '', {duration: 5000});
	}
}
