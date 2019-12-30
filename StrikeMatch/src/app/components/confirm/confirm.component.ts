import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { Message } from './../../models/message';
import { Exchange } from './../../models/exchange';
import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { ExchangeService } from './../../services/exchange.service';
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
  currentUser = JSON.parse(localStorage.getItem('user'))
  postId: string;
  message: Observable<any>;
  exchangeInfo: any;
  currentPost: any
  exchange: Exchange = {
    author: this.currentUser["displayName"],
    authorUid: this.currentUser['uid'],


  };
  postReady: boolean = false;
  form: FormGroup;
  
  
  exchangeTime: string;
  exchangeLocation: string;

  constructor(public ps: PostService, public ms: MessageService, public router: Router, public es:ExchangeService, fb:FormBuilder, public snackbar:MatSnackBar) {
    this.form = fb.group({
      time: new FormControl ("", Validators.required),
      location: new FormControl("", Validators.required)


    })
      
      // location: new FormControl('', Validators.required),
      // time: new FormControl('', Validators.required)

    
  }

  ngOnInit() {
   
   
   this.message = this.ms.getMessage()
   this.message.subscribe(res => {this.exchangeInfo = res,
  console.log(this.exchangeInfo)
   console.log(this.form)
   this.postId = this.exchangeInfo.postId
   console.log(this.postId)
  
  this.ps.getPost(this.postId).subscribe(res =>{
    this.currentPost = res;
     this.postReady=true;
    }

    );
  
 
  
 

  })
}


  confirmClicked() {
    this.ps.confirmClaim(this.postId, this.currentPost.requestedBy)
    
    let exchangeData = {
      author: this.exchangeInfo.author,
      authorUid: this.exchangeInfo.uid,
      recipient:this.exchangeInfo.recipientDisplayName,
      recipientUid: this.exchangeInfo.recipient,
      postId: this.exchangeInfo.postId,
      time: this.form.get('time').value,
      location: this.form.get('location').value,
      complete:false,
      confirmed:false,
    }
    this.es.createExchange(exchangeData)
    this.ps.getPost(this.postId).subscribe(res =>
    res.claimedBy = res.requestedBy)
   
    this.openSnackbar()
    
    this.router.navigate(["/dashboard"]) 
   

   

    


  //   this.es.createExchange()
  }
 cancel(){
  this.router.navigate(['/messages'])
 }
 openSnackbar(){
  const snackBarRef = this.snackbar.open('Pickup Created', "", {
    horizontalPosition:'end',
    duration: 3000

  })
}

}
