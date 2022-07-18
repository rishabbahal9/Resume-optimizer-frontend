import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetForgotPasswordFormComponent } from './reset-forgot-password-form.component';

describe('ResetForgotPasswordFormComponent', () => {
  let component: ResetForgotPasswordFormComponent;
  let fixture: ComponentFixture<ResetForgotPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetForgotPasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetForgotPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
