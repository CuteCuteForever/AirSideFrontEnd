import { TestBed } from '@angular/core/testing';

import { TransponderServiceService } from './transponder-service.service';

describe('TransponderServiceService', () => {
  let service: TransponderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransponderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
