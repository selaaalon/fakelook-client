import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  imgFile? : File;
  imgSrc = "";
  tagPeople = "";
  tags = "";

  @Output() addedPost = new EventEmitter<boolean>();
  
  constructor(private postService : PostService) { }

  ngOnInit(): void {
  }

  // addedPost(){

  // }

  findLocation(){

  }

  addImg(event : any){
    this.imgFile = event.target.files[0];
    if(this.imgFile){
      var reader =new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(this.imgFile);
    }
  }

  addPost(){
    let newPost = {imageSorce : this.imgSrc, date : new Date(Date.now()), x_Position : 0, y_Position : 0, z_Position : 0}
    this.postService.addPost(newPost, sessionStorage.getItem('token')!).subscribe(() => {
      console.log(newPost);
      this.postService.createdNewPost.next(newPost);
    },
    (error) => console.log(error))
  }

}
