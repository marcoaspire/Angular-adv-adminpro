import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
//3rd
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent
  ],
  exports: [
    IncrementerComponent,
    DoughnutComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
