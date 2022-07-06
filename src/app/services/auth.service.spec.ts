import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const dummy_user = {
    firstName: 'abc',
    lastName: 'def',
    email: 'abc.def@test.com',
    password: 'test123',
  };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new AuthService(httpClientSpy);
  });

  it('Authservice should be created', () => {
    expect(service).toBeTruthy();
  });

  // Signup method testing suit
  describe('Signup method', () => {
    it('Signup working', () => {
      httpClientSpy.post.and.returnValue(
        of({
          first_name: dummy_user.firstName,
          last_name: dummy_user.lastName,
          email: dummy_user.email,
          username: dummy_user.firstName,
          id: 1,
        })
      );

      service
        .signup(
          dummy_user.firstName,
          dummy_user.lastName,
          dummy_user.email,
          dummy_user.password
        )
        .subscribe({
          next: (data) => {
            expect(data).toEqual({
              first_name: dummy_user.firstName,
              last_name: dummy_user.lastName,
              email: dummy_user.email,
              username: dummy_user.firstName,
              id: 1,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      expect(service).toBeTruthy();
    });
  });
});
