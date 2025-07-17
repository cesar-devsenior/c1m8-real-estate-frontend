import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCard } from './property-card';

describe('PropertyCard', () => {
  let component: PropertyCard;
  let fixture: ComponentFixture<PropertyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
