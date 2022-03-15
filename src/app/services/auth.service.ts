import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models/IUser';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = "https://localhost:44349/Users";
  subs: Subscription[] = [];

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  login(user : IUser){
    const currentUrl = `${this.usersUrl}/login`;
    // this.subs.push(
    // return this.http.post<any>(currentUrl, user).subscribe((res) => {
    //     this.setToken(res.token);
    //     console.log("logged to the user");
    //     console.log(res.token);
    //   }, 
    //   (error) => {console.log(error)});
    // );
    return this.http.post<any>(currentUrl, user);
  }

  signup(newUser : IUser) : Observable<IUser> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<IUser>(this.usersUrl, newUser, httpOptions);
  }

 

  // login(user: IUser): void {
  //   const currentUrl = `${this.usersUrl}Auth/Login`;
  //   this.subs.push(
  //     this.http.post<any>(currentUrl, user).subscribe((res) => {
  //       this.setToken(res.token);
  //       this.router.navigateByUrl('/Secret');
  //     })
  //   );
  // }
}
