import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyList } from './property-list';

describe('PropertyList', () => {
  let component: PropertyList;
  let fixture: ComponentFixture<PropertyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
