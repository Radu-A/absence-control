import { Component, input, InputSignal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { Absence } from '../../core/models/absence.model';
import { PageModel } from '../../core/models/page.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule, CommonModule, RouterLink, MatPaginator],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  dataSource: InputSignal<Absence[] | null> = input.required();
  totalElements = input.required();
  pageLimit = input.required();
  pageIndex = input.required();
  page = output<PageModel>();

  handlePageEvent(pageEvent: PageModel) {
    this.page.emit(pageEvent);
  }

  displayedColumns: string[] = ['id', 'employee', 'dates', 'status', 'actions'];
}
