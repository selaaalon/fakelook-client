import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
  showDialog = false;
  selectedPost!: IPost;

  postsObs = new Observable<IPost[]>();

  constructor(private postService : PostService, private authService : AuthService, 
    private router : Router,public cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.getAllPosts();
  }


  getAllPosts(){
    this.postService.getAllPosts().subscribe((posts)=>{
      
      this.postsArray = [...posts];
      this.sortArray();
      this.cd.detectChanges();
    },
    (error) => {
      this.router.navigate([""])
    });

  }

  sortArray(){
    this.postsArray.sort((p1, p2)=>new Date(p1.date) > new Date(p2.date) ? -1 : 1);
  }

  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
  }

  close(post : IPost){
    this.showDialog = false;
  }

}
