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
  // tags :string[] = [];
  tags = "";
  itagArr : ITag[] = [];
  desc = "";
  errMsg = "";
  btnClass = "custom-file-upload";

  constructor(private postService : PostService) {
    // this.desc = this.post?.description;
  }

  ngOnInit(): void {
    //console.log(this.post);
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
    // event?.stopPropagation();
    this.desc = newDescription;
  }

  addTags(newTags : string){
    // event?.stopPropagation();
    this.tags = newTags;
  }

  addTaggedUsers(newTaggedUsers : string){
    // event?.stopPropagation();
    this.tagPeople = newTaggedUsers;
  }

  stopProp(){
    event?.stopPropagation();
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

  edit(){
    this.addTagsToPost();
    this.addTaggedPeopleToPost()
    if(this.imgSrc && this.imgSrc!== this.post.imageSorce){
      this.post.imageSorce = this.imgSrc;
    }
    if(this.desc && this.desc != this.post.description){
      this.post.description = this.desc;
    }
    if(this.tagPeopleId.length > 0 && this.tagPeopleId != this.post.userTaggedPost){
      this.post.userTaggedPost = this.tagPeopleId;
    }
    if(this.itagArr.length > 0 && this.itagArr != this.post.tags){
      this.post.tags = this.itagArr;
    }
    this.postService.updatePost(this.post.id!, this.post).subscribe(()=>{
      //console.log(this.post);
      this.editEvent.emit();
    })
    // .subscribe(()=>{
    //   console.log(this.post);
    //   this.editEvent.emit();
    // },
    // (error) => console.log(error));
    
    // let imgSrc = this.imgSrc;
    // let desc = this.desc;


  }

  cancel(){
    this.editEvent.emit();
  }
}
