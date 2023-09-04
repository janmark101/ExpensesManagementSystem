from django.db import models

class Category(models.Model):
    category_name = models.CharField(null=False,max_length=200)
    
    
class Expensesdb(models.Model):
    category_name = models.ForeignKey(Category,null=False,on_delete=models.CASCADE)
    date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    description = models.TextField(blank=True,null=True)
    
