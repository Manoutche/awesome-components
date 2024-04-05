import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complex-form-component',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponentComponent implements OnInit {


  mainForm!: FormGroup
  personalInfoForm!: FormGroup
  contactPreferenceCtrl!: FormControl
  phoneCtrl!: FormControl
  emailCtrl!: FormControl
  confirmEmailCtrl!: FormControl
  emailFrom!: FormGroup
  passwordCtrl!: FormControl
  confirmPasswordCtrls!: FormControl
  loginForm!: FormGroup
  emailRegex!: RegExp;

  constructor (private formbuild : FormBuilder){

  }

  ngOnInit():void {
    this.initFormControl()
    this.initMaimForm()
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  private initFormControl() {
    this.personalInfoForm = this.formbuild.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
    this.contactPreferenceCtrl = this.formbuild.control('email')
    this.phoneCtrl = this.formbuild.control('')
    this.emailCtrl = this.formbuild.control('',Validators.pattern(this.emailRegex))
    this.confirmEmailCtrl = this.formbuild.control('',Validators.pattern(this.emailRegex))

    this.emailFrom  = this.formbuild.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })
    this.passwordCtrl = this.formbuild.control('', Validators.required)
    this.confirmPasswordCtrls = this.formbuild.control('', Validators.required)
    this.loginForm = this.formbuild.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrls,
      username: ['', [Validators.required, Validators.min(10)]]
    })

  }

  private initMaimForm():void {
    this.mainForm = this.formbuild.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailFrom,
      loginInfo: this.loginForm,
      phone: this.phoneCtrl,
      confirm: this.confirmEmailCtrl
    })
  }

  sendForm() {
    console.log(this.mainForm.value);

  }
}
