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
    icon: faHouse
  },
  {
    name:'Add Expense',
    icon: faCartShopping
  },
  {
    name:'Add Transaction',
    icon: faBarcode
  }
]

}
