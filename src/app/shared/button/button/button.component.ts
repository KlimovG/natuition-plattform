import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Output() click = new EventEmitter<any>()
  @Input() text: string = 'Default Button';
  constructor() { }

  ngOnInit(): void {
  }
}
