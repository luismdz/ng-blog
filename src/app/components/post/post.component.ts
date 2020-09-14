import { Component, OnInit, Input } from '@angular/core';
import { Post, PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  like(): void {
    this.post.likes++;
    this.postService.updatePost(this.post.id, this.post);
  }

  deletePost(post: Post): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Your post has been deleted',
          showConfirmButton: false,
          timer: 1500
        });

        this.postService.deletePost(post.id);
      }
    });

  }

}
