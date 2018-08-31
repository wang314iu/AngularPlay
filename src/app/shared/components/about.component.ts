import { Component, OnInit } from '@angular/core';
import { interval, timer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = interval(1000);
    // const interval$ = timer(3000, 1000);
    const sub = interval$.subscribe(
      val => console.log('stream one => ' + val)
    );

    setTimeout(() => {
      sub.unsubscribe();
    }, 5000);

    // interval$.subscribe(
    //   val => console.log('stream two => ' + val)
    // );

    // stream click of events from rxJS
    const click$ = fromEvent(document, 'click');

    click$.subscribe(
      val => console.log(val),
      err => console.log(err),
      () => console.log('completed')
    );
  }

}
