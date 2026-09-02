from django.urls import path
from . import views

urlpatterns = [
    path('menu/', views.get_menu, name='get_menu'),
    path('order/', views.create_order, name='create_order'),
    path('check-cookie/', views.check_cookie, name='check_cookie'),
    path('clear-cookie/', views.clear_cookie, name='clear_cookie'),
    path('reviews/', views.reviews, name='reviews'),
    path('orders/', views.get_orders, name='get_orders'),
]