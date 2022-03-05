import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommitmentComponent } from './student-commitment.component';

describe('StudentCommitmentComponent', () => {
  let component: StudentCommitmentComponent;
  let fixture: ComponentFixture<StudentCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
