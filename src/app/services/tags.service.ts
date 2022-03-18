import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITag } from '../models/ITag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagssUrl = "https://localhost:44349/Tags";

  constructor(private http : HttpClient) { }

  getAllTags(token : string): Observable<ITag[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
    };
    return this.http.get<ITag[]>(this.tagssUrl, httpOptions);
  }

}
