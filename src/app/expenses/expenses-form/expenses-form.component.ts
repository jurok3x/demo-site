import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Expense } from 'src/app/model/expense';
import { ExpensesService } from 'src/app/service/expenses.service';
import { MaterialsService } from 'src/app/service/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})
export class ExpensesFormComponent implements OnInit {

  form!: FormGroup
  isNew = true
  expense!: Expense

  constructor(private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]),
      category: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    })
    this.form.disable()
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
            this.isNew = false
            return this.expensesService.findById(params['id'])
          }
          return of(null)
        }  
      )
    ).subscribe(
      {
        next: expense => {
          if(expense){
            this.expense = expense
            this.form.patchValue({
              name: expense.name,
              price: expense.price,
              date: new Date(expense.date),
              category: expense.categoryDTO.id
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
    let expense: Expense = {
      name: this.form.getRawValue().name,
      price: parseFloat(this.form.getRawValue().price),
      date: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) ,
      categoryDTO: {
        id: this.form.getRawValue().category
      },
      userDTO: {
        id: parseInt(localStorage.getItem(environment.userIdName) || '')
      }
    }
    let obs$
    if(this.isNew){
      obs$ = this.expensesService.save(expense)
    } else {
      expense.id = this.expense.id
      obs$ = this.expensesService.update(expense)
    }
    obs$.subscribe({
      next: () => {
        MaterialsService.toast('Зміни збережено')
        this.form.enable()
        this.router.navigate(['/expenses'])
      },
      error: error => {
        MaterialsService.toast(error.error.message)
        this.form.enable()
      }
    })
  }

}
