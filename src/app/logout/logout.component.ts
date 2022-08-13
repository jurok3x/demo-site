import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emmiters/Emitters';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("sddsd");
    localStorage.clear();
    Emitters.authEmitter.emit(false);
    this.router.navigate(['/']);
  }

}
