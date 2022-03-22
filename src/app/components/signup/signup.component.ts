import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authPassword = true;
  // email = "";
  // fullName = "";
  // userName = "";
  // password1 = "";
  // password2 = "";
  // birthDate = undefined;
  // address = "";
  // job = "";

  signupForm = this.fb.group({
    email: [''],
    fullName: [''],
    userName: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
    birthDate: [''],
    address: [''],
    job: [''],
  });

  constructor(private authService : AuthService, private router : Router, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.signupForm.setValidators([this.checkPasswords, this.checkUserName]);
  }

  validatePassword(){
    let pass1 = this.signupForm.value.password1;
    let pass2 = this.signupForm.value.password2
    if(!pass1 || !pass2 || pass1 != pass2){
      return false;
    }
    this.authPassword = true;
    return true;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  checkUserName: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let userName = group.get('userName')!.value;
    // let confirmPass = group.get('password2')!.value
    return userName.indexOf(' ') === -1  ? null : { validUserName: true }
  }
  // resetForm() {
  //   this.authPassword = true;
  //   this.email = "";
  //   this.fullName = "";
  //   this.userName = "";
  //   this.password1 = "";
  //   this.password2 = "";
  //   this.birthDate = undefined;
  //   this.address = "";
  //   this.job = "";
  // }

  submit(){
    // if(this.validatePassword()){
      let newUser = {email : this.signupForm.value.email ,name: this.signupForm.value.fullName ,
        userName : this.signupForm.value.userName, password : this.signupForm.value.password1, 
        BirthDate : this.signupForm.value.birthDate, address : this.signupForm.value.address, job : this.signupForm.value.job}
        
      this.authService.signup(newUser).subscribe(()=>{
        this.signupForm.reset();
      });
    // }

  }

}
