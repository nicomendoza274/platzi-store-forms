import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from './../../models/category.model'

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CateoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`)
  }

  getCategory(id: number) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`)
  }

  createCategory(category: Partial<Category>) {
    return this.http.post(`${environment.url_api}/categories`, category)
  }

  updateCategory(id: number, changes: Partial<Category>) {
    return this.http.put(`${environment.url_api}/categories/${id}`, changes);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.url_api}/categories/${id}`);
  }
}
