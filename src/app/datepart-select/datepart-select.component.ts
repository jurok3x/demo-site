import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsUtilsService } from '../service/analytics-utils.service';

@Component({
  selector: 'app-datepart-select',
  templateUrl: './datepart-select.component.html',
  styleUrls: ['./datepart-select.component.css']
})
export class DatepartSelectComponent implements OnInit {

  years!: number[]
  helper = new JwtHelperService()
  userId!: number
  currentYear: number = new Date().getFullYear()
  currentMonth: number = new Date().getMonth()
  months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень',
'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
 @Output() yearEvent = new EventEmitter<number>();
 @Output() monthEvent = new EventEmitter<number>();
 @Input('isMonth') isMonth: boolean = true

  constructor(private utilsService: AnalyticsUtilsService) { }

  ngOnInit(): void {
    if(localStorage.getItem(environment.tokenName)){
      this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    }
    this.utilsService.getActiveYears(this.userId).subscribe(
      (result) => {
        this.currentYear = new Date().getFullYear()
        this.years = result
        if (!result.includes(this.currentYear)) {
          this.years.push(this.currentYear)
        }
      }
    )
  }

  changeYear(year: number){
    this.yearEvent.emit(year)
  }

  changeMonth(month: number){
    this.monthEvent.emit(month)
  }

}
