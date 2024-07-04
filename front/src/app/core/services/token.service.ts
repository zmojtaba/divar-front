import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiUrl = environment.apiUrl

  decodeJwt(token:string){
    const jwt_data: any = JSON.parse( atob(token.split('.')[1]) )
    return jwt_data
  }

  check_token_expire(token:string) {
    let decoded :any = jwtDecode(token);
    // JSON.parse convert string to json
    console.log('==========================================1', token )
    const jwt_data: any = JSON.parse( atob(token.split('.')[1]) )
    console.log('==========================================2')
    const now : number = Math.trunc( Date.now() / 1000 )
    console.log('==========================================3')


    if ( jwt_data.exp - now > 0 ){
      return true

    } else {
      return false
    }
  }

  needToRefreshToken(access_token:any, refresh_token: any){

    if ( access_token){

      if (this.check_token_expire(access_token)){
        return false;

      } else {
        localStorage.removeItem('access_token')
        
        if (refresh_token){
          if (this.check_token_expire(refresh_token)){
            return true
          }else{
            localStorage.removeItem("refresh_token")
            return false
          }

        } else{
          return false
        }

      }
  
    } else {

      //  here we need to refresh the access token if refresh token exists
      if (refresh_token){

        if (this.check_token_expire(refresh_token)){

          return true
        }else{
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_email')
          return false
        }
      }else{
        localStorage.removeItem('user_email')
        localStorage.removeItem('access_token')
        return false
      }
    }
  }

  needToLogin(){

  }

  renewAccessTokenService(refresh_token:string){
    return this.http.post(this.apiUrl + '/account/api-vi/sign-in/refresh/',
     {
      refresh :refresh_token
    })
  }
 

  constructor(
    private http:HttpClient
  ) { 

   }
}
