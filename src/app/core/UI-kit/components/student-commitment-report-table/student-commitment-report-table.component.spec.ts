import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommitmentReportTableComponent } from './student-commitment-report-table.component';

describe('StudentCommitmentReportTableComponent', () => {
  let component: StudentCommitmentReportTableComponent;
  let fixture: ComponentFixture<StudentCommitmentReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCommitmentReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCommitmentReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
