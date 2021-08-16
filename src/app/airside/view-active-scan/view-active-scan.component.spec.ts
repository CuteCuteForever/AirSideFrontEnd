import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActiveScanComponent } from './view-active-scan.component';

describe('ViewActiveScanComponent', () => {
  let component: ViewActiveScanComponent;
  let fixture: ComponentFixture<ViewActiveScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActiveScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActiveScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
