import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(
    private postService: PostsService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const identifier = Number(this.activedRoute.snapshot.paramMap.get('id'));
    const countPosts = Number(this.activedRoute.snapshot.paramMap.get('countPost'));

    this.postService.getUserPosts(identifier, countPosts).subscribe((posts) => {
      if (!posts) {
        return this.router.navigateByUrl('/');
      }

      this.posts = posts;
    });
  }

}
