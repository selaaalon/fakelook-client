import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() addConnentEvent = new EventEmitter<string>();

  constructor(private _ngZone: NgZone) { }

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
    this.addConnentEvent.emit(comment);
  }

  ngOnInit(): void {
  }

}
