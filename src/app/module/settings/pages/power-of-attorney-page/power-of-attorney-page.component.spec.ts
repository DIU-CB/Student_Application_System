import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerOfAttorneyPageComponent } from './power-of-attorney-page.component';

describe('PowerOfAttorneyPageComponent', () => {
  let component: PowerOfAttorneyPageComponent;
  let fixture: ComponentFixture<PowerOfAttorneyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerOfAttorneyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerOfAttorneyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
