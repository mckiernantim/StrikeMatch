import { ModalComponent } from './../modal/modal.component';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Message } from './../../models/message';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators"

import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent}  from "@angular/material"



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  
})

export class MessageComponent implements OnInit {
  userReceived: MatTableDataSource<any>;
  userSent: Message[] = [];
  displayedColumns:string[] = ['From',"Subject", "Delete"]
  dartaSource = this.userReceived
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserId= this.currentUser['uid']
  currentUsername = this.currentUser['displayName']
  recipient:any;
  selectedMessage: MatTableDataSource<Message>;
  messageColumns= ['From','Title',"Body"]
 


  constructor(public ms:MessageService, ) { }

  ngOnInit() {
    this.updateMessages()
    this.currentUserId = this.currentUserId;
  
    this.currentUsername= this.currentUsername
  }
  updateMessages(){
    this.ms.getUserSent().subscribe(messages => {
 
      messages.forEach(message => this.userSent.push(message))
    })
    this.ms.getUserInbox().subscribe(messages => {
      this.userReceived = new MatTableDataSource(messages)
      console.log(this.userReceived.data)
    })
  }
  getUsername(){
 
    this.ms.getUser(this.currentUserId).subscribe(
      data => this.recipient=(data[0]['displayName'])
    )
    console.log(this.recipient)
  }
  messageClicked(event){
    localStorage.removeItem("currentMessage")
    console.log(event)
   localStorage.setItem("currentMessage", event)
  }
  deleteClicked(event){
   this.messageClicked(event)
   this.ms.deleteMessage()
 


  }
}
