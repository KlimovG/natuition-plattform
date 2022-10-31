import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-smart-statistic',
  template: `<app-statistic
    [translationPrefix]="translationPrefix"
  ></app-statistic>`,
})
export class SmartStatisticComponent implements OnInit {
  translationPrefix = 'statistic.';
  activeSession$: Observable<string>;
  ngOnInit() {}
}
