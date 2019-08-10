import { Exchange } from './../../models/exchange';
import { ExchangeService } from './../../services/exchange.service';
import { PostService } from './../../services/post.service';
import { DatePipe } from '@angular/common';
import { Post } from './../../models/post';
import { Router } from '@angular/router';
import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms"
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageService } from './../../services/message.service';
import { Message } from './../../models/message';
import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';
import { post } from 'selenium-webdriver/http';




export interface DialogData {

}


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  claimed: boolean = false;
  messageBody: string[];
  rForm: FormGroup;
  name: any;
  content: any;
  contentReady: boolean = false;
  user: any = JSON.parse(localStorage.getItem('user'))
  displayName: any
  isRecipient: boolean = false;
  conversations: any[] = [];
  currentMessageId: string = localStorage.getItem("currentMessage")
  currentMessage: any
  collecitons: AngularFirestoreCollection
  responseBody: string;
  responseDate: string;
  res: any = {};
  responseAddress: string;
  currentExchange: Exchange;
  currentPost: Post = {
    title: "",
    department: "",
    subDepartment: "",
    category: "",
    uid: "",
    deathDate: null,
    location: null,
    description: null,
    claimRequested: null,
    requestedBy: null,
    claimedBy: null,
  };


  messageReady: boolean = false
  constructor(
    public router: Router,
    public ms: MessageService,
    public icon: MatIconRegistry,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public ps: PostService,
    public es: ExchangeService) {

  }


  ngOnInit() {
    this.refreshMessage()
    console.log(this.currentMessage)
    this.displayName = this.user['displayName']
    console.log(this.displayName)
    console.log(this.currentMessageId)
    if (this.currentMessage.newContent === this.user['uid']){
      this.ms.toggleContent()
    }

  }

  //recipient is getting wrong data here - problem coming from claim request
  refreshMessage() {

    if (this.messageReady = true) {
      this.messageReady = false
    }
    this.ms.currentMessageId = localStorage.getItem("currentMessage")
    this.ms.getMessage().subscribe((res) => {
       this.currentMessage = res;
       
       if (this.currentMessage.recipient === this.user['uid']) {
        this.isRecipient = true;
        this.ps.getPost(this.currentMessage['postId']).subscribe(res => {
          this.res = res
          this.currentPost = res
        
          if (res.claimedBy) {
            this.claimed = true;
            this.es.getUserExchanges().subscribe(res => {
              let exchanges = res
              exchanges.forEach(element => {
                if (element['postId'] === this.currentMessage['postId']) {
                  let thisExchange = (exchanges[exchanges.indexOf(element)])
                  console.log(thisExchange)
                  this.currentExchange = thisExchange
                }
              });
            })
          }
           this.messageReady = true;
           return this.res
        })
        return (this.currentMessage)
      }

      this.ps.getPost(this.currentMessage['postId']).subscribe(res => {
       
        this.res = res;
        this.currentPost = res
        if (!res.claimedBy) {
          this.claimed = false;
        }
        this.messageReady = true
      
        }
      )
    })
  }

  sendReply() {
    if (this.user) { }
    let currentTime = new Date;
    if (Array.isArray(this.currentMessage["body"])) {

      let convo = this.currentMessage["body"]

      if (this.currentMessage["body"] === "") {
        this.currentMessage.pop()
      }
      if (this.responseBody) {
        console.log('adding to message')
        convo.push({
          message: " " + this.responseBody,
          author: this.user['displayName'],
          time: currentTime
        })
        this.currentMessage = this.ms.updateMessage(convo)
        console.log('form reset')
        console.log(this.currentMessage)
        this.responseBody = ""
        this.router.navigate(['/messages'])
      }
    }
    else {
      let convo = [this.currentMessage["body"]];
      if (this.responseBody) {
        convo.push(this.responseBody)
        console.log(this.currentMessage)
        this.ms.updateMessage(convo)
      };
      
      this.responseBody = ""
      this.router.navigate(['/messages'])
    }
   
  }
  confirmButtonClicked() {
    console.log("fire the confirm function")
    this.currentPost.location = this.responseAddress;
    this.currentPost.claimedBy = this.currentPost.requestedBy;
    this.ps.updatePost(this.currentMessageId, this.currentMessageId)
    this.sendReply()
    this.router.navigate(["/confirm"])
    // this.router.navigate(["confirm"])
  }
  checkMessage() {
    console.log(this.isRecipient)
  }
  goBack() {
    this.router.navigate(["/messages"])
  }


}









