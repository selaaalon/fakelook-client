import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPost } from '../models/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = "https://localhost:44349/Posts";

  constructor(private http: HttpClient) { }

  getAllPosts(token : string): Observable<IPost[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
      
    };
    return this.http.get<IPost[]>(this.postsUrl, httpOptions);
  }
}
