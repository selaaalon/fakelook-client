import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  
  popupAddPost = false;
  hover = false;
  taggeUsersPlaceholder = "Tagged Users";
  publishersPlaceholder = "Publishers";

  // @Input() placeholderToTagPeople = 'Tagged Users'; 
  
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  addPost(addedPost : boolean){
    if(addedPost){
      this.popupAddPost = false;
    }
  }


}
