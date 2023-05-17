import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
    constructor() {}
  
    createHeadder(token?: string): HttpHeaders {
      if(token){
        return new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set(
          'Access-Control-Allow-Methods',
          'HEAD, GET, POST, PUT, DELETE, PATCH, OPTIONS'
        )
        .set('Access-Control-Max-Age', '3600')
        .set('Authorization', 'Bearer ' + token);
      }else{
        return new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set(
          'Access-Control-Allow-Methods',
          'HEAD, GET, POST, PUT, DELETE, PATCH, OPTIONS'
        )
        .set('Access-Control-Max-Age', '3600');
      }
    }

    getParamString(search?){
        if(search){
            if(Object.keys(search).length > 0){
                let param = '?';
                Object.entries(search).forEach((column: any) => {
                param = param + column[0]+'='+column[1]+'&';
                });
                return param.slice(0, -1); ;
            }
        }
        return '';
    }
}  