import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransponderStatusComponent } from './transponder-status.component';

describe('TransponderStatusComponent', () => {
  let component: TransponderStatusComponent;
  let fixture: ComponentFixture<TransponderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransponderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransponderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
