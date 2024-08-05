import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbListModule, NbStatusService } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NbEvaIconsModule, 
    NbIconModule, 
    NbListModule,
    CommonModule,

  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [NbStatusService],
})


export class ChatComponent implements OnInit {
  chatData: any;
  mergedData:any;
  constructor(
    private chatService:ChatService,
    private userService: UserService,
    private router: Router,
    private productService: ProductService
  ){}
  ngOnInit(): void {
    if (!this.userService.userIsLogedIn()){
      this.router.navigate(['user'])
    }

    this.chatService.chatConverstationList().subscribe(
      (data:any) => {
        console.log('---------------------', data)
        
        const conversationList = data.conversation_list
        this.processAdminAdsImage(conversationList)
        const adminMessages = data.admin_messages
        this.processConverstationAdImage(adminMessages)
        this.mergedData = this.mergeAndSort(conversationList, adminMessages);
      }
    )


  }

  processAdminAdsImage(data:any[]){
    if(data.length > 0){
      for (let ads of data){
        ads.ad.images = typeof ads.ad.images === 'string' ? JSON.parse(ads.ad.images) : ads.ad.images;
      }
    }
  }

  processConverstationAdImage(data:any){
    if(data.length > 0){
      for (let ads of data){
        ads.images = typeof ads.images === 'string' ? JSON.parse(ads.images) : ads.images;
      }
    }
  }

  mergeAndSort(conversationList: any[], adminMessages: any[]): any[] {
    const combinedArray: any[] = [
      ...conversationList.map(item => ({ type: 'conversation', data: item })),
      ...adminMessages.map(item => ({ type: 'admin_message', data: item })),
    ];

    combinedArray.sort((a, b) => {
      const dateA = a.type === 'conversation' ? a.data.updated_at : a.data.updated_date;
      const dateB = b.type === 'conversation' ? b.data.updated_at : b.data.updated_date;
      return new Date(dateB).getTime() - new Date(dateA).getTime(); // Sort descending
    });

    return combinedArray;
  }

  onAdminDetailView(data:any){
    let category = data.data.category['name'].toLowerCase()
    let adId = data.data.id
    this.productService.adsDetailData.next(data.data)
    this.router.navigate(['chat/chat-room/', 'admin', category, adId])
  }

  onConversationDetailView(data:any){
    let starterId   = data.data.starter
    let adId        = data.data.ad.id
    let category = ''
    if (data.data.ad.category == '1'){
      category = 'car'
    }else if(data.data.ad.category == '2'){
      category = 'realestate'
    }else if (data.data.ad.category == '3'){
      category = 'other'
    }
    
    this.chatService.chatMessages.next(data.data.messages)
    this.router.navigate(['chat/chat-room/', starterId, category, adId])
  }


}
