import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicedTransponderComponent } from './serviced-transponder.component';

describe('ServicedTransponderComponent', () => {
  let component: ServicedTransponderComponent;
  let fixture: ComponentFixture<ServicedTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicedTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicedTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
