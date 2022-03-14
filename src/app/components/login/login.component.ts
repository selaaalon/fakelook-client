import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersArray = new Array<IUser>();
  name = "";
  password = "";
  existUser = false;
  rememberMe = false;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.authService.getAllUsers()
      .subscribe((users)=> {
        this.usersArray = users;
        // console.log(users);
      },

      (error) => console.log(error));
  }

  validateUser(user : IUser) : boolean{
    if((user.name == this.name) && (user.password == this.password)){
      return true;
    }
    return false;
  }

  submit(){
    for (let index = 0; index < this.usersArray.length; index++) {
      const user = this.usersArray[index];
      if(this.validateUser(user)) {
        this.existUser = true;
        return;
      }
    }
    this.existUser = false;
  }

  signup(){
    this.router.navigate(["/signup-component"]);
  }

}
