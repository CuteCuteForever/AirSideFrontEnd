import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessErrorDialogComponent } from './success-error-dialog.component';

describe('SuccessDialogComponent', () => {
  let component: SuccessErrorDialogComponent;
  let fixture: ComponentFixture<SuccessErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
