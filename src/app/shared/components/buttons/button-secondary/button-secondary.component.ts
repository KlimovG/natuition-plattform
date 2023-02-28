import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss'],
})
export class ButtonSecondaryComponent implements OnInit {
  @Output() click = new EventEmitter<any>();
  @Input() text: string = 'Default Button';
  @Input() link!: any[] | string | null | undefined;
  constructor() {}

  ngOnInit(): void {}
}
