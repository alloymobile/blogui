import { Component, OnInit } from '@angular/core';
import { AlloyCardImage, AlloyIcon, AlloyInputTextIcon } from 'alloymobile-angular';
import { Page } from 'src/app/shared/model/metadata.model';
import { HttpService } from 'src/app/shared/service/http.service';
import  BlogDB  from './blog-page.data.json';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent  implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  search: AlloyInputTextIcon;
  blogCards: AlloyCardImage[];
  card: AlloyCardImage;
  constructor(private httpService: HttpService,private data: DataService){
      this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
      this.page = new Page();
      this.search = new AlloyInputTextIcon(BlogDB.search);
      this.blogCards = [];
      this.card = new AlloyCardImage(BlogDB.blogCard);
  }

  ngOnInit(): void {
    this.data.nextLink("blog");
    this.getBlogs();
  }

  getText(text){
    console.log(text);
  }

  createBlogEndPoint(){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("blogs");  
    return endpoint; 
  } 


  getBlogs(){
      this.httpService.getFreeData(this.createBlogEndPoint())
      .subscribe({
        next: (res: any) => { 
          this.page = new Page(res);
          this.blogCards = [];
          res.content.forEach(element => {
            BlogDB.blogCard.fields[0].name = element.title;
            BlogDB.blogCard.image.imageUrl = element.imageUrl;
            BlogDB.blogCard.link =  element.id;
            this.blogCards.push(new AlloyCardImage(BlogDB.blogCard));
          });
          this.loadingIcon.spin = false;  
        }, // completeHandler
        error: (error: any) => { 
            console.log(error);
            this.loadingIcon.spin = false;
        },    // errorHandler 
        complete: () => {}, // nextHandler
      });
  }

}
