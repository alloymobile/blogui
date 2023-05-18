import { Component, OnInit } from '@angular/core';
import { AlloyCrudTable, AlloyIcon} from 'alloymobile-angular';
import { take } from 'rxjs';
import { Client } from 'src/app/shared/model/client.model';
import { Page } from 'src/app/shared/model/metadata.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import UserDB  from './admin-user-page.data.json';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css']
})
export class AdminUserPageComponent implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  users: Client[];
  client: Client;
  userData: AlloyCrudTable;
  constructor(private httpService: HttpService, private dataService: DataService){
    this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
    this.page = new Page();
    this.users = [];
    this.client = new Client();
    this.userData = new AlloyCrudTable(UserDB);
  }

  ngOnInit(): void {
    this.loadingIcon.spin = true;
    this.dataService.user.pipe(take(1)).subscribe(client=> this.client = client);
    this.getClients();
  }

  createClientEndPoint(secure: boolean,data?: string){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    if(secure){
      endpoint.push(environment.baseUrl);
    }else{
      endpoint.push(environment.freeUrl);
    }
    endpoint.push("clients");
    if(data){
      endpoint.push(data);
    }
    return endpoint;  
  }


  getClients(params?){
    this.httpService.getAllData(this.createClientEndPoint(true),this.client.token,params)
    .subscribe({
      next: (res: any) => { 
        this.page = new Page(res);
        this.users = [];
        res.content.forEach(element => {
          this.users.push(new Client(element));
        });
        this.userData.table.rows = this.users.map(c=>Client.getClientDTO(c));
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
    this.getClients(Page.getPage(this.page));
  }

  //Submit user changes and updates
  submitData(data) {
    if (data.action === "Add") {
      let user = new Client(data);
      let params = {key:environment.key}
      this.httpService.subscribeUser(this.createClientEndPoint(false),Client.newClientDTO(user),params)
        .subscribe({
          next: (res: any) => { 
            this.getClients();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    } else if(data.action === "Search"){
      let params = {search: data.search}
      this.getClients(params);
    } else if(data.action === "Delete") {
      this.httpService
      .deleteData(this.createClientEndPoint(true,data.id), this.client.token)
        .subscribe({
          next: (res: any) => { 
            this.getClients(); 
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