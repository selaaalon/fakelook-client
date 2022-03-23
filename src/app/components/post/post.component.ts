import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // @Input() post : IPost = {imageSorce : "", description : "", x_Position : 0, y_Position : 0, 
  //   z_Position : 0, date : new Date(Date.now()), userId : 0};
  post!: IPost
  @Input()set setPost(value : IPost){
    this.post = value;
    this.loadPostData();
  }

  imgSrc = "";
  desc? = "";
  xPos = 0;
  yPos = 0;
  zPos = 0;
  date = new Date();
  userId? = 0;
  


  loadPostData(){
    
    this.imgSrc = this.post.imageSorce;
    this.desc = this.post.description;
    this.xPos = this.post.x_Position;
    this.yPos = this.post.y_Position;
    this.zPos = this.post.z_Position;
    this.date = this.post.date;
    this.userId = this.post.userId;
    // if(this.userId)
      // this.getPostWriter(this.userId);
  }

  ngOnInit(): void {
    // console.log(this.post)
    this.loadPostData();
      
    }

      
    
    
  }
