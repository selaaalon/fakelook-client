import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersArray = new Array<IUser>();
  // name = "";
  // password = "";
  existUser = false;
  rememberMe = false;
  missingUserName = false;
  missingPassword = false;
  error = "";

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    formPassword: ['', Validators.required],
  });


  constructor(private authService : AuthService, private router : Router, private fb: FormBuilder) { }

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
    if((user.name == this.loginForm.value.userName) && (user.password == this.loginForm.value.formPassword)){
      return true;
    }
    return false;
  }

  // parseJwt (token : string) {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  //  }

  login(){
    this.error = "";
    if(this.checkMissingFields()){
      return;
    }
    let user = {userName : this.loginForm.value.userName, password : this.loginForm.value.formPassword};
    this.authService.login(user).subscribe((res) => {
          this.setToken(res.token);
          console.log("logged to the user");
          console.log(res.token);
          // console.log(this.parseJwt(res.token));
          this.router.navigate(["/main-page"]);
          // console.log(this.parseJwt(res.token));
        }, 
        (error) => {
          this.error = error.error.detail;
          console.log(error.error.detail)
        });
        // this.name = "";
        // this.password = "";
  }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  forgotPassword(){
    this.router.navigate(["/forgot-password"]);
  }

  checkMissingFields(){
    // let isMissing = false;
    // if(!this.loginForm.value.userName){
    //   this.missingUserName = true;
    //   isMissing = true;
    // }
    // else this.missingUserName = false;
    // if(!this.loginForm.value.formPassword){
    //   this.missingPassword = true;
    //   isMissing = true;
    // }
    // else this.missingPassword = false;
    // return isMissing;
    
    return(!this.loginForm.value.userName || !this.loginForm.value.formPassword);
  }

  signup(){
    // if(!this.name){
    //   this.missingUserName = true;
    // }
    // else this.missingUserName = false;
    // if(!this.password){
    //   this.missingPassword = true;
    // }
    // else this.missingPassword = false;
    // if(this.checkMissingFields()){
    //   return;
    // }
    this.router.navigate(["/signup"]);
  }

}
