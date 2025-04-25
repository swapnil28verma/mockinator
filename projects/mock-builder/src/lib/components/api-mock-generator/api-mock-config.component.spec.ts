import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockConfigComponent } from './api-mock-config.component';
import { MockBuilderService } from '../../services';
import { TestUtils } from '../../utils';
import { RequestType } from "../../models/request.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NoopTestingModule } from "../../utils/noop-testing.module";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

fdescribe('ApiMockConfigComponent', () => {
	let component: ApiMockConfigComponent;
	let fixture: ComponentFixture<ApiMockConfigComponent>;
	let mockBuilderService: MockBuilderService;
	let snackbarService: MatSnackBar;
	let testUtils: TestUtils;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiMockConfigComponent, NoopTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ApiMockConfigComponent);
		component = fixture.componentInstance;
		testUtils = new TestUtils(fixture.debugElement, TestbedHarnessEnvironment.loader(fixture));
		mockBuilderService = TestBed.inject(MockBuilderService);
		snackbarService = TestBed.inject(MatSnackBar);
		fixture.detectChanges();
	});

	const mockResponse = {
		response: 'This is a mocked response'
	};

	const setMockConfig = async (option: string, apiUrl: string, response: string) => {
		await testUtils.selectDropdownOption(option, 'request-type-dropdown');
		await testUtils.typeText(apiUrl, 'api-input-field');
		await testUtils.setMonacoText(response);
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
		await setMockConfig('GET', mockObject.url, mockObject.body);
		await testUtils.clickButton('submit-config-button');

		// TODO: Add checking for response body (monaco editor text) as well
		expect(mockBuilderService.addMock).toHaveBeenCalledOnceWith(jasmine.objectContaining({ type: mockObject.type, url: mockObject.url }));
		expect(component.onMockSubmit.emit).toHaveBeenCalledWith(jasmine.objectContaining({ type: mockObject.type, url: mockObject.url }));
		expect(snackbarService.open).toHaveBeenCalledWith('New mock added successfully', '', {duration: 5000})
	});

	it('should clear mock configuration when clicking on the clear button', async () => {
		spyOn(component, 'clearMockConfiguration').and.callThrough();
		const mockObject = {
			id: '1234',
			type: RequestType.GET,
			url: 'www.mock-api-url.com',
			body: JSON.stringify(mockResponse),
		}
		await setMockConfig('PUT', mockObject.url, mockObject.body);
		await testUtils.clickButton('clear-config-button');

		expect(component.clearMockConfiguration).toHaveBeenCalled();
		expect(await testUtils.getSelectedDropdownOption('request-type-dropdown')).toEqual('GET');
		expect(await testUtils.getInputText('api-input-field')).toEqual('');
		expect(await testUtils.getMonacoText()).toEqual('');
	});

	it('should clear mock configuration after submit button was clicked', async () => {
		spyOn(component, 'clearMockConfiguration').and.callThrough();
		spyOn(snackbarService, 'open');
		const mockObject = {
			id: '1234',
			type: RequestType.GET,
			url: 'www.mock-api-url.com',
			body: JSON.stringify(mockResponse),
		}
		await setMockConfig('PUT', mockObject.url, mockObject.body);
		await testUtils.clickButton('submit-config-button');

		expect(component.clearMockConfiguration).toHaveBeenCalled();
		expect(await testUtils.getSelectedDropdownOption('request-type-dropdown')).toEqual('GET');
		expect(await testUtils.getInputText('api-input-field')).toEqual('');
		expect(await testUtils.getMonacoText()).toEqual('');
	});
});
