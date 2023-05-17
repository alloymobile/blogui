import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Register} from 'alloymobile-angular';
import { Client } from 'src/app/shared/model/client.model';
import { DataService } from 'src/app/shared/service/data.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { environment } from 'src/environments/environment.prod';
import RegisterDB from './register-page.data.json';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent  implements OnInit{
  register: Register;
  client: Client;
  constructor(
      private httpService: HttpService
    , private router: Router
    , private dataService: DataService){
    this.register = new Register(RegisterDB);
    this.client = new Client();
  }
  ngOnInit(): void {
    this.dataService.user.pipe(take(1)).subscribe(client=> {
      this.client = client;
      let email = this.register.registerForm.fields.find(res=>res.name == "email");
      if(email != undefined){
        email.text = this.client.email;
      }
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

  onRegister(register){
    let user = new Client(register);
    user.id = this.client.id;
    this.httpService.registerUser(this.createRegisterEndPoint(),Client.newClientDTO(user))
    .subscribe({
      next: (res: any) => { 
        this.register.registerForm.submit.disable=false;
        this.register.registerForm.submit.show=false;
        if(res.status == "OK"){
          this.router.navigate(['login']);
        }else if(res.status == "INTERNAL_SERVER_ERROR"){
          this.register.registerForm.message = res.message
        }
      }, // completeHandler
      error: (err: any) => { 
          this.register.registerForm.submit.disable=false;
          this.register.registerForm.submit.show=false;
          this.register.registerForm.message = err.message
      },    // errorHandler 
      complete: () => {
        this.register.registerForm.submit.disable=false;
        this.register.registerForm.submit.show=false;
      }, // nextHandler
    });
  }
}
