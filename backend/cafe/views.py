from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MenuItem, Order, Review
from .serializers import MenuItemSerializer, OrderSerializer, ReviewSerializer


# =========================
# MENU
# =========================
@api_view(['GET'])
def get_menu(request):
    items = MenuItem.objects.all()
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)


# =========================
# CREATE ORDER (FIXED)
# =========================
@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


# =========================
# REVIEWS (FIXED)
# =========================
@api_view(['GET', 'POST'])
def reviews(request):

    if request.method == 'GET':
        data = Review.objects.all()
        serializer = ReviewSerializer(data, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


# =========================
# ORDERS
# =========================
@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)