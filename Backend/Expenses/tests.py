from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from decimal import Decimal
from django.contrib.auth.models import User
from .models import Expensesdb,Transaction,Category
from rest_framework.authtoken.models import Token

class CategoryViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_get_categories(self):
        response = self.client.get('/Category')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_category(self):
        data = {'category_name': 'Test Category','user':self.user.id}
        response = self.client.post('/Category',data,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ExpensesViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.category = Category.objects.create(category_name='test',user=self.user)

    def test_get_expenses(self):
        response = self.client.get('/Expenses')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_expense(self):
        data = {"amount" : 0,
        "category_name" : self.category.id,
        "date" : '2020-12-12',
        "description" : "test",
        "user" : self.user.id,}
        response = self.client.post('/Expenses',data,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class TransactionViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.category = Category.objects.create(category_name='test',user=self.user)
        self.expense = Expensesdb.objects.create(amount=0,category_name=self.category,date='2020-12-12',description='test',user=self.user)

    def test_get_transactions(self):
        response = self.client.get('/Transaction')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_transaction(self):
        data = {"amount" :'50.25',
          "date" : '2020-12-12',
          "description" : 'test',
          "expense" : self.expense.id,
          "user" : self.user.id}
        response = self.client.post('/Transaction',data,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
class ExpenseViewObjectTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.category = Category.objects.create(category_name='test',user=self.user)

    def test_delete_expense(self):
        expense = Expensesdb.objects.create(amount=0,category_name=self.category,date='2020-12-12',description='test',user=self.user)
        response = self.client.delete(f'/Expenses/{expense.id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_delete_expense_noexist(self):
        response = self.client.delete(f'/Expenses/{404}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_expense(self):
        expense = Expensesdb.objects.create(amount=0,category_name=self.category,date='2020-12-12',description='test',user=self.user)
        data = {"amount" : 0,
        "category_name" : self.category.id,
        "date" : '2020-12-12',
        "description" : 'testv2',
        "user" : self.user.id,}
        response = self.client.put(f'/Expenses/{expense.id}', data, format='json',content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CategoryViewObjectTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_delete_category(self):
        category = Category.objects.create(category_name='test',user=self.user)
        response = self.client.delete(f'/Category/{category.id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_delete_category_noexist(self):
        response = self.client.delete(f'/Category/{404}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class TransactionViewObjectTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test',password='123',email='test@op.pl')
        self.token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.category = Category.objects.create(category_name='test',user=self.user)
        self.expense = Expensesdb.objects.create(amount=0,category_name=self.category,date='2020-12-12',description='test',user=self.user)
        
    def test_delete_transaction(self):
        transaction = Transaction.objects.create(amount=0,date='2020-12-12',description='test',user=self.user,expense=self.expense)
        response = self.client.delete(f'/Transaction/{transaction.id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_delete_transaction_noexist(self):
        response = self.client.delete(f'/Transaction/{404}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_transaction(self):
        transaction = Transaction.objects.create(amount=0,date='2020-12-12',description='test',user=self.user,expense=self.expense)
        data = {"amount" :'50.25',
          "date" : '2020-12-12',
          "description" : 'test',
          "expense" : self.expense.id,
          "user" : self.user.id}
        response = self.client.put(f'/Transaction/{transaction.id}', data, format='json',content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
