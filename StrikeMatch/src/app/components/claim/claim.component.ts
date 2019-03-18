import { FormControl, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Post } from './../../models/post';
import { MatDialog } from '@angular/material';
import { PostService } from './../../services/post.service';
import { inject } from '@angular/core/testing';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';






@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  postId: any = (localStorage.getItem("currentPost"))
  currentPost: any;
  body: string;
  title: string;
  author: string;

  claimWindow: FormGroup
  constructor(public ps: PostService, public dialogRef: MatDialogRef<ClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.claimWindow = new FormGroup({
      messageTitle: new FormControl('', Validators.required),
      messageBody: new FormControl('', Validators.required),
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  ngOnInit() {

    console.log("fired")
    console.log(this.postId)
    this.ps.getPost(this.postId).subscribe(post => {
      console.log(post)
      this.currentPost = post
      console.log(this.currentPost.title)
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
  claimPost() {
    this.ps.claimPost(this.postId);

  }

}
