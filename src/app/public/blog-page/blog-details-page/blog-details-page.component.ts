import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlloyIcon } from 'alloymobile-angular';
import { Blog } from 'src/app/shared/model/blog.model';
import { Page } from 'src/app/shared/model/metadata.model';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.css']
})
export class BlogDetailsPageComponent   implements OnInit{
  loadingIcon: AlloyIcon;
  blogId: string;
  blogDetail: Blog;
  constructor(private router: Router,private httpService: HttpService){
      this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
      this.blogId = this.router.url.split('?')[0].split('/').pop();
      this.blogDetail = new Blog();
  }

  ngOnInit(): void {
    this.getBlogById();
  }

  createBlogEndPoint(){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("blogs");  
    endpoint.push(this.blogId);  
    return endpoint; 
  } 


  getBlogById(){
      this.httpService.getFreeData(this.createBlogEndPoint())
      .subscribe({
        next: (res: any) => { 
          this.blogDetail = new Blog(res);
          this.loadingIcon.spin = false;  
          console.log(this.blogDetail);
        }, // completeHandler
        error: (error: any) => { 
            console.log(error);
            this.loadingIcon.spin = false;
        },    // errorHandler 
        complete: () => {}, // nextHandler
      });
  }
}
