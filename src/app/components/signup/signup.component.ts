import { Component, OnInit } from '@angular/core';
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

  constructor(private authService : AuthService) { }

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
      let newUser = {userName : this.userName, password : this.password1, address : this.address}
      this.authService.addUser(newUser).subscribe(()=>{
        console.log("we did it")
      });
    }

  }

}
