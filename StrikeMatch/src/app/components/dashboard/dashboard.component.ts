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
      console.log(this.currentUser['uid'])
      console.log(messages[0])

      if (messages[0]['lastMessageCount']) {
        this.messages = messages[0]['lastMessageCount']
      }
      this.inboxLength = messages[0]['inbox'].length;
      console.log(this.inboxLength)
      console.log(this.messages)
      if (this.inboxLength > this.messages) {
        this.afs.doc('users/' + this.currentUser['uid']).update({
          lastMessageCount: this.inboxLength
        })
        console.log("YOUVE GOT MAIL")
        this.newMessages = true;
        
      }
      
    })
    console.log(this.newMessages)


  }
  getOutput(selected: number) {
    console.log("get ouput firing from dashbaord component")
    if (selected) {
      console.log(this.childValue + "came from child component")

    }
  }
  isLoggedIn() {
    console.log(this.auth.isLoggedIn)
  }
  tabChange(event: MatTabChangeEvent) {
    this.change.markForCheck()
    if (event.index === 2) {
      this.ps.editTabClicked()
    }
    else if (event.index === 0) {
      let x = this.ps.searchTabClicked()
      console.log(x)
      console.log("got all the posts")
    }
    else if (event.index === 1) {
      console.log("headed to posts")
    }

  }
  getClaimedPosts() {
    this.ps.getPosts().subscribe(posts => {
      console.log("observable coming back")
      this.postData = new MatTableDataSource(posts.filter(post => post.claimedBy === `${this.currentUser.uid}`));
    })
  }

}
