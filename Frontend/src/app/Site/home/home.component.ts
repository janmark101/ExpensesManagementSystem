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

  ExpensesIcons = [
    {
      text:'Choose date',
      icon : faCalendarDays
    },
    {
      text:'Choose category',
      icon:faFilter,
    }
  ];

  PanelDetails = [
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
      console.log(data);
      this.Categories = data;
      
    },(error:any)=>{
      console.error(error);
      
    });

    this.Service.getExpenses().pipe(take(1)).subscribe((data:any)=>{
      console.log(data);
      this.Expenses = data;
      
    },(error:any)=>{
      console.error(error);
      
    });

    this.Service.getTransaction().pipe(take(1)).subscribe((data:any)=>{
      console.log(data);
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
}
