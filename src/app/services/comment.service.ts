import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IComment } from '../models/IComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl = "https://localhost:44349/Comments";

  createdNewComment = new Subject<IComment>();

  constructor(private http: HttpClient) { }

  getCommentsByPost(id : number){
    let currentUrl = this.commentsUrl + "/post" + "/" + id;
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.get<IComment[]>(currentUrl, httpOptions);
  }

  addComment(newPost : IComment) : Observable<IComment> {
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.post<IComment>(this.commentsUrl, newPost, httpOptions);
  }
}
