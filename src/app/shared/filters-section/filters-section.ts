import { Component, input, output } from '@angular/core';
import { Session } from '../../core/models/session.model';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-filters-section',
  imports: [MatInput, MatFormField, MatLabel, MatSelect, MatOption, MatSelectModule],
  templateUrl: './filters-section.html',
  styleUrl: './filters-section.scss',
})
export class FiltersSection {
  currentUser = input.required<Session | null>();
  searchTerm = output<string>();
  statusFilter = output<string>();

  onSearch(term: string) {
    this.searchTerm.emit(term);
  }

  onStatusChange(select: string) {
    this.statusFilter.emit(select);
  }
}
