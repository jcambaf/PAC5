import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    // return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=32');
  }

  getUserPosts(id: number, numPosts: number): Observable<Post[]> {
    // La lista de posts está acotada.
    // numPosts se utiliza para ajustarse solo al rango utilizado en la consulta general.
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${id}&_start=0&_limit=${numPosts}`);
  }
}
