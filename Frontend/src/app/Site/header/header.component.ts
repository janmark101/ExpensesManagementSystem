import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faHouse,faBarcode,faCartShopping,faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { delay, filter } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  
  logged= false;
  user :any;

  constructor(private Auth:AuthService,private router : Router, private activatedRoute: ActivatedRoute){}

  icons = [{
    name:'Home',
    icon: faHouse,
    router : '/home'
  },
  {
    name:'Add Expense',
    icon: faCartShopping,
    router:'/addExpense'
  },
  {
    name:'Add Transaction',
    icon: faBarcode,
    router:'/addTransaction'
  },
  {
    name : 'Management',
    icon : faGear,
    router : '/management'
  },
  {
    name:'Log out',
    icon:faArrowRightFromBracket,
    router:''
  }
];

Logout(){
  this.Auth.logout().subscribe((data:any) =>{
    localStorage.removeItem('user');
    delay(1500);
    this.router.navigate(['']).then(() => {
        location.reload();
    });
    
  },(error:any)=>{

  })
}

ngOnInit(): void {
  
}

}
