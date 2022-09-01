import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Income } from '../model/income';
import { RequestParams } from '../model/requestParams';
import { IncomesService } from '../service/incomes.service';
import { MaterialsService } from '../service/material.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit, AfterViewInit {

  params: RequestParams = {month: null, year: null};
  incomes: Income[] = []
  dataSource: MatTableDataSource<Income> = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'name', 'amount', 'date', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private incomesService: IncomesService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; 
  }

  ngOnInit(): void {
    this.getExpenses()
  }

  getExpenses() {
    this.incomesService.findIncomes(parseInt(localStorage.getItem(environment.userIdName) || ''), this.params).subscribe(
      result => {
        this.incomes = result
        this.dataSource.data = this.incomes;
      }
    )
  }

  delete(incomeId: number) {
    this.incomesService.delete(incomeId).subscribe(
      () => {
        MaterialsService.toast('Запис успішно видалено')
        this.getExpenses()
      }
    )
  }

  edit(incomeId: number) {
    this.router.navigate([`/incomes/${incomeId}`])
  }

}
