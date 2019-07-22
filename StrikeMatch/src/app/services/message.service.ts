import { FormBuilder, } from '@angular/forms';
import { User } from './../models/user';
import { combineLatest } from 'rxjs/operators/';
import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore"
import { Post } from '../models/post'
import { Observable, Timestamp } from 'rxjs'
import { map } from 'rxjs/operators'
import { config } from '../config'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


export class MessageService {

  userInbox: Observable<Message[]>;
  userSent: Observable<Message[]>;
  
  messages: Observable<any>
  currentMessage: Observable<any>
  currentMessageId = localStorage.getItem("currentMessage")
  private messageDoc: AngularFirestoreDocument<Message>
  messageCollection: AngularFirestoreCollection<Message>
  currentUser = JSON.parse(localStorage.getItem('user'))
  currentUserId = this.currentUser['uid'];

  currentUsername = this.currentUser['displayName']
  recipient: any
  
  constructor(private router: Router, private afs: AngularFirestore) {
    this.messageCollection = afs.collection<Message>("messages");
    this.currentMessage = afs.doc('messages/'+this.currentMessageId).valueChanges();
    this.messages =
      this.afs.collection('messages').snapshotChanges()
        .pipe(map(actions => actions.map(this.documentToDomainObject)))
      }

      

  getUser(id) {
    let recipient =
      this.afs
        .collection('users', ref => ref.where('uid', '==', id)).snapshotChanges()
        .pipe(map(actions => actions.map(this.documentToDomainObject)))
       console.log(recipient)
    return recipient

  }
  checkInbox(){
    
  }
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
  documentToUsername = _ => {
    const object = _.payload.doc.data();
    object.username = _.payload.doc.displayName;
   
    return object;
  }
  getUserSent() {
    let messages:any[] = [];
    this.userSent = this.afs
      .collection('messages', ref => ref.where('uid', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)))
        
    this.userSent.subscribe(data => {for(let i=0; i<data.length;i++){

      messages.push(data[i])

    }this.afs.doc('users/'+this.currentUserId).update({
      sentMessages: messages
    })
  })
  return this.userSent
  }
  deleteClicked(messageId) {
    this.afs.doc('messages/'+messageId).update({
      recipient:{

      }
    })
  } 
  getUserInbox() {
    let messages:any[]=[];
    this.userInbox = this.afs
      .collection('messages', ref => ref.where('recipient', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)))
 
  
    this.userInbox.subscribe(data => {for(let i=0; i<data.length;i++){

      messages.push(data[i])

    }this.afs.doc('users/'+this.currentUserId).update({
      inbox: messages
    })
  })

    
    
    return this.userInbox

  }
  createMessage(message) {
  
    console.log("creating the mesage now")
    message.body.shift()
    console.log(message)
    this.messageCollection.add(message).then(() =>
      this.router.navigate(['messages']));
 

  }
  getMessage() {
    this.refreshMessage()
    let message =  this.afs.doc('messages/'+this.currentMessageId).valueChanges()
    return message
    
    
   }
   refreshMessage(){
     localStorage.removeItem("currentMessage");
     localStorage.setItem("currentMessage", this.currentMessageId)
   }
   updateMessage(update){
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
    currentMessage.update({body:update})
    currentMessage.update({newContent:true})
    currentMessage.update({visible:true})
   return(currentMessage.valueChanges())
  }
  contentToggle(){
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
    currentMessage.update({newContent:false})
    return(currentMessage.valueChanges())
  }
  hideMessage(){
    
      let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
      currentMessage.update({visible:false})
      return(currentMessage.valueChanges())
    
  }
   deleteMessage(){
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
    currentMessage.update({deleted: this.currentUserId})
   }
   
}


