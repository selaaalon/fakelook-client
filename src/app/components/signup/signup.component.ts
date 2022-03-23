import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authPassword = true;
  loading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  signupForm = this.fb.group({
    email: ['', Validators.email],
    fullName: [''],
    userName: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
    birthDate: [''],
    address: [''],
    job: [''],
  });

  constructor(private authService : AuthService, private router : Router, private fb : FormBuilder, private _snackBar: MatSnackBar) { }

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
    return userName.indexOf(' ') === -1  ? null : { validUserName: true }
  }

  submit(){
    this.loading = true;    
      let newUser = {email : this.signupForm.value.email ,name: this.signupForm.value.fullName ,
        userName : this.signupForm.value.userName, password : this.signupForm.value.password1, 
        BirthDate : this.signupForm.value.birthDate, address : this.signupForm.value.address, job : this.signupForm.value.job}
        if(newUser.BirthDate === ""){
          newUser.BirthDate = new Date();
        }
        
      this.authService.signup(newUser).subscribe(()=>{
        setTimeout(() => {
          this.router.navigate(['']);
          this.loading = false;
          this.signupForm.reset();
        }, 1000);  
      }, (error) => {
        this.loading = false;
        this.openErrorSnackBar(error.error.detail);
        console.log(error);
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
