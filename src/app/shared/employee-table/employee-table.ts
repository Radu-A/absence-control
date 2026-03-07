import { Component, input, output } from '@angular/core';

import { User } from '../../core/models/user.model';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { PageModel } from '../../core/models/page.model';

@Component({
  selector: 'app-employee-table',
  imports: [MatTableModule, MatIcon, MatPaginator, RouterLink],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.scss',
})
export class EmployeeTable {
  dataSource = input.required<User[] | null>();
  totalElements = input.required<number>();
  pageLimit = input.required<number>();
  pageIndex = input.required<number>();

  page = output<PageModel>();

  displayedColumns: string[] = ['taxId', 'employee', 'phone', 'NSS', 'jobTitle', 'actions'];

  handlePageEvent(pageEvent: PageModel) {
    this.page.emit(pageEvent);
  }
}
