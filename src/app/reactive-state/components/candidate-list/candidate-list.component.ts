import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search.enum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>
  candidates$!: Observable<Candidate[]>

  searchCtrl!: FormControl
  searchTypeCtrl!: FormControl
  CandidateSearchTypeOption!: {
    value: CandidateSearchType,
    label: string
  }[]

  constructor(private candidService: CandidateService,
              private formBuild : FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initForm()
    this.initObservable()
    this.candidService.getCandidates()
  }
  initForm() {
    this.searchCtrl = this.formBuild.control('')
    this. searchTypeCtrl = this.formBuild.control(CandidateSearchType.LASTNAME)
    this.CandidateSearchTypeOption = [
      {value: CandidateSearchType.LASTNAME, label: 'Nom'},
      {value: CandidateSearchType.FISTNAME, label: 'Prénom'},
      {value: CandidateSearchType.COMPANY, label: 'Entreprise'},
    ]
  }

  private initObservable(){
    this.loading$ = this.candidService.loading$
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    )
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    )
    this.candidates$ = combineLatest([ /** permet de combiné des observable */
      search$,
      searchType$,
      this.candidService.candidates$
    ]).pipe(
      map(
        ([search, searchType, candidates]) =>
        candidates.filter(candidate =>
          candidate[searchType].toLowerCase().includes(search) ))
    )
  }
}
