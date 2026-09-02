from django.db import models
from django.core.exceptions import ValidationError
import re


class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('coffee', 'Coffee'),
        ('cake', 'Cake'),
        ('dessert', 'Dessert'),
        ('pastry', 'Pastry'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField()
    description = models.TextField()

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)

    # ✅ CUSTOM VALIDATION - Customer
    def clean(self):
        # Phone validation
        if not re.match(r'^[0-9]{11}$', self.phone):
            raise ValidationError({
                'phone': 'Phone number must be exactly 11 digits (e.g., 03123456789).'
            })
        
        # Email validation
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', self.email):
            raise ValidationError({
                'email': 'Please enter a valid email address.'
            })
        
        # Name validation
        if len(self.name.strip()) < 2:
            raise ValidationError({
                'name': 'Name must be at least 2 characters long.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.email})"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    notes = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, default='pending', choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    # ✅ CUSTOM VALIDATION - Order
    def clean(self):
        if self.total_price <= 0:
            raise ValidationError({
                'total_price': 'Total price must be greater than 0.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    # ✅ CUSTOM VALIDATION - OrderItem
    def clean(self):
        if self.quantity <= 0:
            raise ValidationError({
                'quantity': 'Quantity must be at least 1.'
            })
        if self.price < 0:
            raise ValidationError({
                'price': 'Price cannot be negative.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.name} (Order #{self.order.id})"


class Review(models.Model):
    name = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # ✅ CUSTOM VALIDATION - Review
    def clean(self):
        if self.rating < 1 or self.rating > 5:
            raise ValidationError({
                'rating': 'Rating must be between 1 and 5.'
            })
        if len(self.comment.strip()) < 10:
            raise ValidationError({
                'comment': 'Comment must be at least 10 characters long.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.rating} stars"