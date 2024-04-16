import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SingleCandidateComponent implements OnInit {
onGoBack() {
this.router.navigateByUrl('/reactif-state/candidate')
}
onRefuse() {
  this.candidate$.pipe(
    take(1),
    tap(candidate =>{
      this.candateServe.refuseCandidate(candidate.id)
      this.onGoBack()
    })
  ).subscribe()
}
onHire() {
  this.candidate$.pipe(
    take(1),
    tap(candidate =>{
      this.candateServe.hireCandidate(candidate.id)
      this.onGoBack()
    })
  ).subscribe()
}
  loading$!: Observable<boolean>
  candidate$!: Observable<Candidate>

  constructor(private candateServe: CandidateService,
              private route: ActivatedRoute,
              private router : Router
  ) {

  }

  ngOnInit(): void {
    this.initObservable()
  }

  initObservable() {
    this.loading$ = this.candateServe.loading$
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candateServe.getCandidateById(+params['id']))
    )
  }
}
