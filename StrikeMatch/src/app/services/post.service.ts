
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore"
import { Post } from '../models/post'
import { MatTabChangeEvent } from '@angular/material/'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators'
import { config } from '../config'




@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedIndex: number
  currentPostId: string;
  currentPost: Post;
  postsCollection: AngularFirestoreCollection<Post>
  private postDoc: AngularFirestoreDocument<Post>
  posts: Observable<any[]>
  userOpenPosts: Post[] = [];
  userRequestedPosts: Post[] = [];
  userClaimedPosts:Post[]=[]
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserPosts: Observable<any[]>

  constructor(private afs: AngularFirestore, private router:Router, ) {
    this.postsCollection = afs.collection<Post>(config.collection_endpoint);
  
    this.posts = 
      this.afs.collection('posts').snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
      
   }
   getPosts(){
    
     return  this.afs.collection('posts').snapshotChanges()
     .pipe(map(actions => actions.map(this.documentToDomainObject)));
   
   }
    getPost(id){
      let currentPost =
      this.afs.doc<Post>('posts/'+id).snapshotChanges().pipe(
        map(action => {
          this.currentPost = action.payload.data();
            
           this.currentPostId= action.payload.id;
            console.log(this.currentPostId)
            return this.currentPost
            
        })
     );
     
      return currentPost
       ;

    }
    getUserPosts(){
  
      this.currentUserPosts = 
      this.afs.collection('posts', ref => ref.where('uid', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
       
      return this.currentUserPosts
    
     }
     deletePost(id){
      this.afs.doc<Post>('posts/'+id).delete()
     }
    updatePost(id, post){
      console.log(id);
      console.log(post)
      
      this.postDoc = this.afs.doc<Post>
       (`${config.collection_endpoint}/${id}`);
      
      if(post.description){
        this.postDoc.update({description: post.description})
      }
      if(post.title){
        this.postDoc.update({title: post.title})
      }
      if(post.deathDate){
        console.log(post.deathDate)
        this.postDoc.update({deathDate: post.deathDate})
      }
      if(post.claimRequested){
        this.postDoc.update({claimRequested: post.claimRequested})
      }
      if(post.claimRequestedBy){
        console.log("requested by updated" + this.currentUser["displayName"])
        
        this.postDoc.update({requestedBy: post.claimRequestedBy['displayName']})
      }
}
   createPost(post){
     
    this.postsCollection.add(post).then(()=>
    this.router.navigate(['/dashboard']))

   }
   claimPost(id){
     console.log(id)
     let currentUser = JSON.parse(localStorage.getItem('user'))
     
  
    this.postDoc = this.afs.doc<Post>
    (`${config.collection_endpoint}/${id}`);
    this.postDoc.update({claimedBy:`${currentUser.uid}`, claimedByDisplayName:`${currentUser.displayName}`})
   
    console.log(this.postDoc)
   }
   confirmClaim(postId, userId,){
     this.postDoc = this.afs.doc<Post>
     (`${config.collection_endpoint}/${postId}`);
     this.postDoc.update({claimedBy:`${userId}`})
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
 
editTabClicked(){
  this.getUserPosts()
  }

searchTabClicked(){
  this.getPosts()
}
}
