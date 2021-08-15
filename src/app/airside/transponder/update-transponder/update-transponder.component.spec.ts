import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransponderComponent } from './update-transponder.component';

describe('UpdateTransponderComponent', () => {
  let component: UpdateTransponderComponent;
  let fixture: ComponentFixture<UpdateTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
