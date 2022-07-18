import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetForgotPasswordComponent } from './reset-forgot-password.component';

describe('ResetForgotPasswordComponent', () => {
  let component: ResetForgotPasswordComponent;
  let fixture: ComponentFixture<ResetForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetForgotPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
