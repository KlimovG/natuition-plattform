import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: ` <h2 class="Montserrat-Bold text-2xl text-left mb-2.5">
    {{ title | translate }}
  </h2>`,
})
export class SectionTitleComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
