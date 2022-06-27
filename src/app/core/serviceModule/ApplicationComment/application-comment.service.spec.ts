import { TestBed } from '@angular/core/testing';

import { ApplicationCommentService } from './application-comment.service';

describe('ApplicationCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationCommentService = TestBed.get(ApplicationCommentService);
    expect(service).toBeTruthy();
  });
});
