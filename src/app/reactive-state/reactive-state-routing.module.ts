import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';

const routes: Routes = [
  {
    path: 'candidate',
    component: CandidateListComponent
  },
  {
    path: 'candidate/:id',
    component: SingleCandidateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'candidate'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
