import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  
  currentUser = JSON.parse(localStorage.getItem('user'))
  userImgUrl = this.currentUser["photoURL"]
  userDisplayName = this.currentUser["displayName"]
  


  constructor() {

   }

  ngOnInit() {
    console.log(this.currentUser)
  }

}
