import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
   private cookieService: CookieService
  ) { }

   
   getAllCategories() : Observable<Category[]> {
      return this.http.get<Category[]>(`https://localhost:7157/api/categories`)
   }
   getCategoryById(id: string) : Observable<Category>{
    return this.http.get<Category>(`https://localhost:7157/api/categories/${id}`)
   }

   addCategory(model: AddCategoryRequest): Observable<void> {
      return this.http.post<void>(`https://localhost:7157/api/categories?addAuth=true`, model)
   }

   updateCategory(id:string, updateCategoryRequest: UpdateCategoryRequest)
   :Observable<Category>{
    return this.http.put<Category>(`https://localhost:7157/api/categories/${id}?addAuth=true`,
        updateCategoryRequest);
   }

   deleteCategory(id:string) : Observable<Category>{
    return this.http.delete<Category>(`https://localhost:7157/api/categories/${id}?addAuth=true`)
          
   }
   
   
}
