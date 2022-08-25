import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$!: Observable<Category[]>

  helper = new JwtHelperService();

  userId! : number;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    if(localStorage.getItem(environment.tokenName)){
      this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
    }
    this.categories$ = this.categoryService.findAll(2)
  }

}
