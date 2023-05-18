import { Component, OnInit } from '@angular/core';
import { AlloyCrudTable, AlloyIcon } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { Role } from 'src/app/shared/model/client.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import RoleDB  from './admin-role-page.data.json';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Page } from 'src/app/shared/model/metadata.model';
@Component({
  selector: 'app-admin-role-page',
  templateUrl: './admin-role-page.component.html',
  styleUrls: ['./admin-role-page.component.css']
})
export class AdminRolePageComponent implements OnInit{
  loadingIcon: AlloyIcon;
  page: Page;
  roles: Role[];
  client: Client;
  userData: AlloyCrudTable;
  constructor(private httpService: HttpService, private dataService: DataService){
    this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
    this.page = new Page();
    this.roles = [];
    this.client = new Client();
    this.userData = new AlloyCrudTable(RoleDB);
  }

  ngOnInit(): void {
    this.loadingIcon.spin = true;
    this.dataService.user.pipe(take(1)).subscribe(client=> this.client = client);
    this.getRoles();
  }

  createRoleEndPoint(data?: string){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.baseUrl);
    endpoint.push("roles");
    if(data){
      endpoint.push(data);
    }
    return endpoint;  
  }


  getRoles(params?){
    this.httpService.getAllData(this.createRoleEndPoint(),this.client.token,params)
    .subscribe({
      next: (res: any) => { 
        this.page = new Page(res);
        this.roles = [];
        res.content.forEach(element => {
          this.roles.push(new Role(element));
        });
        this.userData.table.rows = this.roles.map(r=>Role.getRoleDTO(r));
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
    this.getRoles(Page.getPage(this.page));
  }

  //Submit user changes and updates
  submitData(data) {
    if (data.action === "Add") {
      let user = new Client(data);
      let params = {key:environment.key}
      this.httpService.subscribeUser(this.createRoleEndPoint(),Client.newClientDTO(user),params)
        .subscribe({
          next: (res: any) => { 
            this.getRoles();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    } else if(data.action === "Search"){
      let params = {search: data.search}
      this.getRoles(params);
    } else if(data.action === "Delete") {
      this.httpService
      .deleteData(this.createRoleEndPoint(data.id), this.client.token)
        .subscribe({
          next: (res: any) => { 
            this.getRoles(); 
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