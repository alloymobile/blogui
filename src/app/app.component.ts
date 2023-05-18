import { Component, OnDestroy, OnInit } from '@angular/core';
import AppDB from './app.data.json';
import { AlloyFooter,AlloyNavBar} from 'alloymobile-angular';
import { DataService } from './shared/service/data.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, OnDestroy{
  title = 'blogui';
  navBar: AlloyNavBar;
  footer: AlloyFooter;
  link: string;
  constructor(private data: DataService){
    this.navBar =  new AlloyNavBar(AppDB.navBar);
    this.footer = new AlloyFooter(AppDB.footer);
    this.link = "";
  }

  ngOnDestroy() {
    this.data.link.unsubscribe();
    this.data.user.unsubscribe();
  }

  ngOnInit(): void {
    this.data.link.subscribe(link => {
      this.link = link;
      this.navBar.linkBar.links.forEach(link => {
        if(link.link === this.link){
          link.active = this.navBar.linkBar.selected;
        }else{
          link.active = "";
        }
      });
    });
    // this.data.user.subscribe(client => {
    //   if(client.token != undefined){
    //     this.navBar.linkBar.links.forEach(link => {
    //       if(link.name === "Sign In"){
    //         link.name = "Sign Out";
    //       }
    //     });
    //   }
    // });
  }
}
