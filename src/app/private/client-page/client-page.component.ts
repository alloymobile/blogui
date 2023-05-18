import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { take } from 'rxjs';
import { AlloyClientBar, ClientBarClient,AlloyIconSideBar, AlloyTabLink } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { DataService } from 'src/app/shared/service/data.service';
import ClientDB from './client-page.data.json';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent {
  sideBar: AlloyIconSideBar;
  clientBar: AlloyClientBar;
  tabBar: AlloyTabLink;
  client: Client;
  constructor(private dataService: DataService,private location: Location){
    this.clientBar = new AlloyClientBar(ClientDB.clientBar);
    this.tabBar = new AlloyTabLink(ClientDB.tabBar);
    this.sideBar = new AlloyIconSideBar(ClientDB.sideBar);
    this.getScreenSize();
  }

    //This togels the sidebar from offcanvas when the screensixe is less than
    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.sideBar.close = window.innerWidth >  767 ? "" : "offcanvas";
    }

  ngOnInit(): void {
    this.getScreenSize();
    this.dataService.user.pipe(take(1)).subscribe(client=> {
      this.client = client;
      this.clientBar.client = new ClientBarClient(this.client);
    });
  }

  back(){
    this.location.back();
  }
}
