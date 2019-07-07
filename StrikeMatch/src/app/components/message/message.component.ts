import { ModalService } from './../../services/modal.service';

import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Message } from './../../models/message';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { map } from "rxjs/operators";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatTable}  from "@angular/material"

export interface DialogData {
  animal: string;
  name: string;
}


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
 


  constructor(public ms:MessageService, public change:ChangeDetectorRef, public dialog: MatDialog  ) { }

  ngOnInit() {
    this.updateMessages()
    this.currentUserId = this.currentUserId;
    this.currentUsername = this.currentUsername
 }
 openDialog(): void {
  // const dialogRef = this.dialog.open(ModalContent, {
  //   width: '250px',
  //   data: {text:"data test"},
  // });

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  
  // });
}
  
  updateMessages(){
    this.ms.getUserSent().subscribe(messages => {
      console.log(this.sort)
      this.userSent = new MatTableDataSource(messages)
      this.userSent.sort = this.sort
      console.log(this.userSent.data)
     
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
  
    this.ms.getUser(this.currentUserId).subscribe(data => {
     console.log(data[0].displayName)
    })
  
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
 export interface DialogData {
  content:any,
  name: string;
}

/**
 * @title Dialog Overview
 */
// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css'],
// })
//  export class ModalComponent {

//  content: any;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(ModalContent, {
//       width: '250px',
//       data: {name: this.name, content: this.content}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.content = result;
//     });
//   }

// }

// @Component({
//   selector: 'app-modal-content',
//   templateUrl: './modal.component.html',
// })
// export class ModalContent {

//   constructor(
//     public dialogRef: MatDialogRef<ModalContent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }


