import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExpensesTableComponent } from './expenses/expenses-table/expenses-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { LogoutComponent } from './logout/logout.component';
import { BodyComponent } from './body/body.component';
import { MatSelectModule } from '@angular/material/select';
import { CategorySelectComponent } from './categories/category-select/category-select.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { TokenInterceptor } from './utils/tokenInterceptor';
import { MainComponent } from './main/main.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { PopularExpensesComponent } from './expenses/popular-expenses/popular-expenses.component';
import {MatInputModule} from '@angular/material/input';
import { DatepartSelectComponent } from './datepart-select/datepart-select.component';
import { ExpensesFormComponent } from './expenses/expenses-form/expenses-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesTableComponent,
    LoginFormComponent,
    LogoutComponent,
    BodyComponent,
    CategorySelectComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegistrationComponent,
    MainComponent,
    AnalyticsComponent,
    CategoriesComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PopularExpensesComponent,
    DatepartSelectComponent,
    ExpensesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
