import { E } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { ILike } from 'src/app/models/ILike';
import { IPost } from 'src/app/models/IPost';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-popup-post',
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.css']
})
export class PopupPostComponent implements OnInit {

  @Input() post!: IPost;
  @Output() closeDialogEmitter = new EventEmitter<IPost>();
  
  allComments = new Array<IComment>();
  allLikes = new Array<ILike>();
  numLikes = 0;

  likeColor : string = "";
  taggedUsers = "@";

  userId = 0;
  likeId = 0;
  isActive = true;
  userTaggedPost :any[] = [];

  userIdsAndNames : any[] = [];

  alreadyLiked = false;
  addCommentFlag = false;
  edit = false;
  editBtn = false;


  constructor(private commentService : CommentService, private likesService : LikeService, 
    private authService : AuthService) { }


  ngOnInit(): void {
    this.getUsersName();
    this.userId = this.authService.getCurrentUserId();
    
    //if the current user wrote this post, he can edit it.
    if(this.userId === this.post.userId){
      this.editBtn = true;
    }

    this.commentService.getCommentsByPost(this.post.id!).subscribe((comments) => {
      this.allComments = comments;
      this.allComments.forEach((comment)=>{
        comment.userName = this.userIdsAndNames[comment.userId!];
      })
    });

    this.commentService.createdNewComment.subscribe((comment)=>{
      this.allComments.push(comment);
    })

    this.getAllLikes();
    this.likesService.addingLike.subscribe((like)=>{
      this.allLikes.push(like);
    })
  }

  getAllLikes(){
    this.likesService.getLikesByPost(this.post.id!).subscribe((likes) => {
      this.allLikes = likes;
      let numActiveLikes = 0;
      this.allLikes.forEach((like) => {
        if(like.isActive){
          numActiveLikes += 1;
        }

        //check if current user already liked this post, and show it accordingly
        if(this.userId == like.userId){
          this.likeId = like.id!;
          this.isActive = like.isActive;
          if(like.isActive){
            this.alreadyLiked = true;
          }
        }
      })
      this.numLikes = numActiveLikes;
    })
  }

  getUsersName(){
    let tagged = this.post.userTaggedPost;
    this.userIdsAndNames = this.authService.userIdsAndNames;
    if(tagged){
      for (let index = 0; index < tagged.length; index++) {
        const user = tagged[index];
        this.userTaggedPost.push(this.authService.userIdsAndNames[user.userId])
      }
    }
  }

  addLike(){
    event?.stopPropagation();
    if(this.alreadyLiked){
      this.numLikes--;
    }
    else{
      this.numLikes++;
    }
    this.alreadyLiked = !this.alreadyLiked;
    
  }

  addComment(){
    event?.stopPropagation();
    this.addCommentFlag = !this.addCommentFlag;
  }

  addItem(comment: IComment) {
    this.commentService.addComment(comment).subscribe(() => {
      this.commentService.createdNewComment.next(comment);
      this.addCommentFlag = false;
    }, (error) => console.log(error)
    );
    this.close();
  }

  editPost(){
    event?.stopPropagation();
    this.edit =! this.edit;
  }

  finishEdit(){
    event?.stopPropagation();
    this.edit = false;
    this.close();
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

    this.closeDialogEmitter.emit(this.post);
  }

}
