import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestType } from "../../models/request.type";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RequestMock } from "../../models/request.mock";
import { monacoOptions } from "../../utils";
import { MockBuilderService } from "../../services";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: 'app-api-mock-config',
	standalone: true,
	imports: [CommonModule, MatButton, MatFormField, MatInput, MatLabel, MatOption, MatSelect, MonacoEditorModule, ReactiveFormsModule, FormsModule],
	templateUrl: './api-mock-config.component.html',
	styleUrl: './api-mock-config.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: { class: 'app-api-mock-generator' },
})
export class ApiMockConfigComponent {
	protected readonly monacoOptions = monacoOptions;
	protected readonly RequestTypeEnum = RequestType;
	readonly mockBuilderService: MockBuilderService = inject(MockBuilderService);
	readonly snackbarService: MatSnackBar = inject(MatSnackBar);


	requestType = RequestType.GET;
	requestUrl = '';
	responseBody = '';

	@Output() onMockSubmit: EventEmitter<RequestMock> = new EventEmitter<RequestMock>();

	clearMockConfiguration() {
		this.requestType = RequestType.GET;
		this.requestUrl = '';
		this.responseBody = '';
	}

	onSubmit() {
		const newMock = new RequestMock(this.requestType, this.requestUrl, this.responseBody);
		this.onMockSubmit.emit(newMock);
		this.mockBuilderService.addMock(newMock);
		this.snackbarService.open('New mock added successfully', '', {duration: 5000});
		this.clearMockConfiguration();
	}
}
