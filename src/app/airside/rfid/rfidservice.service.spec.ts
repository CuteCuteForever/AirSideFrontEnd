import { TestBed } from '@angular/core/testing';

import { RFIDService } from './r-f-i-d.service';

describe('RFIDServiceService', () => {
  let service: RFIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RFIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
