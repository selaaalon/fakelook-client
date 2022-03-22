import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() addCommentEvent = new EventEmitter<string>();

  users = false;
  placeholder = ""
  comment = "";

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
    let content = "";
    let users = [];
    let tags = [];

    let newComment = comment;
    this.addCommentEvent.emit(newComment);
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

}
