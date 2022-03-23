import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPost } from '../models/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = "https://localhost:44349/Posts";

  // createdNewPost = new Subject<IPost>();
  localPostsArray? :  Array<IPost>;
  postsSubject = new BehaviorSubject<IPost[]>([]);

  constructor(private http: HttpClient) { }

  // getAllPosts(token : string): Observable<IPost[]> {
  //   if(!this.localPostsArray){
  //     let httpOptions = {
  //       headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
  //     };
  //     return this.http.get<IPost[]>(this.postsUrl, httpOptions).pipe(tap(posts=>{
  //       this.localPostsArray = posts;
  //     }));
  //   }
  //   else{
  //     console.log("tap");
  //     console.log(this.localPostsArray);
  //     return of(this.localPostsArray);
  //   }
  // }

  getAllPosts() : Observable<IPost[]> {
    if(!this.localPostsArray){ 
      let token = sessionStorage.getItem('token');
      let httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
        };
        this.http.get<IPost[]>(this.postsUrl, httpOptions).subscribe((res) => {
          this.localPostsArray = res;
          this.postsSubject.next(res);
        });
        // return this.postsSubject.asObservable();
    }
    // return of(this.localPostsArray!);
    // console.log(this.postsSubject.asObservable());
    return this.postsSubject.asObservable();
  }

  addPost(newPost : IPost) : Observable<IPost> {
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.post<IPost>(this.postsUrl, newPost, httpOptions).pipe(tap(post => {
      this.localPostsArray?.push(post);
      this.postsSubject.next(this.localPostsArray!);
    }));
  }

  getFilteredPosts(filters : string){
    let token = sessionStorage.getItem('token');
    let currentUrl = this.postsUrl + "/filter?" + filters;
    let httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
    };
    this.http.get<IPost[]>(currentUrl, httpOptions).subscribe((res) => {
      this.localPostsArray = res;
      this.postsSubject.next(res);
    });
    return this.postsSubject.asObservable();
  }

  resetPosts(){
    this.localPostsArray = undefined;
    return this.getAllPosts();
  }

  updatePost(id : number, newPost : IPost){
    let currentUrl = this.postsUrl + "/" + id;
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    this.http.patch(currentUrl, newPost, httpOptions).subscribe(()=>{
      let tempPost = this.localPostsArray?.find(p => p.id == newPost.id);
      let idx = this.localPostsArray?.indexOf(tempPost!);

      this.localPostsArray![idx!] = newPost;
      let temp = this.localPostsArray;
      this.localPostsArray = [];
      this.postsSubject.next(this.localPostsArray!);
      this.localPostsArray = temp;
      //console.log(this.localPostsArray);
      this.postsSubject.next(this.localPostsArray!);
    })
    return this.postsSubject.asObservable();
  }
}
