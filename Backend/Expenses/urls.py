
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('Category',CategoryView.as_view()),
    path('Transaction',TransactionView.as_view()),
    path('Expenses',ExpensesView.as_view()),
    path('Expenses/<int:pk>',ExpenseViewObject.as_view()),
    path('Category/<int:pk>',CategoryViewObject.as_view()),
    path('Transaction/<int:pk>',TransactionViewObject.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)