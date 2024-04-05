import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplexFormComponentComponent } from './components/complex-form-component/complex-form.component';

const routes: Routes = [{
  path: '',
  component : ComplexFormComponentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexFormModuleRoutingModule { }
