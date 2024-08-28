import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockConfigComponent } from './api-mock-config.component';
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MockBuilderService, TestUtils } from "mock-builder";
import { RequestType } from "../../models/request.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { inject } from "@angular/core";

describe('ApiMockConfigComponent', () => {
	let component: ApiMockConfigComponent;
	let fixture: ComponentFixture<ApiMockConfigComponent>;
	let mockBuilderService: MockBuilderService;
	let snackbarService: MatSnackBar;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiMockConfigComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ApiMockConfigComponent);
		component = fixture.componentInstance;
		TestUtils.loader = TestbedHarnessEnvironment.loader(fixture);
		mockBuilderService = inject(MockBuilderService);
		snackbarService = inject(MatSnackBar);
		fixture.detectChanges();
	});

	const mockResponse = {
		response: 'This is a mocked response'
	};

	const setMockConfig = async (type: RequestType, apiUrl: string, response: string) => {
		await TestUtils.selectDropdownOption(type, 'request-type-dropdown');
		await TestUtils.typeText(apiUrl, 'api-input-field');
		await TestUtils.setMonacoText(response);
	}

	it('should emit onMockSubmit, show a notification, and submit a mock to be created when clicking on submit button', async () => {
		spyOn(mockBuilderService, 'addMock');
		spyOn(snackbarService, 'open');
		spyOn(component.onMockSubmit, 'emit');
		const mockObject = {
			id: '1234',
			type: RequestType.GET,
			url: 'www.mock-api-url.com',
			body: JSON.stringify(mockResponse),
		}
		await setMockConfig(mockObject.type, mockObject.url, mockObject.body);
		await TestUtils.clickButton('submit-config-button');

		expect(mockBuilderService.addMock).toHaveBeenCalledOnceWith(mockObject);
		expect(component.onMockSubmit.emit).toHaveBeenCalledWith(mockObject);
		expect(snackbarService.open).toHaveBeenCalledWith('New mock added successfully', '', {duration: 5000})
	});

	it('should clear mock configuration when clicking on the clear button', async () => {
		spyOn(component, 'clearMockConfiguration');
		const mockObject = {
			id: '1234',
			type: RequestType.GET,
			url: 'www.mock-api-url.com',
			body: JSON.stringify(mockResponse),
		}
		await setMockConfig(mockObject.type, mockObject.url, mockObject.body);
		await TestUtils.clickButton('clear-config-button');

		expect(component.clearMockConfiguration).toHaveBeenCalled();
		expect(await TestUtils.getSelectedDropdownOption('request-type-dropdown')).toEqual(RequestType.GET);
		expect(await TestUtils.getInputText('api-input-field')).toEqual('');
		expect(await TestUtils.getMonacoText()).toEqual('');
	});

	it('should clear mock configuration after submit button was clicked', async () => {
		spyOn(component, 'clearMockConfiguration');
		const mockObject = {
			id: '1234',
			type: RequestType.GET,
			url: 'www.mock-api-url.com',
			body: JSON.stringify(mockResponse),
		}
		await setMockConfig(mockObject.type, mockObject.url, mockObject.body);
		await TestUtils.clickButton('submit-config-button');

		expect(component.clearMockConfiguration).toHaveBeenCalled();
		expect(await TestUtils.getSelectedDropdownOption('request-type-dropdown')).toEqual(RequestType.GET);
		expect(await TestUtils.getInputText('api-input-field')).toEqual('');
		expect(await TestUtils.getMonacoText()).toEqual('');
	});
});
