import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post!: IPost;
  @Output() editEvent = new EventEmitter();

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

  constructor(private postService : PostService) {
  }

  ngOnInit(): void {
  }

  addImg(event : any){
    this.stopProp();
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

  stopProp(){
    event?.stopPropagation();
  }


  edit(){
    this.itagArr = this.postService.addTagsToPost(this.tags);
    this.tagPeopleId = this.postService.addTaggedPeopleToPost(this.tagPeople);

    //change img in the post if the user choose changing it
    if(this.imgSrc && this.imgSrc!== this.post.imageSorce){
      this.post.imageSorce = this.imgSrc;
    }

    //change description in the post if the user choose changing it
    if(this.desc && this.desc != this.post.description){
      this.post.description = this.desc;
    }

    //change tagged users in the post if the user choose changing it
    if(this.tagPeopleId.length > 0 && this.tagPeopleId != this.post.userTaggedPost){
      this.post.userTaggedPost = this.tagPeopleId;
    }

    //change tags in the post if the user choose changing it
    if(this.itagArr.length > 0 && this.itagArr != this.post.tags){
      this.post.tags = this.itagArr;
    }
    this.postService.updatePost(this.post.id!, this.post).subscribe(()=>{
      this.editEvent.emit();
    })
  }

  cancel(){
    this.editEvent.emit();
  }
}
