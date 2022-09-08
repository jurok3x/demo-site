import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RequestParams } from 'src/app/model/requestParams';
import { environment } from 'src/environments/environment';
import { Expense } from '../../model/expense';
import { ExpensesService } from '../../service/expenses.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/model/category';
import { Router } from '@angular/router';
import { MaterialsService } from 'src/app/service/material.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit, AfterViewInit {

  params: RequestParams = {categoryId: null, month: new Date().getMonth(), year: new Date().getFullYear()};
  expenses: Expense[] = [];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'name', 'price', 'categoryDTO.name', 'date', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; 
  }

  ngOnInit(): void {
    this.getExpenses()
  }

  delete(expenseId: number) {
    this.expensesService.delete(expenseId).subscribe(
      () => {
        MaterialsService.toast('Запис успішно видалено')
        this.getExpenses()
      }
    )
  }

  edit(expenseId: number) {
    this.router.navigate([`/expenses/${expenseId}`])
  }

  getExpenses() {
    this.expensesService.findExpenses(parseInt(localStorage.getItem(environment.userIdName) || ''), this.params).subscribe(
      result => {
        this.expenses = result
        this.dataSource.data = this.expenses;
      }
    )
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
}
