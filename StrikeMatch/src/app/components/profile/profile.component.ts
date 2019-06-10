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
  userClaimedPosts:any[]=[]
  claimedPosts: MatTableDataSource<any> = new MatTableDataSource;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  
  displayedColumns:string[] = ["Title", 'Description', "User"]
  claimedTabColumns:string[] = ["Title", 'Description', "Requested By"]
  constructor(public ps:PostService, public ms:MessageService) { }

  ngOnInit() {
    this.ps.getUserPosts().subscribe(posts =>{
      console.log(posts)
    
      for(let i = 0 ;i < posts.length; i++){
        if(posts[i]["claimedBy"] != null){
         
          this.userClaimedPosts.push(posts[i])
        }
        if(posts[i]["claimRequested"]===true){
         
          this.userRequestedPosts.push(posts[i])
        }else 
        (this.userOpenPosts.push(posts[i]))

      }
      this.dataSource = new MatTableDataSource(this.userOpenPosts)
      this.claimedPosts = new MatTableDataSource(this.userClaimedPosts)
     
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
