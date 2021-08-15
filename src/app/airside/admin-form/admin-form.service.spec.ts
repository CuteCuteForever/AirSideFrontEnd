import { TestBed } from '@angular/core/testing';

import { AdminFormService } from './admin-form.service';

describe('TransactionService', () => {
  let service: AdminFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
