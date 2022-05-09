import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promise = new Promise( (resolve,reject) =>{
    //   //resolve("hola");
    //   //reject("error");

    // });
    // promise.then( (resp) => console.log(resp)  )
    // .catch( err => console.log(err));
    // console.log("end");

    this.getUsuarios().then(u => console.log(u));
  }

  getUsuarios(){

    const promise= new Promise(res => {
      fetch(`https://reqres.in/api/users`)
      .then( resp => resp.json())
      .then( body => res(body.data)
      );

    });
    return promise;
  }

}
