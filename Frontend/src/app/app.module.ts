import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Site/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './Site/header/header.component';
import { SiteServiceService } from './Services/site-service.service';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartComponent } from './Site/chart/chart.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { AddExpenseComponent } from './Site/add-expense/add-expense.component';
import { AddTransactionComponent } from './Site/add-transaction/add-transaction.component';
import { LoadCircleComponent } from './Site/load-circle/load-circle.component';
import { ManagementComponent } from './Site/management/management.component';
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { MatDialogModule} from '@angular/material/dialog';
import { EditComponent } from './Site/edit/edit.component';
import { LoginComponent } from './Site/login/login.component';
import { RegisterComponent } from './Site/register/register.component';
import { AuthService } from './Services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChartComponent,
    AddExpenseComponent,
    AddTransactionComponent,
    LoadCircleComponent,
    ManagementComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    NgxAwesomePopupModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(),
    MatDialogModule,
  ],
  providers: [SiteServiceService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
