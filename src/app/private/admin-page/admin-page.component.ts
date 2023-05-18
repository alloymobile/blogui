import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { take } from 'rxjs';
import { AlloyClientBar, ClientBarClient,AlloyIconSideBar } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { DataService } from 'src/app/shared/service/data.service';
import AdminDB from './admin-page.data.json';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  sideBar: AlloyIconSideBar;
  clientBar: AlloyClientBar;
  client: Client;
  constructor(private dataService: DataService,private location: Location){
    this.sideBar = new AlloyIconSideBar(AdminDB.sideBar);
    this.clientBar = new AlloyClientBar(AdminDB.clientBar);
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

  back(text){
    this.location.back();
  }
}
