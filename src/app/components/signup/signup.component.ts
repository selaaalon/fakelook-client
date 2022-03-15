import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authPassword = true;
  email = "";
  fullName = "";
  userName = "";
  password1 = "";
  password2 = "";
  birthDate = undefined;
  address = "";
  job = "";

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

  resetForm() {
    this.authPassword = true;
    this.email = "";
    this.fullName = "";
    this.userName = "";
    this.password1 = "";
    this.password2 = "";
    this.birthDate = undefined;
    this.address = "";
    this.job = "";
  }

  submit(){
    if(this.validatePassword()){
      let newUser = {email : this.email ,name: this.fullName ,
        userName : this.userName, password : this.password1, 
        BirthDate : this.birthDate, address : this.address, job : this.job}
        
      this.authService.signup(newUser).subscribe(()=>{
        console.log("we did it")
        this.resetForm();
      });
    }

  }

}
