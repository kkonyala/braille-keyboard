import { TestBed } from '@angular/core/testing';

import { FetchResultService } from './fetch-result.service';

describe('FetchResultService', () => {
  let service: FetchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
