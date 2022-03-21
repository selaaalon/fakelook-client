import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  clickedMenu = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  
  logout(){
    this.router.navigate([""])
  }

}
