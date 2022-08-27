import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full',
  },
})
export class CoreComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
