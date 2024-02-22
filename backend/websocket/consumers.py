import json
from django.utils import timezone

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):

        self.room_name = 'test'
        self.room_group_name = f"chat_{self.room_name}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        print(close_code)

    def receive(self, text_data):
        text = json.loads(text_data)
        

        message = {
            'text': text["message"],
            'timestamp': str(timezone.now())
        }

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": json.dumps(message)}
        )

    def chat_message(self, event):
        self.send(text_data=json.dumps({"message": event["message"]}))
