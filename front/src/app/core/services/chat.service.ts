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
  webSocketUrl          = environment.webSocketUrl
  receivedMessage       = new BehaviorSubject<any>(null)
  private socket: WebSocket;
  chatMessages       = new BehaviorSubject<any>(null)

  constructor(private http:HttpClient,) { }


  chatConverstationList(){
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
    });
    return this.http.get(`${this.apiUrl}/advertisement/carconversation-list/`, {headers})
  }


  connect(starter_id: string, category:string, ads_id:string, current_user:string): void {
    this.socket = new WebSocket(`${this.webSocketUrl}/ws/chat/conversations/${starter_id}/${category}/${ads_id}/`);

    this.socket.onopen = (event) => {
    };

    this.socket.onmessage = (event) => {
      let sender_user = JSON.parse(event.data).sender
      if (sender_user != current_user){
        this.handleMessage(event.data);
      }
    };

    this.socket.onclose = (event) => {
      
    };

    this.socket.onerror = (event) => {
      
    };
  }

  sendMessage(message: string, sender:string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify(
        {
          "message":message,
          "sender": sender
        })
      );
    } else {
      
    }
  }

  private handleMessage(message: string): void {
    
    try {
      const parsedMessage = JSON.parse(message);
      const formattedMessage = {
        context: parsedMessage.message,
        created_at: new Date().toISOString(), // You may need to adjust this depending on your server's response
        sender: {
          id: 2, // This should be dynamic based on the actual sender ID if available
          username: parsedMessage.sender
        }
      };
      this.receivedMessage.next(formattedMessage);
    } catch (error) {
      
    }
  }


  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }



  getChatMessages(starter_id:string, category:string, ads_id:string){
    return this.http.get(`${this.apiUrl}/advertisement/messages-list/${starter_id}/${category}/${ads_id}`)
  }
}