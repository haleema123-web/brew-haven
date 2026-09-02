from rest_framework import serializers
from .models import MenuItem, Customer, Order, OrderItem, Review
import re


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

    # ✅ UPDATED: Phone Validation (10-15 digits allow)
    def validate_phone(self, value):
        if not re.match(r'^[0-9]{10,15}$', value):
            raise serializers.ValidationError(
                "Phone number must be between 10 to 15 digits (e.g., 03001234567)."
            )
        return value

    def validate_email(self, value):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
            raise serializers.ValidationError(
                "Please enter a valid email address."
            )
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Name must be at least 2 characters long."
            )
        return value


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), source='menu_item', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity', 'price']

    # ✅ CUSTOM VALIDATION - OrderItem
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'notes', 'total_price', 'status', 'created_at']

    # ✅ CUSTOM VALIDATION - Order
    def validate_total_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Total price must be greater than 0."
            )
        return value

    def create(self, validated_data):
        customer_data = validated_data.pop('customer')
        items_data = validated_data.pop('items')

        email = customer_data.get('email')
        phone = customer_data.get('phone')
        
        customer = None
        if email:
            customer = Customer.objects.filter(email=email).first()
        if not customer and phone:
            customer = Customer.objects.filter(phone=phone).first()

        if customer:
            customer.name = customer_data.get('name', customer.name)
            customer.address = customer_data.get('address', customer.address)
            customer.city = customer_data.get('city', customer.city)
            customer.postal_code = customer_data.get('postal_code', customer.postal_code)
            customer.save()
        else:
            customer = Customer.objects.create(**customer_data)

        order = Order.objects.create(customer=customer, **validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    # ✅ CUSTOM VALIDATION - Review
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )
        return value

    def validate_comment(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Comment must be at least 10 characters long."
            )
        return value