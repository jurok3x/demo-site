import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.findAll(parseInt(localStorage.getItem(environment.userIdName) || ''))
  }

}
