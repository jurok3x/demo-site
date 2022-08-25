import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  jwtString: string | undefined;

  public findAll(userId: number): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiUrl}api/categories/user/${userId}`);
  }

  public findById(categoryId: number): Observable<Category>{
    return this.http.get<Category>(`${environment.apiUrl}api/categories/${categoryId}`);
  }

  public save(category: Category): Observable<Category>{
    return this.http.post<Category>(`${environment.apiUrl}api/categories`, category);
  }

  public update(category: Category): Observable<Category>{
    return this.http.put<Category>(`${environment.apiUrl}api/categories/${category.id}`, category);
  }
  
  public delete(categoryId: number) {
    return this.http.delete<any>(`${environment.apiUrl}api/categories/${categoryId}`);
  }
}
