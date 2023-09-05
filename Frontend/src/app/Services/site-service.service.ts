import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {

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
