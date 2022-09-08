import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { MaterialsService } from 'src/app/service/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating')
  floatingRef!: ElementRef;

  links = [
    {url:'/expenses', name: 'Витрати'},
    {url:'/incomes', name: 'Доходи'},
    {url:'/analytics', name: 'Аналітика'},
    {url:'/categories', name: 'Категорії'}
  ]

  constructor(private authService: AuthentificationService,
    private router: Router) { }

  ngAfterViewInit(): void {
    MaterialsService.initButton(this.floatingRef)
  }

  ngOnInit(): void {
  }

  logout(event: Event){
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login'])

  }

}
