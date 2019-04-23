
import { Router } from '@angular/router';
import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms"
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageService } from './../../services/message.service';
import { Message } from './../../models/message';
import { OnInit } from '@angular/core';
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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
  conversations:any[] = [];
  currentMessageId: string = localStorage.getItem("currentMessage")
  currentMessage: any
  collecitons : AngularFirestoreCollection 
  responseBody: string;
  messageReady: boolean = false
  constructor( public router:Router,public ms:MessageService,public icon:MatIconRegistry, fb:FormBuilder, public dialog: MatDialog) {
    icon.addSvgIcon('back','../icons/noun_back button_952258.png')
   
}

  
  ngOnInit() {
     this.refreshMessage()
  }
  refreshMessage(){
    if (this.messageReady = true){
       this.messageReady = false
    } 
    console.log(this.currentMessageId)
    this.ms.currentMessageId = localStorage.getItem("currentMessage")
    console.log(this.ms.currentMessageId)
    this.ms.getMessage().subscribe((res)=>{
      console.log(res)
      this.currentMessage = res;
      this.messageReady = true;
      console.log(this.currentMessage)
    })
  }
  sendReply(){
    console.log(this.currentMessage["body"])
    if (Array.isArray(this.currentMessage["body"])){
      console.log("convo is an array")

    let convo =  this.currentMessage["body"]
    convo.push(" " + `${this.user['uid']}: ` + this.responseBody)
    console.log()
    console.log(this.responseBody)
    console.log(convo)

    this.ms.updateMessage(convo)
    this.router.navigate(["messages"])
    }
    else{
      let convo = [this.currentMessage["body"]];
      convo.push(this.responseBody)
      this.ms.updateMessage(convo);
      this.router.navigate(["messages"])
    }
  }
  confirmButtonClicked(){
    this.router.navigate(["confirm"])
  }
 
 
}



  
  
 
  


