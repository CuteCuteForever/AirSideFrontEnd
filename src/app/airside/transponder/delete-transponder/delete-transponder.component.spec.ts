import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransponderComponent } from './delete-transponder.component';

describe('DeleteTransponderComponent', () => {
  let component: DeleteTransponderComponent;
  let fixture: ComponentFixture<DeleteTransponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTransponderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
