import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Reset } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { ErrorMsg } from 'src/app/shared/model/error.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import ResetDB from './reset-page.data.json';
@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit{
  reset: Reset;
  client: Client;
  constructor(
      private httpService: HttpService
    , private router: Router
    , private dataService: DataService
  ){
    this.reset = new Reset(ResetDB);
    this.client = new Client()
  }

  ngOnInit(): void {
    this.dataService.user.pipe(take(1)).subscribe(client=> {
      this.client.id = client.id;
      this.client.email = client.email;
      this.client.name = client.name;
    });
  }

  createRegisterEndPoint(){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("clients");  
    endpoint.push(this.client.id);
    return endpoint; 
  } 

  onReset(form){
    this.client.password = form.password;
    this.httpService.registerUser(this.createRegisterEndPoint(),Client.newClientDTO(this.client))
    .subscribe({
      next: (res: any) => { 
        this.reset.resetForm.submit.disable=false;
        this.reset.resetForm.submit.show=false;
        if(res.status == "OK"){
          this.router.navigate(['login']);
        }
      }, // completeHandler
      error: (err: any) => { 
          let errMsg = new ErrorMsg(err);
          this.reset.resetForm.submit.disable=false;
          this.reset.resetForm.submit.show=false;
          this.reset.resetForm.message = err.message
      },    // errorHandler 
      complete: () => {
        this.reset.resetForm.submit.disable=false;
        this.reset.resetForm.submit.show=false;
      }, // nextHandler
    });
  }
}
