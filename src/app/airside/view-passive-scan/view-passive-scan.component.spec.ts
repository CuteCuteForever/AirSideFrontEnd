import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPassiveScanComponent } from './view-passive-scan.component';

describe('ViewPassiveScanComponent', () => {
  let component: ViewPassiveScanComponent;
  let fixture: ComponentFixture<ViewPassiveScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPassiveScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPassiveScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
