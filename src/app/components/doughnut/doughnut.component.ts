import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  @Input() label:string[]=[ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() data:number[]=[ 50, 150, 120 ];
  @Input() title:string='';

  public doughnutChartLabels: string[] = [];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';
  constructor() {  }

  ngOnInit(): void {
    this.doughnutChartLabels=this.label;

    this.doughnutChartData= {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data }
      ]
    };

  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
