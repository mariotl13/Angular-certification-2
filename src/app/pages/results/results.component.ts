import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  #routeSub!: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.#routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
    });
  }

  ngOnDestroy() {
    this.#routeSub.unsubscribe();
  }

}
