import { map } from 'rxjs/operators';
import { SearchFormData } from './state-facade.service';

export const mapByFilter = map(([form, list]: [SearchFormData, string[]]) => [
  form,
  form.filter === 'all' ? list : list.filter(item => item.includes(form.filter))
]);

export const mapBySearch = map(([form, list]: [SearchFormData, string[]]) => [
  form,
  list.filter(item => item.includes(form.search))
]);

export const mapByOrder = map(([form, list]: [SearchFormData, string[]]) => [
  form,
  !!form.order
    ? list
        .slice()
        .sort((a, b) => (a > b ? form.order : a < b ? -form.order : 0))
    : list
]);
