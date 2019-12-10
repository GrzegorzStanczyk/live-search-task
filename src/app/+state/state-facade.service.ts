import { Injectable } from '@angular/core';
import { of, defer, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { mapByFilter, mapBySearch, mapByOrder } from './pipe-helpers';

type Filters = 'all' | 'image' | 'document' | 'video' | 'audio';

export enum SortOrder {
  Descending = -1,
  None = 0,
  Ascending = 1
}

export interface SearchFormData {
  order: SortOrder;
  search: string;
  filter: Filters;
}

@Injectable({
  providedIn: 'root'
})
export class StateFacadeService {
  private source: Observable<SearchFormData>;
  private readonly list = of(
    ['image', 'document', 'video', 'audio'].reduce((prev, curr) => {
      const typeList = new Array(5).fill(undefined).map((v, i) => curr + i);
      return prev.concat(typeList);
    }, [])
  );

  public filters: Filters[] = ['all', 'image', 'document', 'video', 'audio'];
  public itemsList$ = defer(() =>
    this.source.pipe(
      withLatestFrom(this.list),
      mapByFilter,
      mapBySearch,
      mapByOrder,
      map(([, list]) => list)
    )
  );

  public setSource(source: Observable<SearchFormData>) {
    this.source = source;
  }
}
