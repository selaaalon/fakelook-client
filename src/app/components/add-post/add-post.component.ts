import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  imgFile? : File;
  imgSrc = "";
  imgName = "";
  tagPeople = "";
  tagPeopleId : any[] = [];
  tags = "";
  itagArr : ITag[] = [];
  desc = "";
  errMsg = "";
  btnClass = "custom-file-upload"; 
  
  tagUserPlaceholder = "Tag users"

  @Output() addedPost = new EventEmitter<boolean>();
  
  constructor(private postService : PostService) { }

  ngOnInit(): void {
  }
  

  addPostWithLocation(){
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
        this.addPost(position.x, position.y, position.z);
      },
      (err) => {
        console.log(err);
      });
  }


  addImg(event : any){
    this.imgFile = event.target.files[0];
    if(this.imgFile){
      var reader =new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(this.imgFile);
      this.imgName = this.imgFile.name;
      this.btnClass = "custom-file-upload";
      this.errMsg = "";
    }
  }


  addDescription(newDescription: string){
    this.desc = newDescription;
  }


  addTags(newTags : string){
    this.tags = newTags;
  }


  addTaggedPeopleToPost(){
    let tagsArr = this.tagPeople.split(", ");
    tagsArr.forEach((tag) => {
      if(tag){
        let taggedId = {userId : parseInt(tag)}
        this.tagPeopleId.push(taggedId);
      }
    })
  }


  addTagsToPost(){
    let tagsArr = this.tags.split(", ");
    tagsArr.forEach((tag) => {
      if(tag){
        let itag = {content : tag} as ITag;
        this.itagArr.push(itag);
      }
    })
  }


  addTaggedUsers(newTaggedUsers : string){
    this.tagPeople = newTaggedUsers;
  }


  addPost(x : number, y : number, z : number){
    if(this.imgSrc){
      this.addTagsToPost();
      this.addTaggedPeopleToPost();
      let newPost = {imageSorce : this.imgSrc, date : new Date(Date.now()), 
        x_Position : x, y_Position : y, z_Position : z, description : this.desc, 
        tags : this.itagArr, userTaggedPost : this.tagPeopleId} 

      this.postService.addPost(newPost).subscribe((p) => {
        this.addedPost.emit(true);
      },
      (error) => console.log(error))
    }
    else {
      this.btnClass = "red-border";
      this.errMsg = "You must enter an image.";
    }
  }

}
