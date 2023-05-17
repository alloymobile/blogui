import { Component, OnInit } from '@angular/core';
import { AlloyCardIcon, AlloyForm, AlloyIcon, AlloyInputTextIcon, CardItem } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import HomeDB from './home-page.data.json';
import { Page } from 'src/app/shared/model/metadata.model';
import { Category } from 'src/app/shared/model/blog.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  subscribeForm: AlloyForm;
  client: Client;
  search: AlloyInputTextIcon;
  categoryCards: AlloyCardIcon[];
  constructor(private httpService: HttpService){
      this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
      this.page = new Page();
      this.subscribeForm = new AlloyForm(HomeDB.subscribeForm);
      this.client = new Client();
      this.search = new AlloyInputTextIcon(HomeDB.search);
      this.categoryCards = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getOutput(output){
    console.log(output);
  }

  getText(text){
    console.log(text);
  }

  createCategoryEndPoint(){
    let endpoint = [];
    endpoint.push(environment.blogApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("categories");  
    return endpoint; 
  } 

  createSubscribeEndPoint(){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("clients");  
    return endpoint; 
  } 

  getCategories(){
      this.httpService.getFreeData(this.createCategoryEndPoint())
      .subscribe({
        next: (res: any) => { 
          this.page = new Page(res);
          this.categoryCards = [];
          res.content.forEach(element => {
            HomeDB.categoryCard.fields[0].name = element.name;
            HomeDB.categoryCard.link =  element.name.toLowerCase()+"/blog";
            this.categoryCards.push(new AlloyCardIcon(HomeDB.categoryCard));
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

  getForm(form){
      let user = new Client(form);
      let params = {key:environment.key}
      this.httpService.subscribeUser(this.createSubscribeEndPoint(),Client.addClientDTO(user),params)
        .subscribe({
          next: (res: any) => { 
            this.subscribeForm.submit.disable=false;
            this.subscribeForm.submit.show=false;
            this.subscribeForm.message = res.message
          }, // completeHandler
          error: (err: any) => { 
              this.subscribeForm.submit.disable=false;
              this.subscribeForm.submit.show=false;
              this.subscribeForm.message = err.message
          },    // errorHandler 
          complete: () => {}, // nextHandler
      });     
  }
}
