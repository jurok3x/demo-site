import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../service/authentification.service';
import { MaterialsService } from '../service/material.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  
  form!: FormGroup;
  helper = new JwtHelperService();
  aSub!: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService
  ) {  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )

    this.route.queryParams.subscribe((params: Params) =>{
      if(params['registered']){
        MaterialsService.toast('Ви вже зареєстровані в системі')
      } else if(params['accessDenied']){
        MaterialsService.toast('Для роботи в системі спершу зареєструйтесь або створіть акаунт')
      } else if(params['sessionExpired']){
        MaterialsService.toast('Час сесії закінчився, будь ласка перезайдіть в систему')
      }
    })
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe(); 
    } 
  }

  onSubmit(): void {
    this.form.disable();
    this.aSub = forkJoin([
      this.authService.login(this.form.getRawValue()),
      this.authService.analyticsLogin(this.form.getRawValue())
    ]).subscribe({
      next: () => {
        localStorage.setItem(environment.userIdName,
          this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id)
        this.router.navigate(['/main'])
      },
      error: error => {
        MaterialsService.toast(error.error.message)
        this.form.enable()
      }
    })
  }
}
