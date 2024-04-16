import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) { }

  private _loading$ = new BehaviorSubject<boolean>(false)

  getLoading(): Observable<boolean>{
    return this._loading$.asObservable()
  }

  get loading$(): Observable<boolean>{
    return this._loading$.asObservable()
  }

  private _candidates$ = new BehaviorSubject<Candidate[]>([])

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable()
  }

  private lastLoadCandidate = 0

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading)
  }

  getCandidates(){
    if (Date.now() - this.lastLoadCandidate <=  5000) {
      return;
    }
    this.setLoadingStatus(true)
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(1000),
      tap(candidates =>{
        this.lastLoadCandidate = Date.now()
        this.setLoadingStatus(false)
      this._candidates$.next(candidates)
     })
    ).subscribe()
  }

  getCandidateById(id: number){
    if (!this.lastLoadCandidate) {
      this.getCandidates()
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    )
  }

  refuseCandidate(id: number):void{
    this.setLoadingStatus(true)
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$ ),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id !== id)),
      tap(candidates =>{
        this._candidates$.next(candidates)
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  hireCandidate(id: number): void{
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates.map(candidate => candidate.id === id ? {...candidate, company: 'Sanpface Ltd'} :  candidate)),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      switchMap(updatedCandidates => this.http.patch(`${environment.apiUrl}/candidates/${id}`,
      updatedCandidates.find(candidate => candidate.id === id))),
      delay(1000)
    ).subscribe()
  }
}

