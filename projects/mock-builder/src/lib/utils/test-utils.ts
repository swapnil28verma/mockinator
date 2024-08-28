import { HarnessLoader } from "@angular/cdk/testing";
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatInputHarness } from "@angular/material/input/testing";

export class TestUtils {
	private static _loader: HarnessLoader;

	static get loader(): HarnessLoader {
		return this._loader;
	}
	static set loader(value: HarnessLoader) {
		this._loader = value;
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
