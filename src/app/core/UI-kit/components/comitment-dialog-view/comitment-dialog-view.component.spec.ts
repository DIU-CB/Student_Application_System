import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitmentDialogViewComponent } from './comitment-dialog-view.component';

describe('ComitmentDialogViewComponent', () => {
  let component: ComitmentDialogViewComponent;
  let fixture: ComponentFixture<ComitmentDialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComitmentDialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitmentDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
