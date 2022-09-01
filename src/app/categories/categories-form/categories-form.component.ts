import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { concatMap, of, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/service/categories.service';
import { MaterialsService } from 'src/app/service/material.service';
import { UsersService } from 'src/app/service/users.service';
import { environment } from 'src/environments/environment';

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
    private usersService: UsersService,
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
    this.form.disable()
    if(this.isNew) {
      this.categoriesService.save(this.form.getRawValue()).pipe(
        concatMap(
          category => {
            if(category.id){
              return this.usersService.addCategory(parseInt(localStorage.getItem(environment.userIdName) || ''), category.id)
            }
            return of(null)
          }
        )
      ).subscribe(
        {
          next:() => {
            MaterialsService.toast('Зміни збережено')
            this.form.enable()
            this.router.navigate(['/categories'])
          },
          error: (error: Error) => {
            MaterialsService.toast(error.message)
            this.form.enable()
        }
      }
      )
    } else {
      this.category.name = this.form.value.name
      this.categoriesService.update(this.category).subscribe(
        {
          next: (category: Category) => {
            MaterialsService.toast('Зміни збережено')
            this.form.enable()
            this.category = category
          },
          error: (error: Error) => {
            MaterialsService.toast(error.message)
            this.form.enable()
          } 
        }
      )
    }
  }

  delete() {
    const decision = window.confirm('Ви точно бажаєте видалити категорію?')
    if(decision){
      this.usersService.removeCategory(parseInt(localStorage.getItem(environment.userIdName) || ''), this.category.id || 0).subscribe(
        {
          next: () => MaterialsService.toast('Категорія видалена'),
          error: error => MaterialsService.toast(error.error.message),
          complete: () => this.router.navigate(['/categories'])
        }
      )
    }
  }

}
