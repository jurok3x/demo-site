import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emmiters/Emitters';
import { AuthResponse } from '../model/auth-response';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  apiServerUrl = environment.apiUrl;

  helper = new JwtHelperService();

  errorMessage = "";
  
  form: FormGroup = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthentificationService
  ) {  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.form.getRawValue()).subscribe(
      (data: AuthResponse) => {
        localStorage.setItem(environment.tokenName, data.token);
        if (this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString())) {
          this.errorMessage = ": Invalid email or password"
        } else {
          Emitters.authEmitter.emit(true);
        }
      }
      ).add(
        this.authService.analyticsLogin(this.form.getRawValue()).subscribe(
          (data: AuthResponse) => {
            localStorage.setItem(environment.analyticsTokenName, data.token);
            if (this.helper.isTokenExpired(localStorage.getItem(environment.analyticsTokenName)?.toString())) {
              this.errorMessage = ": Invalid email or password"
            }
          } 
        )
      ); 
  }
}
