import { TestBed } from '@angular/core/testing';
import { HttpInterceptor, } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';

describe('jwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
    const authService = TestBed.inject(AuthenticationService);
    interceptor = new JwtInterceptor(authService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
