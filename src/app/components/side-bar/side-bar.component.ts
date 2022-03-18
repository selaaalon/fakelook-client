import { Component, Input, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit(): void {
  }

  addPost(addedPost : boolean){
    if(addedPost){
      this.popupAddPost = false;
    }
  }

}
