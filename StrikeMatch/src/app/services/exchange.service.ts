import { Router } from '@angular/router';
import { Exchange } from './../models/exchange';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore"
import { MatTabChangeEvent } from '@angular/material/'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators'


import { config } from '../config'

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
exchangeCollection: AngularFirestoreCollection<Exchange>
private exchangeDoc : AngularFirestoreDocument<Exchange>
exchanges: Observable<any>;
currentExchange:Exchange;
userExchanges: Observable<any>;
currentUser = JSON.parse(localStorage.getItem('user'));


  constructor(private afs: AngularFirestore, private router:Router) { 
    this.exchangeCollection = afs.collection<Exchange>('exchanges')
    this.exchanges = afs.collection('exchanges').snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}
getUserExchanges(){
  this.userExchanges = 
      this.afs.collection('exchanges', ref => ref.where('recipientUid', '==', `${this.currentUser.uid}`)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
       return this.userExchanges
}

createExchange(exchange){

     
    this.exchangeCollection.add(exchange).then(()=>
    this.router.navigate(['/dashboard']))

   }

   updateExchange(id, exchange){
    console.log(id);
    console.log(exchange)
    
    this.exchangeDoc = this.afs.doc<Exchange>
     (`${config.collection_endpoint}/${id}`);
    
    if(exchange.time){
      this.exchangeDoc.update({time: exchange.time})
    }
    if(exchange.location){
      this.exchangeDoc.update({location: exchange.location})
    }
    if(exchange.complete){
      this.exchangeDoc.update({complete: exchange.complete})
    }
  }

  
  
  
}


