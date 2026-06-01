from django.contrib import admin
from .models import MenuItem, Order, Review

# Simple registration (same as you wanted)
admin.site.register(MenuItem)
admin.site.register(Order)
admin.site.register(Review)