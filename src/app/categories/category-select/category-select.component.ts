import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Category } from '../../model/category';
import { CategoriesService } from '../../service/categories.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit  {

  categories: Category[] = [];
  @Input() parentForm! : FormGroup;
  @Output() categoryEvent = new EventEmitter<number>();

  constructor(private categoryService: CategoriesService) {}
  

  ngOnInit(): void {
    
    this.categoryService.findAll(parseInt(localStorage.getItem(environment.userIdName) || '')).subscribe(
      result => this.categories = result
    )
  }

  changeCategory(categoryId: number){
    this.categoryEvent.emit(categoryId)
  }

}
