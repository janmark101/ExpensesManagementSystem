import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Site/home/home.component';
import { AddExpenseComponent } from './Site/add-expense/add-expense.component';
import { AddTransactionComponent } from './Site/add-transaction/add-transaction.component';
import { ManagementComponent } from './Site/management/management.component';
import { LoginComponent } from './Site/login/login.component';
import { RegisterComponent } from './Site/register/register.component';
import { authGuard } from './Services/auth.guard';

const routes: Routes = [
  {path : '',component:LoginComponent,pathMatch:'full'},
  {path: 'register',component:RegisterComponent},
  {path : 'home',component:HomeComponent, canActivate : [authGuard],},
  {path : 'addExpense',component:AddExpenseComponent, canActivate : [authGuard],},
  {path : 'addTransaction',component:AddTransactionComponent, canActivate : [authGuard],},
  {path: 'management',component:ManagementComponent, canActivate : [authGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
