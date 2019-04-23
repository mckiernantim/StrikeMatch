
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { FormControl, Validators, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { map, } from 'rxjs/operators';
import { Post } from './../../models/post';
import { MatDialog } from '@angular/material';
import { PostService } from './../../services/post.service';
import { inject } from '@angular/core/testing';
import { Component, OnInit, Inject, NgZone, ViewChild, Pipe } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { MessageService } from '../../services/message.service';








@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent implements OnInit {
  
  postId: any = (localStorage.getItem("currentPost"))
  currentPost: any;
  postsReady: boolean = false;
  body: string
  title: string;
  author: string;
  messageToSend:any = {
    author: "",
    title:"",
    body:"",
    createdAt:"",
    recipient:"",
    postId:""

  };
  @ViewChild(MatSort) sort: MatSort;

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
      console.log(this.currentPost)
      this.postsReady = true
     }
    )


  }

  ngOnAfterViewInit() {
}
getErrorMessage() {
  return this.claimWindow.hasError('required') ? 'You must enter a value' :
      
          '';
}
claimRequestClicked(userToSendMessageTo){
  
  let currentUser = JSON.parse(localStorage.getItem('user')).uid
  
  console.log(currentUser+ "THIS IS WHAT SHOYULLD BE UPDATING")
  this.messageToSend.body = this.claimWindow.value.messageBody;
  this.messageToSend.title = this.claimWindow.value.messageTitle;
  this.messageToSend.author = currentUser
  this.messageToSend.postId = this.postId
  
  this.messageToSend.recipient = userToSendMessageTo
  this.messageToSend.createdAt = Date.now()
  
  this.ms.createMessage(this.messageToSend)
  let updatedPostStatus= {
    claimRequested: true
  }
  let userRequestedId = {
    claimRequestedBy: currentUser
  }
  this.ps.updatePost(this.postId, updatedPostStatus)
  this.ps.updatePost(this.postId, userRequestedId)
  // this.ps.updatePost(, true)
  this.currentPost = "";
  this.dialogRef.close()

}
}
export class TextFieldAutosizeTextareaExample {
  constructor(private ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
