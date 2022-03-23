import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TagsService } from 'src/app/services/tags.service';
import { ITag } from 'src/app/models/ITag';


@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags = new Observable<string[]>();
  selectedTags: string[] = [];
  allTags: string[] = [];
  allITags: ITag[] = [];

  @Output() addTagsToPostEvent = new EventEmitter<string>();

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  constructor(private tagService : TagsService) {
  }


  ngOnInit(): void {
    this.tagService.getAllTags(sessionStorage.getItem('token')!).subscribe((tags) => {
      this.allITags = tags;
      tags.forEach((tag)=>{
        this.allTags.push(tag.content);
      })
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice(0, this.allTags.length))),
      );
    })
  }


  addTagsToPost(allTagsToPost: string[]) {
    let tagsToPostConcat = "";
    allTagsToPost.forEach((tag) => {
      tagsToPostConcat = tagsToPostConcat + ", " + tag;
    })
    this.addTagsToPostEvent.emit(tagsToPostConcat.trim());
  }


  removeTags(value : string){
    let deleteIndex = this.allTags.indexOf(value) 
    this.allTags.splice(deleteIndex,1);
  }
  
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.selectedTags.push(value);

    // Clear the input value
    event.chipInput!.clear();
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
    this.addTagsToPost(this.selectedTags);
  }

  //remove tags from the chip-list
  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.allTags.push(tag);
      this.allTags.sort();
      this.addTagsToPost(this.selectedTags);
    }
  }

  //autocomplete tags based of the tags we have in our DB.
  //add the selected tagd to the post
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.allTags = this.allTags.filter(t => t !== event.option.viewValue);
    this.addTagsToPost(this.selectedTags);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  //filter which tags to display
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}

