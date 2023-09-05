from rest_framework import serializers
from .models import Transaction,Expensesdb,Category

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ExpensesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Expensesdb
        fields = '__all__'
        
class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'