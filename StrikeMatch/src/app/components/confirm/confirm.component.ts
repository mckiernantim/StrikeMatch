import { Router } from '@angular/router';
import { Post } from './../../models/post';
import { MessageService } from './../../services/message.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  postId: string;
  currentPost: any
  postReady: boolean = false;
  constructor(public ps: PostService, public ms: MessageService, public router: Router) {

  }

  ngOnInit() {
    this.postId = localStorage.getItem('currentPost')
   
    // this.ps.getPost(this.postId).subscribe(post =>
    //   (
    //     this.currentPost = post,
    //     this.currentPost.newContent = false,
    //     console.log(this.currentPost),
    //     this.postReady = true
      
      
      
    //   ),
       
    // )


  }

  confirmClicked() {
    console.log(this.postId)
    console.log(this.currentPost)
    this.ps.confirmClaim(this.postId, this.currentPost.requestedBy)
    this.router.navigate(["/dashboard"]) 
  }

}
