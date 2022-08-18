import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './service/authentification.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  title = environment.title;
  
  constructor(private authService: AuthentificationService){}
  
  ngOnInit(): void {
    const potentialApiToken = localStorage.getItem(environment.tokenName)
    const potentialAnalyticsApiToken = localStorage.getItem(environment.analyticsTokenName)
    if(potentialApiToken != null){
      this.authService.setApiToken(potentialApiToken)
    }
    if(potentialAnalyticsApiToken != null){
      this.authService.setAnalyticsApiToken(potentialAnalyticsApiToken)
    }
  }

}
