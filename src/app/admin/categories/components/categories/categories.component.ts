import { Component, OnInit } from '@angular/core';
import { Category } from './../../../../core/models/category.model'

import { CateoriesService } from './../../../../core/services/categories/cateories.service'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  constructor( private cateoriesService: CateoriesService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.cateoriesService.getAllCategories().subscribe(categories => this.categories = categories)
  }

  deleteCategory(id: number){
    this.cateoriesService.deleteCategory(id).subscribe(() => {})
    this.categories = this.categories.filter(item => item.id !== id)

  }

}
