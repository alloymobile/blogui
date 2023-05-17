import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Forget } from 'alloymobile-angular';
import { ErrorMsg } from 'src/app/shared/model/error.model';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import ForgetDB from './forget-page.data.json';
@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent {
  forget: Forget;
  constructor(      
    private httpService: HttpService
    , private router: Router){
      this.forget = new Forget(ForgetDB);
    }
  
  createForgetEndPoint(data){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("clients");
    if(data){
      endpoint.push(data);
    }
    return endpoint;     
  }  
  
  onForget(forget){
    let clientEmail = {email:forget.email}
    this.httpService.sendForgetLink(this.createForgetEndPoint("forget"),clientEmail)
    .subscribe({
      next: (res: any) => { 
        this.forget.forgetForm.submit.disable=false;
        this.forget.forgetForm.submit.show=false;
        if(res.status == "OK"){
          this.forget.forgetForm.message = res.message
        }
      }, // completeHandler
      error: (err: any) => { 
        let errMsg = new ErrorMsg(err);
        this.forget.forgetForm.submit.disable=false;
        this.forget.forgetForm.submit.show=false;
        this.forget.forgetForm.message = err.message
      },    // errorHandler 
      complete: () => {
        this.forget.forgetForm.submit.disable=false;
        this.forget.forgetForm.submit.show=false;
      }, // nextHandler
    });
  }
}
