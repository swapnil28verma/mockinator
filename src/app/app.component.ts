import { Component } from '@angular/core';
import { MockBuilderComponent } from 'mock-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MockBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
