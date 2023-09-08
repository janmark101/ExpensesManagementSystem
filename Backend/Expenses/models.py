from django.db import models

class Category(models.Model):
    category_name = models.CharField(null=False,max_length=200)
    
    def __str__(self):
        return self.category_name
    
    
class Expensesdb(models.Model):
    category_name = models.ForeignKey(Category,null=False,on_delete=models.CASCADE)
    date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    description = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return f"{self.category_name} Expanses {self.date} ID: {self.id}"
    
    def update_amount(self):
        transactions = Transaction.objects.filter(expense=self)
        total_amount = sum([transaction.amount for transaction in transactions])
        self.amount = total_amount
        self.save()
        
class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    date = models.DateField(null=False)
    expense = models.ForeignKey(Expensesdb,on_delete=models.CASCADE)
    description = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return f"{self.expense_id} Transaction {self.date}"
    
    def save(self,*args,**kwargs):
        try:
            original_transaction = Transaction.objects.get(pk=self.pk)
            id = original_transaction.expense_id
            original_expense = Expensesdb.objects.get(pk=id)
            original_expense.amount -= self.amount
            original_expense.save()
            super(Transaction,self).save(*args,**kwargs)
            self.expense.update_amount()
        except Transaction.DoesNotExist:
            print("nowy")
            super(Transaction,self).save(*args,**kwargs)
            self.expense.update_amount()

        
    