from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.views import APIView
# Create your views here.

class CategoryView(APIView):
    def get(self,request,format=None):
        Cateogries = Category.objects.all()
        serializer = CategorySerializers(Cateogries,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = CategorySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ExpensesView(APIView):
    def get(self,request,format=None):
        expenses = Expensesdb.objects.all()
        serializer = ExpensesSerializers(expenses,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = ExpensesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TransactionView(APIView):
    def get(self,request,format=None):
        transactions = Transaction.objects.all()
        serizalizer = TransactionSerializers(transactions,many=True)
        return Response(serizalizer.data)
    
    def post(self,request,format=None):
        serializer = TransactionSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)