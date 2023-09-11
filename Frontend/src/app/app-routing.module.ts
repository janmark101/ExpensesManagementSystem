import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Site/home/home.component';
import { AddExpenseComponent } from './Site/add-expense/add-expense.component';
import { AddTransactionComponent } from './Site/add-transaction/add-transaction.component';
import { ManagementComponent } from './Site/management/management.component';

const routes: Routes = [
  {path : '',component:HomeComponent,pathMatch:'full'},
  {path : 'addExpense',component:AddExpenseComponent},
  {path : 'addTransaction',component:AddTransactionComponent},
  {path: 'management',component:ManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
