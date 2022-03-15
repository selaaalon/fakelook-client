import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

  postsArray = new Array<IPost>();  
  

  constructor(private postService : PostService) { }

  getAllPosts(){
    this.postService.getAllPosts().subscribe((posts)=>{
      this.postsArray = posts;
    })
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

}
