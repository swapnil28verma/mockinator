import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterLink, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-root'}
})
export class AppComponent {
}
