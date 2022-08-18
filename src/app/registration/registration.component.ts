import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthentificationService } from '../service/authentification.service';
import { MaterialsService } from '../service/material.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  aSub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        name: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe(); 
    } 
  }

  onSubmit(): void {
    this.form.disable();
    this.aSub = this.authService.registration(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error: error => {
        MaterialsService.toast(error.error.message)
        this.form.enable()
      }
    })
  }

}
