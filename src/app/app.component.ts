import { Component } from '@angular/core';
import { MockBuilderComponent } from 'mock-builder';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
	imports: [MockBuilderComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
