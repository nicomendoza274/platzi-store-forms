import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CateoriesService } from 'src/app/core/services/categories/cateories.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileModel } from 'src/app/core/models/file.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  image$: Observable<any>;
  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private cateoriesService: CateoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories()
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
        this.categoryIdField.setValue(product?.category.id)
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        this.router.navigate(['./admin/products']);
      });
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
  get categoryIdField() {
    return this.form.get('categoryId')
  }

  private getCategories(){
    this.cateoriesService.getAllCategories()
    .subscribe((categories)=>{
      this.categories = categories
    })
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


}
