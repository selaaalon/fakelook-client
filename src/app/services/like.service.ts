import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILike } from '../models/ILike';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private likesUrl = "https://localhost:44349/Likes";

  addingLike = new Subject<ILike>();

  constructor(private http : HttpClient) { }

  ngOnDestroy(){
    this.addingLike.unsubscribe();
  }

  addLike(newLike : ILike) : Observable<ILike> {
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.post<ILike>(this.likesUrl, newLike, httpOptions);
  }

  getLikesByPost(id : number){
    let currentUrl = this.likesUrl + "/post" + "/" + id;
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.get<ILike[]>(currentUrl, httpOptions);
  }

  updateLike(likeId : number, isActive: boolean){
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.patch(this.likesUrl, {id : likeId, isActive : isActive}, httpOptions)
  }
}
