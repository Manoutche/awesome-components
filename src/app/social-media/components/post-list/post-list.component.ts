import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>

  constructor(private route: ActivatedRoute, private postService : PostsService){
  }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts']),
    );
  }

  postComment(postComment: {comment: string, postId: number}){
    this.postService.addNewComment(postComment)
  }
}
