import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { PostService, Post } from 'src/app/services/post.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  matcher = new CustomErrorStateMatcher();
  editMode = false;
  post: Post;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {

    this.editForm = this.fb.group({
      author: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

    this.route.queryParams.subscribe((params: { id: string }) => {
      const id = params.id;

      if (id) {
        this.postService.getPost(id).subscribe((post: Post) => {
          this.post = { ...post, id };
          this.editMode = true;

          this.fillForm(this.post);
        });
      }
    })

  }

  fillForm({ author, title, content }) {
    this.editForm.reset({
      author,
      title,
      content
    });
  }

  onSave() {
    const { author, title, content } = this.editForm.value;

    if (this.editMode) {
      const post: Post = {
        ...this.post,
        author,
        title,
        content,
      };

      this.postService.updatePost(post.id, post);

    } else {
      this.postService.addPost({ author, title, content, likes: 0 });
    }

    Swal.fire({
      icon: 'success',
      title: `Your post has been ${(this.editMode ? 'updated' : 'saved')}`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.editForm.reset();
      this.router.navigateByUrl('/home');
    });

  }

}
