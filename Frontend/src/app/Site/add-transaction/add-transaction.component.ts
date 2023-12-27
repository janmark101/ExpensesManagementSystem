import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { take } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { SiteServiceService } from 'src/app/Services/site-service.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  
  selectedDateTransaction : Date |any;
  selectedExpense : any;

  ShowError : boolean = false;
  CreatingTransaction : boolean = false;

  public Expenses : any[] = [];
  public Categories : any[] = [];

  Created = faCheck

  ShowDetails : boolean = false;
  
  ExpenseDetails : any;

  constructor(private Service :SiteServiceService,private Auth:AuthService){}

  ngOnInit(): void {
    this.ExpenseDetails = this.Service.ExpenseDetails;

    this.Service.getExpenses().pipe(take(1)).subscribe((data:any)=>{
      this.Expenses = data;
      this.Expenses = this.Expenses.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
      
      
    });

    this.Service.getCategory().pipe(take(1)).subscribe((data:any)=>{
      this.Categories = data;
      
    })
  }

  OnSubmit(form:NgForm){
    
    if (form.valid){
      this.ShowError = false;

      if (/^\d+$/.test(form.value.amount)){

        let newTransaction = {
          "amount" : form.value.amount,
          "date" : format(this.selectedDateTransaction,'yyyy-MM-dd'),
          "description" : form.value.description,
          "expense" : parseInt(this.selectedExpense.split('ID : ')[1]),
          "user" : this.Auth.getUserFromLocalStorage().user_id,
        };  
        
  
        this.Service.createTransaction(newTransaction).subscribe(response =>{
          this.CreatingTransaction = true;
          setTimeout(()=>{
            this.ShowDetails = true;
          },1200);
            
          },error=>{
            this.ShowError = true; 
          });
        
      }
      else{
        this.ShowError = true; 
        
      }
    }
    else {
      this.ShowError = true; 
    }     
  }

  created_succesfully(){    
    this.CreatingTransaction = false;
    this.ShowDetails = false;
    location.reload();
  }

  CategoryName(itemID:number){
    for (const category of this.Categories){
      if (category.id == itemID){
        return category.category_name;
      } 
    }
  }
}
