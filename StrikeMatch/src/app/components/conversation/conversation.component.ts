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
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepicker} from '@angular/material';



export interface DialogData {
 
}


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  rForm:FormGroup;
  name:any;
  content:any;
  user:any = JSON.parse(localStorage.getItem('user'))
  displayName:any
  isRecipient: boolean = false;
  conversations:any[] = [];
  currentMessageId: string = localStorage.getItem("currentMessage")
  currentMessage: any
  collecitons : AngularFirestoreCollection 
  responseBody: string;
  responseDate: string;
  responseAddress: string;


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
    claimedBy:null,
  };
  messageReady: boolean = false
  constructor( public router:Router,public ms:MessageService,public icon:MatIconRegistry, fb:FormBuilder, public dialog: MatDialog, public ps:PostService) {
    
   
}

  
  ngOnInit() {
     this.refreshMessage()
     this.displayName= this.user['displayName']
     console.log(this.displayName)
    
  }
  refreshMessage(){
    this.isRecipient= false;
    if (this.messageReady = true){
       this.messageReady = false
    } 
    console.log(this.currentMessageId)
    this.ms.currentMessageId = localStorage.getItem("currentMessage")
    console.log(this.ms.currentMessageId)
    this.ms.getMessage().subscribe((res)=>{
     
     
      this.currentMessage = res;
      console.log(this.currentMessage)
      
      if(this.currentMessage.recipient === this.user['uid']){
        console.log("match" )
        console.log(this.user['uid'] )
        console.log(this.currentMessage.recipient)
        this.isRecipient= true;
      }
      
      
      console.log(this.currentMessage)
      this.ps.getPost(this.currentMessage['postId']).subscribe((res)=>{
        console.log(res)
        this.currentPost=res;
        console.log(this.currentPost)
        this.messageReady = true;
      })
    })
   
  }
  sendReply(){
    console.log(this.displayName)
    if (this.user){}
    let currentTime = new Date;
    console.log(this.currentMessage["body"])
    if (Array.isArray(this.currentMessage["body"])){
      console.log("convo is an array")

    let convo =  this.currentMessage["body"]
    convo.push({
      message:" " + this.responseBody,
      author:this.user['displayName'],
      time: Date.now()
    })
    console.log()
    console.log(this.responseBody)
    console.log(convo)
   
    this.ms.updateMessage(convo)


    
    }
    else{
      let convo = [this.currentMessage["body"]];
      convo.push(this.responseBody)
      this.ms.updateMessage(convo);
      this.router.navigate(['/conversation'])
      
    }
  }
  confirmButtonClicked(){
    console.log("fire the confirm function")
   this.currentPost.location = this.responseAddress;
   this.currentPost.claimedBy = this.currentPost.requestedBy;
   this.ps.updatePost(this.currentMessageId, this.currentMessageId)
   this.sendReply()
   this.router.navigate(["/confirm"])
    // this.router.navigate(["confirm"])
  }
 
 
}



  
  
 
  


