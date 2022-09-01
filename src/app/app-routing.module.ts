import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExpensesFormComponent } from './expenses/expenses-form/expenses-form.component';
import { IncomesFormComponent } from './incomes/incomes-form/incomes-form.component';
import { IncomesComponent } from './incomes/incomes.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'logout', component: LogoutComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationComponent }
  ] },
  { path: '', canActivate: [AuthGuard], component: SiteLayoutComponent, children: [
    { path: 'main', component: MainComponent },
    { path: 'main/expenses/new', component: ExpensesFormComponent },
    { path: 'main/expenses/:id', component: ExpensesFormComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/new', component: CategoriesFormComponent },
    { path: 'categories/:id', component: CategoriesFormComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'incomes', component: IncomesComponent },
    { path: 'incomes/new', component: IncomesFormComponent },
    { path: 'incomes/:id', component: IncomesFormComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
