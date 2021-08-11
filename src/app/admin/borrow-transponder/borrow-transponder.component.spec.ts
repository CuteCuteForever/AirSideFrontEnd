import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowTransponderComponent } from './borrow-transponder.component';

describe('BorrowTransponderComponent', () => {
  let component: BorrowTransponderComponent;
  let fixture: ComponentFixture<BorrowTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
