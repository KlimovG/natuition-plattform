import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {
  @Output() click = new EventEmitter<any>()
  @Input() link!: string;
  @Input() text: string = 'btn';
  constructor() { }

  ngOnInit(): void {
  }
  onclick(){

  }
}
