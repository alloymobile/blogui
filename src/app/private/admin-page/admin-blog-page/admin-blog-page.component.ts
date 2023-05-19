import { Component, OnInit } from '@angular/core';
import { AlloyCrudTable, AlloyIcon } from 'alloymobile-angular';
import { Blog } from 'src/app/shared/model/blog.model';
import { Client } from 'src/app/shared/model/client.model';
import { Page } from 'src/app/shared/model/metadata.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import BlogDB from './admin-blog-page.data.json';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-admin-blog-page',
  templateUrl: './admin-blog-page.component.html',
  styleUrls: ['./admin-blog-page.component.css']
})
export class AdminBlogPageComponent   implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  userData: AlloyCrudTable;
  blogs: Blog[];
  client: Client;

  constructor(private httpService: HttpService,private dataService: DataService){
    this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
    this.page = new Page();
    this.userData = new AlloyCrudTable(BlogDB);
    this.blogs = [];
    this.client = new Client();
  }

  ngOnInit(): void {
    this.loadingIcon.spin = true;
    this.dataService.user.pipe(take(1)).subscribe(client=> this.client = client);
    this.getBlogs();
  }

  createBlobEndPoint(data?: string){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    endpoint.push(environment.baseUrl);
    endpoint.push("blobs");
    if(data){
      endpoint.push(data);
    }
    return endpoint;  
  }

  createBlogEndPoint(secure:boolean, data?: string){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    secure ? endpoint.push(environment.baseUrl) : endpoint.push(environment.freeUrl);
    endpoint.push("blogs");
    if(data){
      endpoint.push(data);
    }
    return endpoint;  
  }


  getBlogs(params?){
    this.httpService.getFreeData(this.createBlogEndPoint(false), params)
    .subscribe({
      next: (res: any) => { 
        this.page = new Page(res);
        this.blogs = [];
        res.content.forEach(element => {
          this.blogs.push(new Blog(element));
        });
        this.userData.table.rows = this.blogs.map(r=>Blog.getBlogDTO(r));
        this.loadingIcon.spin = false;  
      }, // completeHandler
      error: (error: any) => { 
          console.log(error);
          this.loadingIcon.spin = false;
      },    // errorHandler 
      complete: () => {}, // nextHandler
    });
  }

  getNextPage(pageNumber){
    pageNumber
      ? (this.page.pageNumber = pageNumber)
      : (this.page.pageNumber = 0);
    this.getBlogs(Page.getPage(this.page));
  }

  //Submit user changes and updates
  submitData(data) {
    console.log(data);
    if (data.action === "Add") {
      let fileData = new FormData();
      let file = data.imageUrl[0];
      let fileName = Date.now()+'-'+file.name;
      fileData.append('file', file, fileName);
      this.httpService.uploadBlob(this.createBlobEndPoint(),this.client.token,fileData)
      .subscribe({
        next: (res: any) => { 
          let blog = new Blog(data);
          blog.imageUrl = res.url;
          this.httpService.postData(this.createBlogEndPoint(true),this.client.token, Blog.getBlogDTO(blog))
            .subscribe({
              next: (res: any) => { 
                this.getBlogs();   
              }, // completeHandler
              error: (error: any) => { 
                  console.log(error);
                  this.loadingIcon.spin = false;
              },    // errorHandler 
              complete: () => {}, // nextHandler
            }); 
        }, // completeHandler
        error: (error: any) => { 
            console.log(error);
            this.loadingIcon.spin = false;
        },    // errorHandler 
        complete: () => {}, // nextHandler
      });
    } else if (data.action === "Edit") {
      if(data.imageUrl[0] !== undefined){
        let fileData = new FormData();
        let file = data.imageUrl[0];
        let fileName = Date.now()+'-'+file.name;
        fileData.append('file', file, fileName);
        this.httpService.uploadBlob(this.createBlobEndPoint(),this.client.token,fileData)
        .subscribe({
          next: (res: any) => { 
            let blog = new Blog(data);
            blog.imageUrl = res.url;
            this.httpService.putData(this.createBlogEndPoint(true,blog.id),this.client.token, Blog.getBlogDTO(blog))
            .subscribe({
              next: (res: any) => { 
                this.getBlogs();   
              }, // completeHandler
              error: (error: any) => { 
                  console.log(error);
                  this.loadingIcon.spin = false;
              },    // errorHandler 
              complete: () => {}, // nextHandler
            });
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
      }
      //if no file change
      let blog = new Blog(data);
      this.httpService.putData(this.createBlogEndPoint(true,blog.id),this.client.token, Blog.getBlogDTO(blog))
        .subscribe({
          next: (res: any) => { 
            this.getBlogs();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    } else if(data.action === "Search"){
      let params = {search: data.search}
      this.getBlogs(params);
    } else if(data.action === "Delete") {
      this.httpService
      .deleteData(this.createBlogEndPoint(true,data.id), this.client.token)
        .subscribe({
          next: (res: any) => { 
            this.getBlogs(); 
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
      });
    }
  }
}