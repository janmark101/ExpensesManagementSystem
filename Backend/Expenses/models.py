from django.db import models

class Category(models.Model):
    category_name = models.CharField(null=False,max_length=200)
    
    def __str__(self):
        return self.category_name
    
    
class Expensesdb(models.Model):
    category_name = models.ForeignKey(Category,null=False,on_delete=models.CASCADE)
    date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    description = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return f"{self.category_name} Expanses {self.date}"
    
class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    date = models.DateField(null=False)
    expense = models.ForeignKey(Expensesdb,on_delete=models.CASCADE)
    description = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return f"{self.expense} Transaction {self.date}"
    