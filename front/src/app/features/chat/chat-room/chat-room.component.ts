import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NbChatModule, NbFocusMonitor, NbIconModule, NbListModule, NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../core/services/chat.service';
import { type } from 'os';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    NbEvaIconsModule, 
    NbIconModule, 
    NbListModule,
    CommonModule,
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
  providers: [NbStatusService],
})
export class ChatRoomComponent implements OnInit {
  adsDetailData :any;
  category:any;
  adsId:any
  messages: any;
  starterId:any;
  currentUser:any;
  groupedMessages:any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ){}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.adsId = this.route.snapshot.paramMap.get('ads_id');
    this.starterId = this.route.snapshot.paramMap.get('starter_id');
    this.currentUser = localStorage.getItem('user_email')


    console.log(this.category, this.adsId )
    
    this.productService.adsDetailData.subscribe(
      data=>{
        this.adsDetailData = data
        console.log('-------------------------------', this.adsDetailData)
      }
    )

    if (!this.adsDetailData){
      this.productService.getAdsDetailData(this.category, this.adsId).subscribe(
        data =>{
          this.adsDetailData = data
          this.adsDetailData.images  = typeof this.adsDetailData.images === 'string' ? JSON.parse(this.adsDetailData.images) :  this.adsDetailData.images;
          console.log('--------------!!!!!!!!!!-----------------', this.adsDetailData)
        }
      )
    }

    this.chatService.getChatMessages(this.starterId, this.category, this.adsId).subscribe(
      (data:any) =>{
        this.messages = JSON.parse(JSON.stringify(data['messages']))
        console.log('^^^^^^^^^^^^^^^^^^^',typeof data)
        console.log('^^^^^^^^^^^^^^^^^^^',data)
        this.groupedMessages = this.groupMessagesBySender(this.messages);
      }
    )


  }
  

  private groupMessagesBySender(messages: any[]) {
    const grouped = [];
    let lastSender = '';
    let group:any[] = [];

    messages.forEach((message, index) => {
      if (message.sender.username !== lastSender) {
        if (group.length) {
          grouped.push(group);
        }
        group = [];
      }
      group.push(message);
      lastSender = message.sender.username;
    });

    if (group.length) {
      grouped.push(group);
    }

    return grouped;
  }

  sendMessage(event: any) {
    console.log(event)
  }

}
