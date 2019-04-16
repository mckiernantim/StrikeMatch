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
  currentUserId = this.currentUser['id']
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

    return recipient

  }
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
  documentToUsername = _ => {
    const object = _.payload.doc.data();
    object.username = _.payload.doc.displayName;
    console.log(object)
    return object;
  }
  getUserSent() {
    this.userSent = this.afs
      .collection('messages', ref => ref.where('author', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    console.log(this.currentUser)
    return this.userSent
  }
  getUserInbox() {
    this.userInbox = this.afs
      .collection('messages', ref => ref.where('recipient', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    console.log(this.userInbox)
    return this.userInbox

  }
  createMessage(message) {
    this.messageCollection.add(message).then(() =>
      this.router.navigate(['messages']));
    console.log("message sent")

  }
  getMessage() {
    this.refreshMessage()
    console.log(this.currentMessageId)
    console.log(this.currentMessage)
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId).valueChanges();
    return currentMessage
   }
   refreshMessage(){
     localStorage.removeItem("currentMessage");
     localStorage.setItem("currentMessage", this.currentMessageId)
   }
   updateMessage(update){
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
    currentMessage.update({body:update})

   }
   deleteMessage(){
    let currentMessage = this.afs.doc('messages/'+this.currentMessageId);
    currentMessage.update({visible:this.currentUserId})
   }
}


