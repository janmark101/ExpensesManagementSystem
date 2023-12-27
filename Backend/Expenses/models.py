from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    category_name = models.CharField(null=False,max_length=200)
    user = models.ForeignKey(User,blank=False,null=False,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.category_name
    
    
class Expensesdb(models.Model):
    category_name = models.ForeignKey(Category,null=False,on_delete=models.CASCADE)
    date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    description = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,blank=False,null=False,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.category_name} Expanses {self.date} ID: {self.id}"
    
        
class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    date = models.DateField(null=False)
    expense = models.ForeignKey(Expensesdb,on_delete=models.CASCADE)
    description = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,blank=False,null=False,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.expense_id} Transaction {self.date}"


        
    