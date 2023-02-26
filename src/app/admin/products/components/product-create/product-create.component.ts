import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { FileModel } from './../../../../core/models/file.model'
import { Observable } from 'rxjs';
import { CateoriesService } from 'src/app/core/services/categories/cateories.service';
import { Category } from './../../../../core/models/category.model'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>
  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private cateoriesService: CateoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories()
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        this.router.navigate(['./admin/products']);
      });
    }
  }

  uploadFile(event) {
    const files = [...event.target.files] as FileModel[];
    files.forEach(item => {
      const name = `${item.name}`;
      const fileRef = this.storage.ref(name);
      const task = this.storage.upload(name, item);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            const fileList = this.imagesField.value as string[]
            this.imagesField.setValue([...fileList, url ])
          });
        })
      )
      .subscribe();
    })

    if (files) {
      this.imagesField.setValue([] as string[])
    }

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: [Array<string>(), Validators.required],
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  
  get titleField() {
    return this.form.get('title')
  }
  get priceField() {
    return this.form.get('price');
  }
  get imagesField() {
    return this.form.get('images');
  }
  get descriptionField() {
    return this.form.get('description');
  }

  private getCategories(){
    this.cateoriesService.getAllCategories()
    .subscribe((categories)=>{
      this.categories = categories
    })
  }

}
