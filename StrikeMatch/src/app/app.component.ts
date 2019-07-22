import { NavbarComponent } from './components/navbar/navbar.component';
import { RefreshService } from './refresh.service';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommonModule } from '@angular/common';  



import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private ref: ChangeDetectorRef, public router:Router, public refresh:RefreshService){}
  title = 'StrikeMatch';
  currentUser = JSON.parse(localStorage.getItem("user"));
  userName: string


ngDoCheck(): void {
 
 
  
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  
}

refreshDom(){
  this.ref.detectChanges()
}
ngOnInit(): void{

}


  logOut(){
    
  this.userName=""
  this.currentUser= ""
    this.authService.SignOut()
    this.refreshDom()
    
  }
}
