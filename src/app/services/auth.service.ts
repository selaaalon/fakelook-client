import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models/IUser';
import { KeyValue } from '@angular/common';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private usersUrl = "https://localhost:44349/Users";
  subs: Subscription[] = [];

  usersArray : IUser[] = [];

  userIdsAndNames : any[] = [];

  constructor(private http: HttpClient) { }

  getIdByUserName(value : string) {
    let ids = Object.keys(this.userIdsAndNames);
    if(ids){
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        if(this.userIdsAndNames[parseInt(id)] == value){
          return id;
        }
      }
    }
    return -1;
  }

  

  // get(){
  //   this.userIdsAndNames.push({1:"hu"})
  //   if(this.userIdsAndNames){
      
  //   }
  // }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  getUsersIdAndNames(){
    let currentUrl = this.usersUrl + "/usernames";
    
    return this.http.get<KeyValue<number,string>[]>(currentUrl).subscribe((res)=>{
      this.userIdsAndNames = res;
      // this.get();
    });
    
  }

  getUser(id : number){
    let currentUrl = this.usersUrl + "/" + id;
    return this.http.get<IUser>(currentUrl);
  }

  login(user : IUser){
    const currentUrl = `${this.usersUrl}/login`;
    return this.http.post<any>(currentUrl, user);
  }

  signup(newUser : IUser) : Observable<IUser> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<IUser>(this.usersUrl, newUser, httpOptions);
  }

  // changePassword(newPassword : string){
  //   // const currentUrl = `${this.usersUrl}/login`;
  //   let user = {}
  //   return this.http.put<any>(this.usersUrl, user);
  // }

  editUser(userName : string, password : string){
    return this.http.patch(this.usersUrl, {userName, password});
  }
}
