import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransponderStatusComponent } from './view-transponder-status.component';

describe('ViewTransponderStatusComponent', () => {
  let component: ViewTransponderStatusComponent;
  let fixture: ComponentFixture<ViewTransponderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransponderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransponderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
