import { ModalComponent } from './../modal/modal.component';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Message } from './../../models/message';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { map } from "rxjs/operators";


import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatTable}  from "@angular/material"



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  
})

export class MessageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  userReceived: MatTableDataSource<any>;
  userSent: MatTableDataSource<any>;
  displayedColumns:string[] = ["createdAt",'author',"title", "Delete"]
  sentColumns:string[] = ["createdAt","recipient", "title", "Delete"]
  dataSource = this.userReceived
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserId= this.currentUser['uid']
  currentUsername = this.currentUser['displayName']
  recipient:any;
  selectedMessage: MatTableDataSource<Message>;
  messageColumns= ['From','Title',"Body"];
  messageReady: boolean = false;
 


  constructor(public ms:MessageService, public change:ChangeDetectorRef ) { }

  ngOnInit() {
    this.updateMessages()
    this.currentUserId = this.currentUserId;
  
    this.currentUsername = this.currentUsername
 
    
  }
  updateMessages(){
    this.ms.getUserSent().subscribe(messages => {
      console.log(this.sort)
      this.userSent = new MatTableDataSource(messages)
      this.userSent.sort = this.sort
     
    })
    this.ms.getUserInbox().subscribe(messages => {
      console.log(this.sort)
      this.userReceived = new MatTableDataSource(messages)
      this.userReceived.sort = this.sort
      
      this.messageReady = true;
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
 tabChange(event: MatTabChangeEvent){
  this.change.markForCheck()


}
}
