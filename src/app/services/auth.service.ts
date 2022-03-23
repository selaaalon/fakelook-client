import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models/IUser';
import { KeyValue } from '@angular/common';

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

  getCurrentUserId() {
    let userId = 0;
    let token = sessionStorage.getItem('token')!;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    userId = parseInt(JSON.parse(jsonPayload)["UserId"]);
    return userId;
   }


  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  getUsersIdAndNames(){
    let currentUrl = this.usersUrl + "/usernames";
    
    return this.http.get<KeyValue<number,string>[]>(currentUrl).subscribe((res)=>{
      this.userIdsAndNames = res;
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

  editUser(userName : string, password : string){
    return this.http.patch(this.usersUrl, {userName, password});
  }
}
