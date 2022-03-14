import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    if(this.password1 != this.password2)
      this.authPassword = false;
    else this.authPassword = true;
  }

}
