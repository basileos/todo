import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorizedGuard } from './authorized-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthorizedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthorizedGuard]
    });
  });

  it('should ...', inject([AuthorizedGuard], (guard: AuthorizedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
