import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { IComment } from 'src/app/models/IComment';
import { ITag } from 'src/app/models/ITag';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() addCommentEvent = new EventEmitter<IComment>();
  @Input() postId = 0;

  users = false;
  placeholder = ""
  comment = "";
  tags = "";
  tagPeople = "";
  taggedUsers : any[]= [];
  itags : ITag[] = [];

  constructor(private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  // addNewComment(value: string) {
  //   this.addCommentEvent.emit(value);
  // }

  stopPropogation(){
    event?.stopPropagation();
    // console.log(this.comment);
  }

  addComment(comment: string){
    event?.stopPropagation();
    console.log(this.itags);
    console.log(this.taggedUsers);

    this.addTagsToComment();
    this.addTaggedUsersToComment();


    let newComment = {content : comment, userTaggedComment : this.taggedUsers, tags : this.itags, postId : this.postId} as IComment;
    this.addCommentEvent.emit(newComment);
    // console.log(this.tags);
    // console.log(this.taggedUsers);
  }

  closeTag(){
    event?.stopPropagation();
    this.users = false;
  }

  ngOnInit(): void {
  }

  addCom(value : any){
    if(value.data === "@"){
      this.users = true;
    }
    console.log(this.users);
  }

  addTaggedUsers(newTaggedUsers : string){
    this.tagPeople = newTaggedUsers;
  }



  addTaggedUsersToComment(){
    let tagsArr = this.tagPeople.split(", ");
    tagsArr.forEach((tag) => {
      if(tag){
        let taggedId = {userId : parseInt(tag)}
        this.taggedUsers.push(taggedId);
      }
    })

    // let taggedUsersString = this.tagPeople.split(', ').filter(function(value, idx, arr){
    //   return value
    // });
    // taggedUsersString.forEach((user) => {
    //   this.taggedUsers.push(parseInt(user));
    // })
    // console.log(this.taggedUsers);
  }

  addTags(newTags: string){
    this.tags = newTags
  }

  addTagsToComment(){
    let tagsArr = this.tags.split(", ");
    tagsArr.forEach((tag) => {
      if(tag){
        let itag = {content : tag} as ITag;
        this.itags.push(itag);
      }
    })
    // console.log(this.tags);
  }

  // addTagsToPost(){
  //   let tagsArr = this.tags.split(", ");
  //   tagsArr.forEach((tag) => {
  //     if(tag){
  //       let itag = {content : tag} as ITag;
  //       this.itagArr.push(itag);
  //     }
  //   })
  // }

}
