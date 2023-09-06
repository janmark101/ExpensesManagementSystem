import { Component,OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';
import {faCalendarDays,faFilter,faCaretDown} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCategory :any = "";
  Filter = false;

  ExpensesIcons = [
    {
      text:'Choose date',
      icon : faCalendarDays,
    },
    {
      text:'Choose category',
      icon:faFilter,
    }
  ];

  PanelDetails = [
    {
      text:'Id',
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

  
  public Categories : any[] = [];
  public Transaction : any[] = [];
  public Expenses : any[] = [];

  constructor(private Service : SiteServiceService){}


  ngOnInit(): void {
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
      this.Transaction = data;
      
    },(error:any)=>{
      console.error(error);
      
    });


    
  }

  CategoryName(itemID:number){
    for (const category of this.Categories){
      if (category.id == itemID){
        return category.category_name;
      } 
    }
  }

  OrderBy(text:string){
    console.log(this.Expenses);
    if (text == 'Amount $')
      this.Expenses.sort((a, b) => a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0);
    else if (text == 'Description')
      this.Expenses.sort((a, b) => a.description > b.description ? 1 : a.description < b.description ? -1 : 0);
    else if (text == 'Category')
      this.Expenses.sort((a, b) => a.category_name < b.category_name ? 1 : a.category_name > b.category_name ? -1 : 0);
    else if (text == 'Date')
      this.Expenses.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
    else if (text == 'Id')
      this.Expenses.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
  }

  FilterByCategory(){    
    if (this.selectedCategory ==''){
      
      return this.Expenses;
    }
    else{
      this.Filter = true;
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
  }
}
