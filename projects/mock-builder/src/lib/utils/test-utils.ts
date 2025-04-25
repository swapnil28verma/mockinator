import { HarnessLoader } from "@angular/cdk/testing";
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatInputHarness } from "@angular/material/input/testing";
import { MatTableHarness } from "@angular/material/table/testing";
import { ComponentFixture } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { DebugElement } from "@angular/core";

export class TestUtils {
	constructor (private debugElement: DebugElement, private loader: HarnessLoader) {}

	public getElement(dataAutomationId: string): HTMLElement {
		return this.debugElement.nativeElement.querySelector(`[data-automation-id=${dataAutomationId}]`);
	}

	public async getSelectHarness(dataAutomationId: string): Promise<MatSelectHarness> {
		return await this.loader.getHarness(MatSelectHarness.with({selector: `[data-automation-id='${dataAutomationId}']`}))
	}

	public async getInputHarness(dataAutomationId: string): Promise<MatInputHarness> {
		return await this.loader.getHarness(MatInputHarness.with({selector: `[data-automation-id='${dataAutomationId}']`}));
	}

	public async getButtonHarness(dataAutomationId: string): Promise<MatButtonHarness> {
		return await this.loader.getHarness(MatButtonHarness.with({ selector: `[data-automation-id='${dataAutomationId}']` }))
	}

	public async getTableHarness(dataAutomationId: string): Promise<MatTableHarness> {
		return await this.loader.getHarness(MatTableHarness.with({ selector: `[data-automation-id='${dataAutomationId}']` }))
	}

	public async selectDropdownOption(option: string, dataAutomationId: string) {
		const selectHarness = await this.getSelectHarness(dataAutomationId);
		await selectHarness.clickOptions({ text: option });
	}

	public async clickButton(dataAutomationId: string) {
		const buttonHarness = await this.getButtonHarness(dataAutomationId);
		await buttonHarness.click();
	}

	public async typeText(text: string, dataAutomationId: string) {
		const inputHarness = await this.getInputHarness(dataAutomationId);
		await inputHarness.setValue(text);
	}

	public async getInputText(dataAutomationId: string): Promise <string> {
		const inputHarness = await this.getInputHarness(dataAutomationId);
		return inputHarness.getValue();
	}

	public async getSelectedDropdownOption(dataAutomationId: string): Promise<string> {
		const selectHarness = await this.getSelectHarness(dataAutomationId);
		return selectHarness.getValueText()
	}

	public async getMonacoText(): Promise<string> {
		// TODO: GET MONACO TEXT HERE - Figure out monaco integration in unit tests
		return Promise.resolve('');
	}

	public async setMonacoText(text: string) {
		// TODO: SET MONACO TEXT HERE - Figure out monaco integration in unit tests
	}
}
