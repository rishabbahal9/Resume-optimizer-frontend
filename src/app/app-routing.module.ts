import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './body/forgot-password/forgot-password.component';
import { HomeComponent } from './body/home/home.component';
import { LoginComponent } from './body/login/login.component';
import { PageNotFoundComponent } from './body/page-not-found/page-not-found.component';
import { ProfileComponent } from './body/profile/profile.component';
import { ResetForgotPasswordComponent } from './body/reset-forgot-password/reset-forgot-password.component';
import { SignupComponent } from './body/signup/signup.component';
import { VerifyUserComponent } from './body/verify-user/verify-user.component';
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';

const titlePrefix = $localize`AI resume optimizer: `;
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    title: $localize`${titlePrefix}Home`,
  },
  {
    path: 'verify-user/:verification-token',
    component: VerifyUserComponent,
    title: $localize`${titlePrefix}Verify user`,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ReverseAuthGuard],
    title: $localize`${titlePrefix}Login`,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReverseAuthGuard],
    title: $localize`${titlePrefix}Sign up`,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ReverseAuthGuard],
    title: $localize`${titlePrefix}Forgot password`,
  },
  {
    path: 'reset-forgot-password/:reset-password-token/:uid',
    component: ResetForgotPasswordComponent,
    canActivate: [ReverseAuthGuard],
    title: $localize`${titlePrefix}Reset forgot password`,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    title: $localize`${titlePrefix}Profile`,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    title: $localize`${titlePrefix}Error 404: Page not found`,
  },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
