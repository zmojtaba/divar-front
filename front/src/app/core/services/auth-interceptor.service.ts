import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService:UserService ) { }
  intercept(request:HttpRequest<any>, next:HttpHandler){
    
    if (!localStorage.getItem('refresh_token') || !localStorage.getItem('access_token')){
      

      return next.handle(request)
    }
    const token = localStorage.getItem('access_token')
    
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    return next.handle(modifiedRequest)
  }
}