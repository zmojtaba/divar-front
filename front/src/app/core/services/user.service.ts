import { Injectable, SimpleChanges } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { LoginModel, SignUpModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import {TokenService} from './token.service'
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl              = environment.apiUrl 


  signUpService(email:string, password:string, password1:string) {
    return this.http.post(this.apiUrl + "/account/api-vi/sign-up/", {
      email: email,
      password: password, 
      password1: password1
    }).pipe(
        catchError(this.handleError),
        tap( (data:any)=> {
          // get access token to get the hash code
          localStorage.setItem('refresh_token', data['refresh_token'])
          localStorage.setItem('access_token', data['access_token'])
          localStorage.setItem('user_email', email)
          }
        )
      
      )
  }

  userIsLogedIn(){
    let refresh_token:any = localStorage.getItem( 'refresh_token' )
    if (refresh_token){

      if (this.tokenService.check_token_expire(refresh_token)){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }
 




  constructor(
    private http:HttpClient,
    private tokenService: TokenService,
     ) { 
     }




  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'an unknown error occurred'
    console.log('-----------',errorRes)
    if (!errorRes.error){
      return throwError(() => new Error(errorMessage))
    }
    if(errorRes.error.email){
      errorMessage=errorRes.error['email']
    }
    if(errorRes.error['password']){
      errorMessage=errorRes.error['password']
    }
    if (errorRes.error['password1']){
      errorMessage=errorRes.error['password1']
    }
    if (errorRes.error['detail']){
      errorMessage=errorRes.error['detail']
    }
    return throwError(() => new Error(errorMessage))
  }

}
