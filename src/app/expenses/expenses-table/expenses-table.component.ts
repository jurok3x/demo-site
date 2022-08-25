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
  params!: RequestParams;
  expenses!: Expense[];
  expenses$!: Observable<Expense[]>;
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'name', 'price', 'categoryDTO.name', 'date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(
    private expensesService: ExpensesService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
    this.expensesService.findExpenses(this.userId, this.params).subscribe(
      result => {
        this.expenses = result
        this.dataSource.data = this.expenses;
      }
    )
  }
}
