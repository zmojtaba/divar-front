from django.contrib.auth import get_user_model
from .models import *
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from django.db.models import Q



User = get_user_model()




class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.starter_user_id = self.scope['url_route']['kwargs']['user_id']
        self.category = self.scope['url_route']['kwargs']['category']
        self.ad_id = self.scope['url_route']['kwargs']['ad_id']

        # Fetch user and advertisement from the database
        self.starter_user   =           await self.get_user(self.starter_user_id)
        self.ad             =           await self.get_ad(self.category, self.ad_id)

        self.room_name = f"chat_{self.starter_user_id}_{self.category}_{self.ad_id}"
        self.room_group_name = f"chat_{self.starter_user_id}_{self.category}_{self.ad_id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json.get('message', '')
        message_sender = text_data_json.get('sender', '')
        message_sender = await self.get_user(message_sender)

        conversation = await self.get_conversation(self.category, self.ad, self.starter_user)

        if conversation is None:
            conversation = await self.create_conversation(self.category, self.ad, self.starter_user)

        new_message = await self.create_message(text, message_sender, conversation)
        await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': text,
                    'sender': message_sender.username
                }
            )



    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender  # Include sender in the response
        }))

    @database_sync_to_async
    def get_user(self, user):
        try:
            return User.objects.get(id=user)
        except:
            return User.objects.get(username=user)

    @database_sync_to_async
    def get_ad(self, category, ad_id):
        if category.lower() == 'car':
            return Car.objects.get(id=ad_id)
        if category.lower() == 'realestate':
            return RealEstate.objects.get(id=ad_id)
        if category.lower() == 'other':
            return OthersAds.objects.get(id=ad_id)
        
    @database_sync_to_async
    def get_conversation(self,category, ad, user):
        if category.lower() == 'car':
            return CarConversation.objects.filter(ad=ad, starter=user).first()
        if category.lower() == 'realestate':
            return RealEstateConversation.objects.filter(ad=ad, starter=user).first()
        if category.lower() == 'other':
            return OtherConversation.objects.filter(ad=ad, starter=user).first()
        
    @database_sync_to_async
    def create_conversation(self, category, ad, user):
        if category.lower() == 'car':
            return CarConversation.objects.create(ad=ad, starter=user)
        if category.lower() == 'realestate':
            return RealEstateConversation.objects.create(ad=ad, starter=user)
        if category.lower() == 'other':
            return OtherConversation.objects.create(ad=ad, starter=user)
        
    @database_sync_to_async
    def create_message(self, message, sender, conversation):
        new_message = Message.objects.create(sender= sender, context=message)
        conversation.messages.add(new_message)
        conversation.save()
        return new_message


        