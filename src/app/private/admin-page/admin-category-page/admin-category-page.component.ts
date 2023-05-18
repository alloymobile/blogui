import { Component, OnInit } from '@angular/core';
import { AlloyCrudTable, AlloyIcon } from 'alloymobile-angular';
import { Page } from 'src/app/shared/model/metadata.model';
import { HttpService } from 'src/app/shared/service/http.service';
import CategoryDB from './admin-category-page.data.json';
import { environment } from 'src/environments/environment.prod';
import { Category } from 'src/app/shared/model/blog.model';
import { Client } from 'src/app/shared/model/client.model';
import { DataService } from 'src/app/shared/service/data.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-admin-category-page',
  templateUrl: './admin-category-page.component.html',
  styleUrls: ['./admin-category-page.component.css']
})
export class AdminCategoryPageComponent  implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  userData: AlloyCrudTable;
  categories: Category[];
  client: Client;

  constructor(private httpService: HttpService,private dataService: DataService){
    this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
    this.page = new Page();
    this.userData = new AlloyCrudTable(CategoryDB);
    this.categories = [];
    this.client = new Client();
  }

  ngOnInit(): void {
    this.loadingIcon.spin = true;
    this.dataService.user.pipe(take(1)).subscribe(client=> this.client = client);
    this.getCategories();
  }

  createCategoryEndPoint(secure:boolean, data?: string){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    secure ? endpoint.push(environment.baseUrl) : endpoint.push(environment.freeUrl);
    endpoint.push("categories");
    if(data){
      endpoint.push(data);
    }
    return endpoint;  
  }


  getCategories(params?){
    this.httpService.getFreeData(this.createCategoryEndPoint(false), params)
    .subscribe({
      next: (res: any) => { 
        this.page = new Page(res);
        this.categories = [];
        res.content.forEach(element => {
          this.categories.push(new Category(element));
        });
        this.userData.table.rows = this.categories.map(r=>Category.getCategoryDTO(r));
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
    this.getCategories(Page.getPage(this.page));
  }

  //Submit user changes and updates
  submitData(data) {
    console.log(data);
    if (data.action === "Add") {
      let category = new Category(data);
      this.httpService.postData(this.createCategoryEndPoint(true),this.client.token, Category.getCategoryDTO(category))
        .subscribe({
          next: (res: any) => { 
            this.getCategories();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    } else if (data.action === "Edit") {
      let category = new Category(data);
      this.httpService.putData(this.createCategoryEndPoint(true,category.id),this.client.token, Category.getCategoryDTO(category))
        .subscribe({
          next: (res: any) => { 
            this.getCategories();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    } else if(data.action === "Search"){
      let params = {search: data.search}
      this.getCategories(params);
    } else if(data.action === "Delete") {
      this.httpService
      .deleteData(this.createCategoryEndPoint(true,data.id), this.client.token)
        .subscribe({
          next: (res: any) => { 
            this.getCategories(); 
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