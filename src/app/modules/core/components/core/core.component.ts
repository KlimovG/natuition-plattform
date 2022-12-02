import { Component } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  host: {
    class: 'w-full h-full flex flex-col justify-between',
  },
})
export class CoreComponent {
  logged: boolean = false;
}
