import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {

  descCtrl = new FormControl();

  @Output() addDescEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addDesc(value: string) {
    this.addDescEvent.emit(value);
  }

}
