import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore"
import { Post } from '../models/post'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators'
import { config } from '../config'
@Injectable({
  providedIn: 'root'
})
export class EditService {
  postsCollection: AngularFirestoreCollection<Post>
  private postDoc: AngularFirestoreDocument<Post>
  posts: Observable<any[]>
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserPosts: Observable<any[]>
  

  constructor( private afs: AngularFirestore, private router:Router) {
    this.postsCollection = afs.collection<Post>(config.collection_endpoint);
   }

  updatePost(post){
    console.log(post)
  }
}
