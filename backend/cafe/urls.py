from django.urls import path
from .views import get_menu, create_order, reviews, get_orders

urlpatterns = [
    path('menu/', get_menu),
    path('order/', create_order),
    path('orders/', get_orders),
    path('reviews/', reviews),
]