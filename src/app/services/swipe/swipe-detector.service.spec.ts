import { TestBed } from '@angular/core/testing';

import { SwipeDetectorService } from './swipe-detector.service';

describe('SwipeDetectorService', () => {
  let service: SwipeDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipeDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
