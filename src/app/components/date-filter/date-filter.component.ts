import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  // start = new Date();
  // end = new Date();

  // @Output() addStartDate = new EventEmitter<string>();
  // @Output() addEndDate = new EventEmitter<string>();

  @Output() private onFormGroupChange = new EventEmitter<any>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  today = new Date();

  formCheck :any  = '' 

  constructor() { }

  ngOnInit(): void {
    this.onFormGroupChange.emit(this.range);

  }

  

}
