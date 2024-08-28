import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockTestComponent } from './api-mock-test.component';
import { RequestType } from "../../models/request.type";
import { TestUtils } from "../../utils";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { of } from "rxjs";

describe('ApiMockTestComponent', () => {
	let component: ApiMockTestComponent;
	let fixture: ComponentFixture<ApiMockTestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiMockTestComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ApiMockTestComponent);
		TestUtils.setupTestUtils(fixture);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	const setMockConfig = async (type: RequestType, apiUrl: string) => {
		await TestUtils.selectDropdownOption(type, 'request-type-dropdown');
		await TestUtils.typeText(apiUrl, 'api-input-field');
	}

	it('should disable clear and submit buttons when URL field is empty', async () => {
		await setMockConfig(RequestType.PUT, '');
		let button = await TestUtils.getButtonHarness('clear-config-button');

		expect(await button.isDisabled()).toBeTrue();
		button = await TestUtils.getButtonHarness('submit-config-button');
		expect(await button.isDisabled()).toBeTrue();
	});

	it('should enable clear and submit buttons when URL field is not empty', async () => {
		await setMockConfig(RequestType.PUT, 'www.mock-api.com');
		let button = await TestUtils.getButtonHarness('clear-config-button');

		expect(await button.isDisabled()).toBeFalse();
		button = await TestUtils.getButtonHarness('submit-config-button');
		expect(await button.isDisabled()).toBeFalse();
	});

	it('should trigger HTTP call when clicking on submit button', async () => {
		const httpService = inject(HttpClient);
		spyOn(httpService, 'put');
		await setMockConfig(RequestType.PUT, 'www.mock-api.com');
		await TestUtils.clickButton('submit-config-button');

		expect(httpService.put).toHaveBeenCalledWith('www.mock-api.com', {});
	});

	it('should show response on response section when clicking on submit button', async () => {
		const httpService = inject(HttpClient);
		spyOn(httpService, 'get').and.returnValue(of("{response:'This is a mocked response'}'"));
		await setMockConfig(RequestType.GET, 'www.mock-api.com');
		await TestUtils.clickButton('submit-config-button');

		expect(await TestUtils.getMonacoText()).toEqual("{response:'This is a mocked response'}'");
	});

	it('should clear fields when clicking on clear button', async () => {
		await setMockConfig(RequestType.PUT, 'www.mock-api.com');
		await TestUtils.clickButton('clear-config-button');

		expect(await TestUtils.getInputText('api-input-field')).toBe('');
		expect(await TestUtils.getSelectedDropdownOption('request-type-dropdown')).toBe(RequestType.GET);
	});
});
