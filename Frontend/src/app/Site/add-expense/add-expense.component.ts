import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';
import { format } from 'date-fns';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss',]
})
export class AddExpenseComponent implements OnInit{


  selectedDateExpense : Date |any;
  selectedCategory : any;

  ShowError : boolean = false;
  CreatingExpense : boolean = false;

  public Categories : any[] = [];

  Created = faCheck

  ShowDetails : boolean = false;
  

  constructor(private Service :SiteServiceService){}

  ngOnInit(): void {
    this.Service.getCategory().pipe(take(1)).subscribe((data:any)=>{
      this.Categories = data;
      console.log(data);
      
      
    })
  }

  OnSubmit(form:NgForm){
    if (form.valid){
      this.ShowError = false;

      let Category_id :any ;

      for(const category of this.Categories){
        if (this.selectedCategory == category.category_name){
          Category_id = category.id;
          break;
        }
      }
  
      let newExpense = {
        "amount" : 0,
        "category_name" : Category_id,
        "date" : format(this.selectedDateExpense,'yyyy-MM-dd'),
        "description" : form.value.description,
  
      };  



      this.Service.createExpense(newExpense).subscribe(response =>{
        this.CreatingExpense = true;
        setTimeout(()=>{
          this.ShowDetails = true;
        },1200);
          
        },error=>{
          console.error(error);
          this.ShowError = true; 
        });

    }
    else {
      this.ShowError = true; 
    }     
  }

  created_succesfully(){    
    this.CreatingExpense = false;
    this.ShowDetails = false;
  }
}
