import { TestBed } from '@angular/core/testing';

import { RFIDServiceService } from './rfidservice.service';

describe('RFIDServiceService', () => {
  let service: RFIDServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RFIDServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
