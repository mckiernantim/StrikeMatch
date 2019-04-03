

import { FormControl, Validators, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Post } from './../../models/post';
import { MatDialog } from '@angular/material';
import { PostService } from './../../services/post.service';
import { inject } from '@angular/core/testing';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from '../../services/message.service';








@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  
  postId: any = (localStorage.getItem("currentPost"))
  currentPost: any;
  body: string
  title: string;
  author: string;
  messageToSend:any = {
    author: "",
    title:"",
    body:"",
    createdAt:"",
    recipient:""

  };

  claimWindow: FormGroup
  constructor(
    public ps: PostService, 
    public dialogRef: MatDialogRef<ClaimComponent>,
    public ms:MessageService, 
    public fb: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.claimWindow = fb.group({
      messageTitle: new FormControl('', Validators.required),
      messageBody: new FormControl('', Validators.required),
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  ngOnInit() {
    this.ps.getPost(this.postId).subscribe(post => {
    
      this.currentPost = post
     
    }
    )


    console.log(this.currentPost)
  }

  ngOnAfterViewInit() {
}
getErrorMessage() {
  return this.claimWindow.hasError('required') ? 'You must enter a value' :
      
          '';
}
claimRequestClicked(){
  let currentUser = JSON.parse(localStorage.getItem('user')).uid
  
  console.log(currentUser)
  this.messageToSend.body = this.claimWindow.value.messageBody;
  this.messageToSend.title = this.claimWindow.value.messageTitle;
  this.messageToSend.author = currentUser
  this.messageToSend.recipient = this.currentPost.uid
  this.messageToSend.createdAt = Date.now()
  console.log(this.messageToSend)
  this.ms.createMessage(this.messageToSend)
  this.dialogRef.close()

}
 

}
