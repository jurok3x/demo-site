import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Expense } from '../model/expense';
import { ExpensesService } from '../service/expenses.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {

  helper = new JwtHelperService();
  userId! : number;
  expenses$!: Observable<Expense[]>;
  displayedColumns: string[] = ['id', 'name', 'price', 'categoryDTO.name', 'date'];
  
  constructor(
    private expensesService: ExpensesService
  ) {
    
  }

  formatDate = (date: Date) => {
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    let d = new Date(date)
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/')
  }

  ngOnInit(): void {
    if(localStorage.getItem(environment.tokenName)){
      this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    }
    this.getExpenses();
  }

  getExpenses() {
    this.expenses$ = this.expensesService.findAll(this.userId, 2);
    this.expensesService.findAll(this.userId, 2).subscribe(response =>{console.log(response)});
  }

}
