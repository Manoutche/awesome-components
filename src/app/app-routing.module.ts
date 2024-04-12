import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveStateModule } from './reactive-state/reactive-state.module';

const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () => import('./social-media/social-media.module').then(m =>m.SocialMediaModule)
  },
  {
    path: 'form-complexe',
    loadChildren: () => import('./complex-form/complex-form.module').then(m =>m.ComplexFormModuleModule)
  },
  {
    path: 'reactif-state',
    loadChildren: () => import('./reactive-state/reactive-state.module').then(m =>m.ReactiveStateModule)
  },
  {
    path: '**', /** Nimporte quelle route qui n'st pas reconnu  */
    redirectTo : 'social-media'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
