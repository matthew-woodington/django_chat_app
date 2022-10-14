from django.urls import path
from .views import RoomListAPIView, ChatListAPIView, ChatDetailAPIView

urlpatterns = [
    path('rooms/', RoomListAPIView.as_view()),
    # path('rooms/<int:room>/chats', ChatListAPIView.as_view()),
    # path('chats/<int:pk>/', ChatDetailAPIView.as_view()),
    path('chats/', ChatListAPIView.as_view())
]
