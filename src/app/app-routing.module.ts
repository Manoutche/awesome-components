import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () => import('./social-media/social-media.module').then(m =>m.SocialMediaModule)
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
