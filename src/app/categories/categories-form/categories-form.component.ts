import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/service/categories.service';
import { MaterialsService } from 'src/app/service/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup
  isNew = true
  category!: Category

  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.form.disable()
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if(params['id']){
            this.isNew = false
            return this.categoriesService.findById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe({
      next: category => {
        if(category){
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          MaterialsService.updateTextInputs()
        }
        this.form.enable()
      },
      error: error => {MaterialsService.toast(error.error.message)}
    }   
    )
  }

  onSubmit(){
    let obs$ 
    this.form.disable()
    if(this.isNew) {
      obs$ = this.categoriesService.save(this.form.getRawValue()) // add user
    } else {
      this.category.name = this.form.value.name
      obs$ = this.categoriesService.update(this.category)
    }
    obs$.subscribe(
      {
        next: category => {
          MaterialsService.toast('Зміни збережено')
          this.form.enable()
          this.category = category
        },
        error: error => {
          MaterialsService.toast(error.error.message)
          this.form.enable()
        }
        
      }
    )
  }

  delete() {
    const decision = window.confirm('Ви точно бажаєте видалити категорію?')
    if(decision){
      this.categoriesService.delete(this.category.id).subscribe(
        {
          next: () => MaterialsService.toast('Категорія видалена'),
          error: error => MaterialsService.toast(error.error.message),
          complete: () => this.router.navigate(['/categories'])
        }
      )
    }
  }

}
