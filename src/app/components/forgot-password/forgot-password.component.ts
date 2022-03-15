import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = "";
  userName = "";
  password1 = "";
  password2 = "";
  authPassword = true;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  validatePassword(){
    if(this.password1 != this.password2){
      this.authPassword = false;
      return false;
    }
    this.authPassword = true;
    return true;
  }

  submit(){
    if(this.validatePassword()){
      this.authService.editUser(this.userName, this.password1).subscribe(()=>{
        console.log("I did it!");
      },
      (error)=>console.log(error));
      this.router.navigate([""]);
    }
    // this.authService.editUser(this.userName, this.password1).subscribe(()=>{
    //   console.log("I did it!");
    // },
    // (error)=>console.log(error));

    // this.router.navigate([""]);
  }

}
