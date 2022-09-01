import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Income } from 'src/app/model/income';
import { of, switchMap } from 'rxjs';
import { IncomesService } from 'src/app/service/incomes.service';
import { MaterialsService } from 'src/app/service/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incomes-form',
  templateUrl: './incomes-form.component.html',
  styleUrls: ['./incomes-form.component.css']
})
export class IncomesFormComponent implements OnInit {

  form!: FormGroup
  isNew = true
  income!: Income

  constructor(private route: ActivatedRoute,
    private router: Router, private incomesService: IncomesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      date: new FormControl(null, Validators.required)
    })
    this.form.disable()
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
            this.isNew = false
            return this.incomesService.findById(params['id'])
          }
          return of(null)
        }  
      )
    ).subscribe(
      {
        next: income => {
          if(income){
            this.income = income
            this.form.patchValue({
              name: income.name,
              amount: income.amount,
              date: income.date
            })
            MaterialsService.updateTextInputs()
          }
          this.form.enable()
        },
        error: error => {MaterialsService.toast(error.error.message)}
      }
    )
  }

  onSubmit(){
    this.form.disable()
    let date: Date = this.form.getRawValue().date
    let income: Income = {
      name: this.form.getRawValue().name,
      amount: parseFloat(this.form.getRawValue().amount),
      date: new Date(Date.UTC( date.getFullYear(), date.getMonth(), date.getDate())) ,
      userDTO: {
        id: parseInt(localStorage.getItem(environment.userIdName) || '')
      }
    }
    let obs$
    if(this.isNew){
      obs$ = this.incomesService.save(income)
    } else{
      income.id = this.income.id
      obs$ = this.incomesService.update(income)
    }
    obs$.subscribe({
      next: () => {
        MaterialsService.toast('Зміни збережено')
        this.form.enable()
        this.router.navigate(['/incomes'])
      },
      error: error => {
        MaterialsService.toast(error.error.message)
        this.form.enable()
      }
    })
  }

}
