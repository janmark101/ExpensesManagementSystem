import { Component, OnInit } from '@angular/core';
import { faList,faTrash,faGear } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { MatDialog} from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit{

  faList = faList
  
  isHovered  : boolean = false;
  HoveredIcons = [faTrash,faGear];

  selectedCategory :any = "";
  selectedDateExpense :Date |any ;
  selectedDateTransaction :Date |any ;
  resetFilterExpense : boolean = false;
  resetFilterTransaction : boolean = false;
  selectedExpenseID : number |any;

  expandExpense : boolean = false;
  expandTransaction : boolean = false;
  expandCategory : boolean = false;

  option : string[] = ['Expand','Expand','Expand'];

  constructor(private Service : SiteServiceService,private confirmBoxEvokeService: ConfirmBoxEvokeService, private dialog: MatDialog){}

  ExpensesIcons :any;
  ExpenseDetails :any;
  TransactionDetail :any; 

  public Categories : any[] = [];
  public Transactions : any[] = [];
  public Expenses : any[] = [];

  ngOnInit(): void {
    this.ExpensesIcons = this.Service.ExpensesIcons;
    this.ExpenseDetails = this.Service.ExpenseDetails;
    this.TransactionDetail = this.Service.TransactionDetail;

    this.Service.getCategory().pipe(take(1)).subscribe((data:any)=>{
      this.Categories = data;
      
    },(error:any)=>{
      console.error(error);
      
    });

    this.Service.getExpenses().pipe(take(1)).subscribe((data:any)=>{
      this.Expenses = data;
      
    },(error:any)=>{
      console.error(error);
      
    });

    this.Service.getTransaction().pipe(take(1)).subscribe((data:any)=>{
      this.Transactions = data;
      
    },(error:any)=>{
      console.error(error);
      
    });
  }

  expandTable(text:string){
    switch (text){
      case 'expense': {       
        this.expandExpense = !this.expandExpense;
        this.changeoption(0);
        break;
      }
      case 'transaction': {
        this.expandTransaction = !this.expandTransaction;
        this.changeoption(1);
        break;
      }
      case 'category': {
        this.expandCategory = !this.expandCategory;
        this.changeoption(2);
        break;
      }
    }
  }

  changeoption(id:number){
    if(this.option[id] == 'Hide'){
      this.option[id] = 'Expand';
    }
    else if(this.option[id] == 'Expand'){
      this.option[id] = 'Hide';
    }
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

  ShowIcons(){
    this.isHovered = true;
  }

  HideIcons(){
    this.isHovered = false;
  }

  Delete(item:any,text:string,id:number){
    this.confirmBoxEvokeService.danger('Confirm delete!', 'Are you sure you want to delete it?\n(All linked items will be deleted!)', 'Confirm', 'Decline')
    .subscribe(resp => {

      if(resp.success === true){
      switch(text){
        case "expense" : {
          this.Service.deleteExpense(item).subscribe((data:any)=>{
            this.Expenses.splice(id,1);
          });
          break;
        }
        case "transaction" : {
          this.Service.deleteTransaction(item).subscribe((data:any)=>{
            this.Transactions.splice(id,1);
          });
          break;
        }
        case "category" : {
          this.Service.deleteCategory(item).subscribe((data:any)=>{
            this.Categories.splice(id,1);
          });
          break;
        }
      }
    }
    });
  }

  Edit(item:any,text:string,id:number){
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: {item : item, which: text,categories : this.Categories, Expenses : this.Expenses} 
    });

    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res != 'cancel'){
        if(text == 'expense')
        this.Expenses[id] = res;
      if(text == 'transaction') 
        this.Transactions[id] = res;
      }
      });
    
  }
}

