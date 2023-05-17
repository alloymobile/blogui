import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { ErrorMsg } from '../model/error.model';
import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends AppService{
  constructor(private http: HttpClient
    , private authService: AuthService) {
      super();
  }

  getFreeData(url: string[],params?){
    let apiEndPoint = this.getUrl(url);
    if(params){
      apiEndPoint = apiEndPoint + this.getParamString(params);
    }
    return this.http.get(apiEndPoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllData(url: string[],token: string,params?){
    let apiEndPoint = this.getUrl(url);
    if(params){
      apiEndPoint = apiEndPoint + this.getParamString(params);
    }
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    }else{
      return this.http.get(apiEndPoint,{ headers: this.createHeadder(token) })
        .pipe(retry(1), catchError(this.handleError));
    }
  }

  getData(url: string[], token: string){
    const apiEndPoint = this.getUrl(url);
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    }else{
      return this.http.get(apiEndPoint,{ headers: this.createHeadder(token) })
        .pipe(retry(1), catchError(this.handleError));
    }
  }

  postData(url: string[],token: string, data?){
    const apiEndPoint = this.getUrl(url);
      if (this.authService.checkJwtToken()) {
        throw throwError(()=> new Error('unAuthorized'));
      }else{
        if(data){
          return this.http.post(apiEndPoint, data, { headers: this.createHeadder(token) })
            .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
        }else{
          return this.http.post(apiEndPoint,{}, { headers: this.createHeadder(token) })
            .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
        }
      }
  }

  putData(url: string[],token: string, data){    
    const apiEndPoint =this.getUrl(url);
      if (this.authService.checkJwtToken()) {
        throw throwError(()=> new Error('unAuthorized'));
      } else {
        return this.http.put(apiEndPoint, data, { headers: this.createHeadder(token) })
          .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
      }
  }

  deleteData(url: string[],token: string){
    const apiEndPoint = this.getUrl(url);
      if (this.authService.checkJwtToken()) {
        throw throwError(()=> new Error('unAuthorized'));
      } else {
        return this.http.delete(apiEndPoint, { headers: this.createHeadder(token) })
          .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
      }
  }

  uploadBlob(url: string[],token: string,file: FormData){
    const apiEndPoint = this.getUrl(url);
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    }else{
        return this.http.post(apiEndPoint, file, { headers: this.createHeadder(token) })
        .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
    }
  }

  deleteBlob(url: string[],token: string){
    const apiEndPoint = this.getUrl(url);
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    }else{
        return this.http.delete(apiEndPoint,{ headers: this.createHeadder(token) })
        .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
    }
  }

  downloadBlob(url: string[],token: string){
    const apiEndPoint = this.getUrl(url);
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    }else{
        return this.http.get(apiEndPoint,{ headers: this.createHeadder(token), responseType: 'blob' });
    }
  }

  emailClient(url: string[],token: string,params){
    let apiEndPoint = this.getUrl(url); 
    apiEndPoint = apiEndPoint + this.getParamString(params);
    if (this.authService.checkJwtToken()) {
      throw throwError(()=> new Error('unAuthorized'));
    } else {
      return this.http.get(apiEndPoint, { headers: this.createHeadder(token) });
    }
  }

  payInvoice(url: string[], data){
    const apiEndPoint = this.getUrl(url)
    return this.http.put(apiEndPoint, data, { headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  subscribeUser(url: string[], data, params){
    const apiEndPoint = this.getUrl(url)+this.getParamString(params);
    return this.http.post(apiEndPoint, data, { headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  registerUser(url: string[], data){
    const apiEndPoint = this.getUrl(url);
    return this.http.post(apiEndPoint, data, { headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  getCode(url: string[],user) {
    const apiEndPoint = this.getUrl(url);
    return this.http
      .post(apiEndPoint, user,{ headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  sendForgetLink(url: string[],user) {
    const apiEndPoint = this.getUrl(url);
    return this.http
      .post(apiEndPoint,user,{ headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  loginUser(url: string[],user) {
    const apiEndPoint = this.getUrl(url);
    return this.http
      .post(apiEndPoint, user,{ headers: this.createHeadder() })
      .pipe(catchError( error => throwError(()=> new ErrorMsg(error))));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getUrl(endpoint: string[]){
    let apiEndPoint = "";
    if(endpoint.length > 0){
      endpoint.forEach(e=>{
        apiEndPoint = apiEndPoint + '/'+ e; 
      });
    }
    return apiEndPoint.substring(1); 
  }
}
