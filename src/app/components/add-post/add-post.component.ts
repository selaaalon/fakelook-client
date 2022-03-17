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
  desc = "";

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
    }
  }

  addPost(x : number, y : number, z : number){
    let newPost = {imageSorce : this.imgSrc, date : new Date(Date.now()), 
      x_Position : x, y_Position : y, z_Position : z, description : this.desc}
    // console.log(newPost);
    this.postService.addPost(newPost, sessionStorage.getItem('token')!).subscribe(() => {
      console.log(newPost);
      this.postService.createdNewPost.next(newPost);
      this.addedPost.emit(true);
    },
    (error) => console.log(error))
  }

}
