import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPaginationComponent } from './x-pagination.component';

describe('XPaginationComponent', () => {
  let component: XPaginationComponent;
  let fixture: ComponentFixture<XPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
