import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetail } from './property-detail';

describe('PropertyDetail', () => {
  let component: PropertyDetail;
  let fixture: ComponentFixture<PropertyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
