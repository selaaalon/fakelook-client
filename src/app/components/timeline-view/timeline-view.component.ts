import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/IPost';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

  postsArray = new Array<IPost>();

  

  constructor(private postService : PostService, private authService : AuthService, private router : Router) { }

  getAllPosts(){
    this.postService.getAllPosts(sessionStorage.getItem('token')!).subscribe((posts)=>{
      this.postsArray = posts.sort((p1, p2)=>p1.date > p2.date ? -1 : 1);
    },
    (error) => {this.router.navigate([""])});
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

}
