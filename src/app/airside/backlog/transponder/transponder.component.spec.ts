import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransponderComponent } from './transponder.component';

describe('TransponderComponent', () => {
  let component: TransponderComponent;
  let fixture: ComponentFixture<TransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
