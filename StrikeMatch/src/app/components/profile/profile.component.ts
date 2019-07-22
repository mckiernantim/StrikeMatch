import { ExchangeService } from './../../services/exchange.service';
import { TruncatePipe } from './../feed/feed.component';
import { map } from 'rxjs/operators';
import { Post } from './../../models/post';
import { MessageService } from './../../services/message.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material'
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatDialog, MatDialogActions, MatTable}  from "@angular/material"


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userOpenPosts: any[] = [];
  userRequestedPosts: any[] = [];
  userClaimedPosts:any[]=[];
  userPickedPosts:any[]=[]
  userExchanges:any[] =[]
  claimedPosts: any = [];
  openPosts: MatTableDataSource<any> 
  requestedPosts: MatTableDataSource<any> 
  pickedPosts: MatTableDataSource<any> 
  currentUser = JSON.parse(localStorage.getItem('user'))
  userDisplayName = this.currentUser['displayName']

  
  displayedColumns:string[] = ["Title", 'Description', "Status"]
  claimedTabColumns:string[] = ["Title", 'Description',"PostedBy", "Requested By"]
  constructor(public ps:PostService, public ms:MessageService, public es:ExchangeService) { }

  ngOnInit() {
    this.es.getUserExchanges().subscribe(exchanges => {
      console.log(exchanges)
    })
    this.ps.getUserPosts().subscribe(posts =>{
      console.log(posts)
    
      for(let i = 0 ;i < posts.length; i++){
        if(posts[i]["claimedBy"] != null){
         //posts that the user has agreed and are claimed
          this.userClaimedPosts.push(posts[i])
        }
        //posts that are requested by someone else
        if(posts[i]["claimRequested"]===true){
         
          this.userRequestedPosts.push(posts[i])
        }
        else 
        (this.userOpenPosts.push(posts[i]))

      }
      this.openPosts = new MatTableDataSource(this.userOpenPosts)
      console.log(this.openPosts.data)
      this.requestedPosts = new MatTableDataSource(this.userRequestedPosts)
      this.claimedPosts = new MatTableDataSource(this.userClaimedPosts)
      console.log(this.claimedPosts.data)
      this.ps.getClaimedPosts().subscribe(posts =>{
        this.pickedPosts = new MatTableDataSource(posts)
        console.log(this.pickedPosts.data)
      })
     
     
    })
    console.log(this.userOpenPosts)
  }
  checkRequested(){
    console.log(this.userRequestedPosts)
  }
  checkClaimed(){
    console.log(this.userClaimedPosts)
  }
  checkOpen(){
    console.log(this.userOpenPosts)
  }
}
