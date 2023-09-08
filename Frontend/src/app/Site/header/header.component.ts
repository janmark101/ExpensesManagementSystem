import { Component } from '@angular/core';
import { faHouse,faBarcode,faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  icons = [{
    name:'Home',
    icon: faHouse,
    router : '/'
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
  }
]

}
