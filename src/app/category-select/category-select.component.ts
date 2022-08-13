import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit {

  categories$!: Observable<Category[]>;
  helper = new JwtHelperService();
  userId! : number;

  constructor(private categoryService: CategoriesService) {
    this.userId  = this.helper.decodeToken(localStorage.getItem(environment.tokenName)|| '').id;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoryService.findAll(this.userId);
  }

}
