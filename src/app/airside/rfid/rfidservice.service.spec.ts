import { TestBed } from '@angular/core/testing';

import { RfidService } from './rfid.service';

describe('RFIDServiceService', () => {
  let service: RfidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
