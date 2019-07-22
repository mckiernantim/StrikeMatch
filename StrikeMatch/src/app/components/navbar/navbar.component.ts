import { AuthService } from './../../services/auth.service';
import { RefreshService } from './../../refresh.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver,  private ref: ChangeDetectorRef, public refresh:RefreshService) {}
  title = 'StrikeMatch';
  currentUser = JSON.parse(localStorage.getItem("user"));
  userName: string

ngOnInit(): void {
  console.log("on init")

  this.currentUser = JSON.parse(localStorage.getItem("user"));
 if(this.currentUser!=""){
  this.userName = this.currentUser['displayName']
 }
}
  refreshDom(){
    this.ref.detectChanges()
  }
  
  
    logOut(){
      
    this.userName=""
    this.currentUser= ""
      this.authService.SignOut()
      this.refreshDom()
      
    }

}
