import { Component, OnInit } from '@angular/core';
import { AlloyCardIcon, AlloyCardImageAction, AlloyIcon, AlloyModalToast } from 'alloymobile-angular';
import ClientDashboardDB from './client-dashboard-page.data.json';
import { DataService } from 'src/app/shared/service/data.service';
import { take } from 'rxjs';
import { Client } from 'src/app/shared/model/client.model';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from 'src/app/shared/service/http.service';
declare var window: any;
@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard-page.component.html',
  styleUrls: ['./client-dashboard-page.component.css']
})
export class ClientDashboardPageComponent implements OnInit{
  cards: AlloyCardIcon[];
  actionCards: AlloyCardImageAction[];
  modal: AlloyModalToast;
  modalForm: any;
  selectedCard: AlloyCardImageAction;
  client: Client;
  constructor(private dataService: DataService, private httpService: HttpService){
    this.cards = ClientDashboardDB.cards.map(card=>new AlloyCardIcon(card));
    this.actionCards = ClientDashboardDB.actionCards.map(card=>new AlloyCardImageAction(card));
    this.modal = new AlloyModalToast(ClientDashboardDB.modalToast);
    this.selectedCard = new AlloyCardImageAction();
    this.client = new Client();
  }

  createHomeOwnerEndPoint(data){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.baseUrl);
    endpoint.push("clients");
    endpoint.push(this.client.id);
    if(data){
      endpoint.push(data);
    }
    return endpoint; 
  }

  ngOnInit(): void {
    this.dataService.user.pipe(take(1)).subscribe(client=> {
      this.client = client;
    });
  }

  getOutput(data){
    if(data.action == "Register Now"){
      this.selectedCard = new AlloyCardImageAction(data.row);
      this.modalForm = new window.bootstrap.Modal(
        document.getElementById(this.modal.id)
      );
      this.modalForm.show();
    }
  }

  onSubmit(){
    this.modalForm.hide();
    if(this.selectedCard.id == "actionCard1"){
      this.httpService.postData(this.createHomeOwnerEndPoint("home"),this.client.token)
      .subscribe({
        next: (res: any) => { 
          console.log(res);
        }, // completeHandler
        error: (error: any) => { 
            console.log(error);
        },    // errorHandler 
        complete: () => {}, // nextHandler
      });
    }
  }
}
