import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyForm } from './property-form';

describe('PropertyForm', () => {
  let component: PropertyForm;
  let fixture: ComponentFixture<PropertyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
