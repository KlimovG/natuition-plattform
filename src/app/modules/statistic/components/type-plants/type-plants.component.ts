import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-plants',
  template: ``,
})
export class TypePlantsComponent implements OnInit {
  @Input() translationPrefix: string;
  constructor() {}

  ngOnInit(): void {}
}
