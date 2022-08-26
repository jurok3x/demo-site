import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Expense } from 'src/app/model/expense';
import { ExpensesService } from 'src/app/service/expenses.service';

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
      price: new FormControl('0.0', [Validators.required, Validators.pattern('')]),
      category: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    }) 
    this.route.queryParams.pipe(
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
          }
          
        }
      }
    )
  }

}
