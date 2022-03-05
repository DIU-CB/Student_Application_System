import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSelectComponent } from './shift-select.component';

describe('ShiftSelectComponent', () => {
  let component: ShiftSelectComponent;
  let fixture: ComponentFixture<ShiftSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
