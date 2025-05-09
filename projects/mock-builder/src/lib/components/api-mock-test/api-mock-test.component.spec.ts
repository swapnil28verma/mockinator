import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockTestComponent } from './api-mock-test.component';
import { TestUtils } from "../../utils";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { NoopTestingModule } from '../../utils/noop-testing.module';

describe('ApiMockTestComponent', () => {
	let component: ApiMockTestComponent;
	let fixture: ComponentFixture<ApiMockTestComponent>;
	let testUtils: TestUtils;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiMockTestComponent, NoopTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ApiMockTestComponent);
		testUtils = new TestUtils(fixture.debugElement, TestbedHarnessEnvironment.loader(fixture));
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	const setMockConfig = async (type: string, apiUrl: string) => {
		await testUtils.selectDropdownOption(type, 'request-type-dropdown');
		await testUtils.typeText(apiUrl, 'api-input-field');
	}

	it('should disable clear and submit buttons when URL field is empty', async () => {
		await setMockConfig('PUT', '');
		let button = await testUtils.getButtonHarness('clear-config-button');

		expect(await button.isDisabled()).toBeTrue();
		button = await testUtils.getButtonHarness('submit-config-button');
		expect(await button.isDisabled()).toBeTrue();
	});

	it('should enable clear and submit buttons when URL field is not empty', async () => {
		await setMockConfig('PUT', 'www.mock-api.com');
		let button = await testUtils.getButtonHarness('clear-config-button');

		expect(await button.isDisabled()).toBeFalse();
		button = await testUtils.getButtonHarness('submit-config-button');
		expect(await button.isDisabled()).toBeFalse();
	});

	it('should trigger HTTP call when clicking on submit button', async () => {
		const httpService = TestBed.inject(HttpClient);
		spyOn(httpService, 'put');
		await setMockConfig('PUT', 'www.mock-api.com');
		await testUtils.clickButton('submit-config-button');

		expect(httpService.put).toHaveBeenCalledWith('www.mock-api.com', {});
	});

	xit('should show response on response section when clicking on submit button', async () => {
		const httpService = TestBed.inject(HttpClient);
		spyOn(httpService, 'get').and.returnValue(of("{response:'This is a mocked response'}'"));
		await setMockConfig('GET', 'www.mock-api.com');
		await testUtils.clickButton('submit-config-button');
		// TODO: Add checking for response body (monaco editor text) as well
		expect(await testUtils.getMonacoText()).toEqual("{response:'This is a mocked response'}'");
	});

	it('should clear fields when clicking on clear button', async () => {
		await setMockConfig('PUT', 'www.mock-api.com');
		await testUtils.clickButton('clear-config-button');

		expect(await testUtils.getInputText('api-input-field')).toBe('');
		expect(await testUtils.getSelectedDropdownOption('request-type-dropdown')).toBe('GET');
	});
});
