import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  showDialog = false;

  constructor() { }

  ngOnInit(): void {
  }

  // showFullPost(post: IPost): void {
  //   this.showDialog = true;
  //   this.selectedPost = post;
  // }

  // closeDialog(): void {
  //   this.showDialog = false;
  // }

}
