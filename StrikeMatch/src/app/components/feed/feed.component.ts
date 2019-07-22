
    
import { MessageService } from './../../services/message.service';
import { ClaimComponent } from './../claim/claim.component';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatDialog, MatDialogActions, MatTable}  from "@angular/material"
import {tap} from 'rxjs/operators'
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postData: Post[] =[];
  
  dataReady: boolean;
  dataSource : MatTableDataSource<any> = new MatTableDataSource;
  currentUser = JSON.parse(localStorage.getItem('user'))
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns:string[] = ['User','Title', "Description", "Date Available","Contact" ]
  posts = this.ps.getPosts();
  constructor(private ps: PostService, public dialog:MatDialog, public change:ChangeDetectorRef, public ms:MessageService) { 
    
  }
  refreshPosts(){
  
    this.posts.subscribe(posts=>{
       this.dataReady = false;
      this.postData = posts.filter(post => post.uid != `${this.currentUser.uid}` && post.claimedBy !=`${this.currentUser.uid}`);
     
     
      this.dataSource= new MatTableDataSource(this.postData)
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      this.dataReady = true;
      console.log(this.sort)
    });

  }
  ngOnInit() {
   this.refreshPosts()
  }
  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.postData);
    console.log
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    console.log("after")
    console.log(this.dataSource.sort)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(id) {
  
    localStorage.setItem('currentPost', id)
   
const dialogRef = this.dialog.open(ClaimComponent, {
      width: "1000px"
      });
    
    dialogRef.afterClosed().subscribe(result => {
     
      
    });
  }
}
