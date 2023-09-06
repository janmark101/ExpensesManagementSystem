import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { take } from 'rxjs';
import { SiteServiceService } from 'src/app/Services/site-service.service';
import 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{

  constructor(private Service : SiteServiceService){}

  currentDate = new Date();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ExpensesData : any[] = [];
  TransactionsData : any[] = [];
  
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  } = {
    labels: [],
    datasets: [
      {
        label: 'Expanses',
        data:  [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 2
      }
    ]
  };

  chartData2: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill:boolean;
      backgroundColor: string[];
      borderColor: string[];
      pointBackgroundColor:string;
      borderWidth: number;
    }[];
  } = {
    labels: [],
    datasets: [
      {
        label: 'Transactions',
        data:  [],
        fill:false,
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  };

  chartData3: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  } = {
    labels: [],
    datasets: [
      {
        label: 'Transactions',
        data:  [],
        backgroundColor: ['#3498db', '#FFA500'],
        borderWidth: 2
      }
    ]
  };



  ngOnInit(): void {
    this.Service.getExpenses().pipe(take(1)).subscribe((data:any)=>{
      this.ExpensesData = data;
      this.CreateBarChart(this.ExpensesData).then(()=>{
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
            type: 'bar',
            data: this.chartData,
            options: {
              plugins: {
                legend: {
                  display: false // Ukryj legendę
                }
              }
            }
          });
      }); 
      this.CreatePieChart(this.ExpensesData).then(()=>{
        const ctx3 = document.getElementById('myPieChart') as HTMLCanvasElement;
      const myPieChart = new Chart(ctx3, {
            type: 'pie',
            data: this.chartData3,
            options: {
              plugins: {
                legend: {
                  display: false // Ukryj legendę
                }
              }
            }
          });
      });    
      
    },(error:any)=>{
      console.error(error);
      
    });
    this.Service.getTransaction().pipe(take(1)).subscribe((data:any)=>{
      this.TransactionsData = data;      
      this.CreateLineChart(this.TransactionsData).then(()=>{
        const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
        const myChart2 = new Chart(ctx2, {
              type: 'line',
              data: this.chartData2,
              options: {
                plugins: {
                  legend: {
                    display: false // Ukryj legendę
                  }
                }
              }
            });
      });
    },(error:any)=>{
      console.error(error);
      
    });
    

    

  }

  CreateBarChart(array:any[]): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      let Sum_of_expenses_current_month = 0;
      let Sum_of_expenses_prev_month = 0;
      let Sum_of_expenses_prev_prev_month = 0;
      for(const expense of array){
        if ((this.currentDate.getMonth()+1) == expense.date.split('-')[1]){
          Sum_of_expenses_current_month += parseFloat(expense.amount);
        }
        if ((this.currentDate.getMonth()) == expense.date.split('-')[1]){
          Sum_of_expenses_prev_month += parseFloat(expense.amount);
        }
        if ((this.currentDate.getMonth()-1) == expense.date.split('-')[1]){
          Sum_of_expenses_prev_prev_month += parseFloat(expense.amount);
        }
        
      }

      if ((this.currentDate.getMonth()-2) < 0){
        const x = (12+(this.currentDate.getMonth()-2))
        this.chartData.labels.push(this.months[x]);
        this.chartData.datasets[0].data.push(Sum_of_expenses_prev_month);
      }
      else{
        this.chartData.labels.push(this.months[this.currentDate.getMonth()-2]);
        this.chartData.datasets[0].data.push(Sum_of_expenses_prev_prev_month);
      }

      if ((this.currentDate.getMonth()-1) < 0){
        const x = (12+(this.currentDate.getMonth()-1))       
        this.chartData.labels.push(this.months[x]);
        this.chartData.datasets[0].data.push(Sum_of_expenses_prev_month);
      }
      else{
        this.chartData.labels.push(this.months[this.currentDate.getMonth()-1]);
        this.chartData.datasets[0].data.push(Sum_of_expenses_prev_month);
      }

      this.chartData.labels.push(this.months[this.currentDate.getMonth()]);
      this.chartData.datasets[0].data.push(Sum_of_expenses_current_month);

      resolve();
    
    });
  }

  CreateLineChart(array:any[]): Promise<void>{
    let TransactionsSum = 0;
    return new Promise<void>((resolve, reject) => {
      for(const transaction of array){
        if ((this.currentDate.getMonth()+1) == transaction.date.split('-')[1])
        {
          this.chartData2.labels.push(transaction.date.split('-')[2]);
          TransactionsSum += parseFloat(transaction.amount);
          this.chartData2.datasets[0].data.push(TransactionsSum);
        }
      }
      

      resolve();
    
    });
  }

  CreatePieChart(array:any[]): Promise<void>{
    let ExpensesSum_current_month = 0;
    let ExpensesSum_prev_month = 0;
    return new Promise<void>((resolve, reject) => {
      for(const expense of array){
        if ((this.currentDate.getMonth()+1) == expense.date.split('-')[1])
        {
          ExpensesSum_current_month += parseFloat(expense.amount);
        }
        if ((this.currentDate.getMonth()) == expense.date.split('-')[1])
        {
          ExpensesSum_prev_month += parseFloat(expense.amount);
        }
      }

      this.chartData3.labels.push(this.months[this.currentDate.getMonth()])
      this.chartData3.datasets[0].data.push(ExpensesSum_current_month);

      this.chartData3.labels.push(this.months[this.currentDate.getMonth()-1])
      this.chartData3.datasets[0].data.push(ExpensesSum_prev_month);
      resolve();
    
    });
  }
}
