import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
    `
      .is-red {
        border-color: #dc3545;
      }
    `
  ]
})
export class IncrementerComponent implements OnInit {
  // @Input() progress:number= 10;
  //rename parameter, father to child
  @Input('progress') progress:number= 10;

  @Input() btnClass:string= 'btn btn-primary';


  //child to father
  @Output() valueOutput: EventEmitter<number> = new EventEmitter();
  //@Output('valueOutput') value: EventEmitter<number> = new EventEmitter();


  constructor() { }
  ngOnInit(): void {
    this.btnClass=`btn ${this.btnClass}`;
  }


  changeValue(value:number){
    if ((this.progress<=0 && value<0) || (this.progress>=100 && value>0)){
      this.valueOutput.emit(this.progress);
      return;
    }

    this.progress+=value;
    this.valueOutput.emit(this.progress);
  }
  onChange(newValue:number){

    if (newValue>=100)
    {
      //this.progress=100;
      this.valueOutput.emit(100);

    }
    else if (newValue<=0)
    {
      //this.progress=0;
      this.valueOutput.emit(0);

    }
    else{
      this.valueOutput.emit(newValue);
    }



  }
}
