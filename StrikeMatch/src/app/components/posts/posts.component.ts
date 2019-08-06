import { MatInputModule } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { postOptions } from './../../models/postOptions';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms"
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import {MatSnackBar} from "@angular/material/snack-bar"






@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() tabReset:boolean;
  @Output()tabResetChange = new EventEmitter<number>()
  selectedIndex: number = 0
  posts: Post[]
  rForm: FormGroup;
  publishControl:FormControl;
  minDate = new Date();
  currentUser: string;
  deaprtment: string;
  subDepartment: string;
  item: string;
  postSelections: string[] = [];
  postState: number = 0;
  departmentIndex: number = 0;
  subDepartmentIndex: number = 0;
  currentPost: Post = {
    title: "",
    department: "",
    subDepartment: "",
    category: "",
    uid: "",
    displayName:"",
    deathDate: null,
    availableDate:new Date,
    location: null,
    description: null,
  };



  constructor(
    private ps: PostService, 
    private as: AuthService, 
    public fb: FormBuilder, 
    public change: ChangeDetectorRef, 
    public snackbar:MatSnackBar ) {
   
    this.publishControl = new FormControl('',[Validators.required])
  }

  ngOnInit() {
    this.rForm = new FormGroup({
      title: new FormControl(),
      department: new FormControl(),
      subDepartment: new FormControl(),
      category: new FormControl(),
      description: new FormControl(),
      availableDate: new FormControl(),
      deathDate: new FormControl(),
      displayName: new FormControl(),
      uid: new FormControl(JSON.parse(localStorage.getItem('user'))),



      // uid:new FormControl(JSON.parse(localStorage.getItem('user')),
      // displayName:[JSON.parse(localStorage.getItem('user'))],
      // deathDate: [null],
      // availableDate: [null],
      // description: [null],
    })
    
    this.ps.getPosts().subscribe(posts => {
      this.posts = posts
    });
  }
  tabChange(event: MatTabChangeEvent){
    this.change.markForCheck()
  if (event.index===2){
    this.ps.editTabClicked()
  }  
  else if (event.index===0){
   let x =this.ps.searchTabClicked()
   console.log(x)
   
    console.log("got all the posts")

  }
}
  ngOnChanges(){
    this.ps.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }
  testPost() {
    console.log(this.rForm.value.uid)
    console.log(this.rForm.value)
    console.log(this.rForm.value['department'])
    console.log(this.rForm.value['description'])
    console.log(this.currentPost)
  }
  

  modifyAndPost() {

    // Get the post information
    this.currentPost['department'] = this.rForm.value['department'];
    this.currentPost.subDepartment = this.rForm.value.subDepartment;
    this.currentPost.category = this.rForm.value.category;
    // this.currentPost.deathDate = this.rForm.value.deathDate;
    let info = JSON.parse(localStorage.getItem('user'))
    this.currentPost.uid = info['uid']
    this.currentPost.displayName = info['displayName']
    // this.currentPost.title= this.rForm.value.title;
    // this.currentPost.description = this.rForm.value.description;
    // this.currentPost.availableDate = this.rForm.value.availableDate;
    this.currentPost.claimedByDisplayName  = null;    
    this.currentPost.claimedBy = null;
    this.currentPost.claimRequested = null;
    this.currentPost.requestedBy = null;
    console.log(this.currentPost)
    //create new post 
    this.ps.createPost(this.currentPost)
   // reset for another post
    this.resetPostForms();

  }
  resetPostForms(){
    this.postSelections = [];
    this.currentPost.department = null;
    this.currentPost.category = null;
    this.currentPost.deathDate = null;
    this.currentPost.uid=null;
    this.currentPost.displayName=null;
    this.currentPost.title=null;
    this.currentPost.description=null;
    this.rForm.value.department = null;
    this.rForm.value.category = null;
    this.rForm.value.deathDate = null;
    this.rForm.value.title=null;
    this.rForm.value.description=null;
    this.postState=0;
}


  selectDepartment(event:any) {
    
    this.rForm.patchValue({
      department: event.target['value']
    })
    for (let i = 0; i < postOptions.length; i++) {

      if (postOptions[i].department === event.target['id']) {
      
        this.departmentIndex = i;
        for (let j = 0; j < postOptions[i].children.length; j++) {
          this.postSelections.push(postOptions[i].children[j]['subDepartment'])
          
        }
      }
    }
   
    this.postState++
  }
  selectSubDepartment(event) {
    let lastSelection = postOptions[this.departmentIndex]
    this.postSelections = [];
    this.rForm.patchValue({
      subDepartment: event.target['value']
    })
    for (let i = 0; i < lastSelection.children.length; i++) {
      if (lastSelection.children[i]['subDepartment'] === event.target['id']) {
        this.subDepartmentIndex = i;
      for (let j = 0; j < lastSelection.children[i]['subcategories'].length; j++) {
        if (lastSelection.children[i]['subcategories'][j]['title'] === null){
          this.postState++
        }else{
          this.postSelections.push(lastSelection.children[i]['subcategories'][j]['title'])
        }
      }
      }
    }
    this.postState++
 }
  selectCategory(event) {
    this.postSelections = [];
    let lastSelection = postOptions[this.departmentIndex].children[this.subDepartmentIndex]
    this.rForm.patchValue({
      category: event.target['value']
    })
    for (let i = 0; i < lastSelection['subcategories'].length; i++) {
      if (lastSelection['subcategories'][i]['title'] === this.rForm['category']) {
        for (let j = 0; j < lastSelection['subcategories'][i]['options'].length; j++) {
          this.postSelections.push(lastSelection['subcategories'][i]['options'][j]['itemTitle'])
        }
      }
    }
    this.postState++
  }
  resetTabIndex() {
    this.selectedIndex = 0;
  }
openUndoSnackbar(){
  const snackBarRef = this.snackbar.open('Post Published', "action", {
    horizontalPosition:'end'

  })
}



}
