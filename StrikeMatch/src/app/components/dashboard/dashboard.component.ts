import { MatTableDataSource } from '@angular/material';

import { FeedComponent } from './../feed/feed.component';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { MatTabChangeEvent } from '@angular/material/';
import { ProfileComponent } from './../profile/profile.component';
import { MessageComponent } from './../message/message.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'))
  postData:MatTableDataSource<any>;
  posts:any;
  
  constructor(public ps: PostService, public change:ChangeDetectorRef) { }

  ngOnInit() {
  } 
 
  tabChange(event: MatTabChangeEvent){
    this.change.markForCheck()
  if (event.index===2){
    this.ps.editTabClicked()
  }  
  else if (event.index===0){
   let x =this.ps.searchTabClicked()
   console.log(x)
   
    console.log("got all the posts")

  }
  
  }
  getClaimedPosts(){
    this.ps.getPosts().subscribe(posts=>{
      console.log("observable coming back")
      this.postData = new MatTableDataSource(posts.filter(post => post.claimedBy === `${this.currentUser.uid}`));
    })
  }

}
