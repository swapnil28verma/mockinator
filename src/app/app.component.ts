import { Component, ViewEncapsulation } from '@angular/core';
import { MockBuilderComponent } from 'mock-builder';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [MockBuilderComponent, RouterLink, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-root'}
})
export class AppComponent {
}
