import { Component, Inject,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { AuthService } from 'src/app/Services/auth.service';
import { SiteServiceService } from 'src/app/Services/site-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) private data: any,private Service :SiteServiceService,private Auth:AuthService){}

  text : string |any;
  Categories : any[] = [];
  Expenses : any[] = [];
  item : any;

  selectedDateExpense : Date |any;
  selectedCategory : any;

  ngOnInit(): void {
    this.text = this.data.which; 
    this.Categories = this.data.categories;  
    this.item = this.data.item;
    this.Expenses = this.data.Expenses;
    
  }

  OnSubmitExpense(form:NgForm){

    if(form.valid){
      let category_id :any ;

      for(const category of this.Categories){
        if (form.value.selectedCategory == category.category_name){
          category_id = category.id;
          break;
        }
      }

      let Date : any;

      if(typeof form.value.selectedDateExpense ==="string"){
        Date = this.item.date
        
      }
      else { 
        Date = format(form.value.selectedDateExpense,'yyyy-MM-dd');
      }

      let editedExpense = {
        "amount" : this.item.amount,
        "category_name": category_id,
        "date" : Date,
        "description" : form.value.description,
        "id" : this.item.id,
        "user" : this.Auth.getUserFromLocalStorage().user_id,
      };
      
      this.Service.EditExpense(editedExpense).subscribe();

      this.dialogRef.close(editedExpense);
    }

  }

  OnSubmitTransaction(form : NgForm){
    if(form.valid){

      let Date : any;

      if(typeof form.value.selectedDateExpense ==="string"){
        Date = this.item.date
        
      }
      else { 
        Date = format(form.value.selectedDateExpense,'yyyy-MM-dd');
      }

      let editedTransaction = {
        "amount" : form.value.amount,
        "date" : Date,
        "description" : form.value.description,
        "expense" : parseInt(form.value.selectedExpense),
        "id" : this.item.id,
        "user" : this.Auth.getUserFromLocalStorage().user_id,
      };      
      
      this.Service.EditTransaction(editedTransaction).subscribe();

      this.dialogRef.close(editedTransaction);
    }

  }
  

  Cancel(){
    this.dialogRef.close('cancel');
  }

  CategoryName(){
    for(const category of this.Categories){
      if (category.id == this.item.category_name){
        return category.category_name;
      }
    }
  }
}
