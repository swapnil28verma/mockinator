import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMockListComponent } from './api-mock-list.component';
import { RequestType } from "../../models/request.type";
import { MockBuilderService, TestUtils } from "mock-builder";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

describe('ApiMockListComponent', () => {
	let component: ApiMockListComponent;
	let fixture: ComponentFixture<ApiMockListComponent>;
	let mockBuilderService: MockBuilderService;
	let snackbarService: MatSnackBar;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiMockListComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ApiMockListComponent);
		TestUtils.setupTestUtils(fixture);
		component = fixture.componentInstance;
		component.savedMocks = [
			{ id: 'mock-1', url: 'www.mock-1.com', body: 'mock-response-1', type: RequestType.GET },
			{ id: 'mock-2', url: 'www.mock-2.com', body: 'mock-response-2', type: RequestType.PUT },
			{ id: 'mock-3', url: 'www.mock-3.com', body: 'mock-response-3', type: RequestType.POST },
		]
		mockBuilderService = inject(MockBuilderService);
		snackbarService = inject(MatSnackBar);
		fixture.detectChanges();
	});

	it('should show response section when clicking on a mock row', async () => {
		let row = TestUtils.getElement('mock-1-row');
		row.click();

		expect(TestUtils.getElement('mock-1-response-row')).toBeTruthy();
	});

	it('should show only one response section at a time', async () => {
		let row = TestUtils.getElement('mock-1-row');
		row.click();

		expect(TestUtils.getElement('mock-1-response-row')).toBeTruthy();

		row = TestUtils.getElement('mock-2-row');
		row.click();

		expect(TestUtils.getElement('mock-1-response-row')).toBeFalsy();
		expect(TestUtils.getElement('mock-2-response-row')).toBeTruthy();
	});

	it('should add new row when a new mock is submitted', async () => {
		const newRow = { id: 'mock-4', url: 'www.mock-4.com', body: 'mock-response-4', type: RequestType.PUT };
		component.savedMocks.push(newRow);
		fixture.detectChanges();
		const table = await TestUtils.getTableHarness('mock-list-table');
		const rowsHarness = await table.getRows();

		expect(rowsHarness.length).toBe(4);
		expect(TestUtils.getElement('mock-4-row')).toBeTruthy();
	});

	it('should trigger API call when clicking on the test button', async () => {
		const http = inject(HttpClient);
		spyOn(http, 'put');
		spyOn(mockBuilderService, 'testMock');
		await TestUtils.clickButton('mock-2-run-button');

		expect(http.put).toHaveBeenCalledWith('www.mock-2.com', {});
	});

	it('should remove mock and show notification when clicking on delete button', async () => {
		spyOn(mockBuilderService, 'removeMock');
		spyOn(snackbarService, 'open')
		await TestUtils.clickButton('mock-2-delete-button');

		expect(mockBuilderService.removeMock).toHaveBeenCalledWith('mock-2');
		expect(snackbarService.open).toHaveBeenCalledWith('Mock removed successfully', '', {duration: 5000});
	});
});
