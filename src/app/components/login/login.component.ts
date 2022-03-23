import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersArray = new Array<IUser>();
  existUser = false;
  rememberMe = false;
  missingUserName = false;
  missingPassword = false;
  error = "";
  loading = false;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    formPassword: ['', Validators.required],
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private authService : AuthService, private router : Router, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

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

  login(){
    this.loading = true;
    this.error = "";
    if(this.checkMissingFields()){
      this.loading = false;
      return;
    }
    let user = {userName : this.loginForm.value.userName, password : this.loginForm.value.formPassword};
    this.authService.login(user).subscribe((res) => {
          this.openSnackBar();
          this.setToken(res.token);
          console.log("logged to the user");
          console.log(res.token);
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(["/main-page"]);
          }, 1000)
          
        }, 
        (error) => {
          setTimeout(() => {
            this.loading = false;
            this.openErrorSnackBar(error.error.detail);
            console.log(error.error.detail)
          }, 500);
        });
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
    return(!this.loginForm.value.userName || !this.loginForm.value.formPassword);
  }

  signup(){
    this.router.navigate(["/signup"]);
  }

  openSnackBar(){
    this._snackBar.open('Login Successfully', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 800,
      panelClass: ['blue-snackbar']
    });
  }

  openErrorSnackBar(error: string){
    this._snackBar.open(error, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
      panelClass: ['red-snackbar']
    });
  }

}
