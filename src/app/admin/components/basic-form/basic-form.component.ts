import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
    });
  }

  getNameValue() {
  }

  save(event) {
    if (this.form.valid) {
      //Code
    } else {
      this.form.markAllAsTouched()
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: ['category-2'],
      tag: [[]],
      agree: [false, [Validators.requiredTrue]],
      gender: [null],
      zone: [''],
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('fullName').get('name');
  }
  get lastField(): AbstractControl {
    return this.form.get('fullName').get('lastName');
  }
  get emailField(): AbstractControl {
    return this.form.get('email');
  }
  get phoneField(): AbstractControl {
    return this.form.get('phone');
  }
  get colorField(): AbstractControl {
    return this.form.get('color');
  }
  get dateField(): AbstractControl {
    return this.form.get('date');
  }
  get ageField(): AbstractControl {
    return this.form.get('age');
  }
  get categoryField(): AbstractControl {
    return this.form.get('category');
  }
  get tagField(): AbstractControl {
    return this.form.get('tag');
  }
  get agreeField(): AbstractControl {
    return this.form.get('agree');
  }
  get genderField(): AbstractControl {
    return this.form.get('gender');
  }
  get zoneField(): AbstractControl {
    return this.form.get('zone');
  }
  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }
  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }
  get islastFieldInvalid() {
    return this.lastField.touched && this.lastField.invalid;
  }
  get isPhoneFieldValid() {
    return this.phoneField.touched && this.phoneField.valid;
  }
  get isPhoneFieldInvalid() {
    return this.phoneField.touched && this.phoneField.invalid;
  }
  get isEmailFieldValid() {
    return this.emailField.touched && this.emailField.valid;
  }
  get isEmailFieldInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }
  get isAgeFieldInvalid() {
    return this.ageField.touched && this.ageField.invalid;
  }
  get isAgreeFieldInvalid() {
    return this.agreeField.touched && this.agreeField.invalid;
  }
}
