import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthorizedGuard } from './unauthorized.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('UnauthorizedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UnauthorizedGuard]
    });
  });

  it('should ...', inject([UnauthorizedGuard], (guard: UnauthorizedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
