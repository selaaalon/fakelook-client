import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  // email = "";
  // userName = "";
  // password1 = "";
  // password2 = "";
  authPassword = true;
  error = "";

  forgotPasswordForm = this.fb.group({
    userName: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  });

  constructor(private authService : AuthService, private router : Router, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.forgotPasswordForm.setValidators(this.checkPasswords);
  }

  validatePassword(){
    if(this.forgotPasswordForm.value.password1 != this.forgotPasswordForm.value.password2){
      this.authPassword = false;
      return false;
    }
    this.authPassword = true;
    return true;
  }

  checkFields(){
    return(this.forgotPasswordForm.value.userName || this.forgotPasswordForm.value.password1 || this.forgotPasswordForm.value.password2)
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password1')!.value;
    let confirmPass = group.get('password2')!.value
    return pass === confirmPass ? null : { notSame: true }
  }


  submit(){
    if(this.checkFields()){
      if(this.validatePassword()){
        this.authService.editUser(this.forgotPasswordForm.value.userName, this.forgotPasswordForm.value.password1).subscribe(()=>{
          console.log("I did it!");
        },
        (error)=>console.log(error));
        this.router.navigate([""]);
      }
    }
    
    // this.authService.editUser(this.userName, this.password1).subscribe(()=>{
    //   console.log("I did it!");
    // },
    // (error)=>console.log(error));

    // this.router.navigate([""]);
  }

}
