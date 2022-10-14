from rest_framework import generics
from .models import Room, Chat
from .serializers import RoomSerializer, ChatSerializer
from .permisions import IsAuthorOrReadOnly

# Create your views here.


class RoomListAPIView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class ChatListAPIView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

    # def get_queryset(self):
    #     room = self.kwargs['room']
    #     return Chat.objects.filter(room=room)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthorOrReadOnly,)
