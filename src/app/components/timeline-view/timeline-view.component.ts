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
export class TimelineViewComponent implements OnInit, OnChanges {

  

  postsArray = new Array<IPost>();
  showDialog = false;
  selectedPost!: IPost;

   postsObs = new Observable<IPost[]>();
  

  constructor(private postService : PostService, private authService : AuthService, private router : Router,public cd: ChangeDetectorRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  // ngOnDestroy(){
  //   this.postService.createdNewPost.unsubscribe();
  // }

  ngOnInit(): void {

    this.getAllPosts();
    console.log(this.authService.userIdsAndNames);
    
    // this.postService.createdNewPost.subscribe((item)=>{
    //   this.postsArray.push(item);
    //   this.sortArray();
    // });
  }


  getAllPosts(){
    this.postService.getAllPosts().subscribe((posts)=>{
      // this.postsArray = posts.sort((p1, p2)=>p1.date > p2.date ? -1 : 1);
      
      this.postsArray = [...posts];
      // console.log(this.postsArray);
      this.sortArray();
      this.cd.detectChanges();
    },
    (error) => {
      console.log("stuck");
      console.log(error);
      this.router.navigate([""])
    });
    // this.postsObs = this.postService.getAllPosts().pipe(tap(res=>{
    //   console.log('in tap',res);
    //   this.postsArray = [...res];
    //     this.cd.detectChanges();
    // }))
  }

  sortArray(){
    this.postsArray.sort((p1, p2)=>new Date(p1.date) > new Date(p2.date) ? -1 : 1);
  }

  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
  }

  close(post : IPost){
    // let newPostsArr = this.postsArray;

    // let tempPost = this.postsArray.find(p => p.id == post.id);
    // let idx = this.postsArray?.indexOf(tempPost!);

    // newPostsArr[idx] = post;
    // this.postsArray = newPostsArr;
    // console.log(newPostsArr);
    // this.cd.detectChanges();
    //this.router.navigate(['/main-page/timeline']);
    this.showDialog = false;
  }

}
