from rest_framework import serializers
from .models import Room, Chat


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')


class ChatSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Chat
        fields = (
            'id',
            'text',
            'room',
            'author',
            'username'
        )
