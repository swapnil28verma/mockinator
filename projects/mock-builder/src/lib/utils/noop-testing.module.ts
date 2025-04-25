import { importProvidersFrom, NgModule } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	imports: [
		HttpClientTestingModule,
		NoopAnimationsModule
	],
	providers: [
		importProvidersFrom(MonacoEditorModule.forRoot()),
	]
})
export class NoopTestingModule {}
