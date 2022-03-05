import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentViewComponent } from './commitment-view.component';

describe('CommitmentViewComponent', () => {
  let component: CommitmentViewComponent;
  let fixture: ComponentFixture<CommitmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
