import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../Validators/confirm-equal.validator';

@Component({
  selector: 'app-complex-form-component',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponentComponent implements OnInit {

  loading = false
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
  showEmailCtrl$!: Observable<boolean>
  showPhoneCtrl$!: Observable<boolean>
  showEmailError$!: Observable<boolean>
  showPhoneError$!: Observable<boolean>

  constructor (private formbuild : FormBuilder, private complexFormService: ComplexFormService){

  }

  ngOnInit():void {
    this.initFormControl()
    this.initMaimForm()
    this.initFormObservable()
    this.emailFrom.updateValueAndValidity()
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
    }
    ,{
      validators: [confirmEqualValidator('email', 'confirme')],
      updateOn: 'blur'
    }
    )

    this.passwordCtrl = this.formbuild.control('', Validators.required)
    this.confirmPasswordCtrls = this.formbuild.control('', Validators.required)

    this.loginForm = this.formbuild.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrls,
      username: ['',Validators.required]
    }
    ,{
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    }
  )

  }

  private initMaimForm():void {
    this.mainForm = this.formbuild.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailFrom,
      phone: this.phoneCtrl,
      loginInfo: this.loginForm,
      confirm: this.confirmEmailCtrl
    })

  }



  private initFormObservable() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmail => this.setEmailValidator(showEmail))
    )
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhone => this.setPhoneValidators(showPhone))
    )

    this.showEmailError$ = this.emailFrom.statusChanges.pipe(
      map(status => status === 'INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
    )
    this.showPhoneError$ = this.loginForm.statusChanges.pipe(
      map(status => status === 'INVALID'
      && this.passwordCtrl.value
      && this.confirmPasswordCtrls.value
      && this.loginForm.hasError('confirmEqual')
    )
    )
  }

  private setEmailValidator(showEmail: boolean){
    if (showEmail) {
      this.emailCtrl.addValidators([
        Validators.required,
        Validators.email
      ])

      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email
      ])
    } else {
      this.emailCtrl.clearValidators()
      this.confirmEmailCtrl.clearValidators()
    }
    this.emailCtrl.updateValueAndValidity()
    this.confirmEmailCtrl.updateValueAndValidity()
  }

  private setPhoneValidators(showPhone: boolean){
    if (showPhone) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    } else {
      this.phoneCtrl.clearValidators()
    }
    this.phoneCtrl.updateValueAndValidity()
  }


  getFormControlErrorText(ctrl: AbstractControl){
    if (ctrl.hasError('required')) {
      return 'Ce champs est réquis'
    }else if (ctrl.hasError('email')) {
      return "Veillez renseigner une adresse mail valide"
    }else if (ctrl.hasError('minlength')) {
      return "Le numéro téléphone ne contient pas assez de chiffres"
    }else if (ctrl.hasError('maxlength')) {
      return "Le numéro téléphone ne contient trop de chiffres"
    }else{
      return 'Ce champs contient une erreur'
    }
  }

  sendForm() {
    // console.log(this.mainForm.value);
    this.loading = true
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.resetForm()
        } else {
          console.log("Echec de l'enregistrement");

        }
      })
    ).subscribe()
  }
  private resetForm(){
    this.mainForm.reset()
    this.contactPreferenceCtrl.patchValue('email',/*{emitEvent: false} *empêcher un declanchement d'event*/)
  }
}
