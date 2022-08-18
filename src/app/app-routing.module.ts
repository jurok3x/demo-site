import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'logout', component: LogoutComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationComponent }
  ] },
  { path: 'main', canActivate: [AuthGuard], component: SiteLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
