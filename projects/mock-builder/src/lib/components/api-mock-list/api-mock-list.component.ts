import { Component, inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { RequestMock } from "../../models/request.mock";
import { MockBuilderService } from "../../services";
import { MatSnackBar } from "@angular/material/snack-bar";
import { monacoOptionsReadOnly } from "../../utils";
import { Subject, takeUntil } from "rxjs";
import { FormsModule } from "@angular/forms";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
	selector: 'app-api-mock-list',
	standalone: true,
	imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatIconButton, MatRow, MatRowDef, MatTable, MonacoEditorModule, FormsModule, MatHeaderCellDef],
	templateUrl: './api-mock-list.component.html',
	styleUrl: './api-mock-list.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {class: 'app-api-mock-list'},
	animations: [
		trigger('detailExpand', [
			transition(':enter', [style({
				height: '0px',
				minHeight: '0'
			}), animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({height: '*'}))]),
			transition(':leave', [style({height: '*'}), animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
				height: '0',
				minHeight: '0'
			}))])
		])
	]
})
export class ApiMockListComponent implements OnInit, OnDestroy {
	protected readonly monacoOptionsReadOnly = monacoOptionsReadOnly;
	readonly mockBuilderService: MockBuilderService = inject(MockBuilderService);
	readonly snackbarService: MatSnackBar = inject(MatSnackBar);

	private onDestroy$ = new Subject<void>();

	@ViewChild(MatTable, {static: true}) table!: MatTable<RequestMock>;

	columns = ['type', 'url', 'actions'];
	expandedMock: RequestMock | null = null;

	dataSource = new MatTableDataSource<RequestMock>([]);

	ngOnInit() {
		this.mockBuilderService.savedMocks$.pipe(takeUntil(this.onDestroy$)).subscribe(savedMocks => {
			this.dataSource.data = savedMocks || [];
			if (this.table) {
				this.table.renderRows();
			}
		});
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
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
		this.snackbarService.open('Mock removed successfully', '', {duration: 5000});
	}

	onRowClick(mock: RequestMock, event: Event) {
		this.expandedMock = this.expandedMock === mock ? null : mock;
		event.stopPropagation();
	}
}
