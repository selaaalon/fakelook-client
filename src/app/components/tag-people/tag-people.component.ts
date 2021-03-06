import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-tag-people',
  templateUrl: './tag-people.component.html',
  styleUrls: ['./tag-people.component.css']
})
export class TagPeopleComponent implements OnInit {
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  usersCtrl = new FormControl();
  filteredUsers = new Observable<string[]>();
  taggedUsers: string[] = [] 
  allUsersNames: string[] = [];
  displayUsers : string[] = [];
  allUsersId : number[] = [];

  taggedUsersIds = "taggedUsers=";

  @Output() addTagToComment = new EventEmitter<string>();
  @Output() addTaggedUsersToPostEvent = new EventEmitter<string>();

  @Input() placeholder = '';

  @ViewChild('peopleInput') peopleInput!: ElementRef<HTMLInputElement>;

  constructor(private authService : AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      users.forEach((user)=>{
        this.displayUsers.push(user.userName);
      })
      this.filteredUsers = this.usersCtrl.valueChanges.pipe(
        startWith(null),
        map((user: string | null) => (user ? this._filter(user) : this.displayUsers.slice(0, this.displayUsers.length))),
      );
    })
  }

  addTaggedUsersToPost(allTaggedUsers : string[]){
    let taggedUsersToPostConcat = "";
    allTaggedUsers.forEach((user) => {
      let idx = this.authService.getIdByUserName(user);
      taggedUsersToPostConcat = taggedUsersToPostConcat + ", " + idx;
    })
    this.addTaggedUsersToPostEvent.emit(taggedUsersToPostConcat.trim());
  }

  removeTaggedUser(value : string){
    let deleteIndex = this.displayUsers.indexOf(value) 
    this.displayUsers.splice(deleteIndex,1);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our user
    let index = this.displayUsers.indexOf(value);
    if (value && index > -1 && this.taggedUsers.indexOf(value) == -1) {
      this.removeTaggedUser(value);
      this.taggedUsers.push(value);
      this.addTaggedUsersToPost(this.taggedUsers);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.usersCtrl.setValue(null);

    
  }

  remove(user: string): void {
    const index = this.taggedUsers.indexOf(user);

    if (index >= 0) {
      this.taggedUsers.splice(index, 1);
      this.displayUsers.push(user);
      this.addTaggedUsersToPost(this.taggedUsers);
    }
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.viewValue
    if(this.taggedUsers.indexOf(value) == -1){
      this.taggedUsers.push(value);
      this.removeTaggedUser(value);
      this.addTaggedUsersToPost(this.taggedUsers);
      this.addTagToComment.emit(value);
    }
    this.peopleInput.nativeElement.value = '';
    this.usersCtrl.setValue(null);
    
  }

  //decide which users to display
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.displayUsers.filter(user => user.toLowerCase().includes(filterValue));
  }
}

