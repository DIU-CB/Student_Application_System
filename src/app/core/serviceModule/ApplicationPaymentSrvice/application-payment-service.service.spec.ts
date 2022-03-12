import { TestBed } from '@angular/core/testing';

import { ApplicationPaymentServiceService } from './application-payment-service.service';

describe('ApplicationPaymentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationPaymentServiceService = TestBed.get(ApplicationPaymentServiceService);
    expect(service).toBeTruthy();
  });
});
