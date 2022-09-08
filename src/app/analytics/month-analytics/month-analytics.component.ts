import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ChartView } from 'src/app/model/chartView';
import { LineChartView } from 'src/app/model/lineChartView';
import { RequestParams } from 'src/app/model/requestParams';
import { MonthAnalyticsService } from 'src/app/service/month-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-month-analytics',
  templateUrl: './month-analytics.component.html',
  styleUrls: ['./month-analytics.component.css']
})
export class MonthAnalyticsComponent implements OnInit {

  monthExpensesAnalytics: LineChartView = {name: '', series: []}
  monthIncomesAnalytics: LineChartView = {name: '', series: []}
  monthBalanceAnalytics: LineChartView = {name: '', series: []}
  lineChartView!: LineChartView[]
  requestParams: RequestParams = {categoryId: null, year: new Date().getFullYear()};
  userId = parseInt(localStorage.getItem(environment.userIdName) || '')
  analyticsType!: string[];

  constructor(private analyticsService: MonthAnalyticsService) { }

  ngOnInit(): void {
    this.analyticsType = ['expenses', 'incomes']
    this.getAnalytics()
  }

  selectionChange() {
    this.getAnalytics()
  }
  
  getAnalytics() {
    this.lineChartView = []
    if(this.analyticsType.includes('expenses')){
      this.getExpensesAnalytics()
    }
    if(this.analyticsType.includes('incomes')){
      this.getIncomesAnalytics()
    }
    if(this.analyticsType.includes('balance')){
      this.getBalanceAnalytics()
    }
  }

  getExpensesAnalytics() {
    this.analyticsService.getMonthExpensesAnalytics(this.userId, this.requestParams).pipe(
      map(
        result => result.map(
          (view): ChartView => ({
            name: view.monthName,
            value: view.sum
          })
        )
      )
    ).subscribe(
      result => {
        this.monthExpensesAnalytics.name = 'Витрати'
        this.monthExpensesAnalytics.series = result
        this.lineChartView.push(this.monthExpensesAnalytics)
      }
    )
  }

  getIncomesAnalytics() {
    this.analyticsService.getMonthIncomesAnalytics(this.userId, this.requestParams).pipe(
      map(
        result => result.map(
          (view): ChartView => ({
            name: view.monthName,
            value: view.sum
          })
        )
      )
    ).subscribe(
      result => {
        this.monthIncomesAnalytics.name = 'Доходи'
        this.monthIncomesAnalytics.series = result
        this.lineChartView.push(this.monthIncomesAnalytics)
      }
    )
  }

  getBalanceAnalytics() {
    this.analyticsService.getMonthBalanceAnalytics(this.userId, this.requestParams).pipe(
      map(
        result => result.map(
          (view): ChartView => ({
            name: view.monthName,
            value: view.sum
          })
        )
      )
    ).subscribe(
      result => {
        this.monthBalanceAnalytics.name = 'Баланс'
        this.monthBalanceAnalytics.series = result
        this.lineChartView.push(this.monthBalanceAnalytics)
      }
    )
  }

  setYear(year: number | null) {
    this.requestParams.year = year
    this.getAnalytics()
  }

  setCategoryId(categoryId: number) {
    this.requestParams.categoryId = categoryId
    this.getExpensesAnalytics()
  }

}
