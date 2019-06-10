import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms"

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatCard, MatInput, MatTable, MatFormField}  from "@angular/material"
import {tap} from 'rxjs/operators'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators'
import { config } from '../../config'




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editState:boolean = false;
  deleteState:boolean = false;
  formControl: FormControl
  rForm:FormGroup
  editedPost:any;
  
  currentPost:Post;
  selectedPostId: string;
  postData: Post[] =[];
  postsCollection: AngularFirestoreCollection<Post>
  currentUserPosts: Observable<any[]>
  dataSource : MatTableDataSource<any>;
  currentUser = JSON.parse(localStorage.getItem('user'))
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns:string[] = ['Title', "Description", "Pick Up Date" , "Location", "Contact" ]

  constructor( private ps: PostService, private afs: AngularFirestore, public fb:FormBuilder) { 
    this.postsCollection = afs.collection<Post>(config.collection_endpoint);
    this.rForm = fb.group({
      
      'title':[null, ] ,
      'description':[null,] ,
      'deathDate':[null,] 
      
  })
  }

  ngOnInit() {
    console.log(`${this.currentUser.uid}`)
   this.ps.getUserPosts().subscribe(posts=> {
     this.dataSource = new MatTableDataSource(posts)
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort
     console.log(this.dataSource)

   })
  }
  editPostClicked(event){
    if(this.deleteState){
      this.deleteState = false
    }
    console.log(event) 
   this.currentPost = event;
   this.editState = true;
  (this.ps.getPost(event)).subscribe(post=>{
    this.currentPost = post;
    
    this.selectedPostId = event
    console.log(this.currentPost)
  })
 }
 deletePostClicked(event){
   if(this.editState){
     this.editState = false
   }

   this.selectedPostId = event

  this.currentPost = event;
  this.deleteState = true;
 (this.ps.getPost(event)).subscribe(post=>{
   this.currentPost = post;
   

   console.log(this.currentPost)
 })
}
closeEditOrDelete(){
  this.editState = false;
  this.deleteState = false;
}
 deleteConfirm(event){
  console.log(event.target.value)
  this.ps.deletePost(this.selectedPostId)
  this.deleteState = false
}
updateClicked(value){
  console.log(value)
  this.ps.updatePost(this.selectedPostId, value )
  
 
  this.editState = false;
}
}
