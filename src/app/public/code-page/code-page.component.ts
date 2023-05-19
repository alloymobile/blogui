import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Code } from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { ErrorMsg } from 'src/app/shared/model/error.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import CodeDB from './code-page.data.json';
@Component({
  selector: 'app-code-page',
  templateUrl: './code-page.component.html',
  styleUrls: ['./code-page.component.css']
})
export class CodePageComponent implements OnInit {
  code: Code;
  client: Client;
  constructor(
      private httpService: HttpService
    , private router: Router
    , private dataService: DataService) {
      this.code = new Code(CodeDB);
      this.client = new Client();
  }

  createCodeEndPoint(data){
    let endpoint = [];
    endpoint.push(environment.clientApiUrl);
    endpoint.push(environment.freeUrl);
    endpoint.push("clients");
    if(data){
      endpoint.push(data);
    }
    return endpoint;     
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


  ngOnInit(): void {
    this.dataService.user.pipe(take(1)).subscribe(client=> {
      this.client = client;
      // let code={email:"",password:"",code:"",action:"Code"}

      // code.email="htsmartlabs@gmail.com";
      // code.password="Happy@2023";
      // code.code="338098";
      // code.email="tapas@alloymobile.com";
      // code.password="Happy@2023";
      // code.code="926085";
      // this.onCode(code);
    });
  }

  onCode(form){
    if(form.resend != undefined){
      if(form.resend){
        this.httpService.getCode(this.createLoginEndPoint("code"),Client.createLoginDTO(form))
        .subscribe({
          next: (res: any) => { 
            form.resend = false;
            this.dataService.nextUser(new Client(form));
            // this.code.showSpinner=false;
            this.router.navigate(['code']);
          }, // completeHandler
          error: (error: any) => { 
              console.log(error);
          },    // errorHandler 
          complete: () => {}, // nextHandler
        });
      }
    }else{
      if(form.action == "Code"){
        //boiler code remove
        // this.client.email = form.email;
        // this.client.password = form.password;
        this.client.code = form.code;
        this.httpService.loginUser(this.createCodeEndPoint("signin"),Client.createCodeDTO(this.client))
          .subscribe({
            next: (res: any) => { 
              let client = new Client(res);
              this.dataService.nextUser(client);
              this.code.codeForm.submit.disable=false;
              this.code.codeForm.submit.show=false;
              this.router.navigate(['admin']);
            }, // completeHandler
            error: (err: any) => { 
                console.log(err);
                let errMsg = new ErrorMsg(err);
                this.code.codeForm.submit.disable=false;
                this.code.codeForm.submit.show=false;
            },    // errorHandler 
          complete: () => {
            this.code.codeForm.submit.disable=false;
            this.code.codeForm.submit.show=false;
          }, // nextHandler
        });      
      }
    }
  }
}
