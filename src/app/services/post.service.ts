import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  id?: string,
  title: string,
  content: string,
  author: string,
  likes: number,
  createdIn?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts$: Observable<Post[]>;
  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.postsCollection = this.afs.collection<Post>('posts', ref => ref.orderBy('createdIn', 'desc'));
    this.posts$ = this.postsCollection.valueChanges({ idField: 'id' });
  }

  addPost(post: Post) {
    post.createdIn = Date.now();
    this.postsCollection.add(post);
  }

  getPost(id: string) {
    return this.postsCollection.doc(id).valueChanges();
  }

  updatePost(id: string, post: Post) {
    // post.createdIn = Date.now();
    delete post.id;
    this.postsCollection.doc(id).set(post, { merge: true });
  }

  deletePost(id: string) {
    this.postsCollection.doc(id).delete();
  }
}
