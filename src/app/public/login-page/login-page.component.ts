import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login} from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { ErrorMsg } from 'src/app/shared/model/error.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import LoginDB from './login-page.data.json';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  login: Login;
  client: Client;

  constructor(
      private httpService: HttpService
    , private router: Router
    , private dataService: DataService) {
      this.login = new Login(LoginDB);
    }

  createLoginEndPoint(data){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("clients");
    if(data){
      endpoint.push(data);
    }
    return endpoint;     
  }  

  onLogin(form){
    this.httpService.getCode(this.createLoginEndPoint("code"),Client.createLoginDTO(form))
    .subscribe({
      next: (res: any) => { 
        this.login.loginForm.submit.show=false;
        this.login.loginForm.submit.disable=false;
        if(res.status == "OK"){
          this.dataService.nextUser(new Client(form));
          this.router.navigate(['code']);          
        }else if(res.status == "INTERNAL_SERVER_ERROR"){
          this.login.loginForm.message = res.message
        }
      }, // completeHandler
      error: (err: any) => { 
          let errMsg = new ErrorMsg(err);
          this.login.loginForm.submit.show=false;
          this.login.loginForm.submit.disable=false;
      },    // errorHandler 
      complete: () => {
        this.login.loginForm.submit.show=false;
        this.login.loginForm.submit.disable=false;
      }, // nextHandler
    });
  }
}
