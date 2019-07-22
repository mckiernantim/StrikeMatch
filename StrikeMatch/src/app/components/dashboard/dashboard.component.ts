import { NavbarComponent } from './../navbar/navbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { MatCardModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';


import { FeedComponent } from './../feed/feed.component';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { MatTabChangeEvent } from '@angular/material/';
import { ProfileComponent } from './../profile/profile.component';
import { MessageComponent } from './../message/message.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { MessageService } from '../../services/message.service';







@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'))
  newMessages: boolean = false;
  messages: number = 0;
  inboxLength: number;
  postData: MatTableDataSource<any>;
  posts: any;
  postDoc: any;
  childValue: any

  constructor(public ps: PostService, public change: ChangeDetectorRef, public auth: AuthService, public afs: AngularFirestore) { }

  ngOnInit() {
    
    this.afs.collection('users', ref => ref.where('uid', '==', `${this.currentUser.uid}`)).valueChanges().subscribe(messages => {
     this.newMessages=false;
      

      if (messages[0]['lastMessageCount']) {
        this.messages = messages[0]['lastMessageCount']
      }
      this.inboxLength = messages[0]['inbox'].length;
    
      if (this.inboxLength > this.messages) {
        this.afs.doc('users/' + this.currentUser['uid']).update({
          lastMessageCount: this.inboxLength
        })
      
        this.newMessages = true;
        
      }
      
    })
    console.log(this.newMessages)


  }
  getOutput(selected: number) {
   
    if (selected) {
    

    }
  }
  isLoggedIn() {
 
  }
  tabChange(event: MatTabChangeEvent) {
    this.change.markForCheck()
    if (event.index === 2) {
      this.ps.editTabClicked()
    }
    else if (event.index === 0) {
      let x = this.ps.searchTabClicked()

    }
    else if (event.index === 1) {
     
    }

  }
  getClaimedPosts() {
    this.ps.getPosts().subscribe(posts => {
      
      this.postData = new MatTableDataSource(posts.filter(post => post.claimedBy === `${this.currentUser.uid}`));
    })
  }

}
