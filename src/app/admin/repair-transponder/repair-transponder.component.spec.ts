import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTransponderComponent } from './repair-transponder.component';

describe('RepairTransponderComponent', () => {
  let component: RepairTransponderComponent;
  let fixture: ComponentFixture<RepairTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
