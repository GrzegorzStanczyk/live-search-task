import { TestBed } from '@angular/core/testing';

import { StateFacadeService } from './state-facade.service';

describe('StateFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateFacadeService = TestBed.get(StateFacadeService);
    expect(service).toBeTruthy();
  });
});
