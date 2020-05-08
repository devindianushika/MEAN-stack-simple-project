import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: 'first', content: 'this is about first post' },
  //   { title: 'second', content: 'this is about second post' },
  //   { title: 'third', content: 'this is about third post' },
  // ];


  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading: boolean;

  constructor(public postsService: PostService) {

  }
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}




