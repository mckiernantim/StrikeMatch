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
export class PostService {
  selectedIndex: number
  postsCollection: AngularFirestoreCollection<Post>
  private postDoc: AngularFirestoreDocument<Post>
  posts: Observable<any[]>
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserPosts: Observable<any[]>

  constructor(private afs: AngularFirestore, private router:Router) {
    this.postsCollection = afs.collection<Post>(config.collection_endpoint);
  
    this.posts = 
      this.afs.collection('posts').snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
      
   }
   getPosts(){
     return this.posts
   }
  
   createPost(post){
     
      
      
     this.postsCollection.add(post).then(()=>
     this.router.navigate(['profile']));

   }
   claimPost(id){
     let currentUser = JSON.parse(localStorage.getItem('user'))
     
  
    this.postDoc = this.afs.doc<Post>
    (`${config.collection_endpoint}/${id}`);
    this.postDoc.update({claimedBy:`${currentUser.uid}`})
   
    console.log(this.postDoc)
   }
   documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}
getUserId(){
  JSON.parse(localStorage.getItem('user'))
}
 getUserPosts(){
  
  this.currentUserPosts = 
  this.afs.collection('posts', ref => ref.where('uid', '==', `${this.currentUser.uid}`)).snapshotChanges()
  .pipe(map(actions => actions.map(this.documentToDomainObject)));
   
  return this.currentUserPosts

 }
 editTabClicked(){

   this.getUserPosts()
  
}
}
