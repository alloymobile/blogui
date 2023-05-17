import { Component } from '@angular/core';
import AppDB from './app.data.json';
import { AlloyFooter,AlloyNavBar} from 'alloymobile-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogui';
  navBar: AlloyNavBar;
  footer: AlloyFooter;
  constructor(){
    this.navBar =  new AlloyNavBar(AppDB.navBar);
    this.footer = new AlloyFooter(AppDB.footer);
  }
}
