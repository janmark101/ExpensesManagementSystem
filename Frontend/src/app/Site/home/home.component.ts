import { Component,OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCategory :any = "";
  selectedDateExpense :Date |any ;
  selectedDateTransaction :Date |any ;
  resetFilterExpense : boolean = false;
  resetFilterTransaction : boolean = false;
  selectedExpenseID : number |any;

  ExpensesIcons :any;
  ExpenseDetails :any;
  TransactionDetail :any; 

  public Categories : any[] = [];
  public Transactions : any[] = [];
  public Expenses : any[] = [];

  constructor(private Service : SiteServiceService){}


  ngOnInit(): void {

    this.ExpensesIcons = this.Service.ExpensesIcons;
    this.ExpenseDetails = this.Service.ExpenseDetails;
    this.TransactionDetail = this.Service.TransactionDetail;

    this.Service.getCategory().pipe(take(1)).subscribe((data:any)=>{
      this.Categories = data;
      
    },(error:any)=>{
      
    });

    this.Service.getExpenses().pipe(take(1)).subscribe((data:any)=>{
      this.Expenses = data;
      
    },(error:any)=>{
      
    });

    this.Service.getTransaction().pipe(take(1)).subscribe((data:any)=>{
      this.Transactions = data;
      
    },(error:any)=>{
      
    });

      
    
  }



  CategoryName(itemID:number){
    for (const category of this.Categories){
      if (category.id == itemID){
        return category.category_name;
      } 
    }
  }

  OrderBy(text:string,array:string){
    if (array == 'Expense'){
      if (text == 'Amount $')
        this.Expenses.sort((a, b) => a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0);
      else if (text == 'Description')
        this.Expenses.sort((a, b) => a.description > b.description ? 1 : a.description < b.description ? -1 : 0);
      else if (text == 'Category')
        this.Expenses.sort((a, b) => a.category_name < b.category_name ? 1 : a.category_name > b.category_name ? -1 : 0);
      else if (text == 'Date')
        this.Expenses.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
      else if (text == 'Expense ID')
        this.Expenses.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
      }
    if (array == 'Transaction'){
      if (text == 'Amount $')
        this.Transactions.sort((a, b) => a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0);
      else if (text == 'Description')
        this.Transactions.sort((a, b) => a.description > b.description ? 1 : a.description < b.description ? -1 : 0);
      else if (text == 'Expense ID')
        this.Transactions.sort((a, b) => a.expense > b.expense ? 1 : a.expense < b.expense ? -1 : 0);
      else if (text == 'Date')
        this.Transactions.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
      else if (text == 'Transaction ID')
        this.Transactions.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
      }
  }

  FilterExpense(){ 
    let filtercategory = false;
    let filterdate = false;

    if(this.resetFilterExpense){
      this.selectedCategory ='';
      this.selectedDateExpense = null;
      this.resetFilterExpense = false;
    }

    if (this.selectedCategory !=''){
      filtercategory = true;
    }
    if (this.selectedDateExpense){
      filterdate = true;
    }
    
    if (!filtercategory && !filterdate){
      return this.Expenses
    }
    else{

      if(filtercategory && !filterdate){
        let categoryID ='';
         for(const category of this.Categories){
        if (category.category_name == this.selectedCategory){
          categoryID = category.id;
          break;
        }
      }
       let FilteredList = this.Expenses.filter(item => item.category_name === categoryID);
  
       return FilteredList;  
      }

      if (!filtercategory && filterdate){
        let FilteredList = []
        let year = this.selectedDateExpense.getFullYear();
        let month = this.selectedDateExpense.getMonth()+1;
        let day = this.selectedDateExpense.getDate();

        for (const expense of this.Expenses){
          if ( (expense.date.split('-')[0] == year ) && (expense.date.split('-')[1] == month) && (expense.date.split('-')[2] == day)){
            FilteredList.push(expense);        
          }
        }
        return FilteredList;
      }

      let categoryID ='';
         for(const category of this.Categories){
        if (category.category_name == this.selectedCategory){
          categoryID = category.id;
          break;
        }
      }
       let FilteredList = this.Expenses.filter(item => item.category_name === categoryID);

       let newList = [];
       let year = this.selectedDateExpense.getFullYear();
        let month = this.selectedDateExpense.getMonth()+1;
        let day = this.selectedDateExpense.getDate();

        for (const expense of FilteredList){
          if ( (expense.date.split('-')[0] == year ) && (expense.date.split('-')[1] == month) && (expense.date.split('-')[2] == day)){
            newList.push(expense);        
          }
        }

      return newList;

    }
  }


  FilterTransactions(){ 
    let filterExpenseID = false;
    let filterdate = false;

    if(this.resetFilterTransaction){
      this.selectedExpenseID =null;
      this.selectedDateTransaction = null;
      this.resetFilterTransaction = false;
    }

    if (this.selectedExpenseID){
      filterExpenseID = true;
    }

    if (this.selectedDateTransaction){
      filterdate = true;
    }
    
    if (!filterExpenseID && !filterdate){
      return this.Transactions
    }

    else{     
      
      if(filterExpenseID && !filterdate){
       let FilteredList = this.Transactions.filter(item => item.expense == this.selectedExpenseID);
  
       return FilteredList;  
      }

      if (!filterExpenseID && filterdate){
        let FilteredList = []
        let year = this.selectedDateTransaction.getFullYear();
        let month = this.selectedDateTransaction.getMonth()+1;
        let day = this.selectedDateTransaction.getDate();

        for (const Transaction of this.Transactions){
          if ( (Transaction.date.split('-')[0] == year ) && (Transaction.date.split('-')[1] == month) && (Transaction.date.split('-')[2] == day)){
            FilteredList.push(Transaction);        
          }
        }
        return FilteredList;
      }

       let FilteredList = this.Transactions.filter(item => item.expense == this.selectedExpenseID);

       let newList = [];
       let year = this.selectedDateTransaction.getFullYear();
        let month = this.selectedDateTransaction.getMonth()+1;
        let day = this.selectedDateTransaction.getDate();

        for (const Transaction of FilteredList){
          if ( (Transaction.date.split('-')[0] == year ) && (Transaction.date.split('-')[1] == month) && (Transaction.date.split('-')[2] == day)){
            newList.push(Transaction);        
          }
        }

      return newList;

    }
  }
  ResetFilter(text:string){
    if (text == 'Expense')
      this.resetFilterExpense = true;
    if (text == 'Transaction')
      this.resetFilterTransaction = true;
  }
}
