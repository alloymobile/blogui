import { Blog } from './../blog';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../model/object.model';
import { Page } from '../model/metadata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService],
})
export class HomeComponent extends Blog implements OnInit {
  posts: Post[];
  constructor(private homeService: HomeService) {
    super();
    this.posts = [];
  }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    let metadata = 'post';
    this.homeService.getDataList(metadata).subscribe((res: any) => {
      this.page = new Page(res);
      res.content.forEach((element) => {
        this.posts.push(new Post(element));
      });
      console.log(this.posts);
    });
  }
}
