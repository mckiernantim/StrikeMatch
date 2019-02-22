import { MatTableDataSource } from '@angular/material';

import { FeedComponent } from './../feed/feed.component';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { MatTabChangeEvent } from '@angular/material/';
import { ProfileComponent } from './../profile/profile.component';
import { MessageComponent } from './../message/message.component';
import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'))
  postData:MatTableDataSource<any>;
  
  constructor(public ps: PostService) { }

  ngOnInit() {
  } 
  
  tabChange(event: MatTabChangeEvent){
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  if (event.index===2){
    this.ps.editTabClicked()
    
  }  
  
  }
  getClaimedPosts(){
    console.log("claimed posts firing")
    this.ps.getPosts().subscribe(posts=>{
      console.log("observable coming back")
      this.postData = new MatTableDataSource(posts.filter(post => post.claimedBy === `${this.currentUser.uid}`));
      console.log(this.postData)
      console.log(this.currentUser)
      
    })
  }

}
