import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransponderComponent } from './register-transponder.component';

describe('RegisterTransponderComponent', () => {
  let component: AddTransponderComponent;
  let fixture: ComponentFixture<AddTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
