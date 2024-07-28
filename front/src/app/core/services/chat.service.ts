import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl                =   environment.apiUrl

  constructor(private http:HttpClient,) { }

  getChatMessages(starter_id:string, category:string, ads_id:string){
    return this.http.get(`${this.apiUrl}/advertisement/messages-list/${starter_id}/${category}/${ads_id}`)
  }
}