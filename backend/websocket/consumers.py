import json
import time

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print("Connected")

    def disconnect(self, close_code):
        pass

    def receive(self, data):
        text = json.loads(data)
        message = text["message"]

        self.send(text_data=json.dumps({"message": message}))
