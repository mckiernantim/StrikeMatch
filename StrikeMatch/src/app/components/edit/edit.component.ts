
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatCard, MatInput}  from "@angular/material"
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
  editedPost:any = {
    title: "",
    description:"",
  };
  
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

  constructor( private ps: PostService, private afs: AngularFirestore) { 
    this.postsCollection = afs.collection<Post>(config.collection_endpoint);
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
    console.log(event) 
   this.currentPost = event;
   this.editState = true;
  (this.ps.getPost(event)).subscribe(post=>{
    this.currentPost = post;
    this.selectedPostId = event
    console.log(this.selectedPostId)
  })
 }
 deleteClicked(event){
  console.log(event.target.value)
  this.ps.deletePost(this.selectedPostId)
  this.editState = false
}
updateClicked(){

  this.ps.updatePost(this.selectedPostId, this.editedPost )
 
  this.editState = false;
}
}
