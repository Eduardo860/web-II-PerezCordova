from django.shortcuts import render
from django.http import HttpResponse
from .models import Question

def indexOrders(request):
    questions = Question.objects.all()
    data = {
        "questions":questions,
        "titulo":"Index de orders",
        "total_orders":100,
        "total_payments":200,
        "orders":[
            {
                 "id":1, "total":100
            },
        {
            "id":2, "total":100
        },
        {
            "id":3, "total":100
        },
        {
            "id":4, "total":100
        }
        ]
    }
    return render(request,'orders/index.html',data)

def paymentsByOrder(request):
    return render(request,'orders/pyments.html')