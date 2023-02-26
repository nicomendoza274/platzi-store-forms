import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CateoriesService } from 'src/app/core/services/categories/cateories.service';
import { Category } from './../../../../core/models/category.model'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category

  constructor(
    private cateoriesService: CateoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id)
      }
    })
  }

  createCategory(data: Partial<Category>) {
    this.cateoriesService.createCategory(data).subscribe(
      rta => {
        this.router.navigate(['./admin/categories'])
      }
    )
  }

  updateCategoty(data: Partial<Category>) {
    this.cateoriesService.updateCategory(this.category.id, data).subscribe(
      rta => {
        this.router.navigate(['./admin/categories'])
      }
    )
  }

  private getCategory(id: number) {
    this.cateoriesService.getCategory(id)
    .subscribe(data => {
      this.category = data
    })
  }

}
