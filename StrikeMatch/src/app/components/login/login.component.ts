import { AuthService } from './../../services/auth.service';
import { AngularFireModule } from '@angular/fire';

import {
 
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login'
// import {moveIn} from '../router.animations'
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // animations: [moveIn()],
  // host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthService) {
  }
  
       


  ngOnInit() {
    console.log(this.authService)

  }

}
