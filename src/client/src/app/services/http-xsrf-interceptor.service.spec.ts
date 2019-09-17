import { TestBed } from '@angular/core/testing';

import { HttpXsrfInterceptor } from './http-xsrf-interceptor.service';
import { HttpClientXsrfModule } from '@angular/common/http';

describe('HttpXsrfInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientXsrfModule],
  }));

  it('should be created', () => {
    const service: HttpXsrfInterceptor = TestBed.get(HttpXsrfInterceptor);
    expect(service).toBeTruthy();
  });
});
