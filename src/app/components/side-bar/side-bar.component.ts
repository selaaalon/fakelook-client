import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  
  popupAddPost = false;
  hover = false;

  constructor() { }

  ngOnInit(): void {
  }

  addPost(addedPost : boolean){
    if(addedPost){
      this.popupAddPost = false;
    }
  }

}
