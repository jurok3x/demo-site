import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { RequestParams } from 'src/app/model/requestParams';
import { environment } from 'src/environments/environment';
import { Expense } from '../../model/expense';
import { ExpensesService } from '../../service/expenses.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit, AfterViewInit {

  helper = new JwtHelperService();
  userId! : number;
  params: RequestParams = {categoryId: null, month: new Date().getMonth(), year: new Date().getFullYear()};
  expenses: Expense[] = [];
  expenses$!: Observable<Expense[]>;
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'name', 'price', 'categoryDTO.name', 'date', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categoryId: number | null = null
  
  
  constructor(
    private expensesService: ExpensesService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
  }

  ngOnInit(): void {
    if(localStorage.getItem(environment.tokenName)){
      this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    }
    this.expensesService.findExpenses(this.userId, this.params).subscribe(
      result => {
        this.expenses = result
        this.dataSource.data = this.expenses;
      }
    )
  }

  delete(expenseId: number) {

  }

  edit(expenseId: number) {
    
  }

  setYear(year: number | null) {
    this.params.year = year
    this.getExpenses()
  }

  setMonth(month: number | null) {
    this.params.month = month
    this.getExpenses()
  }

  setCategoryId(categoryId: number) {
    this.params.categoryId = categoryId
    this.getExpenses()
  }

  getExpenses() {
    this.expensesService.findExpenses(this.userId, this.params).subscribe(
      result => {
        this.expenses = result
        this.dataSource.data = this.expenses;
      }
    )
  }
}
