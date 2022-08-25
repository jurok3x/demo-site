import { Component, OnInit } from '@angular/core';
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

  years$!: Observable<number[]>
  helper = new JwtHelperService()
  userId!: number
  selected!: number
  months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень',
'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

  constructor(private utilsService: AnalyticsUtilsService) { }

  ngOnInit(): void {
    if(localStorage.getItem(environment.tokenName)){
      this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    }
    this.years$ = this.utilsService.getActiveYears(this.userId)
  }

  changeYear(){

  }

}
