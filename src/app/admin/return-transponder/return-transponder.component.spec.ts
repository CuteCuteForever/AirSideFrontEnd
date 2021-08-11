import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnTransponderComponent } from './return-transponder.component';

describe('ReturnTransponderComponent', () => {
  let component: ReturnTransponderComponent;
  let fixture: ComponentFixture<ReturnTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
