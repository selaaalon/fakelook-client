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


  @Output() addTaggedUsersToPostEvent = new EventEmitter<string>();

  @Input() placeholder = '';

  @ViewChild('peopleInput') peopleInput!: ElementRef<HTMLInputElement>;

  constructor(private authService : AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      users.forEach((user)=>{
        this.allUsersNames.push(user.userName);
        this.allUsersId.push(user.id!);
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

    // for (let index = 0; index < allTaggedUsers.length; index++) {
    //   const user = allTaggedUsers[index];
    //   let idx = this.allUsersNames.indexOf(user);
    //   let taggedUserId = this.allUsersId[idx];
    //   taggedUsersToPostConcat = taggedUsersToPostConcat + ", " + taggedUserId;
    //   if(index == allTaggedUsers.length-1){
    //     this.taggedUsersIds =  this.taggedUsersIds + taggedUserId
    //   }
    //   else this.taggedUsersIds =  this.taggedUsersIds + taggedUserId + "&taggedUsers=   "
    // }
    // console.log(this.taggedUsersIds);
    allTaggedUsers.forEach((user) => {
      let index = this.allUsersNames.indexOf(user);
      let taggedUserId = this.allUsersId[index]
      // this.taggedUsersIds =  this.taggedUsersIds + taggedUserId + "&taggedUsers="
      taggedUsersToPostConcat = taggedUsersToPostConcat + ", " + taggedUserId;
    })

    // let temp = taggedUsersToPostConcat.split(", ");
    // console.log(temp);
    this.addTaggedUsersToPostEvent.emit(taggedUsersToPostConcat.trim());
  }

  removeTaggedUser(value : string){
    let deleteIndex = this.displayUsers.indexOf(value) 
    // this.allUsersId.splice(deleteIndex,1);
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
    }
    this.peopleInput.nativeElement.value = '';
    this.usersCtrl.setValue(null);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.displayUsers.filter(user => user.toLowerCase().includes(filterValue));
  }
}

