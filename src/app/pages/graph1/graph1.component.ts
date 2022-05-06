import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component implements OnInit {

  labels1:string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  // public doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.labels1,
  //   datasets: [
  //     { data: [ 350, 450, 100 ] }
  //   ]
  // };

  data:number[]= [ 350, 450, 100 ];

  constructor() { }


  ngOnInit(): void {
  }

}
