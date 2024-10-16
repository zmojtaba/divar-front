import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl  = environment.apiUrl
  profileData          =   new BehaviorSubject<any>(null)

  constructor(
    private http:HttpClient,
  ) { }

  getProfileService() {
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
    });
    return this.http.get<any>(`${this.apiUrl}/account/api-vi/profile/`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  setDefaultLanguage(){
    
  }









  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'an unknown error occurred'
    
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
    
    return throwError(() => new Error(errorMessage))
  }

}






