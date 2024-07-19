import { Injectable, SimpleChanges } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {TokenService} from './token.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl                =   environment.apiUrl
  userLoggedIn          =   new BehaviorSubject<boolean>(false)
  userRegistered        =   new BehaviorSubject<boolean>(false)

  save_user_data(refresh_token:string, access_token:string, user_email:string, is_verified:boolean){
    let str_is_verified:string = String(is_verified)
    localStorage.setItem('refresh_token',refresh_token)
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('user_email', user_email)
    localStorage.setItem('is_verified', str_is_verified)
  }
  
  saveVerifyUser(is_verified:boolean){
    let str_is_verified:string = String(is_verified)
    localStorage.setItem('is_verified', str_is_verified)
  }

  CheckVerifyUser(){
     
    if ( localStorage.getItem('is_verified') == 'true' ){
      return true
    }else  {
      return false
    }
  }


  signUpService(email:string, password:string, password1:string) {
    console.log('========================user service===========', email, password, password1)
    return this.http.post<any>(`${this.apiUrl}/account/api-vi/sign-up/`, {
      username: email,
      password: password, 
      password1: password1
    }).pipe(
        
        tap( (data:any)=> {
          catchError(this.handleError),
          this.save_user_data(data.detail['refresh_token'],  data.detail['access_token'], email, false)
          }),
      
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
    }else{      return false
    }

  }

  logOutService(refresh:any) {
    return this.http.post(this.apiUrl + "/account/api-vi/log-out/",{refresh}).pipe(
      tap( (data:any) => {
        // this.userIsLoggedIn.next(false)
        // this.logoutResponseData.next(data.detail)
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_email')
        localStorage.removeItem('is_verified')
    }),
  )}

  logInService(email:string, password:string){
    // ######################################## need to do in backend ############################################
    // #################### give the verification status from back and save in local storage######################
    return this.http.post<any>(`${this.apiUrl}/account/api-vi/log-in/`, {
      username: email,
      password: password, 
    }).pipe(
        tap( (data:any)=> {
          const response = JSON.parse(JSON.stringify(data)) 
          catchError(this.handleError);
          this.save_user_data(response['refresh'],  response['access'], email, true)
        }),
        )

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
    if(errorRes.error.username){
      errorMessage=errorRes.error['username']
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
    console.log('=========================================',errorMessage)
    return throwError(() => new Error(errorMessage))
  }

}
