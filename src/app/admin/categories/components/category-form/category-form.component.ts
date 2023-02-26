import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators'

import { Category } from './../../../../core/models/category.model'
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup
  disableBtn: boolean = false
  isNew: boolean = true

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false
      this.form.patchValue(data)
    }
  }
  @Output() create = new EventEmitter<Partial<Category>>();
  @Output() update = new EventEmitter<Partial<Category>>();

  constructor(
    private formBuilder: FormBuilder, 
    private storage: AngularFireStorage,
  ) { 
    this.buildFrom()
  }

  ngOnInit(): void {
  }

  private buildFrom() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  get nameField() {
    return this.form.get('name')
  }

  get imageField() {
    return this.form.get('image')
  }

  save() {
    if (this.form.valid) {
      this.isNew ? this.create.emit(this.form.value) : this.update.emit(this.form.value)
    } else {
      this.form.markAllAsTouched()
    }
  }

  uploadFile(event) {
    const image = event.target.files[0]
    const name = image.name
    const ref = this.storage.ref(name)
    const task = this.storage.upload(name, image)

    task.snapshotChanges().pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL()
        urlImage$.subscribe(url => {
          this.imageField.setValue(url)
        })
      })
    )
    .subscribe()
  }

}
