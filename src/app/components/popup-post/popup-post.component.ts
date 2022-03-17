import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-popup-post',
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.css']
})
export class PopupPostComponent implements OnInit {

  @Input() post!: IPost;
  @Output() closeDialogEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeDialogEmitter.emit();
  }

}
