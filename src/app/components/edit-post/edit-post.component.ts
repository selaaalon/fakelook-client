import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post?: IPost;
  imgFile? : File;
  imgSrc = "";
  imgName = "";
  tagPeople = "";
  tagPeopleId : any[] = [];
  // tags :string[] = [];
  tags = "";
  itagArr : ITag[] = [];
  desc? = "";
  errMsg = "";
  btnClass = "custom-file-upload"; 

  constructor() { 
    this.desc = this.post?.description;
  }

  ngOnInit(): void {
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

  addTaggedUsers(newTaggedUsers : string){
    this.tagPeople = newTaggedUsers;
  }

}
