import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { IComment } from 'src/app/models/IComment';
import { ITag } from 'src/app/models/ITag';
import { PostService } from 'src/app/services/post.service';

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

  constructor(private _ngZone: NgZone, private postService : PostService) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  stopPropogation(){
    event?.stopPropagation();
  }

  addComment(comment: string){
    event?.stopPropagation();

    this.itags = this.postService.addTagsToPost(this.tags);
    this.taggedUsers = this.postService.addTaggedPeopleToPost(this.tagPeople);

    let newComment = {content : comment, userTaggedComment : this.taggedUsers, tags : this.itags, postId : this.postId} as IComment;
    this.addCommentEvent.emit(newComment);

  }

  closeTag(){
    event?.stopPropagation();
    this.users = false;
  }

  ngOnInit(): void {
  }

  addTaggedUsers(newTaggedUsers : string){
    this.tagPeople = newTaggedUsers;
  }

  addTags(newTags: string){
    this.tags = newTags
  }


}
