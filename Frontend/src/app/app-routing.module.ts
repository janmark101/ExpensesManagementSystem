import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Site/home/home.component';
import { AddExpenseComponent } from './Site/add-expense/add-expense.component';
import { AddTransactionComponent } from './Site/add-transaction/add-transaction.component';

const routes: Routes = [
  {path : '',component:HomeComponent,pathMatch:'full'},
  {path : 'addExpense',component:AddExpenseComponent},
  {path : 'addTransaction',component:AddTransactionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
