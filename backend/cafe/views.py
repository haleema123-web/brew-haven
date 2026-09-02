from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def get_menu(request):
    """Get all menu items"""
    menu = [
        {'id': 1, 'name': 'Espresso', 'price': 4.99, 'category': 'Coffee'},
        {'id': 2, 'name': 'Cappuccino', 'price': 5.99, 'category': 'Coffee'},
        {'id': 3, 'name': 'Latte', 'price': 5.49, 'category': 'Coffee'},
        {'id': 4, 'name': 'Croissant', 'price': 3.49, 'category': 'Pastry'},
        {'id': 5, 'name': 'Muffin', 'price': 2.99, 'category': 'Pastry'},
    ]
    return JsonResponse(menu, safe=False)

@csrf_exempt
def create_order(request):
    """Create a new order"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            customer_name = data.get('customer_name', 'Guest')
            items = data.get('items', [])
            total = data.get('total', 0)
            
            if not items:
                return JsonResponse({'error': 'Items are required'}, status=400)
            
            order = {
                'order_id': 1,
                'customer': customer_name,
                'items': items,
                'total': total,
                'status': 'Pending'
            }
            
            return JsonResponse({
                'message': 'Order created successfully!',
                'order': order
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def check_cookie(request):
    """Check if cookie exists"""
    return JsonResponse({
        'cookie_status': 'Active',
        'message': 'Session is active'
    })

def clear_cookie(request):
    """Clear cookie"""
    return JsonResponse({
        'message': 'Cookie cleared successfully'
    })

def reviews(request):
    """Get all reviews"""
    reviews_data = [
        {'id': 1, 'customer': 'Ali', 'rating': 5, 'comment': 'Excellent coffee!'},
        {'id': 2, 'customer': 'Sara', 'rating': 4, 'comment': 'Good atmosphere'},
        {'id': 3, 'customer': 'Ahmed', 'rating': 5, 'comment': 'Best cafe in town!'},
    ]
    return JsonResponse(reviews_data, safe=False)

def get_orders(request):
    """Get all orders"""
    orders = [
        {'id': 1, 'customer': 'Ali', 'items': ['Espresso'], 'total': 4.99, 'status': 'Completed'},
        {'id': 2, 'customer': 'Sara', 'items': ['Cappuccino', 'Croissant'], 'total': 9.48, 'status': 'Pending'},
    ]
    return JsonResponse(orders, safe=False)