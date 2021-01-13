import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';
import { Post } from 'src/app/models/post.interface';
import { User } from 'src/app/models/user.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  posts: Post[] = [];
  users: User[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService
      .getAllPosts()
      .subscribe((posts) => {
        this.posts = posts;
        this.getAllUsers(this.posts);
      });
  }

  getAllUsers(posts: Post[]): void {
    const counts = posts.reduce((p, c) => {
    const id = c.userId;
    if (!p.hasOwnProperty(id)) {
      p[id] = 0;
    }
    p[id]++;
    return p;
    }, {});

    const countsExtended = Object.keys(counts).map(k => {
      return {userId: Number(k), countPost: Number(counts[k])};
    });

    this.users = countsExtended;
  }
}
