import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {faCalendarDays,faFilter,faCaretDown,faXmark} from '@fortawesome/free-solid-svg-icons'

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

  constructor(private http : HttpClient) { }

  getExpenses(){
    return this.http.get(`${this.Api_Url}Expenses.json`);
  }

  getCategory(){
    return this.http.get(`${this.Api_Url}Category.json`);
  }

  getTransaction(){
    return this.http.get(`${this.Api_Url}Transaction.json`);
  }

  
}
