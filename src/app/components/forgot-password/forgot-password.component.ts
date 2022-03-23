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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  authPassword = true;
  error = "";
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  forgotPasswordForm = this.fb.group({
    userName: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  });

  constructor(private authService : AuthService, private router : Router, private fb : FormBuilder, private _snackBar: MatSnackBar) { }

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
    this.loading = true;
    if(this.checkFields()){
      if(this.validatePassword()){
        this.authService.editUser(this.forgotPasswordForm.value.userName, this.forgotPasswordForm.value.password1).subscribe(()=>{
          this.openSnackBar();
          setTimeout(() => {
            this.router.navigate([""]);
            this.loading = false;
          }, 1000);
        },
        (error)=>{
          setTimeout(() => {
            this.loading = false;
            this.openErrorSnackBar(error.error.detail)
            console.log(error)
          }, 1000);
        });
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  openSnackBar(){
    this._snackBar.open('Password Updated Successfully', '', {
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
