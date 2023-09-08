import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Site/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './Site/header/header.component';
import { SiteServiceService } from './Services/site-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChartComponent,
    AddExpenseComponent,
    AddTransactionComponent,
    LoadCircleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
  ],
  providers: [SiteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
