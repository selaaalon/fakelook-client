import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TagsService } from 'src/app/services/tags.service';


@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {

  

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags = new Observable<string[]>();
  tags: string[] = [];
  allTags: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private tagService : TagsService) {
    // this.filteredTags = this.tagsCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
    // );
  }

  ngOnInit(): void {
    this.tagService.getAllTags(sessionStorage.getItem('token')!).subscribe((tags) => {
      tags.forEach((tag)=>{
        this.allTags.push(tag.content);
      })
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice(0, this.allTags.length))),
      );
    })
  }

  removeTags(value : string){
    let deleteIndex = this.allTags.indexOf(value) 
    this.allTags.splice(deleteIndex,1);
  }
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.tags.indexOf(value) == -1) {
      this.removeTags(value);
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
    console.log(this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.allTags.push(tag);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.viewValue;
    if(this.tags.indexOf(value) == -1){
      this.tags.push(event.option.viewValue);
    }
    this.fruitInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}

