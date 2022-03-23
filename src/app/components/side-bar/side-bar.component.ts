import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  
  popupAddPost = false;
  hover = false;


  tagsFilter = "";
  taggedUsersFilter = "";
  publishersFilter = "";
  tagsPrefix = "tags="
  taggedUserPrefix = "taggedUsers=";
  publishersPrefix = "publishers=";
  minDateFilter = "";
  maxDateFilter = "";

  formCheck :any  = '' 

  // @Input() placeholderToTagPeople = 'Tagged Users'; 
  
  constructor(private router : Router, private datepipe: DatePipe, private postService : PostService) { }

  ngOnInit(): void {
  }

  addPost(addedPost : boolean){
    if(addedPost){
      this.popupAddPost = false;
    }
  }

  // addUsers(newTaggedUsers : string, temp : string){
  //   let tagPeople = newTaggedUsers.split(", ");
  //   temp =  "&taggedUsers=";
  //   for (let index = 0; index < tagPeople.length; index++) {
  //     const userId = tagPeople[index];
  //     if(userId){
  //       if(index == tagPeople.length - 1){
  //         temp = temp + userId;
  //       }
  //       else temp = temp + userId + temp;
  //     }
  //   }

  // }

  addTaggedUsers(newTaggedUsers : string){
    this.taggedUsersFilter = newTaggedUsers;
  }

  addPublishers(newPublishers : string){
    this.publishersFilter = newPublishers;
  }

  split(newTaggedUsers : string, prefix : string){
    let endPrefix = prefix;
    let tagPeople = newTaggedUsers.split(", ");
    for (let index = 0; index < tagPeople.length; index++) {
      const userId = tagPeople[index];
      if(userId){
        if(index == tagPeople.length - 1){
          prefix = prefix + userId;
        }
        else prefix = prefix + userId + "&" + endPrefix;
      }
    }
    let replaced = prefix.split(' ').join("%20");
    // console.log(replaced);
    return replaced;
  }


  addTags(newTags: string){
    this.tagsFilter = newTags;
  }

  addDate(){
    let date = ""
    let min = this.datepipe.transform(this.formCheck.value.start, "yyyy-MM-dd");
    this.minDateFilter = "minDate=" + min;
    date += this.minDateFilter;
    let endDate = this.formCheck.value.end;
    if(endDate > Date.now() || !endDate){
      return date;
    }
    else if(endDate){
      let max = this.datepipe.transform(endDate, "yyyy-MM-dd");
      this.maxDateFilter = "&maxDate=" + max;
      date += this.maxDateFilter;
    }
    return date;
  }

  
  public onFormGroupChangeEvent(_event : any) {
    this.formCheck = _event;
    // console.error(_event, this.formCheck['controls'])
  }

  addFilters(){
    let filter = ""
    if(this.taggedUsersFilter){
      filter += this.split(this.taggedUsersFilter, this.taggedUserPrefix);
    }
    if(this.publishersFilter){
      if(filter){
        filter += "&";
      }
      filter += this.split(this.publishersFilter, this.publishersPrefix);
    }
    if(this.tagsFilter){
      if(filter){
        filter += "&";
      }
      filter += this.split(this.tagsFilter, this.tagsPrefix);
    }
    if(this.formCheck.value.start){
      filter += this.addDate();
    }
    return filter;
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  reset(){
    this.postService.resetPosts().subscribe(()=>{
      this.reloadCurrentRoute();
    });
    
  }

  done(){
    let filter = this.addFilters();
    this.postService.getFilteredPosts(filter).subscribe(()=>{
      this.reloadCurrentRoute();
    });
    
    // this.router.navigate(['main-page']);
    
  }

}
