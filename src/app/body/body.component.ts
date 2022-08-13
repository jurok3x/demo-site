import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emmiters/Emitters';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  helper = new JwtHelperService();

  authenticated = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      () => {
        this.authenticated = !this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString());
      })
      if(localStorage.getItem(environment.tokenName) == undefined){
        this.authenticated = false;
        return;
      }
    this.authenticated = !this.helper.isTokenExpired(localStorage.getItem(environment.tokenName)?.toString());
  }

  logout() {
    localStorage.clear();
    Emitters.authEmitter.emit(false);
  }

}
