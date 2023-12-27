import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';
import { format } from 'date-fns';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/auth.service';


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
  CreatingCategory : boolean = false;
  add_Category : boolean = false;
  form_invalid_category : boolean = false;

  public Categories : any[] = [];

  Created = faCheck

  ShowDetails : boolean = false;
  ShowDetailsCategory : boolean = false;
  

  constructor(private Service :SiteServiceService,private Auth:AuthService){}

  ngOnInit(): void {
    this.Service.getCategory().pipe(take(1)).subscribe((data:any)=>{
      this.Categories = data;
      
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
        "user" : this.Auth.getUserFromLocalStorage().user_id,
      };  



      this.Service.createExpense(newExpense).subscribe(response =>{
        this.CreatingExpense = true;
        setTimeout(()=>{
          this.ShowDetails = true;
          this.selectedDateExpense = null;
          this.selectedCategory = null;
        },1200);
          
        },error=>{
          this.ShowError = true; 
        });

    }
    else {
      this.ShowError = true; 
    }     
  }

  OnSubmitCategory(form:NgForm){
    if(form.valid){
      let newCategory = {
        category_name:form.value.category,
        "user" : this.Auth.getUserFromLocalStorage().user_id,
      }
      
      this.Service.createCategory(newCategory).subscribe(response =>{
        this.Categories.push(response);
        this.CreatingCategory = true;
        setTimeout(()=>{
          this.ShowDetailsCategory = true;
        },1200);
        
      },error=>{
        this.form_invalid_category = true;        
      })
    }
    else{
      this.form_invalid_category = true;
    }

  }

  created_succesfully(text:string){    
    if (text = 'category'){
      this.CreatingCategory = false;
      this.ShowDetailsCategory = false;
    }
    if (text = 'expense'){
      this.CreatingExpense = false;
      this.ShowDetails = false;
    }
  }


  create_new_category(){
    this.add_Category = !this.add_Category;
  }
}
