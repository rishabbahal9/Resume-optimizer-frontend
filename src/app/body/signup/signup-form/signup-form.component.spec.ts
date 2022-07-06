import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { SignupFormComponent } from './signup-form.component';

class MockAuthService {
  signup = (
    firstName: String,
    lastName: String,
    email: String,
    password: String
  ) => {
    // Signup method to do
  };
}
class MockRouter {}

let authService: AuthService;
describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],

      providers: [
        SignupFormComponent,
        { provide: AuthService, useClass: MockAuthService },
        Router,
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showError variable should be false by default', () => {
    expect(component.showError).toBeFalse();
  });

  it('errorMessage variable should be blank by default', () => {
    expect(component.errorMessage).toEqual('');
  });

  it('signupSuccessful variable should be false by default', () => {
    expect(component.signupSuccessful).toBeFalse();
  });

  it('signupForm should be declared', () => {
    expect(component.signupForm).toBeTruthy();
  });

  it('onSubmit method should be declared', () => {
    expect(component.onSubmit).toBeDefined();
  });
});
