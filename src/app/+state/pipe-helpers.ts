import { map } from 'rxjs/operators';
import { SearchFormData } from './state-facade.service';

export const mapByFilter = map(([state, list]: [SearchFormData, string[]]) => [
  state,
  state.filter === 'all'
    ? list
    : list.filter(item => item.includes(state.filter))
]);

export const mapBySearch = map(([state, list]: [SearchFormData, string[]]) => [
  state,
  list.filter(item => item.includes(state.search))
]);

export const mapByOrder = map(([state, list]: [SearchFormData, string[]]) => [
  state,
  !!state.order ? list.sort() : list.sort().reverse()
]);
