import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post : IPost = {imageSorce : "", description : "", x_position : 0, y_position : 0, 
    z_position : 0, date : new Date(Date.now()), userId : 0};

  imgSrc = "";
  desc? = "";
  xPos = 0;
  yPos = 0;
  zPos = 0;
  date = new Date();
  userId? = 0;
  



  constructor(private authService : AuthService) { }


  loadPostData(){
    this.imgSrc = this.post.imageSorce;
    this.desc = this.post.description;
    this.xPos = this.post.x_position;
    this.yPos = this.post.y_position;
    this.zPos = this.post.z_position;
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
