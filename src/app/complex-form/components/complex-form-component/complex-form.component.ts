import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complex-form-component',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponentComponent implements OnInit {
  sendForm() {

  }

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

  constructor (private formbuild : FormBuilder){

  }

  ngOnInit():void {
    this.initFormControl()
    this.initMaimForm()
  }

  private initFormControl() {
    this.personalInfoForm = this.formbuild.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
    this.contactPreferenceCtrl = this.formbuild.control('email')
    this.phoneCtrl = this.formbuild.control('')
    this.emailCtrl = this.formbuild.control('')
    this.confirmEmailCtrl = this.formbuild.control('')
    this.emailFrom  = this.formbuild.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })
    this.passwordCtrl = this.formbuild.control('', Validators.required)
    this.confirmPasswordCtrls = this.formbuild.control('', Validators.required)
    this.loginForm = this.formbuild.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrls,
      username: ['', Validators.required]
    })

  }

  private initMaimForm():void {
    this.mainForm = this.formbuild.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailFrom,
      loginInfo: this.loginForm,
      phone: this.phoneCtrl
    })
  }
}
