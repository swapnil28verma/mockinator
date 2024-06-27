import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { CommonModule, NgIf, UpperCasePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { MockBuilderService } from './mock-builder.service';
import { RequestType } from './models/request.type';
import { RequestMock } from './models/request.mock';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mock-builder',
  providers: [MockBuilderService],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MonacoEditorModule,
    MatTableModule,
    NgIf,
    UpperCasePipe,
  ],
  templateUrl: './mock-builder.component.html',
  styleUrl: './mock-builder.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      transition(':enter', [style({ height: '0px', minHeight: '0' }), animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*' }))]),
      transition(':leave', [style({ height: '*' }), animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0', minHeight: '0' }))])
    ])
  ]
})
export class MockBuilderComponent {
  public readonly options = {
    theme: 'vs-dark',
    language: 'json',
    formatOnType: true,
    minimap: {
      enabled: false
    },
    wordWrap: 'on',
    folding: true,
    showFoldingControls: 'always'
  };
  public readonly optionsReadOnly = {
    ...this.options,
    readOnly: true
  };

  private onDestroy$ = new Subject<void>();

  RequestTypeEnum = RequestType;
  requestType = RequestType.GET;
  requestUrl = '';
  responseBody = '';

  columns = ['type', 'url', 'actions'];
  expandedMock: RequestMock | null = null;

  savedMocks: RequestMock[] = [];

  @ViewChild(MatTable, { static: true }) table!: MatTable<RequestMock>;

  constructor(private mockBuilderService: MockBuilderService,
              private snackbarService: MatSnackBar) {}

  ngOnInit() {
    this.mockBuilderService.savedMocks$.pipe(takeUntil(this.onDestroy$)).subscribe(savedMocks => {
      this.savedMocks = savedMocks;
      this.table.renderRows();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  clearMockConfiguration() {
    this.requestType = RequestType.GET;
    this.requestUrl = '';
    this.responseBody = '';
  }

  onSubmit() {
    const newMock = new RequestMock(this.requestType, this.requestUrl, this.responseBody);
    this.mockBuilderService.addMock(newMock);
    this.clearMockConfiguration();
    this.snackbarService.open('New mock added successfully', '', { duration: 5000 });
  }

  onTest(mock: RequestMock) {
    this.mockBuilderService.testMock(mock).subscribe((response) => {
      console.log(response);
    });
  }

  onEdit(mock: RequestMock) {
    console.log(mock);
  }

  onDelete(mockId: string) {
    this.mockBuilderService.removeMock(mockId);
    this.snackbarService.open('Mock removed successfully', '', { duration: 5000 });
  }
}
