import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormModuleRoutingModule } from './complex-form-routing.module';
import { ComplexFormComponentComponent } from './components/complex-form-component/complex-form.component';
import { SharedModule } from '../shared/shared.module';
import { ComplexFormService } from './services/complex-form.service';


@NgModule({
  declarations: [
    ComplexFormComponentComponent
  ],
  imports: [
    CommonModule,
    ComplexFormModuleRoutingModule,
    SharedModule
  ],
  exports: [
    ComplexFormComponentComponent
  ],
  providers: [
    ComplexFormService
  ]
})
export class ComplexFormModuleModule { }
