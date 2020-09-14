import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    private postService: PostService
  ) {
    this.posts$ = this.postService.posts$.pipe(delay(2));
  }

  ngOnInit(): void {
  }


}
