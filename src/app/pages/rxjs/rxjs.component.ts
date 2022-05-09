import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs!: Subscription;

  constructor() {
    // this.returnObservable().pipe(
    //   retry()
    // ).subscribe({
    //   next:value => console.log(value),
    //   error:error  => console.warn(error),
    //   complete:() => console.log('termino')
    // });

    this.intervalSubs=this.returnInterval().subscribe(
      (v)=> console.log(v)
    );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval():Observable<number>{
    return interval(1000)
    .pipe(
      map(v => {
        return v+1
      }),
      filter(v => v%2 === 0),
      take(4),
    );

  }
  returnObservable():Observable<number>{
    let i=0;

    const obs$= new Observable<number>(
      observer =>{
        const interval= setInterval( () => {
          i++;
          observer.next(i);

          if (i===4){
            clearInterval(interval);
            observer.complete();
          }

          if (i===2){
            observer.error('error 2');
          }
        },1000);
      });

      return obs$;
  }

}
