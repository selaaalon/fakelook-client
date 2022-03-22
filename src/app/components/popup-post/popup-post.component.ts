import { E } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { ILike } from 'src/app/models/ILike';
import { IPost } from 'src/app/models/IPost';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-popup-post',
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.css']
})
export class PopupPostComponent implements OnInit {

  @Input() post!: IPost;
  @Output() closeDialogEmitter = new EventEmitter();
  
  allComments = new Array<IComment>();
  allLikes = new Array<ILike>();

  likeColor : string = "";
  taggedUsers = "@";

  userId = 0;
  likeId = 0;
  isActive = true;

  alreadyLiked = false;
  addCommentFlag = false;


  constructor(private commentService : CommentService, private likesService : LikeService) { }

  // ngOnDestroy(){
  //   this.likesService.addingLike.unsubscribe();
  //   this.commentService.createdNewComment.unsubscribe();
  // }

  ngOnInit(): void {
    this.commentService.getCommentsByPost(this.post.id!).subscribe((comments) => {
      this.allComments = comments;
    });

    this.commentService.createdNewComment.subscribe((comment)=>{
      this.allComments.push(comment);
    })

    this.getAllLikes();
    this.likesService.addingLike.subscribe((like)=>{
      this.allLikes.push(like);
    })



    // console.log(this.post);
  }

  getAllLikes(){
    this.likesService.getLikesByPost(this.post.id!).subscribe((likes) => {
      this.parseJwt();
      this.allLikes = likes;
      this.allLikes.forEach((like) => {
        if(this.userId == like.userId){
          this.likeId = like.id!;
          this.isActive = like.isActive;
          if(like.isActive){
            this.alreadyLiked = true;
          }
          
          // this.likeColor = "primary";
          return;
        }
      })
    })
  }

  parseJwt() {
    let token = sessionStorage.getItem('token')!;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    this.userId = parseInt(JSON.parse(jsonPayload)["UserId"]);
    return JSON.parse(jsonPayload)["UserId"];
   }

  addLike(){
    event?.stopPropagation();
    this.alreadyLiked = !this.alreadyLiked;
    
  }

  addComment(){
    event?.stopPropagation();
    // this.commentService.createdNewComment.next()
    this.addCommentFlag = !this.addCommentFlag;
  }

  addItem(comment: string) {

    // let tags = 
    // let newComment = {content : comment, postId : this.post.id!} as IComment;
    console.log(comment);
    // this.commentService.addComment(newComment).subscribe(() => {
    //   this.commentService.createdNewComment.next(newComment);
    //   console.log("Added comment");
    //   console.log(newComment);
    //   this.addCommentFlag = false;
    // })
    // this.items.push(newItem);
  }


  close(): void {
    //adding new like as our user to post
    if(this.alreadyLiked && !this.likeId){
      let newLike =  {isActive : true, postId : this.post.id} as ILike
      this.likesService.addLike(newLike).subscribe(()=>{
        this.likesService.addingLike.next(newLike);
        this.alreadyLiked = !this.alreadyLiked;
      })
    }
    //adding new like
    if(!this.alreadyLiked && this.likeId){
      this.likesService.updateLike(this.likeId, false).subscribe(()=>{
        this.alreadyLiked = ! this.alreadyLiked;
      });
    }
    if(this.alreadyLiked && this.likeId && !this.isActive){
      this.likesService.updateLike(this.likeId, true).subscribe(()=>{
        this.alreadyLiked = ! this.alreadyLiked;
      });
    }

    this.closeDialogEmitter.emit();
  }

}
