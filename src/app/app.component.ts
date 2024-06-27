import { Component } from '@angular/core';
import { MockBuilderComponent } from '../../projects/mock-builder/src/lib/mock-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MockBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
