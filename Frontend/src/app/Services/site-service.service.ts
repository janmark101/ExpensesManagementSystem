import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {faCalendarDays,faFilter,faCaretDown,faXmark} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {

  ExpensesIcons = [
    {
      text:'Choose date',
      icon : faCalendarDays,
    },
    {
      text:'Choose category',
      icon:faFilter,
    },
    {
      text:'Clear filters',
      icon : faXmark,
    }
  ];

  ExpenseDetails = [
    {
      text:'Expense ID',
      icon : faCaretDown
    },
    {
      text:'Date',
      icon : faCaretDown
    },
    {
      text:'Category',
      icon:faCaretDown,
    },
    {
      text:'Description',
      icon:faCaretDown,
    },
    {
      text:'Amount $',
      icon:faCaretDown,
    }
  ];

  TransactionDetail = [
    {
      text:'Transaction ID',
      icon : faCaretDown
    },
    {
      text:'Date',
      icon : faCaretDown
    },
    {
      text:'Expense ID',
      icon:faCaretDown,
    },
    {
      text:'Description',
      icon:faCaretDown,
    },
    {
      text:'Amount $',
      icon:faCaretDown,
    }
  ];

  private Api_Url = "http://127.0.0.1:8000/"

  constructor(private http : HttpClient,private Auth: AuthService) { }

  getExpenses(){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.get(`${this.Api_Url}Expenses.json`,{headers});
  }

  getCategory(){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.get(`${this.Api_Url}Category.json`,{headers});
  }

  getTransaction(){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.get(`${this.Api_Url}Transaction.json`,{headers});
  }

  createExpense(expense:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.post(`${this.Api_Url}Expenses.json`,expense,{headers});
  }

  createTransaction(transaction:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.post(`${this.Api_Url}Transaction.json`,transaction,{headers});
  }

  createCategory(category:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.post(`${this.Api_Url}Category.json`,category,{headers});
  }
  
  deleteExpense(expense:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.delete(`${this.Api_Url}Expenses/${expense}`,{headers}); 
  }

  deleteTransaction(transaction:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.delete(`${this.Api_Url}Transaction/${transaction}`,{headers}); 
  }

  deleteCategory(category:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.delete(`${this.Api_Url}Category/${category}`,{headers}); 
  }

  EditExpense(expense:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.put(`${this.Api_Url}Expenses/${expense.id}.json`,expense,{headers}); 
  }

  EditTransaction(transaction:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.put(`${this.Api_Url}Transaction/${transaction.id}.json`,transaction,{headers}); 
  }

  EditCategory(category:any){
    let user = this.Auth.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    return this.http.put(`${this.Api_Url}Category/${category.id}.json`,category,{headers}); 
  }
}
