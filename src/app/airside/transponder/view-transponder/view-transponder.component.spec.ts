import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransponderComponent } from './view-transponder.component';

describe('ViewTransponderComponent', () => {
  let component: ViewTransponderComponent;
  let fixture: ComponentFixture<ViewTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
