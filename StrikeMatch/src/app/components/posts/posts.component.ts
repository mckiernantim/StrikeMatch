import { MatInputModule } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { postOptions } from './../../models/postOptions';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms"
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatePipe } from '@angular/common'






@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[]
  rForm: FormGroup;

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
    deathDate: null,
    location: null,
    description: null,

  };



  constructor(private ps: PostService, private as: AuthService, fb: FormBuilder) {
    this.rForm = fb.group({
      title: (['']),
      department: (['']),
      subDepartment: ([""]),
      category: ([""]),
      uid:JSON.parse(localStorage.getItem('user')),
      deathDate: null,
      description: null

    })
  }

  ngOnInit() {
    
    this.ps.getPosts().subscribe(posts => {
      console.log(posts)

      this.posts = posts

    });
   


  }
  testPost() {
    console.log(this.rForm.value.uid.uid)
    console.log(this.rForm.value['department'])
  }
  

  modifyAndPost() {
    console.log(this.rForm.value.department)
    this.currentPost['department'] = this.rForm.value['department'];
    console.log(this.currentPost.department)
    this.currentPost.subDepartment = this.rForm.value.subDepartment;
    this.currentPost.category = this.rForm.value.category;
    this.currentPost.deathDate = this.rForm.value.deathDate;
    this.currentPost.claimedBy = null;
    this.currentPost.uid = this.rForm.value.uid.uid
    this.currentPost.title= this.rForm.value.title;
    console.log(this.currentPost.uid)
    this.currentPost.description = this.rForm.value.description;
    console.log(this.currentPost)
    this.ps.createPost(this.currentPost)
  }
  getPostInfoAndClaim(post) {


  }
  selectDepartment(event) {
    this.rForm.patchValue({
      department: event.target['value']

    })

    for (let i = 0; i < postOptions.length; i++) {

      if (postOptions[i].department === event.target['id']) {
        console.log(event.target['id'] + " <------department name")
        this.departmentIndex = i;
        for (let j = 0; j < postOptions[i].children.length; j++) {
          this.postSelections.push(postOptions[i].children[j].subDepartment)

        }
      }
    }
    console.log(this.postState, this.postSelections)
    this.postState++
  }
  selectSubDepartment(event) {
    let lastSelection = postOptions[this.departmentIndex]
    this.postSelections = [];
    this.rForm.patchValue({
      subDepartment: event.target['value']



    })
    console.log(event.target['value'])
    for (let i = 0; i < postOptions.length; i++) {

      if (lastSelection.children[i].subDepartment === event.target['id']) {
        this.subDepartmentIndex = i;

        for (let j = 0; j < lastSelection.children[i].subcategories.length; j++) {
          this.postSelections.push(lastSelection.children[i].subcategories[j]['title'])

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
    for (let i = 0; i < lastSelection.subcategories.length; i++) {
      if (lastSelection.subcategories[i]['title'] === this.rForm['category']) {
        for (let j = 0; j < lastSelection.subcategories[i]['options'].length; j++) {
          this.postSelections.push(lastSelection.subcategories[i]['options'][j]['itemTitle'])
        }
      }
    }
    this.postState++
  }




}
