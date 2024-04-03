import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  getPost(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }
}
