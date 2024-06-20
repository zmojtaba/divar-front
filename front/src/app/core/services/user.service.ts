import { Injectable, SimpleChanges } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { LoginModel, SignUpModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl              = environment.apiUrl 
  loginResponseData   = new BehaviorSubject<LoginModel>(null!)
  userIsLoggedIn      = new BehaviorSubject<boolean>(false)
  logoutResponseData  = new BehaviorSubject<string>('')
  needToRefreshToken  = new BehaviorSubject<boolean>(false)
  signUpMessage       = new BehaviorSubject<string>('')

  check_token_expire(token:string) {

    // JSON.parse convert string to json
    const jwt_data: any = JSON.parse( atob(token.split('.')[1]) )
    const now : number = Math.trunc( Date.now() / 1000 )

    if ( jwt_data.exp - now > 0 ){
      return true

    } else {
      return false

    }

  }
  sendNeedToRefreshMessage(access_token:any, refresh_token: any){

    if ( access_token){

      if (this.check_token_expire(access_token)){
        this.needToRefreshToken.next(false);

      } else {
        localStorage.removeItem('access_token')
        
        if (refresh_token){

          if (this.check_token_expire(refresh_token)){

            this.needToRefreshToken.next(true);
          }

        }

      }
  
    } else {

      //  here we need to refresh the access token if refresh token exists
      if (refresh_token){

        if (this.check_token_expire(refresh_token)){

          this.needToRefreshToken.next(true);
        }else{
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_email')
          this.needToRefreshToken.next(false);
        }
      }else{
        localStorage.removeItem('user_email')
      }
    }


  }
 



  constructor() { }
}
