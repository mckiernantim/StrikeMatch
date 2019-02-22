import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatCheckbox, MatPaginator, MatTabChangeEvent}  from "@angular/material"
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postData: Post[] =[];

  dataSource : MatTableDataSource<any>;
  currentUser = JSON.parse(localStorage.getItem('user'))
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns:string[] = ['Title', "Description", "Pick Up Date" , "Location", "Contact" ]
  
  constructor(private ps: PostService,) { 
    
  }

  ngOnInit() {
    this.ps.getPosts().subscribe(posts=>{
      console.log(posts)
      this.postData = posts.filter(post => post.claimedBy != `${this.currentUser.uid}`);
      console.log(this.currentUser)
      this.dataSource= new MatTableDataSource(this.postData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      
    });
    
  }
  ngAfterViewInit(): void {
    
     
  
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
 
 
}



