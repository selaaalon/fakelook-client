import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  clickedMenu = false;

  constructor(private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getUsersIdAndNames();
  }

  
  logout(){
    this.router.navigate([""])
  }

}
