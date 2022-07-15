import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './body/forgot-password/forgot-password.component';
import { HomeComponent } from './body/home/home.component';
import { LoginComponent } from './body/login/login.component';
import { PageNotFoundComponent } from './body/page-not-found/page-not-found.component';
import { ProfileComponent } from './body/profile/profile.component';
import { SignupComponent } from './body/signup/signup.component';
import { VerifyUserComponent } from './body/verify-user/verify-user.component';
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard], pathMatch: 'full' },
  { path: 'verify-user/:verification-token', component: VerifyUserComponent},
  { path: 'login', component: LoginComponent, canActivate:[ReverseAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate:[ReverseAuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate:[ReverseAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
