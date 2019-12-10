import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  StateFacadeService,
  SearchFormData,
  SortOrder
} from 'src/app/+state/state-facade.service';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnDestroy {
  private destroy$ = new Subject();
  private readonly initialForm: SearchFormData = {
    search: '',
    filter: 'all',
    order: SortOrder.None
  };

  public sortOrder = SortOrder;
  public filters = this.state.filters;
  public searchForm = this.fb.group({
    search: this.initialForm.search,
    filter: [this.initialForm.filter, Validators.required],
    order: [this.initialForm.order, Validators.required]
  });

  constructor(private fb: FormBuilder, private state: StateFacadeService) {
    this.searchForm.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(this.searchForm.value))
      .subscribe(formData => this.state.setFormData(formData));
  }

  public reset(): void {
    this.searchForm.reset(this.initialForm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
