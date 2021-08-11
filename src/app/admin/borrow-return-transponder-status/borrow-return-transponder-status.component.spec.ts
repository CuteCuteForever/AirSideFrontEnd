import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowReturnTransponderStatusComponent } from './borrow-return-transponder-status.component';

describe('BorrowReturnTransponderStatusComponent', () => {
  let component: BorrowReturnTransponderStatusComponent;
  let fixture: ComponentFixture<BorrowReturnTransponderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowReturnTransponderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowReturnTransponderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
