import { HarnessLoader } from "@angular/cdk/testing";
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatInputHarness } from "@angular/material/input/testing";
import { MatTableHarness } from "@angular/material/table/testing";
import { ComponentFixture } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

export class TestUtils {
	private static loader: HarnessLoader;
	private static fixture: ComponentFixture<any>;

	public static setupTestUtils(fixture: ComponentFixture<any>) {
		this.fixture = fixture;
		this.loader = TestbedHarnessEnvironment.loader(fixture);
	}

	public static getElement(dataAutomationId: string): HTMLElement {
		return this.fixture.debugElement.nativeElement.querySelector(`[data-automation-id=${dataAutomationId}]`);
	}

	public static async getSelectHarness(dataAutomationId: string): Promise<MatSelectHarness> {
		return await this.loader.getHarness(MatSelectHarness.with({selector: `[data-automation-id='${dataAutomationId}']`}))
	}

	public static async getInputHarness(dataAutomationId: string): Promise<MatInputHarness> {
		return await this.loader.getHarness(MatInputHarness.with({selector: `[data-automation-id='${dataAutomationId}']`}));
	}

	public static async getButtonHarness(dataAutomationId: string): Promise<MatButtonHarness> {
		return await this.loader.getHarness(MatButtonHarness.with({ selector: `[data-automation-id='${dataAutomationId}']` }))
	}

	public static async getTableHarness(dataAutomationId: string): Promise<MatTableHarness> {
		return await this.loader.getHarness(MatTableHarness.with({ selector: `[data-automation-id='${dataAutomationId}']` }))
	}

	public static async selectDropdownOption(option: string, dataAutomationId: string) {
		const selectHarness = await this.getSelectHarness(dataAutomationId);
		await selectHarness.clickOptions({ text: option });
	}

	public static async clickButton(dataAutomationId: string) {
		const buttonHarness = await this.getButtonHarness(dataAutomationId);
		await buttonHarness.click();
	}

	public static async typeText(text: string, dataAutomationId: string) {
		const inputHarness = await this.getInputHarness(dataAutomationId);
		await inputHarness.setValue(text);
	}

	public static async getInputText(dataAutomationId: string): Promise <string> {
		const inputHarness = await this.getInputHarness(dataAutomationId);
		return inputHarness.getValue();
	}

	public static async getSelectedDropdownOption(dataAutomationId: string): Promise<string> {
		const selectHarness = await this.getSelectHarness(dataAutomationId);
		return selectHarness.getValueText()
	}

	public static async getMonacoText(): Promise<string> {
		// TODO: GET MONACO TEXT HERE - Figure out monaco integration in unit tests
		return Promise.resolve('');
	}

	public static async setMonacoText(text: string) {
		// TODO: SET MONACO TEXT HERE - Figure out monaco integration in unit tests
	}
}
