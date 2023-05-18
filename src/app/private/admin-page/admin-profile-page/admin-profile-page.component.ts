import { Component, OnInit } from '@angular/core';
import ProfileDB from "./admin-profile-page.data.json"
import { AlloyCardIconAction, AlloyIcon, AlloyProfile } from 'alloymobile-angular';
import { HttpService } from 'src/app/shared/service/http.service';
import { DataService } from 'src/app/shared/service/data.service';
import { take } from 'rxjs';
import { Address, Client } from 'src/app/shared/model/client.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css']
})
export class AdminProfilePageComponent implements OnInit{
  loadingIcon: AlloyIcon;
  profile: AlloyProfile;
  client: Client;
  constructor(private httpService: HttpService, private dataService: DataService){
    this.loadingIcon = new AlloyIcon({id:"1",icon:"faSpinner",size:"5x",spin:true,className:""});
    this.profile = new AlloyProfile(ProfileDB.profile);
    this.client = new Client();
  }

  ngOnInit(): void {
    this.loadingIcon.spin = true;
    this.dataService.user.pipe(take(1)).subscribe(client=> this.client = client);
    this.getClientDetails();
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

  createAddressEndPoint(clientEndPoint: string[],data?: string){
    clientEndPoint.push("addresses");
    if(data){
      clientEndPoint.push(data);
    }
    return clientEndPoint;  
  }

  getClientAddress(){
    let addressEndpoint = this.createClientEndPoint(true,this.client.id);
      this.httpService.getAllData(this.createAddressEndPoint(addressEndpoint),this.client.token)
      .subscribe({
        next: (res: any) => { 
          let client = new Client(res)
          if(client.addresses != undefined){
            this.getProfileDetails(client.addresses);
          }
          this.loadingIcon.spin = false;  
        }, // completeHandler
        error: (error: any) => { 
            console.log(error);
            this.profile.details.cards = [];
            this.loadingIcon.spin = false;
        },    // errorHandler 
        complete: () => {}, // nextHandler
      });
    }

  getProfileDetails(addresses: Address[]){
    this.profile.details.cards = [];
    addresses.forEach(address=>{
      let sample = new AlloyCardIconAction(ProfileDB.profile.sample);
      sample.id = address.id;
      Object.entries(address).forEach(column=>{
        let field = sample.fields.find(f=>f.id == column[0])
        if(field != undefined){
          field.name = column[1];
        }
      });
      this.profile.details.cards.push(sample);
    });
  }

  getClientDetails(params?){
    this.httpService.getAllData(this.createClientEndPoint(true,this.client.id),this.client.token,params)
    .subscribe({
      next: (res: any) => { 
        let client = new Client(res)
        this.updateProfile(client);
        this.loadingIcon.spin = false; 
        this.getClientAddress(); 
      }, // completeHandler
      error: (error: any) => { 
          console.log(error);
          this.loadingIcon.spin = false;
      },    // errorHandler 
      complete: () => {}, // nextHandler
    });
  }

  updateProfile(client: Client){
    Object.entries(client).forEach((column: any) => {
      let field = this.profile.profileForm.fields.find(f=>f.name == column[0]);
      if(field != undefined){
        field.text = column[1];
      }
    });
  }

  //Submit user changes and updates
  submitData(data) {
    if(data.action === "Profile"){
      this.client.name = data.name;
      this.client.phone = data.phone;
      this.client.status = "VERIFIED";
      this.httpService
        .putData(this.createClientEndPoint(true,this.client.id), this.client.token,this.client)
        .subscribe({
          next: (res: any) => { 
            let client = new Client(res)
            this.updateProfile(client);
            this.profile.profileForm.submit.show=false;
            this.profile.profileForm.submit.disable=false;
            if(res.status == "INTERNAL_SERVER_ERROR"){
              this.profile.profileForm.message = res.message
            }
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.profile.profileForm.submit.show=false;
              this.profile.profileForm.submit.disable=false;
          },    // errorHandler 
          complete: () => {
            this.profile.profileForm.submit.show=false;
            this.profile.profileForm.submit.disable=false;
          }, // nextHandler
      });
    }else if (data.action === "Add") {
      let address = new Address(data);
      let addressEndpoint = this.createClientEndPoint(true,this.client.id);
      this.httpService
        .postData(this.createAddressEndPoint(addressEndpoint), this.client.token,Address.getAddressDTO(address))
        .subscribe({
          next: (res: any) => { 
            console.log(res);
            this.getClientAddress();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    }else if (data.action === "Edit") {
      let address = new Address(data);
      let addressEndpoint = this.createClientEndPoint(true,this.client.id);
      this.httpService
        .putData(this.createAddressEndPoint(addressEndpoint,address.id), this.client.token,Address.getAddressDTO(address))
        .subscribe({
          next: (res: any) => { 
            this.getClientAddress();   
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
              this.loadingIcon.spin = false;
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
    }else if (data.action === "Delete") {
      let address = new Address(data);
      let addressEndpoint = this.createClientEndPoint(true,this.client.id);
      this.httpService
        .deleteData(this.createAddressEndPoint(addressEndpoint,address.id), this.client.token)
        .subscribe({
          next: (res: any) => { 
            this.getClientAddress();   
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