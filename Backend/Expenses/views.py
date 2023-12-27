from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from decimal import Decimal
# Create your views here.

class CategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,format=None):
        Cateogries = Category.objects.filter(user=request.user.id)
        serializer = CategorySerializers(Cateogries,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = CategorySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ExpensesView(APIView):
    permission_classes = [IsAuthenticated]
        
    def get(self,request,format=None):
        expenses = Expensesdb.objects.filter(user=request.user.id)
        serializer = ExpensesSerializers(expenses,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = ExpensesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TransactionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,format=None):
        transactions = Transaction.objects.filter(user=request.user.id)
        serizalizer = TransactionSerializers(transactions,many=True)
        return Response(serizalizer.data)
    
    def post(self,request,format=None):
        serializer = TransactionSerializers(data=request.data)
        if serializer.is_valid():
            expense = get_object_or_404(Expensesdb,pk=request.data['expense'])
            expense.amount = expense.amount + Decimal(request.data['amount'])
            expense.save()
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class ExpenseViewObject(APIView):
    permission_classes = [IsAuthenticated]
        
    def delete(self,request,pk,format=None):  
        expense = get_object_or_404(Expensesdb,pk=pk,user=request.user.id)      
        expense.delete()
        return Response({'message':'Succesfully deleted!'},status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk,format=None):
        expense = get_object_or_404(Expensesdb,pk=pk,user=request.user.id)     
        serializer = ExpensesSerializers(expense,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryViewObject(APIView):
    permission_classes = [IsAuthenticated]
        
    def delete(self,request,pk,format=None):
        category = get_object_or_404(Category,pk=pk,user=request.user.id)     
        category.delete()
        return Response({'message':'Succesfully deleted!'},status=status.HTTP_204_NO_CONTENT)
    
    
class TransactionViewObject(APIView):
    permission_classes = [IsAuthenticated]
        
    def delete(self,request,pk,format=None):
        transaction = get_object_or_404(Transaction,pk=pk,user=request.user.id)  
        expense = get_object_or_404(Expensesdb,pk=transaction.expense.id)
        expense.amount = expense.amount - transaction.amount
        expense.save()
        transaction.delete()
        return Response({'message':'Succesfully deleted!'},status=status.HTTP_204_NO_CONTENT)
        
    def put(self,request,pk,format=None):
        transaction = get_object_or_404(Transaction,pk=pk,user=request.user.id)  
        serializer = TransactionSerializers(transaction,data=request.data)
        if serializer.is_valid():
            serializer.save()
            total_amount = Transaction.objects.filter(expense_id=request.data['expense']).aggregate(Sum('amount'))
            print(total_amount['amount__sum'])
            expense = get_object_or_404(Expensesdb,pk=request.data['expense'])
            expense.amount = Decimal(total_amount['amount__sum'])
            expense.save()  
            return Response(serializer.data)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    
