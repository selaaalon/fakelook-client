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
    this.getUsers();
  }

  getUsers() {
    this.authService.getAllUsers()
      .subscribe((users)=> {
        this.usersArray = users;
        console.log(users);
      },

      (error) => console.log(error));
  }

  validateUser(user : IUser) : boolean{
    if((user.name == this.name) && (user.password == this.password)){
      return true;
    }
    return false;
  }

  login(){
    let user = {userName : this.name, password : this.password};
    this.authService.login(user).subscribe((res) => {
          this.setToken(res.token);
          console.log("logged to the user");
          console.log(res.token);
          this.name = "";
          this.password = "";
        }, 
        (error) => {console.log(error)});

  }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  
  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  signup(){
    this.router.navigate(["/signup-component"]);
  }

}
