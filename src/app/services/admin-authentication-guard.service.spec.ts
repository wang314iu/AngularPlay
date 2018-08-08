import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthenticationGuardService } from './admin-authentication-guard.service';

describe('AdminAuthenticationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthenticationGuardService]
    });
  });

  it('should be created', inject([AdminAuthenticationGuardService], (service: AdminAuthenticationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
