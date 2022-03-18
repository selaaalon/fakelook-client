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

  @Output() addTaggedUsersToPostEvent = new EventEmitter<string>();

  @Input() placeholder = '';

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private authService : AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      users.forEach((user)=>{
        this.allUsersNames.push(user.name!);
      })
      this.filteredUsers = this.usersCtrl.valueChanges.pipe(
        startWith(null),
        map((user: string | null) => (user ? this._filter(user) : this.allUsersNames.slice(0, this.allUsersNames.length))),
      );
    })
  }

  addTaggedUsersToPost(allTaggedUsers : string[]){
    let taggedUsersToPostConcat = "";
    allTaggedUsers.forEach((user) => {
      taggedUsersToPostConcat = taggedUsersToPostConcat + ", " + user;
    })
    this.addTaggedUsersToPostEvent.emit(taggedUsersToPostConcat.trim());
  }

  removeTaggedUser(value : string){
    let deleteIndex = this.allUsersNames.indexOf(value) 
    this.allUsersNames.splice(deleteIndex,1);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    // Add our fruit
    if (value && this.allUsersNames.indexOf(value) > -1 && this.taggedUsers.indexOf(value) == -1) {
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
      this.allUsersNames.push(user);
      this.addTaggedUsersToPost(this.taggedUsers);
    }
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.viewValue
    if(this.taggedUsers.indexOf(value) == -1){
      this.taggedUsers.push(value);
      this.removeTaggedUser(value);
      this.addTaggedUsersToPost(this.taggedUsers);
      console.log(value);
    }
    this.fruitInput.nativeElement.value = '';
    this.usersCtrl.setValue(null);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsersNames.filter(user => user.toLowerCase().includes(filterValue));
  }
}

