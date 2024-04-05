import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexFormComponentComponent } from './complex-form.component';

describe('ComplexFormComponentComponent', () => {
  let component: ComplexFormComponentComponent;
  let fixture: ComponentFixture<ComplexFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
