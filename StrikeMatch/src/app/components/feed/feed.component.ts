import { ClaimComponent } from './../claim/claim.component';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent, MatDialog, MatDialogActions}  from "@angular/material"
import {tap} from 'rxjs/operators'



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postData: Post[] =[];

  dataSource : MatTableDataSource<any> = new MatTableDataSource;
  currentUser = JSON.parse(localStorage.getItem('user'))
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns:string[] = ['Title', "Description", "Pick Up Date" , "Location", "Contact" ]
  posts = this.ps.getPosts();
  constructor(private ps: PostService, public dialog:MatDialog, public change:ChangeDetectorRef) { 
    
  }
  refreshPosts(){
  
    this.posts.subscribe(posts=>{
     
      this.postData = posts.filter(post => post.claimedBy != `${this.currentUser.uid}`);
      console.log("on Init firing")
      console.log(this.postData)
     
      this.dataSource= new MatTableDataSource(this.postData)
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
     
   

      
    });

  }
  ngOnInit() {
   this.refreshPosts()
    
  }
  ngDoCheck(){
 this.refreshPosts()
 console.log("fired")
 console.log(this.dataSource.data)
  
  
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
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
      width: "500px"
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
 
 
}



