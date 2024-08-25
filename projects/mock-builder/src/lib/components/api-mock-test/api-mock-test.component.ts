import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestType } from "../../models/request.type";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MockBuilderService, monacoOptionsReadOnly, StringUtils } from "mock-builder";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { RequestMock } from "../../models/request.mock";
import { MatButton } from "@angular/material/button";

@Component({
	selector: 'app-api-mock-test',
	standalone: true,
	imports: [CommonModule, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule, FormsModule, MonacoEditorModule, MatButton],
	templateUrl: './api-mock-test.component.html',
	styleUrl: './api-mock-test.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-api-mock-test'}
})
export class ApiMockTestComponent {
	protected readonly monacoOptionsReadOnly = monacoOptionsReadOnly;
	protected readonly RequestTypeEnum = RequestType;
	readonly mockBuilderService: MockBuilderService = inject(MockBuilderService);

	requestType = RequestType.GET;
	requestUrl = '';
	responseBody = '';
	showResponseBody = false;
	disableButton: boolean = true;

	clearMockConfiguration() {
		this.requestType = RequestType.GET;
		this.requestUrl = '';
		this.responseBody = '';
		this.showResponseBody = false;
		this.disableButton = true;
	}

	onTestMock() {
		const mock = new RequestMock(this.requestType, this.requestUrl, '');
		this.mockBuilderService.testMock(mock).subscribe((response) => {
			this.responseBody = JSON.stringify(response, undefined, 2);
			this.showResponseBody = StringUtils.isNotEmpty(this.responseBody);
		});
	}

	onUrlUpdated() {
		this.disableButton = StringUtils.isEmpty(this.requestUrl);
	}
}
